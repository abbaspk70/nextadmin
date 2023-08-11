import CustomersList from '@/components/customer/CustomersList';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserExists } from '@/src/actions/userAction';
import { getCustomers } from '@/src/actions/customerAction';
import { revalidatePath, } from 'next/cache';


export default async function page() {

  const session = await getServerSession(authOptions);
  const email = session.user.email;
  const handleSubmit = async (formData) => {
    'use server'
    try {
      const user = await UserExists(email)
      if (user) {
        const name = await formData.get('name');
        const email = await formData.get('email');
        const phone = await formData.get('phone');

        const res = await getCustomers({
          $and: [
            { user: user },
            { $or: [{ firstName: { $regex: `(?i)${name}` } }, { lastName: { $regex: `(?i)${name}` } }] },
            { "contact.email": { $regex: `(?i)${email}` } },
            {
              $or: [{ "contact.phone": { $regex: `${phone}` } }, { "contact.mobile": { $regex: `${phone}` } }]
            },
          ]
        });
        if (res.status === 'success') {
          const customers = [...res.customers];
          revalidatePath("dashboard/customers");
          return JSON.stringify(customers);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=' my-20 xl:px-8 px-5 md:ml-[300px]'>
      <div className='text-2xl rounded-t-md p-2 bg-secondary'> <h1>Customers</h1></div>
      <div className='p-2 border-2 shadow-lg shadow-secondary/20 text-black rounded-b-md'>
        <CustomersList onSubmit={handleSubmit} />
      </div>
    </div>

  )
}
