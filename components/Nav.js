'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HiOutlineAcademicCap, HiHome, HiLogout } from 'react-icons/hi'
import { FaUserGraduate, FaChalkboardTeacher, FaBars } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import Logout from './Logout'
import { useState } from 'react'

import { useSession } from "next-auth/react"

const navData = [
  { title: 'home', path: '/dashboard', icon: <HiHome /> },
  { title: 'courses', path: '/dashboard/courses', icon: <HiOutlineAcademicCap /> },
  { title: 'staff', path: '/dashboard/staff', icon: <FaChalkboardTeacher /> },
  { title: 'students', path: '/dashboard/students', icon: <FaUserGraduate /> },
];

export default function Nav() {
  const { data: session } = useSession();
  const [menu, setMenu] = useState(false);
  const handleClick = ()=>{
    setMenu(!menu)
  }
  const pathname = usePathname()
  return (
    <nav className='fixed bg-secondary h-auto md:h-screen w-full md:w-[300px] z-50 overflow-x-hidden top-0 left-0'>
      <div className='bg-accent'>
        <div className='flex items-center justify-between md:flex-col md:items-start gap-y-4 mx-5 py-1'>
          <button onClick={handleClick}  className={`${menu? 'bg-primary/50': 'bg-primary/10'} transition-all duration-300 flex items-center justify-center md:hidden h-[40px] w-[40px] rounded-sm`}><FaBars className='text-2xl' /> </button>
          <Link className='flex items-center gap-x-5' href={'/dashboard'}><div>Logo</div><div className='text-2xl'>Win Academy</div></Link>
          <Link className='hidden md:block' href={'/dashboard'}>
            <div className='flex items-center gap-x-5'><Image className='rounded-full' src={`${session?.user?.image ? session?.user?.image : "/default-image.jpeg"}`} width={49} height={49} alt='' /><div className=' text-lg flex flex-col capitalize'><span className='text-sm'>welcome</span>{session?.user?.name}</div></div></Link>
        </div>
      </div>
      <hr className=' border-primary' />
      <ul className={`md:flex flex-col text-lg gap-y-3 mt-10 ${menu? 'flex': 'hidden'}`}>
        {navData.map((item, itemIndex) => {
          return (
            <li key={itemIndex} className='px-5'><Link onClick={handleClick} className={`${pathname === item.path && 'bg-accent'} transition-all duration-300 pl-5 py-3 w-full flex items-center gap-x-3 hover:bg-accent hover:text-primary rounded-md`} href={item.path}>{item.icon}<h4 className='capitalize'>{item.title}</h4></Link></li>
          )
        })}
        <div className='pl-5'><Logout /></div>
      </ul>
    </nav>
  )
}