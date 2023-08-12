'use client'
import Link from 'next/link';
import {experimental_useFormStatus as  useFormStatus} from 'react-dom'

export default function BtnLink({title, link}) {
    const {pending} = useFormStatus();

  return (
    <Link href={link}>
    <button className='capitalize bg-secondary text-primary rounded-md px-5 py-2 w-28' disabled={pending} type='button'>{title}</button>
    </Link>
  );
}