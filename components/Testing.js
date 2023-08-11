'use client'
import { CreateUser } from '@/src/actions/userAction'
import React from 'react'
import { CreateCustomer } from '@/src/actions/customerAction'

export default function Testing() {
    
    const handleSubmit = async () => {
        const res = await CreateCustomer();
    }

    return (
    <div> testing form
         <form action={handleSubmit}>
            <button className='bg-accent' type='submit'>Submit</button>
        </form>
    </div>
  )
}
