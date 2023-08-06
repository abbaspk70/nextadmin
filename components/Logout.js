'use client'

import {HiLogout} from 'react-icons/hi'
import { signOut } from 'next-auth/react'


export default function Logout() {
  return (
        <button className='flex items-center gap-x-2 hover:underline text-lg px-5 py-2' onClick={()=>signOut()}><h3>Logout</h3> <HiLogout/></button>
  )
}
