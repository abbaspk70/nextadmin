'use client'

import {AiOutlineLogout} from 'react-icons/ai'
import { signOut } from 'next-auth/react'


export default function Logout() {
  return (
        <button className='flex items-center gap-2 py-2 hover:underline px-5' onClick={()=>signOut()}><h3>Logout</h3> <AiOutlineLogout/></button>
  )
}
