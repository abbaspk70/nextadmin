'use client'
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { endpoints } from '@/utilis/endpoints';

export default function RegisterForm() {
    const router = useRouter();
    const [name,setName] = useState("");
    const [err, setErr] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!name || !email || !password) {
            setErr("All fields are required");
            return;
        }
        if(password.length < 6){
            setErr("Password must be at least 6 characters")
            return;
        }
        try {
            const resUserExists = await fetch(`https://nextadmin-six.vercel.app/api/auth/userExists`, {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({email}),
            });

            const { user } = await resUserExists.json();

            if(user) {
                setErr("User Already Exists");
                return;
            }
            const res = await fetch(`${endpoints}/api/auth/signup`, {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({name,email,password})
            })
            if(res.ok){
                setName("");
                setEmail("");
                setPassword("");
                router.push('/');
            }
            else {
                throw new Error("Failed to Signup") 
            }

        }
        catch (error) {
            console.log("Error", error)
        }
        
    }
  return (
    <div className='rounded-md overflow-hidden border-[0.5px] border-secondary w-[50%] shadow-xl shadow-accent/20'>
        <div className='flex flex-col'>
            <div className='bg-secondary text-center'><h1 className='p-3 text-xl'>Register</h1></div>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-y-5 py-3 mt-5'>
            <input onChange={(e)=>{setName(e.target.value)}} type='text' placeholder='Full Name' value={name}/>
                <input onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='Email' value={email}/>
                <input onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='Password' value={password}/>
                <button className='bg-secondary rounded-sm w-[100px] px-5 py-2'>Signup</button>
            </form>
            { err && (
                <div className="bg-red-600 w-fit rounded-sm ml-8 px-3 py-1">{err}</div>            )}
            <div><h3 className='text-black float-right mb-3 mr-5'>Already registered? <span className='underline text-accent'><Link href={'/'}>Login</Link></span></h3></div>
        </div>
    </div>
  )
}
