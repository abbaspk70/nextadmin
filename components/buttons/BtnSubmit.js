'use client'
import {experimental_useFormStatus as  useFormStatus} from 'react-dom'
import BtnLoader from '../loaders/BtnLoader';


export default function BtnSubmit({title}) {
    const {pending} = useFormStatus();

  return (
    <button className='capitalize bg-secondary text-primary rounded-md px-5 py-2 w-28' type='submit'>{pending? <BtnLoader/> : title }</button>
  );
}