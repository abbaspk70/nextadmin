'use client'
import { useSession } from "next-auth/react"
import Logout from "./Logout";

export default function UserInfo() {
  const {data: session} = useSession();
  return (
    <div className="grid place-items-center w-full">
        <div className="shadow-lg p-8 bg-accent flex flex-col gap-2 my-6">
            <div>
                Name: <span className="font-bold">{session?.user?.name}</span>
            </div>
            <div>
                Email: <span>{session?.user?.email}</span>
            </div>
            <Logout/>
        </div>
    </div>
  )
}
