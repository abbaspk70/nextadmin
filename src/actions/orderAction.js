'use server'
import Orders from "@/model/orders";
import { connectMongoDb } from "@/lib/mongodb";
import { CreateCounter } from "./counterAction";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserExists } from "./userAction";
import { getUser } from "./productAction";
import { redirect } from "next/navigation";

// create new order
export async function CreateOrder(data) {
    const user = await getUser();
    if (user) {
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
        const itemId = await data?.getAll("itemId");
        const itemName = await data?.getAll("itemName");
        const description = await data?.getAll("description");
        const quantity = await data?.getAll("quantity");
        const price = await data?.getAll("price");


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
        const items = [];
        itemId.forEach((itemId, index) => {
            items.push({ itemId: itemId, itemName: itemName[index], quantity: quantity[index], price: price[index], description: description[index] })
        })


        // Create order
        try {
            const orderId = await CreateCounter();
            var order = new Orders({
                orderId,
                customerObjId,
                shipping,
                billing,
                terms,
                items,
                user: user._id,
            })
            await order.save();
        } catch (e) {
            console.log(e);
            return ({ status: "error", message: e })
        }
        redirect(`/dashboard/orders/${order._id}`);
    }
}

// get orders list

export async function getOrders(data) {
    try {
        await connectMongoDb().catch(error => console.log(error));
        return await Orders.find(data).sort({ createdAt: "desc" });
    } catch (e) {
        console.log(e);
    }
}

// delete order

export async function deleteOrder(id) {
    try {
        await connectMongoDb().catch(error => console.log(error));
        await Orders.findByIdAndDelete(id);
        return ({ status: "success", message: "successfully deleted order" })
    } catch (e) {
        console.log(e);
    }
}

// get one order
export async function getOrder(data) {
    const user = await getUser();
    if (user) {
        try {
            let filterData = { user: user._id }
            if (data) {
                filterData = { ...filterData, ...data }
            }
            const order = await Orders.findOne(filterData);
            return JSON.stringify(order);
        } catch (e) {
            console.log(e);
        }
    }
}
// fine order and update
export async function findOrderandUpdate(filter, data) {
    const user = await getUser();
    if (user) {
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
        const itemId = await data?.getAll("itemId");
        const itemName = await data?.getAll("itemName");
        const description = await data?.getAll("description");
        const quantity = await data?.getAll("quantity");
        const price = await data?.getAll("price");

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
        const items = [];
        itemId.forEach((itemId, index) => {
            items.push({ itemId: itemId, itemName: itemName[index], quantity: quantity[index], price: price[index], description: description[index] })
        })

        try {
            if (filter) {
                var filterData = { ...filter, user: user._id }
            }
            await connectMongoDb().catch(error => console.log(error));
            var order = await Orders.findOneAndUpdate(filterData, {
                shipping,
                billing,
                terms,
                items,
            }, { new: true });
        } catch (e) {
            console.log(e);
            return ({ status: 'error', message: e.message })
        }

    }
}

//get orders 
export async function getOrdersByUser(data) {
    let filterData = {};
    try {
        const user = await getUser();
        if (user) {
            filterData.user = user._id;
            if (data) {
                filterData = { ...filterData, ...data };
            }
        }
        const orders = await Orders.find(filterData).sort({ createdAt: "desc" });
        return JSON.stringify(orders);
    } catch (e) {
        console.log(e);
    }
}
/// export async function getOrders
export async function getDailyOrders(data) {
    const user = await getUser();
    try {

        const { startDate, endDate } = data;
        await connectMongoDb().catch(error => console.log(error));
        const orders = await Orders.aggregate([
            {
                '$match': {
                    'createdAt': {
                        '$gte': startDate,
                        '$lte': endDate
                    },
                    'user': user._id
                }
            }, {
                '$unwind': {
                    'path': '$items'
                }
            }, {
                '$group': {
                    '_id': {
                        '$dateToString': {
                            'format': '%Y-%m-%d',
                            'date': '$createdAt'
                        }
                    },
                    'Sale': {
                        '$sum': {
                            '$multiply': [
                                '$items.price', '$items.quantity'
                            ]
                        }
                    }
                }
            }, {
                '$sort': {
                    '_id': 1
                }
            }
        ])
        return JSON.stringify(orders);
    } catch (e) {
        console.log(e);
    }
}