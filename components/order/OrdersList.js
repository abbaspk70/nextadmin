'use client'
import Link from 'next/link'
import { AiOutlineEdit, AiOutlinePause, AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai'
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { deleteOrder, getOrdersByUser } from '@/src/actions/orderAction';
import { useTransition } from 'react'
import DataLoading from '../loaders/DataLoading';
import DeleteModal from '../modals/DeleteModal';
import Pagination from '../pagination/Pagination';

export default function OrdersList({ data }) {
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState()
    let [isPending, startTransition] = useTransition()
    const [orders, setOrders] = useState([]);

    // Pagination variables
    let [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const ordersPerPage = 10;
    const pData = { currentPage: currentPage, ordersPerPage: ordersPerPage }

    //get Order List 
    useEffect(() => {
        const handleData = async () => {
            const res = await getOrdersByUser(data, pData)
            const orderResult = JSON.parse(res)
            const { orders } = orderResult;
            setOrders(orders);
            const { totalPages } = orderResult.data;
            setTotalPages(totalPages);
        };
        startTransition(() => handleData())
    }, [data, orders.length, currentPage]);


    //handle click and set order id
    const handleClick = (i) => {
        setShowModal(true);
        setId(orders[i]._id);
    }
    //handle Delete order
    const handleDelete = async () => {
        await deleteOrder(id)
        setShowModal(false);
        setOrders([])
    };
    if (orders.length > 0)
        return (
            <div className='flex flex-col gap-5 items-center justify-between min-h-[503px]'>
                {isPending ? <DataLoading /> :
                    <div className='tablecontainer w-full flex flex-col justify-between'>
                        <div className='tablehead flex flex-col text-primary'>
                            <div className='tablerow flex items-center bg-accent rounded-t-md'>
                                <div className='p-2 flex-grow-[7]'>Order Id</div>
                                <div className='p-2 flex-grow-[7]'></div>
                                <div className='p-2'></div>
                                <div className='p-2'></div>
                                <div className='p-2'></div>
                            </div>
                        </div>
                        <div className='rowhead flex flex-col text-black [&>*:nth-child(even)]:bg-slate-200'>
                            {orders.map((order, index) => {
                                return (
                                    <div key={index} className='tablerow  flex items-center gap-2 border-b-[1px] bg-slate-100'>
                                        <Link className='p-2 flex-grow-[7]' href={`/dashboard/orders/${order._id}`} ><div className=''>{order.orderId}</div></Link>
                                        {/* <div className='p-2 flex-grow-[7]'>{order.createdAt.getFullYear()}-{order.createdAt.getMonth()+1}-{order.createdAt.getDate()}</div> */}
                                        <div className='p-2 flex-grow-[7]'>{dayjs(order.createdAt).format("YYYY-MM-DD")}</div>

                                        <div className='has-tooltip p-2'><Tooltip data={`Status: ${order.status}`} />{order.status === "Pending" ? <AiOutlinePause /> : <AiOutlineCheck className="text-green" />}
                                        </div>
                                        <Link href={`/dashboard/edit/order/${order._id}`} className='action has-tooltip p-2'><Tooltip data={"Edit"} /><AiOutlineEdit /></Link>
                                        <div onClick={() => handleClick(index)} className='action p-2 text-red-600 cursor-pointer has-tooltip'><Tooltip data={"Delet"} /><AiOutlineDelete /></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>}
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages} />
                <DeleteModal isVisibile={showModal} setShowModal={setShowModal} handleDelete={handleDelete} />
            </div>
        )
}


const Tooltip = ({ data }) => {
    return (
        <span className='tooltip'>{data}</span>
    )
}