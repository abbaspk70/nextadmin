'use server'

import { connectMongoDb } from "@/lib/mongodb";
import { CreateCounter } from "./counterAction";
import Customers from '@/model/customer';
import { getUser } from "./productAction";
import { redirect } from "next/navigation";


export async function CreateCustomer(data) {
    const user = await getUser();
    if(user) {
    const firstName = await data?.get('firstName').toString();
    const lastName = await data.get("lastName").toString();
    const phone = await data?.get('phone').toString();
    const mobile = await data?.get('mobile').toString();
    const email = await data?.get('email').toString();
    const street = await data?.get('street').toString();
    const city = await data?.get('city').toString();
    const state = await data?.get('state').toString();
    const country = await data?.get('country').toString();

    //create contact and address objects
    const contact = { email, phone, mobile };
    const address = { street, city, state, country };

    //check if first name is empty
    if (!firstName) {
        console.log('First name is missing');
        return { status: 'error', message: 'First name is missing' };
    }

    //get Counter
    const customerId = await CreateCounter()
    const customer = await new Customers({
        customerId,
        firstName,
        lastName,
        contact,
        address,
        user: user._id,
    })
    await customer.save();
    redirect("dashboard/customers")
}
}


//get Customers 

export async function getCustomers(data) {
    const user = await getUser();
    let filterData = {};
    if (user){
        filterData.user = user._id;
        if(data){
            filterData = {...filterData, ...data};
        }
    const customers = await Customers.find(filterData);
    return JSON.stringify(customers);
}
}
//get Customer and update it

export async function getCustomerAndUpdate(id, orderId) {
    const user = await getUser();
    if (user) {
    const filter = {_id: id, user: user._id };
    try {
        await connectMongoDb();
        const order = await Customers.findOneAndUpdate(filter, {$push:{orders: orderId}}, { new: true });
        return { status: 'success', order };

    } catch (err) {
        console.log(err);
    }

}
}


//get one Customers 

export async function getCustomer(data) {
    const user = await getUser();
    let filterData = {};
    if (user){
        filterData.user = user._id;
        if(data){
            filterData = {...filterData, ...data};
        }
    const customer = await Customers.findOne(filterData);
    return JSON.stringify(customer);
}
}