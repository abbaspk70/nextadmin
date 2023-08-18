import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserExists } from '@/src/actions/userAction';
import { HiPencilAlt } from 'react-icons/hi';
import Link from 'next/link';
import { Suspense } from 'react';
import DataLoading from '@/components/loaders/DataLoading';
import SearchOrder from '@/components/order/orderFormComp/orderListComp/SearchOrder';
import { getOrders } from '@/src/actions/orderAction';

export default async function page() {
  const session = await getServerSession(authOptions);
  const email = session.user.email;
  const user = await UserExists(email);
  const data = {user: user}
  const handleSubmit = async(formData) => {
    'use server';
    const orderId = await formData.get('orderId');
    //const orders = await getOrders({$and:[{user:user}, {orderId:{$regex: orderId}}]})
    //return JSON.stringify(orders);
    data.orderId = {$regex: orderId};
    console.log(data);
    return data;
  }
  return (
    <div className='my-20 px-5 xl:px-40 md:ml-[300px]'>
      <div className='rounded-t-md p-2 bg-secondary text-center capitalize'>
        <h2>Orders</h2>
        </div>
      <div className='p-5  border-2 shadow-lg shadow-secondary/20 text-black rounded-b-md'>
        <div className='flex flex-col gap-5'>
          {/* <SearchOrder filterData={JSON.stringify(data)}/> */}
          <SearchOrder onSubmit={handleSubmit} filterData={data}/>
        </div>
      </div>
    </div>
  )
}
