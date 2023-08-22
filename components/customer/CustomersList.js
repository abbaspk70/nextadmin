
'use client'
import CustomerTable from './CustomerTable';
import { useState } from'react';
import BtnSubmit from '../buttons/BtnSubmit';
import BtnLink from '../buttons/BtnLink';
import { getCustomers } from '@/src/actions/customerAction';

export default function CustomersList() {
    const [customers, setCustomers] = useState([]);

    const handleSubmit = async(formData)=> {
        try {
            const name = await formData.get('name');
            const email = await formData.get('email');
            const phone = await formData.get('phone').toString();
            const customerId = await formData.get('customerId');
      
            const res = await getCustomers({
                $and: [
                 {"customerId" : { $regex: customerId }},
                 {"contact.email": { $regex: `(?i)${email}`}},
                 {$or:[ {"firstName": {$regex: `(?i)${name}` }},{"lastName": { $regex: `(?i)${name}` }}]},
                 {$or:[{"contact.phone": {"$regex": phone }},{"contact.mobile": { "$regex": phone }}]},
                ]
                });
            setCustomers(JSON.parse(res));
            
          } catch (error) {
            console.log(error)
          }
    }
    return (
        <div>
            <form action={handleSubmit} className='flex flex-col gap-5 py-3 px-5 items-end'>
                <div className='w-full flex flex-col md:flex-row gap-5 '>
                    <input type="text" name='customerId' placeholder="Search customer Id" />
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
