import React from 'react'

export default function CustomerInfo({customer}) {
    return (
        <div className='flex flex-col gap-3'>
            <h3>Customer Info</h3>
            <div className='flex flex-col gap-2 w-full'>
                <h4>Full Name</h4>
                <div className='flex flex-col md:flex-row gap-2'>
                    <input type='text' name='firstName' placeholder='First Name' defaultValue={customer?.firstName} disabled />
                    <input type='text' name='lastName' placeholder='Name' defaultValue={customer?.lastName} disabled />
                </div>
            </div>
            <div className='flex flex-col gap-3 lg:flex-row'>
                <div className='flex flex-col gap-2 w-full '>
                    <h4>Billing Address</h4>
                    <div className='flex flex-col gap-2'>
                        <input className='capitalize' type='text' name='b_street' placeholder='Street Address' defaultValue={customer?.address.street} />
                        <div className='flex gap-2'>
                            <input className='capitalize' type='text' name='b_city' placeholder='City' defaultValue={customer?.address.city} />
                            <input className='capitalize' type='text' name='b_state' placeholder='State' defaultValue={customer?.address.state} />
                        </div>
                        <div className='flex gap-2'>
                            <input type='text' name='b_zip' placeholder='Zip Code' defaultValue={customer?.address.zip} />
                            <input className='capitalize' type='text' name='b_country' placeholder='country' defaultValue={customer?.address.country} />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <h4>Shipping Address</h4>
                    <div className='flex flex-col gap-2'>
                        <input className='capitalize' type='text' name='street' placeholder='Street Address' defaultValue={customer?.address.street} />
                        <div className='flex gap-2'>
                            <input className='capitalize' type='text' name='city' placeholder='City' defaultValue={customer?.address.city} />
                            <input className='capitalize' type='text' name='state' placeholder='State' defaultValue={customer?.address.state} />
                        </div>
                        <div className='flex gap-2'>
                            <input type='text' name='zip' placeholder='Zip Code' defaultValue={customer?.address.zip} />
                            <input className='capitalize' type='text' name='country' placeholder='country' defaultValue={customer?.address.country} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
