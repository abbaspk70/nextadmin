'use client'
import BtnLink from '@/components/buttons/BtnLink'
import BtnSubmit from '@/components/buttons/BtnSubmit'
import React from 'react'
import { useState, useEffect } from 'react'

export default function ProductForm({ onSubmit, data }) {
    const product = data? JSON.parse(data): {};
    const [error, setError] = useState("");
    const [productId, setProductId] = useState(product?.productId);
    const [title, setTitle] = useState(product?.title);

    useEffect(() => {
        if (productId || title)
            setError("");
    }, [productId, title])

    const handleSubmit = async (formData) => {
        if (!productId || !title) {
            setError("Product id and title are required");
            return
        }
        const res = await onSubmit(formData)
        setError(res.message);
    }
    return (
        <form action={handleSubmit} className='text-black px-5'>
            {(error) && (<div className='bg-red-600 text-primary w-fit px-5 py-2 rounded-md my-3'>
                {error}
            </div>
            )}
            <div className='flex flex-col gap-3'>
                <input onChange={(e) => setProductId(e.target.value)} type='text' name='productId' placeholder='Product Id required' defaultValue={productId} />
                <input onChange={(e) => setTitle(e.target.value)} type='text' name='title' placeholder='Product title required' defaultValue={title} />
                <input type='text' name='description' placeholder='Product Description' defaultValue={product?.description} />
                <input type='number' name='price' placeholder='Product Price' defaultValue={product?.price} />
                <div className='flex gap-5 w-full justify-end'>
                    <BtnSubmit title={"Save"} />
                    <BtnLink title={"Cancel"} link={"/dashboard/products"} />
                </div>
            </div>
        </form>
    )
}
