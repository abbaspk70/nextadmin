
import { getCustomer } from '@/src/actions/customerAction';
import { redirect } from 'next/navigation';
import CustomerInfo from '@/components/order/orderFormComp/CustomerInfo';
import TermsInfo from '@/components/order/orderFormComp/TermsInfo';
import OrderSummary from '@/components/order/orderFormComp/OrderSummary';
import BtnSubmit from '@/components/buttons/BtnSubmit';
import BtnLink from '@/components/buttons/BtnLink';
import { getOrder } from '@/src/actions/orderAction';
import { findOrderandUpdate } from '@/src/actions/orderAction';
import DeliverOrder from '@/components/order/orderFormComp/DeliverOrder';

export default async function page({ params }) {
    const { id } = params;
    //get order
    const res = await getOrder({ _id: id });
    const order = JSON.parse(res);
    if (!order) {
        redirect("/dashboard/orders");
    }
    //get terms
    const { terms } = order;
    const data = JSON.stringify(order.items);
    //get customer
    const customerObjId = order.customerObjId
    const customerRes = await getCustomer({ _id: customerObjId })
    const customer = JSON.parse(customerRes);
    //handle submit
    const handleSubmit = async (formData) => {
        'use server'
        try {
            await findOrderandUpdate({ _id: id }, formData);
        } catch (err) {
            console.log(err);
            return
        }
        redirect(`/dashboard/orders/${order._id}`)
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
                        <OrderSummary data={data} />
                        <DeliverOrder/>
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
