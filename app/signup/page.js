'use client'
import RegisterForm from '@/components/RegisterForm';
import { redirect } from 'next/navigation';
// import { authOptions } from '../api/auth/[...nextauth]/route';
// import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';


export default function page() {
        // const session = await getServerSession(authOptions);
        const {data: session} =  useSession();
        if(session) redirect("/dashboard")

    return (<div className='flex h-screen justify-center items-center mx-auto w-full'><RegisterForm /></div>
    )
}
