'use client'
import Link from 'next/link'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useState, useEffect } from 'react';
import { useTransition } from 'react'
import DataLoading from '../loaders/DataLoading';
import { deleteOneProduct, getProducts } from '@/src/actions/productAction';
import DeleteModal from '../modals/DeleteModal';
import Pagination from '../pagination/Pagination';

export default function ProductsList({ data }) {
    // pagination variables 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)
    const itemsPerPage = 10;
    const pData = { currentPage, itemsPerPage }

    const [id, setId] = useState("");
    const [showModal, setShowModal] = useState(false)
    let [isPending, startTransition] = useTransition()
    const [products, setProducts] = useState([]);

    // establish connection and get data
    useEffect(() => {
        const handleData = async () => {
            const res = await getProducts(data, pData)
            const result = JSON.parse(res);
            const { products } = result.data;
            setProducts(products);
            const {totalPages} = result.data;
            setTotalPages(totalPages);

        };
        startTransition(() => handleData())
    }, [data, products.length, currentPage]);
    //show modal and set id to delete
    const handleClick = (i) => {
        setShowModal(true);
        setId(products[i]._id);
    }
    // handle modal
    const handleDelete = async () => {
        try {
            await deleteOneProduct(id);
            setShowModal(false)
            setProducts([]);
        } catch (err) {
            console.error(err)
        }
    }
    if (products.length > 0)
        return (
            <div className='flex flex-col gap-5 items-center justify-between min-h-[490px] relative overflow-x-auto'>
                {isPending ? <DataLoading /> :
                    <div className='tablecontainer min-w-[709px] flex flex-col justify-between mx-auto py-5'>
                        <div className='tablehead text-primary'>
                            <div className='tablerow flex items-center bg-accent gap-2 px-2 rounded-t-md'>
                                <div className='p-2 flex-grow-0 w-[25%]'>Id</div>
                                <div className='p-2 flex-grow-0 w-[55%]'>Title</div>
                                <div className='p-2 flex-grow-0 w-[10%]'>Price</div>
                                <div className='p-2 flex-grow-0 w-[5%] bg-amber-60'></div>
                                <div className='p-2 flex-grow-0 w-[5%] bg-amber-60'></div>
                            </div>
                        </div>
                        <div className='rowhead text-black [&>*:nth-child(even)]:bg-slate-200'>
                            {products.map((product, index) => {
                                return (
                                    <div key={index} className='tablerow flex items-center gap-2 border-b-[1px] px-2 bg-slate-100'>
                                        <div className='p-2 flex-grow-0 w-[25%]'>{product.productId}</div>
                                        <div className='p-2 flex-grow-0 w-[55%]'>{product.title}</div>
                                        <div className='p-2 flex-grow-0 w-[10%]'>{product.price}</div>
                                        <Link className='action has-tooltip p-2 flex-grow-0 w-[5%]' href={`/dashboard/create/product?id=${product._id}`}><Tooltip data={"Edit"} /><AiOutlineEdit /></Link>
                                        <div onClick={() => handleClick(index)} className='action has-tooltip p-2 flex-grow-0 w-[5%] text-red-600 cursor-pointer'><Tooltip data={"Delete"} /><AiOutlineDelete /></div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>}
                <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                />
                <DeleteModal isVisibile={showModal} setShowModal={setShowModal} handleDelete={handleDelete} />
            </div>
        )
}
const Tooltip = ({ data }) => {
    return (
        <span className='tooltip'>{data}</span>
    )
}