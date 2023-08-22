import CustomersList from '@/components/customer/CustomersList';
import { getCustomers } from '@/src/actions/customerAction';
import { revalidatePath, } from 'next/cache';
import DataLoading from '@/components/loaders/DataLoading';
import { Suspense } from 'react';

export default async function page() {

  return (
    <div className=' my-20 xl:px-8 px-5 md:ml-[300px]'>
      <div className='text-2xl rounded-t-md p-2 bg-secondary text-center'> <h1>Customers</h1></div>
      <div className='p-2 border-2 shadow-lg shadow-secondary/20 text-black rounded-b-md'>
      <CustomersList/>
      </div>
    </div>

  )
}
