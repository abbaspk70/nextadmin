import React from 'react'
import FormCustomer from '@/components/customer/FormCustomer'

export default function page() {
    return (
        <div className='my-20 xl:px-64 px-5 md:ml-[300px]'>
            <div className='border-[0.5px] pb-5'>
                <div className='bg-secondary mb-5 text-2xl p-2 text-center rounded-t-md'>
                    Create or update customer
                </div>
                <FormCustomer/>
            </div>
        </div>
    )
}
