'use client'
import React, { useState, useEffect } from 'react'
import { getOrdersByPage, getOrdersByUser } from '@/src/actions/orderAction'
import Pagination from '@/components/pagination/Pagination'

export default function page() {
  
  const [orders, setOrders] = useState([])
  let [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const ordersPerPage = 1
  let req = {currentPage: currentPage, ordersPerPage: ordersPerPage}

  useEffect(() =>{
    const handleData = async()=>{
      const res = await getOrdersByUser({}, req)
        var { orders } = JSON.parse(res);
        setOrders(orders);
        var {data} = JSON.parse(res);
        const {totalPages} = data;
        setTotalPages(totalPages);
    }
    handleData();
  },[currentPage])
  
  return (
    <div className='md:ml-[300px] h-full text-black'>
      {orders.map((order, index) => {
        return (
          <div key={index}>
            <div className='flex gap-3'>
              <p>{order.orderId}</p>
              <p>{order.createdAt}</p>
            </div>
          </div>
        )
      })}
      <div className='flex gap-2'>
      </div>
      <Pagination
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages= {totalPages}/>
    </div>
  )
}
