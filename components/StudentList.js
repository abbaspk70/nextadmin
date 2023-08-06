import Link from 'next/link'
import React from 'react'
import { HiPlus, HiPencilAlt, HiOutlineMinusCircle } from 'react-icons/hi'


export default function StudentList() {
    return (
        <div className='text-accent'>
            <div className='flex justify-between items-center bg-primary py-2 px-5'>
                <div className='text-accent'>
                    <h3 className='text-xl'>Title</h3>
                    <div>Description</div>
                </div>
                <div className='flex space-x-5'>
                    <Link href={'/editCourse'}><HiPencilAlt/></Link>
                    <HiOutlineMinusCircle/>
                </div>
                
            </div>
            <hr/>
        </div>
    )
}
