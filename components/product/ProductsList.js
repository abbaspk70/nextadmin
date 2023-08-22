'use client'
import Link from 'next/link'
import { AiOutlineEdit, AiOutlinePause, AiOutlineCheck } from 'react-icons/ai'
import { useState, useEffect } from 'react';
import { useTransition } from 'react'
import DataLoading from '../loaders/DataLoading';
import { GetProducts } from '@/src/actions/productAction';

export default function ProductsList({ data }) {
    let [isPending, startTransition] = useTransition()
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const handleData = async () => {
            const products = await GetProducts(data)
            setProducts(JSON.parse(products));
        };
        startTransition(() => handleData())
    }, [data]);
    if (products.length > 0)
        return (
            <div className='overflow-auto'>
                {isPending ? <DataLoading /> :
                    <div className='tablecontainer min-w-[450px] w-full flex flex-col justify-between'>
                        <div className='tablehead text-primary'>
                            <div className='tablerow flex items-center bg-accent gap-2 rounded-t-md'>
                                <div className='p-2 flex-grow-0 w-[20%]'>Id</div>
                                <div className='p-2 flex-grow-0 w-[60%]'>Title</div>
                                <div className='p-2 flex-grow-0 w-[10%]'>Price</div>
                                <div className='p-2 flex-grow-0 w-[5%] bg-amber-60'></div>
                                <div className='p-2 flex-grow-0 w-[5%] bg-amber-60'></div>
                            </div>
                        </div>
                        <div className='rowhead text-black'>
                            {products.map((product, index) => {
                                return (
                                    <div key={index} className='tablerow flex items-center gap-2 border-b-[1px] bg-slate-100'>
                                        <div className='p-2 flex-grow-0 w-[20%]'>{product.productId}</div>
                                        <div className='p-2 flex-grow-0 w-[60%]'>{product.title}</div>
                                        <div className='p-2 flex-grow-0 w-[10%]'>{product.price}</div>
                                        <Link className='p-2 flex-grow-0 w-[5%]' href={`/dashboard/create/product?id=${product._id}`}><AiOutlineEdit /></Link>
                                        <div className='p-2 flex-grow-0 w-[5%] text-red-600 cursor-pointer'>s</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>}
            </div>
        )
}
