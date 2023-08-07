'use client'
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import {signIn} from "next-auth/react"
import { useRouter } from 'next/navigation';
import BtnSignIn from './BtnSignIn';

export default function LoginForm() {
    const router = useRouter();
    const [err, setErr] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async ()=>{
    
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (res.error){
                setErr("Invalid credentials")
                return;
            }
            router.replace("/dashboard");
        } catch (error) {
            console.log("Error:", error);
        }  
    };
  return (
    <div className='rounded-md overflow-hidden border-[0.5px] border-secondary w-[50%] shadow-xl shadow-accent/20'>
        <div className='flex flex-col'>
            <div className='bg-secondary text-center'><h1 className='p-3 text-xl'>Login</h1></div>
            <form action={handleSubmit} className='flex flex-col justify-center items-center gap-y-5 py-3 mt-5'>
                <input onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='Enter email' value={email}/>
                <input onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='Enter password' value={password}/>
                <BtnSignIn/>
            </form>
            { err && (
                <div className="bg-red-600 w-fit rounded-sm ml-8 px-3 py-1">{err}</div>            )}
            <div><h3 className='text-black float-right mb-3 mr-5'>Not registered yet? <span className='underline text-accent'><Link href={'/signup'}>Register</Link></span></h3></div>
        </div>
    </div>
  )
}
