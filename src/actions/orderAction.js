'use server'
import Orders from "@/model/orders";
import { connectMongoDb } from "@/lib/mongodb";
import { CreateCounter } from "./counterAction";

// create new order
export async function CreateOrder(data) {
    const customerObjId = await data?.get("customerObjId");
    const street = await data?.get("street").toString();
    const city = await data?.get("city").toString();
    const state = await data?.get("state").toString();
    const zip = await data?.get("zip").toString();
    const country = await data?.get("country").toString();
    const b_street = await data?.get("b_street").toString();
    const b_city = await data?.get("b_city").toString();
    const b_state = await data?.get("b_state").toString();
    const b_zip = await data?.get("b_zip").toString();
    const b_country = await data?.get("b_country").toString();
    const terms = await data?.get("terms").toString();
    const itemId = await data?.get("itemId").toString();
    const itemName = await data?.get("itemName").toString();
    const description = await data?.get("description").toString();
    const quantity = await data?.get("quantity");
    const price = await data?.get("price");
    const user = await data?.get("user");


    // Create shipping object
    const shipping = {
        street,
        city,
        state,
        zip,
        country,
    }


    // Create billing object
    const billing = {
        street: b_street,
        city: b_city,
        state: b_state,
        zip: b_zip,
        country: b_country,
    }

    // Create items array
    const items = [{itemId, itemName,description, quantity, price}];


    // Create order
    try {
        const orderId = await CreateCounter();
        await connectMongoDb().catch(error=>console.log(error));
        const order =  new Orders({
            orderId,
            customerObjId,
            shipping,
            billing,
            terms,
            items,
            user,
        })
        await order.save();
        return ({status: "success", order: order })
    } catch (e)  {
        console.log(e);
        return ({status: "error", message: e })
    }
}

// get orders list

export async function getOrders(data){
    try {
        await connectMongoDb().catch(error=>console.log(error));
        return await Orders.find(data);
    }catch (e) {
        console.log(e);
    }
}