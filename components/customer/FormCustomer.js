'use client'
import React from 'react'
import { useState } from 'react'
import BtnSubmit from '../buttons/BtnSubmit'
import BtnLink from '../buttons/BtnLink'
import { CreateCustomer } from '@/src/actions/customerAction'

export default function FormCustomer() {
    const [error, setError] = useState("");
    const handleSubmit = async(formData) => {
        const firstName = formData.get('firstName')
        if (!firstName) {
            setError("First name is required")
            return;
        }
        await CreateCustomer(formData);
    }
    return (

        <form action={handleSubmit} className='text-black flex flex-col  gap-5 px-5'>
            {error && (
                <div className='bg-red-500 px-5 py-3 w-fit rounded-md text-primary' >{error}</div>
            )}

            <div className='w-full'> Full Name (required)
                <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                    <input type="text" placeholder='First Name' name='firstName' />
                    <input type="text" placeholder='Last Name' name='lastName' />
                </div >
            </div>
            <div className="w-full flex flex-col gap-2">Contact
                <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                    <input type="text" placeholder='Phone' name='phone' />
                    <input type="text" placeholder='Mobile' name='mobile' /></div>
                <input type="text" placeholder='Email' name='email' />

            </div>
            <div className='w-full flex flex-col gap-y-2'>Address
                <div>
                    <input className="" type="text" placeholder='Address' name='street' />
                </div>
                <div className='flex flex-col md:flex-row justify-center items-center gap-2'>
                    <input type="text" placeholder='City' name='city' />
                    <input type="text" placeholder='State' name='state' />
                    <input type="text" placeholder='Country' name='country' />
                </div>
            </div>
            <div className='flex gap-x-5'>
                <BtnSubmit title={"Create"} />
                <BtnLink title={"cancel"} link={"/dashboard/customers"} />
            </div>

        </form>
    )
}
