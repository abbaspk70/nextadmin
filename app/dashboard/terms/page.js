import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserExists } from '@/src/actions/userAction';
import { CreateTerms } from '@/src/actions/termAction';
import TermsForm from '@/components/terms/TermsForm';

export default async function page() {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    const user = await UserExists(email);
 
  
    return (
        <div className='my-20 px-5 xl:px-40 md:ml-[300px]'>
            <div className='rounded-t-md p-2 bg-secondary text-center capitalize'>
                <h2>Sales terms & condidtions</h2>
            </div>
            <div className='text-black'>
                <TermsForm user={JSON.stringify(user)}/>
            </div>
        </div>
    )
}
