import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserExists } from '@/src/actions/userAction';
import { getCustomers } from '@/src/actions/customerAction';
import CustomerInfo from '@/components/customer/CustomerInfo';
import { HiPencilAlt } from 'react-icons/hi';
import Link from 'next/link';
import OrdersList from '@/components/order/OrdersList';
import { getOrders } from '@/src/actions/orderAction';


export default async function page({ params }) {
  const { id } = params;
  console.log(id)
  const session = await getServerSession(authOptions);
  const email = session.user.email;
  const user = await UserExists(email);
  if (user) {
    const res = await getCustomers({ user: user, _id: id })
    var customer = res.customers[0];
    var orders = await getOrders({customerObjId: customer._id, user: user })
  }

  return (
    <div className='my-20 px-5 xl:px-40 md:ml-[300px]'>
      <div className='rounded-t-md p-2 bg-secondary text-center capitalize'>
        <h2>{customer.firstName} {customer.lastName}</h2>
        </div>
      <div className='p-5  border-2 shadow-lg shadow-secondary/20 text-black rounded-b-md'>
        <div className='flex flex-col gap-5'>
          <CustomerInfo customer={customer} />
          <hr />
          <div className='flex justify-between'>
            <h3>Orders</h3>
            <Link className='text-2xl' href={`/dashboard/create/order?id=${customer._id}`}><HiPencilAlt /></Link>
          </div>
          <OrdersList orders={orders}/>
        </div>
      </div>
    </div>
  )
}
