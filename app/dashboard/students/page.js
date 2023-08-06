import React from 'react'
import CoursesList from '../../../components/CoursesList'
import Link from 'next/link'
import {HiPlus} from 'react-icons/hi'
import StudentList from '../../../components/StudentList'

export default function page() {
  return (
    <div className='h-screen md:w-[65%] mx-auto mt-10 border-[1px] border-secondary bg-primary overflow-hidden rounded-md'>
                  <div className='text-xl bg-secondary flex justify-between items-center px-5 py-3'>
                <div className='title'>Student</div>
                <div><Link href={'/addCourse'} className='flex items-center justify-center'>
                    <HiPlus />
                    <div>
                        Add New
                    </div>
                </Link></div>
            </div>
      <StudentList/>
      <StudentList/>
      <StudentList/>
    </div>
  )
}
