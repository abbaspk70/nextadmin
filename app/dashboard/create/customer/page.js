import React from 'react'
import FormCustomer from '@/components/customer/FormCustomer'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserExists } from '@/src/actions/userAction';
import { CreateCustomer } from '@/src/actions/customerAction';
import { redirect } from 'next/navigation'



export default async function page() {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const handleSubmit = async (formData) => {
        'use server'
        const user = await UserExists(email)

        if (user) {
            formData.append("user", user._id)
            const res = await CreateCustomer(formData);
            if (res.status == 'success') {
                console.log(res.status);
            }
        }
    }


    return (
        <div className='my-20 xl:px-64 px-5 md:ml-[300px]'>
            <div className='border-[0.5px] pb-5'>
                <div className='bg-secondary mb-5 text-2xl p-2 text-center rounded-t-md'>
                    Create or update customer
                </div>
                <FormCustomer onSubmit={handleSubmit} />
            </div>
        </div>
    )
}
