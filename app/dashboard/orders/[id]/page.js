import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserExists } from '@/src/actions/userAction';
import { getCustomers } from '@/src/actions/customerAction';
import CustomerInfo from '@/components/customer/CustomerInfo';
import { HiPencilAlt } from 'react-icons/hi';
import Link from 'next/link';
import OrdersList from '@/components/order/OrdersList';
import { getOrders } from '@/src/actions/orderAction';
import { Suspense } from 'react';
import DataLoading from '@/components/loaders/DataLoading';
import OrderInfo from '@/components/order/OrderInfo';


export default async function page({params}) {
    const { id } = params;
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    const user = await UserExists(email);
    if (user) {
      const res = await getCustomers({ user: user, _id: id })
      var customer = res.customers[0];
    }
  
    return (
        <div className='my-20 px-5 xl:px-40 md:ml-[300px]'>
            <div className='rounded-t-md p-2 bg-secondary text-center capitalize'>
                <h2>Order page</h2>
            </div>
            <div className='text-black'>
                <OrderInfo id={id} user={user}/>
            </div>
        </div>
    )
}
