'use client'

import { useState, useEffect } from 'react';
import { useTransition } from 'react'
import { getProducts } from '@/src/actions/productAction';
import DataLoading from '@/components/loaders/DataLoading';

export default function ProductSearchList({ data, onSubmit }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const pData = {currentPage, itemsPerPage};


    let [isPending, startTransition] = useTransition()
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const handleData = async () => {
            const res = await getProducts(data, pData);
            const result = JSON.parse(res);
            const {products} = result.data;
            setProducts(products);
            const {totalPages} = result.data;
            setTotalPages(totalPages);
           
        };
        startTransition(() => handleData())
    }, [data, currentPage]);
    if (products.length > 0)
        return (
            <div className='overflow-auto'>
                {isPending ? <DataLoading /> :
                    <div className='tablecontainer min-w-[600px] w-full flex flex-col justify-between'>
                        <div className='tablehead text-primary'>
                            <div className='tablerow flex items-center bg-accent gap-2 rounded-t-md'>
                                <div className='p-2 flex-grow-0 w-[25%]'>Id</div>
                                <div className='p-2 flex-grow-0 w-[60%]'>Title</div>
                                <div className='p-2 flex-grow-0 w-[15%]'>Price</div>
                            </div>
                        </div>
                        <div className='rowhead text-black'>
                            {products.map((product, index) => {
                                return (
                                    <div onClick={async()=>await onSubmit(product._id)} key={index} className='tablerow cursor-pointer flex items-center gap-2 border-b-[1px] bg-slate-100'>
                                        <div className='p-2 flex-grow-0 w-[25%]'>{product.productId}</div>
                                        <div className='p-2 flex-grow-0 w-[60%]'>{product.title}</div>
                                        <div className='p-2 flex-grow-0 w-[15%]'>{product.price}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>}
            </div>
        )
}
