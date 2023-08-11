'use client'
import CircularIndeterminate from '@/components/Spinner';
import React from 'react'
import {experimental_useFormStatus as  useFormStatus} from 'react-dom'

export default function BtnSignup() {
    const {pending} = useFormStatus();
  return (
    <button type='submit' className={`text-lg flex justify-center items-center bg-secondary rounded-sm min-w-[100px] h-[45px] px-5 py-2 overflow-hidden`} disabled={pending}>{pending? <CircularIndeterminate/>: "Sign up"}</button>

  )
}