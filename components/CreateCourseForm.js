'use client'
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { endpoints } from '@/utilis/endpoints';

export default function CreateCourseForm() {
    const { data: session } = useSession();
    const email = session?.user?.email
    const router = useRouter();
    const [err, setErr] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            setErr("Title is required");
            return;
        }
        if (price < 0) {
            setErr("Price cannot be less than 0")
            return;
        }
        try {
            const resUserExists = await fetch(`${endpoints}/api/auth/userExists`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const { user } = await resUserExists.json();

            const res = await fetch(`${endpoints}/api/courses`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ title, description, price, user })
            })
            if (res.ok) {
                setTitle("");
                setDescription("");
                setPrice("");
                router.push('/dashboard/courses');
                router.refresh();
            }
            else {
                throw new Error("Failed to Create Course")
            }

        }
        catch (error) {
            console.log("Error", error)
        }

    }
    return (
        <div className='rounded-md overflow-hidden border-[0.5px] border-secondary w-[80%] shadow-xl shadow-accent/20'>
            <div className='flex flex-col'>
                <div className='bg-secondary text-center'><h1 className='p-3 text-xl'>Add New Course</h1></div>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-y-5 py-3 mt-5'>
                    <input onChange={(e) => { setTitle(e.target.value) }} type='text' placeholder='Title' value={title} />
                    <textarea onChange={(e) => { setDescription(e.target.value) }} type='text' placeholder='Description' value={description} />
                    <input onChange={(e) => { setPrice(e.target.value) }} type='number' placeholder='Price' value={price} />
                    <button className='bg-secondary rounded-sm w-[100px] px-5 py-2'>Create</button>
                </form>
                {err && (
                    <div className="bg-red-600 w-fit rounded-sm ml-8 px-3 py-1">{err}</div>
                )}
            </div>
        </div>
    )
}
