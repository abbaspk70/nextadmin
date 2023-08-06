import RegisterForm from '@/components/RegisterForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';


export default async function page() {
        const session = await getServerSession(authOptions);

        if(session) redirect("/dashboard")

    return (<div className='flex h-screen justify-center items-center mx-auto w-full'><RegisterForm /></div>
    )
}
