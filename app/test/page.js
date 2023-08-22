import { getUser } from "@/src/actions/productAction"

export default async function page() {
    await getUser()
  return (
    <div className='text-black'>
      from test
    </div> 
  )
}
