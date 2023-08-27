'use client'
import { useSession } from "next-auth/react"
import Logout from "./Logout";

export default function UserInfo() {
  const {data: session} = useSession();
  return (
    <div className="">
      <div className='bg-secondary mb-5 text-2xl p-2 text-center rounded-t-md'>
          User Info
        </div>
        <div className="shadow-xl shadow-secondary/20 flex flex-col text-black gap-3 p-10">
            <h3>
                Name: <span className="font-bold">{session?.user?.name}</span>
            </h3>
            <div>
                Email: <span>{session?.user?.email}</span>
            </div>
            <Logout/>
        </div>
    </div>
  )
}
