import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserExists } from '@/src/actions/userAction';
import CreateOrderForm from '@/components/order/CreateOrderForm';
import { CreateOrder } from '@/src/actions/orderAction';
import { getCustomers } from '@/src/actions/customerAction';

export default async function page({searchParams}) {
    const {id} = searchParams;
    const session = await getServerSession(authOptions);
    //get user
    const email = session.user.email;
    const user = await UserExists(email)
    //get customer
    const res = await getCustomers({_id: id, user: user})
    const customer = res.customers[0];
    const handleSubmit = async (formData) => {
        'use server'
        if (user) {
            formData.append("user", user._id)
            const res = await CreateOrder(formData);
            if (res.status == 'success') {
                console.log(res.status);
            }
        }
    }


    return (
        <div className='my-20 px-5 md:ml-[300px]'>
            <div className='border-[0.5px] pb-5'>
                <div className='bg-secondary mb-5 text-2xl p-2 text-center rounded-t-md'>
                    Create or update Order
                </div>
                <CreateOrderForm customer={customer} onSubmit={handleSubmit} user={user} />
            </div>
        </div>
    )
}
