'use server'

import { connectMongoDb } from "@/lib/mongodb";
import { CreateCounter } from "./counterAction";
import Customers from '@/model/customer';


export async function CreateCustomer(data) {

    const firstName = await data?.get('firstName').toString();
    const lastName = await data.get("lastName").toString();
    const phone = await data?.get('phone').toString();
    const mobile = await data?.get('mobile').toString();
    const email = await data?.get('email').toString();
    const street = await data?.get('street').toString();
    const city = await data?.get('city').toString();
    const state = await data?.get('state').toString();
    const country = await data?.get('country').toString();
    const user = await data?.get('user');

    //create objects
    const contact = { email, phone, mobile };
    const address = { street, city, state, country };

    //check if first name is empty
    if (!firstName) {
        console.log('First name is missing');
        return { status: 'error', message: 'First name is missing' };
    }

    //get Counter
    const customerId = await CreateCounter()
    await connectMongoDb();
    const customer = await new Customers({
        customerId,
        firstName,
        lastName,
        contact,
        address,
        user
    })
    await customer.save();
    return { status: 'success', message: 'Customer created' };
}


//get Customers 

export async function getCustomers(data) {
    await connectMongoDb();
    const customers = await Customers.find(data);
    return { status: 'success', customers };
}

//get Customer and update it

export async function getCustomerAndUpdate(id, orderId) {
    const filter = {_id: id };
    try {
        await connectMongoDb();
        const order = await Customers.findOneAndUpdate(filter, {$push:{orders: orderId}}, { new: true });
        return { status: 'success', order };

    } catch (err) {
        console.log(err);
    }

}