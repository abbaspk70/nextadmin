'use client'
import BtnLink from "@/components/buttons/BtnLink";
import BtnSubmit from "@/components/buttons/BtnSubmit";
import { useState } from "react";
import React, { Suspense } from 'react';
import DataLoading from "@/components/loaders/DataLoading";
import ProductsList from "./ProductsList";

export default function SearchProduct() {
    const [data, setData] = useState({});
    const handleSubmit= async(formData)=> { 
        const productId = formData.get('productId')?.toString();
        const title = formData.get('title').toString();
        setData({productId: { "$regex": `(?i)${productId}` },title: { "$regex": `(?i)${title}` }});
    };
  return (
    <div>
    <form action={handleSubmit} className='flex flex-col gap-5 py-3 px-5 items-end'>
        <div className='w-full flex flex-col md:flex-row gap-5 '>
            <input type="text" name='productId' placeholder="Search Product id" />
            <input type="text" name='title' placeholder="Product title" />
        </div>
        <div className='flex w-full justify-end items-center gap-x-5'>
            <BtnSubmit title={"search"}/>
            <BtnLink title={"Create"} link={"/dashboard/create/product"}/>
        </div>
    </form>
    {/* <ProductsList data={data}/> */}
    <Suspense fallback={<DataLoading/>}><ProductsList data={data}/></Suspense>
</div>
  )
}
