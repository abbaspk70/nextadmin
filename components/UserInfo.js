'use client'
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import Logout from "./Logout";

export default function UserInfo() {
  const {data: session} = useSession();
  return (
    <div className="grid place-items-center h-screen w-full">
        <div className="shadow-lg p-8 bg-accent flex flex-col gap-2 my-6">
            <div>
                Name: <span className="font-bold">{session?.user?.name}</span>
            </div>
            <div>
                Email: <span>{session?.user?.email}</span>
            </div>
            <Logout/>
            {/* <button onClick={()=>signOut()} className="bg-red-500 px-6 py-2 mt-3">Sign Out</button> */}
        </div>
    </div>
  )
}
