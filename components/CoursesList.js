import Link from 'next/link'
import React from 'react'
import { HiPencilAlt } from 'react-icons/hi'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import BtnDelete from './BtnDelete';
import { GetCoures } from '@/src/actions/courseAction';
import { UserExists } from '@/src/actions/userAction';


export default async function CoursesList() {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    try {
        const user = await UserExists(email);
        if (user) {
            const data = await GetCoures(user);
             if(data.status ===  "success"){
                var {courses} = data
             }
         }
    } catch (error) {
        console.log(error);
    }
 
    if(courses.length > 0) {
    return (
        <div className='border-[0.5px] border-secondary'> {courses.map((listItem,index)=> {
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
