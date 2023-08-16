'use client'
import React from 'react'
import { deleteOrder } from '@/src/actions/orderAction'
import { AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import {experimental_useFormStatus as  useFormStatus} from 'react-dom'


export default function BtnDeleteOrder({id}) {
  const {pending} = useFormStatus();
  const router = useRouter();
  const handleSubmit = async () => {
    const confirmed = window.confirm('Are you sure you want to delete');
    const orderId = JSON.parse(id);
    if (confirmed) {
      try {
        const res = await deleteOrder(orderId );
        if (res.status === "success") { 
          router.refresh();
        }
      } catch (err) {
         console.log(err)
        }    
    }
  };
  return (
    <button type='submit' onClick={handleSubmit} disabled={pending}><AiOutlineDelete /></button>
  )
}
