'use client'
import React from 'react'
import {experimental_useFormStatus as  useFormStatus} from 'react-dom'

export default function BtnSubmit() {
    const {pending} = useFormStatus();
  return (
    <button type='submit' className={`${pending? "bg-black" : "bg-secondary"} bg-secondary rounded-sm w-[100px] px-5 py-2`} disabled={pending}>{pending? "Saving...": "Save"}</button>
  )
}
