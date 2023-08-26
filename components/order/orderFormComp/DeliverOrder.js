import React from 'react'

export default function DeliverOrder() {
    return (
        <div className='flex justify-end'>
            <div className='flex justify-end items-center w-fit p-2 gap-2'>
            <input className='bg-red-500 w-[10%]' id="deliver" type="checkbox" name="status" defaultValue="delivered" defaultChecked/>
            <label htmlFor="deliver" className='w-full'>Order Delivered</label>
            </div>
        </div>
    )
}
