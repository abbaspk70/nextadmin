import UserInfo from '@/components/UserInfo'
import TermsForm from '@/components/terms/TermsForm'

export default function Home() {
  return (
    <div className='my-20 px-5 md:ml-[300px] h-screen'>
      <div className='border-[0.5px]'>
                <div className='bg-secondary mb-5 text-2xl p-2 text-center rounded-t-md'>
                    Settings
                </div>
      <UserInfo/>
      <TermsForm/>
    </div>
    </div>
     )
}
