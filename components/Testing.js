'use client'
import { CreateUser } from '@/src/actions/userAction'
import React from 'react'
import { useState } from 'react'

export default function Testing() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        if (!name || email || password) {
          console.log('error'); 
          alert("allfields required");
         return;
        }
        const response = await CreateUser({
            name,
            email,
            password,
        });
    }

    return (
    <div> testing form
         <form action={handleSubmit}>
            <input onChange={(e)=>setName(e.target.value)} type="text" name="name"  value={name}/>
            <input onChange={(e)=>setEmail(e.target.value)} type="text" name="email" value={email} />
            <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" value={password} />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}
