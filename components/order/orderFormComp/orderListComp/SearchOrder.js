'use client'
import BtnLink from "@/components/buttons/BtnLink";
import BtnSubmit from "@/components/buttons/BtnSubmit";
import OrdersList from "../../OrdersList";
import { getOrders } from "@/src/actions/orderAction";
import { useState } from "react";
import React, { Suspense } from 'react';
import DataLoading from "@/components/loaders/DataLoading";

export default function SearchOrder({onSubmit, filterData}) {
    const [data, setData] = useState(filterData);
    const handleSubmit= async(formData)=> { 
       const data = await onSubmit(formData);
      // console.log("from handlesumbit" ,JSON.parse(orderData));
      // setOrders(JSON.parse(orderData));
       setData(data);
    };
  return (
    <div>
    <form action={handleSubmit} className='flex flex-col gap-5 py-3 px-5 items-end'>
        <div className='w-full flex flex-col md:flex-row gap-5 '>
            <input type="text" name='orderId' placeholder="Search Order Id" />
            <input type="text" name='dateFrom' placeholder="Date Start" />
            <input type="text" name='dateTo' placeholder="Date End" />
            <input type="text" name='status' placeholder="Status" />
        </div>
        <div className='flex w-full justify-end items-center gap-x-5'>
            <BtnSubmit title={"search"}/>
            <BtnLink title={"Create"} link={"/dashboard/create/customer"}/>
        </div>
    </form>
    <Suspense fallback={<DataLoading/>}><OrdersList data={data}/></Suspense>
</div>
  )
}
