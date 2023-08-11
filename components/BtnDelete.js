'use client'
import React from 'react'
import {HiOutlineMinusCircle} from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import { DeletCourse } from '@/src/actions/courseAction'
import {experimental_useFormStatus as  useFormStatus} from 'react-dom'

export default function BtnDelete({id}) {
  const {pending} = useFormStatus();
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

    <button onClick={handleSubmit}>{pending? <CircularIndeterminate/> : <HiOutlineMinusCircle/>}</button>
  )
}
