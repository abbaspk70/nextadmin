import React from 'react'
import BtnSubmit from '../buttons/BtnSubmit'
import BtnLink from '../buttons/BtnLink'
import { CreateOrder } from '@/src/actions/orderAction';
import { getCustomerAndUpdate } from '@/src/actions/customerAction';
import { redirect } from 'next/navigation'
import { GetTerms } from '@/src/actions/termAction';


export default async function CreateOrderForm({customer, user}) {
  const terms = await GetTerms(user)
  const handleSubmit = async(formData) => {
    'use server'
    try {
      formData.append("user", user._id);
      formData.append("customerObjId", customer._id);
      const orderRespone = await CreateOrder(formData);
      var {order} = orderRespone;
      await getCustomerAndUpdate(customer._id, order._id);        
    } catch (err) { 
      console.log(err);
    }
    redirect(`dashboard/orders/${order._id}`)        
  }
  console.log();
  return (
    <form action={handleSubmit} className='text-black px-5 capitalize'>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-3'>
          <h3>Customer Info</h3>
          <div className='flex flex-col gap-2 w-full'>
            <h4>Full Name</h4>
            <div className='flex flex-col md:flex-row gap-2'>
              <input type='text' name='firstName' placeholder='First Name' defaultValue={customer.firstName} disabled />
              <input type='text' name='lastName' placeholder='Name' defaultValue={customer.lastName} disabled />
            </div>
          </div>
          <div className='flex flex-col gap-3 lg:flex-row'>
            <div className='flex flex-col gap-2 w-full '>
              <h4>Billing Address</h4>
              <div className='flex flex-col gap-2'>
                <input className='capitalize' type='text' name='b_street' placeholder='Street Address' defaultValue={customer.address.street} />
                <div className='flex gap-2'>
                  <input className='capitalize' type='text' name='b_city' placeholder='City' defaultValue={customer.address.city}  />
                  <input className='capitalize' type='text' name='b_state' placeholder='State' defaultValue={customer.address.state} />
                </div>
                <div className='flex gap-2'>
                  <input type='text' name='b_zip' placeholder='Zip Code' defaultValue={customer.address.zip} />
                  <input className='capitalize' type='text' name='b_country' placeholder='country' defaultValue={customer.address.country} />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <h4>Shipping Address</h4>
              <div className='flex flex-col gap-2'>
                <input className='capitalize' type='text' name='street' placeholder='Street Address'defaultValue={customer.address.street} />
                <div className='flex gap-2'>
                  <input className='capitalize' type='text' name='city' placeholder='City' defaultValue={customer.address.city} />
                  <input className='capitalize' type='text' name='state' placeholder='State' defaultValue={customer.address.state}/>
                </div>
                <div className='flex gap-2'>
                  <input type='text' name='zip' placeholder='Zip Code' defaultValue={customer.address.zip} />
                  <input className='capitalize' type='text' name='country' placeholder='country' defaultValue={customer.address.country} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='flex flex-col gap-3'>
          <h4>Terms and Conditions</h4>
          <textarea rows={5} name="terms" defaultValue={terms?.description}/>
        </div>
        <div className='flex flex-col gap-3'>
          <h3>Order Info</h3>
          <div className='grid grid-cols-10 gap-x-3'>
            <input className='col-span-2' type='text' name='itemId' placeholder='Item Id' />
            <input className='col-span-6' type='text' name='itemName' placeholder='Item Name' />

            <input className='' type='text' name='quantity' placeholder='Quantity' />
            <input type='text' name='price' placeholder='Price' />
          </div>
          <input className='' type='text' name='description' placeholder='Description' />
        </div>
        <div className='flex gap-5 w-full justify-end'>
          <BtnSubmit title={"Save"} />
          <BtnLink title={"Cancel"} link={"/dashboard/customers"} />
        </div>
      </div>
    </form>
  )
}
