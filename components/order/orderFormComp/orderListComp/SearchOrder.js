'use client'
import BtnSubmit from "@/components/buttons/BtnSubmit";
import { useState } from "react";
import React, { Suspense } from 'react';
import DataLoading from "@/components/loaders/DataLoading";
import OrdersList from "../../OrdersList";
import dayjs from "dayjs";

export default function SearchOrder() {
  const [startDate, setStartDate] = useState(new Date('2023-08-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState({});

  const handleSubmit = (formData) => {
    const orderId = formData.get('orderId');
    const status = formData.get('status').toString();
    console.log(status);
    setData({ ...data, orderId: { "$regex": orderId }, createdAt: { $gte: startDate, $lte: endDate },status:{$ne: status}});
  };
  return (
    <div>
      <form action={handleSubmit} className='flex flex-col gap-5 py-3 px-5 items-end'>
        <div className='w-full flex flex-col lg:flex-row gap-5 '>
          <div className='flex flex-col gap-2'><label>Order Id</label>
            <input type="text" name='orderId' placeholder="Search Order Id" />
          </div>
          <div className='flex flex-col gap-2'><label>From</label>
            <input onChange={(e) => setStartDate(new Date(e.target.value))} type="date" name='startDate' placeholder="YYYY-MM-DD" value={dayjs(startDate).format("YYYY-MM-DD")} />
          </div>
          <div className='flex flex-col gap-2'><label>To</label>
            <input onChange={(e) => setEndDate(new Date(`${e.target.value}T23:59:59Z`))} type="date" name='endDate' placeholder="YYYY-MM-DD" defaultValue={dayjs(endDate).format("YYYY-MM-DD")} />
          </div>
          <div className='flex flex-col gap-2'><label>Status</label>
            <select className="" id="status" name="status">
              <option value="any">Any</option>
              <option value="Delivered">Pending</option>
              <option value="Pending">Delivered</option>
            </select>
          </div>
        </div>
        <div className='flex w-full justify-end items-center gap-x-5'>
          <BtnSubmit title={"search"} />
        </div>
      </form>
      <Suspense fallback={<DataLoading />}><OrdersList data={data} /></Suspense>
    </div>
  )
}
