import React from 'react'
import { getOrders } from '@/src/actions/orderAction'
import { getCustomers } from '@/src/actions/customerAction';

export default async function OrderInfo({ id, user }) {
    
        const orders = await getOrders({ _id: id, user: user });
        const order = orders[0];
        const res = await getCustomers({ _id: order.customerObjId });
        const customer = res.customers[0];
        const { street, city, state, zip, country } = order.shipping;
    
        //get date from order
        const year = order.createdAt.getFullYear();
        const month = order.createdAt.getMonth() + 1;
        const day = order.createdAt.getDate();
 
 
    return (
        <div className='border-2 flex flex-col gap-5 p-5'>
            <div className='flex pl-24'>
                <div><h1>Company Logo/Name</h1></div>
            </div>
            <div className='pl-24'>
                <div>Order Date: {year}-{month}-{day}</div>
                <div>Order# {order.orderId}</div>
            </div>
            <div className='capitalize flex w-full justify-between px-24'>
                <div className='OrderInfo border-[1px] w-72 h-48 p-3 rounded-md border-black/50'>
                    <h3>Billing Address</h3>
                    <div><h4>{customer.firstName} {customer.lastName}</h4>
                    </div>
                    <div className='Billingaddress font-light'>
                        <h4>{order.billing.street}</h4>
                        <h4>{order.billing.city}</h4>
                        <h4>{order.billing.state}</h4>
                        <h4>{order.billing.zip}</h4>
                        <h4>{order.billing.country}</h4>
                    </div>
                </div>
                <div className='OrderInfo border-[1px] w-72 p-3 rounded-md border-black/50'>
                    <h3>Shipping Address</h3>

                    <div><h4>{customer.firstName} {customer.lastName}</h4></div>
                    <div className='Shippingaddress font-light'>
                        <h4>{street}</h4>
                        <h4>{city}</h4>
                        <h4>{state}</h4>
                        <h4>{zip}</h4>
                        <h4>{country}</h4>
                    </div>
                </div>
            </div>
            <div className=''>
                <h2 className='text-center mx-auto'>Order Details</h2>
                
                <div className='grid grid-cols-12 w-full font-semibold justify-between bg-slate-950 text-primary p-2 rounded-t-md gap-x-5' >
                    <div>itemId</div>
                    <div className='col-span-8'>Name</div>
                    <div className=''>price</div>
                    <div className=''>quantity</div>
                    <div className=''>amount</div>
                </div>
                <div className='border-2 flex flex-col gap-5 h-96'>
                {order.items.map((item,index) => {
                    return (
                        <div key={index} className='grid grid-cols-12 w-full justify-between bg-slate-950/5 p-2 rounded-md gap-x-5' >
                            <div>{item.itemId}</div>
                            <div className='col-span-8'>{item.itemName}</div>
                            <div className=''>{item.price}</div>
                            <div className=''>{item.quantity}</div>
                            <div className=''>{item.price * item.quantity}</div>
                        </div>
                    )
                })}
                <div className='p-5'>{order.terms}</div>
                </div>
            </div>
        </div>
    )
}
