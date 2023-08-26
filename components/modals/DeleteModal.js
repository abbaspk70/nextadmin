'use client'
import React from 'react'
import BtnSubmit from '../buttons/BtnSubmit'
import { deleteOneProduct } from '@/src/actions/productAction'
import { useRouter } from 'next/navigation'


export default function DeleteModal({ isVisibile, setShowModal, id, setProducts }) {
    const handleDelete = async () => {
        try {
            await deleteOneProduct(id)
            setShowModal(false)
            setProducts([]);
        } catch (err) {
            console.error(err)
        }
    }
    if (isVisibile)
        return (
            <div className='xl:ml-[300px] fixed inset-0 flex justify-center items-center z-50'>
                <div className='w-[500px]'>
                    <div className='bg-red-500 rounded-t-md p-2 text-primary'><h4>Delete?</h4></div>
                    <div className='flex flex-col gap-3 p-3 bg-primary'>
                        <p>Are you sure you want to delete?</p>
                        <div className='flex gap-2'>
                            <div onClick={() => handleDelete()}><BtnSubmit title={"Confirm"} /></div>
                            <div onClick={() => setShowModal(false)}><BtnSubmit title={"Cancel"} /></div>
                        </div>
                    </div>
                </div>
            </div>
        )
}
