import UserInfo from '@/components/UserInfo'
import TermsForm from '@/components/terms/TermsForm'

export default function Home() {
  return (
    <div className='my-20 px-5 md:ml-[300px] h-screen'>
      <div className='flex flex-col gap-5 justify-center lg:w-[60%] mx-auto'>
        <UserInfo />
        <TermsForm />
      </div>
    </div>
  )
}
