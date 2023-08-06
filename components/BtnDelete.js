'use client'
import React from 'react'
import Link from 'next/link'
import {HiOutlineMinusCircle} from 'react-icons/hi'
import { useRouter } from 'next/navigation'

export default function BtnDelete({id}) {
    const router = useRouter();
    const handleSubmit= async(e) => {
        e.preventDefault();
        console.log("submitted")
        try {
            const res = await fetch(`/api/courses?id=${id}`, {
                method:  "DELETE",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({id})
            })
            if(res.ok){
            router.refresh()
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (

    <button onClick={handleSubmit}><HiOutlineMinusCircle/></button>
  )
}
