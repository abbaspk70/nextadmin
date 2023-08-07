import RegisterForm from '@/components/RegisterForm';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';


export default async function page() {
        const session = await getServerSession(authOptions);
       
        if(session) redirect("/dashboard")

    return (<div className='flex h-screen justify-center items-center mx-auto w-full'><RegisterForm /></div>
    )
}
