import OrderInfo from '@/components/order/OrderInfo';
import PrintOrder from '@/components/order/PrintOrder';
import { Suspense } from 'react';
import DataLoading from '@/components/loaders/DataLoading';
import {AiOutlineEdit} from 'react-icons/ai'
import Link from 'next/link';


export default async function page({params}) {
    const { id } = params;

    return (
        <div className='relative h-[80%] my-20 px-5 xl:px-40 md:ml-[300px]'>
            <div className='sticky top-0 rounded-t-md p-2 bg-secondary text-center capitalize px-5 py-2'>
                <h2>Order Summary</h2>
                <div className='flex gap-5'>
                <PrintOrder/>
                <Link className='flex justify-center items-center gap-1 text-lg' href={`/dashboard/edit/order/${id}`}><AiOutlineEdit/><h4>Edit</h4></Link>
                </div>
            </div>
            <div className='text-black overflow-scroll h-full border-2'>
                <Suspense fallback={<DataLoading/>}><OrderInfo id={id}/></Suspense>
            </div>
        </div>
    )
}
