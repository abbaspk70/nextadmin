import Link from 'next/link'
import React from 'react'
import { HiPencilAlt } from 'react-icons/hi'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import BtnDelete from './BtnDelete';
import { endpoints } from '@/utilis/endpoints';

export default async function CoursesList() {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    try {
        const resUserExists = await fetch(`${endpoints}/api/auth/userExists`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const { user } = await resUserExists.json();

        const res = await fetch(`${endpoints}/api/coursesList`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ user })
        });
         var {coursesList}  = await res.json()
        if (!res.ok) {
            throw new Error("Failed to fetch Courses")
        }

    } catch (error) {
        console.log(error);
    }
    if(coursesList.length > 0) {
    return (
        <div className='border-[0.5px] border-secondary'> {coursesList.map((listItem,index)=> {
                return (
                    <div key={index} className='text-accent'>
                        <div className='flex justify-between items-center bg-primary py-2 px-5'>
                            <div className='text-accent'>                              
                                <h3 className='text-xl capitalize'>{listItem.title}</h3>
                                <div>{listItem.description}</div>
                            </div>
                            <div className='flex space-x-5'>
                                <Link href={`./edit/course/${listItem._id}`}><HiPencilAlt /></Link>
                                <BtnDelete id={listItem._id}/>
                            </div>

                        </div>
                        <hr />
                    </div>
                )
            })}
        </div>
    )} else {
        return (
            <div className='border-[0.5px] border-secondary text-center'>
                <p className='text-black'>Add some data to display</p>
            </div>
        )
    }
}
