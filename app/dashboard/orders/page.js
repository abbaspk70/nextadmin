import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserExists } from '@/src/actions/userAction';
import { HiPencilAlt } from 'react-icons/hi';
import Link from 'next/link';
import OrdersList from '@/components/order/OrdersList';
import { Suspense } from 'react';
import DataLoading from '@/components/loaders/DataLoading';


export default async function page() {
  const session = await getServerSession(authOptions);
  const email = session.user.email;
  const user = await UserExists(email);
  const data = {user: user }

  return (
    <div className='my-20 px-5 xl:px-40 md:ml-[300px]'>
      <div className='rounded-t-md p-2 bg-secondary text-center capitalize'>
        <h2>Orders</h2>
        </div>
      <div className='p-5  border-2 shadow-lg shadow-secondary/20 text-black rounded-b-md'>
        <div className='flex flex-col gap-5'>
          <hr />
          <Suspense fallback={<DataLoading/>}><OrdersList data={data}/></Suspense>
        </div>
      </div>
    </div>
  )
}
