'use client'
import React from 'react'
import {experimental_useFormStatus as  useFormStatus} from 'react-dom'

export default function BtnSignIn() {
    const {pending} = useFormStatus();
  return (
    <button type='submit' className={`${pending? "bg-black" : "bg-secondary"} className='bg-secondary rounded-sm min-w-[100px] px-5 py-2`} disabled={pending}>{pending? "Signing in...": "Sign in"}</button>

  )
}
