'use client'
import {experimental_useFormStatus as  useFormStatus} from 'react-dom'
import BtnLoader from '../loaders/BtnLoader';


export default function BtnSubmit({title, btnAction}) {
    const {pending} = useFormStatus();
    const handleClick = ()=> {
      if(btnAction){
        btnAction();
      }
    };

  return (
    <button onClick={handleClick} className='capitalize bg-secondary text-primary rounded-md px-5 py-2 w-28' type='submit' disabled={pending}>{pending? <BtnLoader/> : title }</button>
  );
}