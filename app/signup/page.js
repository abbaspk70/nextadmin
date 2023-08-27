import RegisterForm from '@/components/RegisterForm';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';


export default async function page() {
        const session = await getServerSession(authOptions);
       
        if(session) redirect("/dashboard/home")

    return (<div className='h-screen mx-5 md:mx-32 xl:mx-96 flex items-center justify-center'><RegisterForm /></div>
    )
}
