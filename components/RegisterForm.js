'use client'
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserExists} from '@/src/actions/userAction'
import { CreateUser } from '@/src/actions/userAction';
import BtnSubmit from './buttons/BtnSubmit';
export default function RegisterForm() {
    const router = useRouter();
    const [name,setName] = useState("");
    const [err, setErr] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {

        if(!name || !email || !password) {
            setErr("All fields are required");
            return;
        }
        if(password.length < 6){
            setErr("Password must be at least 6 characters")
            return;
        }
        try {
            const user = await UserExists(email);
            
            if(user) {
                setErr("User Already Exists");
                return;
            }
            const res = await CreateUser({
                name,
                email,
                password
            });
            if(res.status === "success") {
                setName("");
                setEmail("");
                setPassword("");
                router.push('/')
            }
        }
        catch (error) {
            console.log("Error", error)
            setErr(res.status);
        }
        
    }
  return (
    <div className='rounded-md overflow-hidden border-[0.5px] border-secondary w-full shadow-xl shadow-accent/20'>
        <div className='flex flex-col'>
            <div className='bg-secondary text-center'><h2 className='p-3'>Register</h2></div>
            <form action={handleSubmit} className='flex flex-col justify-center items-center gap-y-5 p-3 mt-5'>
            <input onChange={(e)=>{setName(e.target.value)}} type='text' placeholder='Full Name' value={name}/>
                <input onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='Email' value={email}/>
                <input onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='Password' value={password}/>
                <BtnSubmit title={"Sign up"}/>
            </form>
            { err && (
                <div className="bg-red-600 w-fit rounded-sm ml-8 px-3 py-1">{err}</div>            )}
            <div><p className='text-black float-right mb-3 mr-5'>Already registered? <span className='underline text-accent'><Link href={'/'}>Login</Link></span></p></div>
        </div>
    </div>
  )
}
