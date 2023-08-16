import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserExists } from '@/src/actions/userAction';
import { getCustomers } from '@/src/actions/customerAction';
import { redirect } from 'next/navigation';
import CustomerInfo from '@/components/order/orderFormComp/CustomerInfo';
import TermsInfo from '@/components/order/orderFormComp/TermsInfo';
import OrderSummary from '@/components/order/orderFormComp/OrderSummary';
import BtnSubmit from '@/components/buttons/BtnSubmit';
import BtnLink from '@/components/buttons/BtnLink';
import { getOrder } from '@/src/actions/orderAction';
import { findOrderandUpdate } from '@/src/actions/orderAction';

export default async function page({ params }) {
    const { id } = params;
    const session = await getServerSession(authOptions);
    //get user
    const email = session.user.email;
    const user = await UserExists(email)
    //get order
    const order = await getOrder({_id: id, user: user});
    console.log("from order",order);
    if(!order) {
        redirect("/dashboard/orders");
    }
    //get terms
    const {terms} = order;
    const data = JSON.stringify(order.items);
    console.log("from data",data);
    //get customer
    const customerObjId = order.customerObjId
    const customers = await getCustomers({ _id: customerObjId, user: user })
    const customer = customers.customers[0];
    //handle submit
    const handleSubmit = async (formData) => {
        'use server'
        if (user) {
            try {
              const updatedOrder = await findOrderandUpdate({_id: id}, formData);
              var orderId = updatedOrder._id;
            } catch (err) {
                 console.log(err); 
                 return
                }
                 
            // const res = await CreateOrder(formData);
            // const { order } = res;
            // var { status } = res;
            // var orderId = order._id;
            // console.log("from try", order._id)
            // redirect(`/dashboard/orders/${orderId}`);
            redirect (`/dashboard/orders/${orderId}`)

        }
    }
    return (
        <div className='my-20 px-5 md:ml-[300px]'>
            <div className='border-[0.5px] pb-5'>
                <div className='bg-secondary mb-5 text-2xl p-2 text-center rounded-t-md'>
                    Update Order
                </div>
                <form action={handleSubmit} className='text-black px-5 capitalize'>
                    <div className='flex flex-col gap-3'>
                        <CustomerInfo customer={customer} />
                        <hr />
                        <TermsInfo terms={terms} />
                        <OrderSummary data={data}/>
                        <div className='flex gap-5 w-full justify-end'>
                            <BtnSubmit title={"Save"} />
                            <BtnLink title={"Cancel"} link={"/dashboard/customers"} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
