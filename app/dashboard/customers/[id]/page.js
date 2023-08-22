import { getCustomer } from '@/src/actions/customerAction';
import CustomerInfo from '@/components/customer/CustomerInfo';
import { HiPencilAlt } from 'react-icons/hi';
import Link from 'next/link';
import OrdersList from '@/components/order/OrdersList';
import { Suspense } from 'react';
import DataLoading from '@/components/loaders/DataLoading';


export default async function page({ params }) {
  const { id } = params;
  if(id) {
  const res = await getCustomer({ _id: id })
  var customer = await JSON.parse(res);
  var data = { customerObjId: customer._id }
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
          <Suspense fallback={<DataLoading />}><OrdersList data={data} /></Suspense>
        </div>
      </div>
    </div>
  )
}
