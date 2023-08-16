import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserExists } from '@/src/actions/userAction';
import { CreateOrder } from '@/src/actions/orderAction';
import { getCustomers } from '@/src/actions/customerAction';
import { getCustomerAndUpdate } from '@/src/actions/customerAction';
import { redirect } from 'next/navigation';
import CustomerInfo from '@/components/order/orderFormComp/CustomerInfo';
import TermsInfo from '@/components/order/orderFormComp/TermsInfo';
import OrderSummary from '@/components/order/orderFormComp/OrderSummary';
import BtnSubmit from '@/components/buttons/BtnSubmit';
import BtnLink from '@/components/buttons/BtnLink';
import { GetTerms } from '@/src/actions/termAction';


export default async function page({ searchParams }) {
    const { id } = searchParams;
    const session = await getServerSession(authOptions);
    //get user
    const email = session.user.email;
    const user = await UserExists(email)
    //get customer
    const res = await getCustomers({ _id: id, user: user })
    const customer = res.customers[0];
    //get terms
    const terms = await GetTerms(user);
    //handle submit
    const handleSubmit = async (formData) => {
        'use server'
        if (user) {
            formData.append("user", user._id)
            formData.append("customerObjId", customer._id);
            const res = await CreateOrder(formData);
            const { order } = res;
            var { status } = res;
            var orderId = order._id;
            console.log("from try", order._id)
            await getCustomerAndUpdate(customer._id, order._id);
            redirect(`/dashboard/orders/${orderId}`);
        }
    }
    return (
        <div className='my-20 px-5 md:ml-[300px]'>
            <div className='border-[0.5px] pb-5'>
                <div className='bg-secondary mb-5 text-2xl p-2 text-center rounded-t-md'>
                    Create or update Order
                </div>
                <form action={handleSubmit} className='text-black px-5 capitalize'>
                    <div className='flex flex-col gap-3'>
                        <CustomerInfo customer={customer}/>
                        <hr />
                        <TermsInfo terms={terms}/>
                        <OrderSummary/>
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