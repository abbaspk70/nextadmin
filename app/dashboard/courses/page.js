import Link from 'next/link'
import { HiPlus } from 'react-icons/hi'
import CoursesList from '@/components/CoursesList'
import Loading from './loading'

export default function page() {
  return (
    <div className='my-20 md:px-16 px-5 md:ml-[300px]'>
      <div className='text-xl bg-secondary flex justify-between items-center rounded-t-md px-5 py-3'>
        <div className='title'>Courses</div>
        <div><Link href={'./create/course/'} className='flex items-center justify-center'>
          <HiPlus />
          <div>
            Add New
          </div>
        </Link>
        </div>
      </div>
      <CoursesList />
    </div>
  )
}
