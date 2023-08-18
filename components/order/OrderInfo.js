
import { getCustomers } from '@/src/actions/customerAction';
import { getOrder } from '@/src/actions/orderAction';

export default async function OrderInfo({ id, user }) {
    let subTotal = 0;
    const order = await getOrder({ _id: id, user: user });
    const { street, city, state, zip, country } = order.shipping;
    //get date from order
    const year = order.createdAt.getFullYear();
    const month = order.createdAt.getMonth() + 1;
    const day = order.createdAt.getDate();

    const res = await getCustomers({ _id: order.customerObjId });
    const customer = res.customers[0];


    // calculate sub total
    order.items.forEach(item => subTotal += item.quantity * item.price)

    return (
        <div className='w-[872px] min-h-[1220px] border-2 flex flex-col gap-5 px-10 py-5 actual-receipt text-black'>
            <div className='flex'>
                <div><h1>Company Logo/Name</h1></div>
            </div>
            <div className=''>
                <div>Order Date: {year}-{month}-{day}</div>
                <div>Customer# {customer.customerId}</div>
                <div>Order# {order.orderId}</div>
            </div>
            <div className='capitalize flex w-full justify-between'>
                <div className='OrderInfo border-[1px] w-[33%] p-3 rounded-md border-black/50'>
                    <h3>Billing Address</h3>
                    <div><h4>{customer.firstName} {customer.lastName}</h4>
                    </div>
                    <div className='Billingaddress font-light'>
                        <h5>{order.billing.street}</h5>
                        <h5>{order.billing.city}</h5>
                        <h5>{order.billing.state}</h5>
                        <h5>{order.billing.zip}</h5>
                        <h5>{order.billing.country}</h5>
                    </div>
                </div>
                <div className='OrderInfo border-[1px] w-[33%] p-3 rounded-md border-black/50'>
                    <h3>Shipping Address</h3>

                    <div><h4>{customer.firstName} {customer.lastName}</h4></div>
                    <div className='Shippingaddress font-light'>
                        <h5>{street}</h5>
                        <h5>{city}</h5>
                        <h5>{state}</h5>
                        <h5>{zip}</h5>
                        <h5>{country}</h5>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <h2 className='text-center mx-auto'>Order Details</h2>
                <div>
                    <div className='grid grid-cols-12 w-full font-semibold justify-between bg-slate-950 text-primary py-2 px-5 rounded-t-md gap-x-5' >
                        <div className='col-span-2'>itemId</div>
                        <div className='col-span-5'>Name</div>
                        <div className='col-span-2 text-center'>price</div>
                        <div className='col-span-2 text-center'>quantity</div>
                        <div className='col-span-1 text-center'>amount</div>
                    </div>
                    <div className='border-2 flex flex-col gap-2'>
                        {order.items.map((item, index) => {
                            return (
                                <div key={index} className='grid grid-cols-12 w-full justify-between bg-slate-950/5 py-1 px-5 gap-x-5' >
                                    <div className='col-span-2'>{item.itemId}</div>
                                    <div className='col-span-5'>{item.itemName}</div>
                                    <div className='col-span-2 text-center'>{item.price}</div>
                                    <div className='col-span-2 text-center'>{item.quantity}</div>
                                    <div className='text-center'>{item.price * item.quantity}</div>
                                </div>
                            )
                        })}

                        <div className='p-5'>{order.terms}</div>
                    </div>
                </div>
            </div>
            <div>
                Sub Total = {subTotal}
            </div>
        </div>
    )
}
