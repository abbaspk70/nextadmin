import React from 'react'
import { CreateTerms } from '@/src/actions/termAction'
import BtnSubmit from '../buttons/BtnSubmit';
import BtnLink from '../buttons/BtnLink';
import { GetTerms } from '@/src/actions/termAction';
import { redirect } from 'next/navigation';

export default async function ({ user }) {
    const terms = await GetTerms(user);
    console.log(terms);
    const handleSubmit = async (formData) => {
        'use server'
        if (user) {
            try {
                formData.append("user", user._id);
                await CreateTerms(formData);
            } catch (err) {
                console.error(err)
            }
            redirect("/dashboard",);
        }
    };
    return (
        <div className='shadow-xl shadow-secondary/20 border-[1px]'>
            <form className='p-3 flex flex-col gap-2' action={handleSubmit}>
                <textarea name='description' placeholder="Description" rows={15} defaultValue={terms?.description} ></textarea>
                <div className='flex gap-2'>
                    <BtnSubmit title={"Save"} />
                    <BtnLink title={"Cancel"} link={"/dashboard/"} /></div>
            </form>
        </div>
    )
}
