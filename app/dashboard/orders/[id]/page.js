import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserExists } from '@/src/actions/userAction';
import OrderInfo from '@/components/order/OrderInfo';
import PrintOrder from '@/components/order/PrintOrder';
import Link from 'next/link';


export default async function page({params}) {
    const { id } = params;
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    const user = await UserExists(email);
    // if (user) {
    //   const res = await getCustomers({ user: user, _id: id })
    //   var customer = res.customers[0];
    // }
  
    return (
        <div className='my-20 px-5 xl:px-40 md:ml-[300px]'>
            <div className='rounded-t-md p-2 bg-secondary text-center capitalize px-5 py-2'>
                <h2>Order Summary</h2>
                <div className='flex gap-5'>
                <PrintOrder/>
                <Link href={`/dashboard/edit/order/${id}`}><h4>Edit</h4></Link>
                </div>
            </div>
            <div className='text-black'>
                <OrderInfo id={id} user={user}/>
            </div>
        </div>
    )
}
