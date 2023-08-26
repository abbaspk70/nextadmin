import React from 'react'
import FormCustomer from '@/components/customer/FormCustomer'
import { CreateCustomer, getCustomer, updateCustomer } from '@/src/actions/customerAction';

export default async function page({searchParams}) {
        const {id} = searchParams;
        if (id) {
            var customerData = await getCustomer({_id: id});
        }
        const handleSubmit = async(formData)=> {
            'use server';
            if(id){
                formData.append('id', id);
                await updateCustomer(formData);
                return
            }
            await CreateCustomer(formData);
        };
 
    return (
        <div className='my-20 xl:px-64 px-5 md:ml-[300px]'>
            <div className='border-[0.5px] pb-5'>
                <div className='bg-secondary mb-5 text-2xl p-2 text-center rounded-t-md'>
                    Create or update customer
                </div>
                <FormCustomer customerData={customerData} onSubmit={handleSubmit}/>
            </div>
        </div>
    )
}
