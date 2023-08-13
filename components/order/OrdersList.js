import React, { Suspense } from 'react'
import Link from 'next/link'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePause, AiOutlineCheck } from 'react-icons/ai'
import { getOrders } from '@/src/actions/orderAction'

export default async function OrdersList({ data}) {
    const orders = await getOrders(data)
    
    if (orders.length > 0)
        return (
            <div className='overflow-auto'>
                <div className='tablecontainer w-full flex flex-col justify-between'>
                    <div className='tablehead flex flex-col text-primary'>
                        <div className='tablerow flex items-center bg-accent rounded-t-md'>
                            <div className='p-2 flex-grow-[7]'>Order Id</div>
                            <div className='p-2 flex-grow-[7]'></div>
                            <div className='p-2'></div>
                            <div className='p-2'></div>
                            <div className='p-2'></div>
                        </div>
                    </div>
                    <div className='rowhead flex flex-col text-black'>
                        {orders.map((order, index) => {
                            return (
                                <div key={index} className='tablerow flex items-center gap-2 border-b-[1px] bg-slate-100'>
                                    <Link className='p-2 flex-grow-[7]' href={`/dashboard/orders/${order._id}`} ><div className=''>{order.orderId}</div></Link>
                                    <div className='p-2 flex-grow-[7]'>{order.createdAt.getFullYear()}-{order.createdAt.getMonth()+1}-{order.createdAt.getDate()}</div>
                                    <div className='p-2'>{order.status === "Pending" ? <AiOutlinePause/> : <AiOutlineCheck className="text-green" />}</div>
                                    <div className='p-2'><AiOutlineEdit /></div>
                                    <div className='p-2 text-red-600'><AiOutlineDelete /></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
}
