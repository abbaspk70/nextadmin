import Nav from '@/components/Nav'

export default function DashboardLayout({children}) {
  return (
    <div className='relative w-screen h-screen overflow-auto'>
        <Nav/>
        {children}
    </div>
  )
}
