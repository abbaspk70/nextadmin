'use client'
import React from 'react'
import { getOrders } from '@/src/actions/orderAction'
import { useTransition } from 'react';
import { getOrdersByUser } from '@/src/actions/orderAction';

export default function page(data) {
  let [isPending, startTransition] = useTransition()
  const handleClick = async() => {
    const data =await getOrdersByUser();
    console.log(JSON.parse(data));
  }
  return (
    <div className='text-black my-20 xl:px-8 px-5 md:ml-[300px] w-full h-screen'>
    <button onClick={()=> handleClick()}>
        Add</button>
      </div>
   
  )
}
