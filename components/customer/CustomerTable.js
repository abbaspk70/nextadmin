import React, { Suspense } from 'react'
import Link from 'next/link'
export default function CustomerTable({ customers }) {
    if (customers.length > 0)
    return (
        <div className='overflow-auto'>
        <div className='w-full table'>
            <div className='table-header-group text-primary'>
                <div className='table-row bg-accent'>
                    <div className='p-2 table-cell'>Id</div>
                    <div className='p-2 table-cell border-x-[1px]'>Name</div>
                    <div className='p-2 table-cell '>Phone</div>
                    <div className='p-2 table-cell border-l-[1px]'>Email</div>
                </div>
            </div>
            <div className='table-row-group bg-black/5'>
                {customers.map((customer,index) =>{
                    return (
                        <Link key={index} href={`/dashboard/customers/${customer._id}`} className='table-row'>
                        <div className='p-2 table-cell border-b-[1px]'>{customer.customerId}</div>
                        <div className='p-2 table-cell border-x-[1px] border-b-[1px]'>{customer.firstName} {customer.lastName}</div>
                        <div className='p-2 table-cell border-b-[1px]'>{customer.contact.phone}</div>
                        <div className='p-2 table-cell border-l-[1px] border-b-[1px]'>{customer.contact.email}</div>
                    </Link>
                    )
                })}
            </div>
        </div>
        </div>
    )
}
