'use client'
import React from 'react'
import Link from 'next/link'
import {HiOutlineMinusCircle} from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import { endpoints } from '@/utilis/endpoints'
import { DeletCourse } from '@/src/actions/courseAction'

export default function BtnDelete({id}) {
    const router = useRouter();
    const handleSubmit= async () => {
        console.log("submitted")
        try {
            const res = await DeletCourse(id)
         if(res.status === "success"){
            router.refresh()
            }
        } catch (error) {
            console.log(error)
            console.log(res.status)
        }
    }
  return (

    <button onClick={handleSubmit}><HiOutlineMinusCircle/></button>
  )
}
