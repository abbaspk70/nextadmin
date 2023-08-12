import React, { Suspense } from 'react'
import Link from 'next/link'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

export default function OrdersList({ orders }) {
    if (orders.length > 0)
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
                {orders.map((order,index) =>{
                    return (
                        <Link key={index} href={`/dashboard/orders/${order._id}`} className='table-row'>
                        <div className='p-2 table-cell border-b-[1px] '>{order.orderId}</div>
                        <div className='p-2 table-cell border-b-[1px] '>{order.status}</div>
                        <div className='p-2 table-cell border-b-[1px] '><AiOutlineEdit/></div>
                        <div className='p-2 table-cell border-b-[1px] text-red-600 '><AiOutlineDelete/></div>
                    </Link>
                    )
                })}
            </div>
        </div>
        </div>
    )
}
