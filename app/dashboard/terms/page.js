import { CreateTerms } from '@/src/actions/termAction';
import TermsForm from '@/components/terms/TermsForm';

export default async function page() {
    return (
        <div className='my-20 px-5 xl:px-40 md:ml-[300px]'>
            <div className='rounded-t-md p-2 bg-secondary text-center capitalize'>
                <h2>Sales terms & condidtions</h2>
            </div>
            <div className='text-black'>
                <TermsForm/>
            </div>
        </div>
    )
}
