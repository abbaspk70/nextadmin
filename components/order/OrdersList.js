'use client'
import Link from 'next/link'
import { AiOutlineEdit, AiOutlinePause, AiOutlineCheck } from 'react-icons/ai'
import BtnDeleteOrder from './BtnDeleteOrder'
import { useState, useEffect } from'react';
import dayjs from 'dayjs';
import { getOrdersByUser } from '@/src/actions/orderAction';
import { useTransition } from 'react'
import DataLoading from '../loaders/DataLoading';

export default function OrdersList({data}) {
  let [isPending, startTransition] = useTransition()
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
      const handleData = async () => { 
        const orderData = await getOrdersByUser(data)
        setOrders(JSON.parse(orderData));
      };
      startTransition(() => handleData())
    },[data]);
    if (orders.length> 0)
        return (
            <div className='overflow-auto'>
              {isPending? <DataLoading/>: 
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
                                    {/* <div className='p-2 flex-grow-[7]'>{order.createdAt.getFullYear()}-{order.createdAt.getMonth()+1}-{order.createdAt.getDate()}</div> */}
                                    <div className='p-2 flex-grow-[7]'>{dayjs(order.createdAt).format("YYYY-MM-DD")}</div>

                                    <div className='p-2'>{order.status === "Pending" ? <AiOutlinePause/> : <AiOutlineCheck className="text-green" />}</div>
                                    <Link href={`/dashboard/edit/order/${order._id}`} className='p-2'><AiOutlineEdit /></Link>
                                    <div className='p-2 text-red-600 cursor-pointer'><BtnDeleteOrder id={JSON.stringify(order._id)}/></div>
                                </div>
                            )
                        })}
                    </div>
                </div>}
            </div>
        )
}
