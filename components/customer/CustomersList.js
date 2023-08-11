
'use client'
import CustomerTable from './CustomerTable';
import { Suspense, useState } from'react';
import BtnSubmit from '../buttons/BtnSubmit';
import BtnLink from '../buttons/BtnLink';

export default function CustomersList({onSubmit}) {
    const [customers, setCustomers] = useState([]);
    const handleSubmit = async(formData)=> {
       const data =  await onSubmit(formData);
       setCustomers(JSON.parse(data));
    }
    return (
        <div>
            <form action={handleSubmit} className='flex flex-col gap-2 py-3 items-end'>
                <div className='w-full flex flex-col md:flex-row gap-5 '>
                    <input type="text" name='name' placeholder="Search name" />
                    <input type="text" name='email' placeholder="Search email" />
                    <input type="text" name='phone' placeholder="Search phone" />
                </div>
                <div className='flex w-full justify-end items-center gap-x-5'>
                    <BtnSubmit title={"search"}/>
                    <BtnLink title={"Create"} link={"/dashboard/create/customer"}/>
                </div>
            </form>
             <CustomerTable customers={customers}/>
        </div>
    )
}
