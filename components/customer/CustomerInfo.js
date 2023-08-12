import React, { Suspense } from 'react'
import BtnLoader from '../loaders/BtnLoader'

export default function CustomerInfo({ customer }) {
    const { customerId, firstName, lastName, contact, address } = customer
    return (
        <Suspense fallback={<BtnLoader/>}>
        <div className='w-full flex flex-col md:flex-row gap-y-5 justify-evenly items-start font-light'>
            <div className='text-xl'>
                <h3 className='font-normal'>Contact</h3>
                <h4>Phone: {contact.phone}</h4>
                <h4>Mobile: {contact.mobile}</h4>
                <h4>Email: {contact.email}</h4>

            </div>
            <div className='text-xl capitalize'>
                <h3 className='font-normal'>Address</h3>
                <h4>Street: {address.street}</h4>
                <h4>City: {address.city}</h4>
                <h4>State: {address.state}</h4>
                <h4>Country: {address.country}</h4>
            </div>
        </div>
        </Suspense>
    )
}
