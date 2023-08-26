'use client'
import Link from 'next/link'
import { AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'
import { useState, useEffect } from 'react';
import { useTransition } from 'react'
import DataLoading from '../loaders/DataLoading';
import { GetProducts } from '@/src/actions/productAction';
import DeleteModal from '../modals/DeleteModal';

export default function ProductsList({ data }) {
    const [id, setId] = useState("");
    const [showModal,setShowModal] = useState(false)
    let [isPending, startTransition] = useTransition()
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const handleData = async () => {
            const products = await GetProducts(data)
            setProducts(JSON.parse(products));
        };
        startTransition(() => handleData())
    }, [data, products.length]);
    //delete product
    const handleDelete = (id) => {
        setShowModal(true);
        setId(id);
        console.log(id)
    }
    if (products.length > 0)
        return (
            <div className='relative'>
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
                                        <Link className='action has-tooltip p-2 flex-grow-0 w-[5%]' href={`/dashboard/create/product?id=${product._id}`}><Tooltip data={"Edit"}/><AiOutlineEdit /></Link>
                                        <div onClick={()=>{handleDelete(product._id)}} className='action has-tooltip p-2 flex-grow-0 w-[5%] text-red-600 cursor-pointer'><Tooltip data={"Delete"}/><AiOutlineDelete/></div>
                                    </div>
                                )
                            })}
                           
                        </div>
                    </div>}
                <DeleteModal isVisibile={showModal} setShowModal={setShowModal} id={id} setProducts={setProducts}/>
            </div>
        )
}
const Tooltip = ({data}) => {
    return (
        <span className='tooltip'>{data}</span>
    )
}