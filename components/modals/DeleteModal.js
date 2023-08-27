'use client'
import React from 'react'
import BtnSubmit from '../buttons/BtnSubmit'


export default function DeleteModal({ isVisibile, setShowModal, handleDelete}) {
    
    if (isVisibile)
        return (
            <div className='xl:ml-[300px] fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm'>
                <div className=''>
                    <div className='bg-red-500 rounded-t-md p-2 text-primary'><h4>Delete?</h4></div>
                    <div className='flex flex-col gap-3 p-5 bg-primary border-x-2 border-b-2 shadow-xl'>
                        <p>Are you sure you want to delete?</p>
                        <div className='flex gap-2'>
                            <BtnSubmit btnAction={handleDelete} title={"Confirm"} />
                            <BtnSubmit btnAction={() => setShowModal(false)} title={"Cancel"} />
                        </div>
                    </div>
                </div>
            </div>
        )
}
