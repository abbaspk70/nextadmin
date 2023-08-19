import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserExists } from '@/src/actions/userAction';
import OrderInfo from '@/components/order/OrderInfo';
import PrintOrder from '@/components/order/PrintOrder';
import { Suspense } from 'react';
import DataLoading from '@/components/loaders/DataLoading';
import {AiOutlineEdit} from 'react-icons/ai'


export default async function page({params}) {
    const { id } = params;
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    const user = await UserExists(email);

    return (
        <div className='relative h-[80%] my-20 px-5 xl:px-40 md:ml-[300px]'>
            <div className='sticky top-0 rounded-t-md p-2 bg-secondary text-center capitalize px-5 py-2'>
                <h2>Order Summary</h2>
                <div className='flex gap-5'>
                <PrintOrder/>
                <a className='flex justify-center items-center gap-1 text-lg' href={`/dashboard/edit/order/${id}`}><AiOutlineEdit/><h4>Edit</h4></a>
                </div>
            </div>
            <div className='text-black overflow-scroll h-full border-2'>
                <Suspense fallback={<DataLoading/>}><OrderInfo id={id} user={user}/></Suspense>
            </div>
        </div>
    )
}
