import { CreateTerms } from '@/src/actions/termAction'
import BtnSubmit from '../buttons/BtnSubmit';
import BtnLink from '../buttons/BtnLink';
import { GetTerms } from '@/src/actions/termAction';
import { redirect } from 'next/navigation';

export default async function () {
    const terms = await GetTerms();
    const handleSubmit = async (formData) => {
        'use server'
        try {
            await CreateTerms(formData);
        } catch (err) {
            console.error(err)
        }
        redirect("/dashboard/home")
    };
    return (
        <div className='w-full'>
            <div className='rounded-t-md p-2 bg-secondary text-center capitalize'>
                <h2>Sales terms & condidtions</h2>
            </div>
            <div className='text-black'>
                <div className='shadow-xl shadow-secondary/20 border-[1px]'>
                    <form className='p-3 flex flex-col gap-2' action={handleSubmit}>
                        <textarea name='description' placeholder="Description" rows={10} defaultValue={terms?.description} ></textarea>
                        <div className='flex gap-2'>
                            <BtnSubmit title={"Save"} />
                            <BtnLink title={"Cancel"} link={"/dashboard/"} /></div>
                    </form>
                </div>
            </div>
        </div>
    )
}
