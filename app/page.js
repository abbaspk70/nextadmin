import LoginForm from '@/components/LoginForm'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard/home");
  return (
    <div className='h-screen mx-5 md:mx-32 xl:mx-96 flex items-center justify-center'><LoginForm/></div>
  )
}
