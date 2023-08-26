'use client'
import React from 'react'
import { useState } from 'react'
import BtnSubmit from '../buttons/BtnSubmit'
import BtnLink from '../buttons/BtnLink'

export default function FormCustomer({customerData,onSubmit}) {
    if(customerData) {
        var customer = JSON.parse(customerData);
    }
    const [error, setError] = useState("");
  
    const handleSubmit = async(formData) => {
        const firstName = formData.get('firstName')
        if (!firstName) {
            setError("First name is required")
            return;
        }
        await onSubmit(formData);
    }
    return (

        <form action={handleSubmit} className='text-black flex flex-col  gap-5 px-5'>
            {error && (
                <div className='bg-red-500 px-5 py-3 w-fit rounded-md text-primary' >{error}</div>
            )}

            <div className='w-full'> Full Name (required)
                <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                    <input type="text" placeholder='First Name' name='firstName' defaultValue={customer?.firstName} />
                    <input type="text" placeholder='Last Name' name='lastName' defaultValue={customer?.lastName} />
                </div >
            </div>
            <div className="w-full flex flex-col gap-2">Contact
                <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                    <input type="text" placeholder='Phone' name='phone' defaultValue={customer?.contact?.phone} />
                    <input type="text" placeholder='Mobile' name='mobile' defaultValue={customer?.contact?.mobile} /></div>
                <input type="text" placeholder='Email' name='email' defaultValue={customer?.contact?.email}/>

            </div>
            <div className='w-full flex flex-col gap-y-2'>Address
                <div>
                    <input className="" type="text" placeholder='Address' name='street' defaultValue={customer?.address?.street} />
                </div>
                <div className='flex flex-col md:flex-row justify-center items-center gap-2'>
                    <input type="text" placeholder='City' name='city' defaultValue={customer?.address?.city}/>
                    <input type="text" placeholder='State' name='state' defaultValue={customer?.address?.state} />
                    <input type="text" placeholder='Zip Code' name='zip' defaultValue={customer?.address?.zip}/>
                    <input type="text" placeholder='Country' name='country' defaultValue={customer?.address?.country} />
                </div>
            </div>
            <div className='flex gap-x-5'>
                <BtnSubmit title={"Save"} />
                <BtnLink title={"cancel"} link={"/dashboard/customers"} />
            </div>

        </form>
    )
}
