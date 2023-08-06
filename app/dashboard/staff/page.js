import React from 'react'
import Link from 'next/link'
import {HiPlus} from 'react-icons/hi'
import StaffList from '../../../components/StaffList'

export default function page() {
  return (
    <div className='h-screen md:w-[65%] mx-auto mt-10 border-[1px] border-secondary bg-primary overflow-hidden rounded-md'>
                  <div className='text-xl bg-secondary flex justify-between items-center px-5 py-3'>
                <div className='title'>Staff</div>
                <div><Link href={'/addCourse'} className='flex items-center justify-center'>
                    <HiPlus />
                    <div>
                        Add New
                    </div>
                </Link></div>
            </div>
      <StaffList/>
      <StaffList/>
      <StaffList/>
    </div>
  )
}
