'use server';
import Products from "@/model/product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserExists } from "./userAction";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";

// get user Id logged in 
export async function getUser() {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    const user = await UserExists(email);
    return user
}

// get Products list
export async function getProducts(data, pData) {
    const user = await getUser();
    if (user) {
        try {
            // pagination data
            const { currentPage } = await pData
            const { itemsPerPage } = await pData
            // set filter object
            let filter = { user: user._id };
            if (data) {
                filter = { ...filter, ...data }
            }
            const products = await Products.find(filter).skip((currentPage - 1) * itemsPerPage).limit(itemsPerPage);

            const totalProducts = await Products.find(filter).count();
            return (JSON.stringify({ data: { totalPages: Math.ceil(totalProducts / itemsPerPage), products: products } }))
        } catch (err) {
            console.log(err)
        }
    }
}

// create new product
export async function createProduct(data) {

    const productId = data?.get('productId').toString();
    const title = data?.get('title').toString();
    const description = data?.get('description').toString();
    const price = data?.get('price')
    const user = await getUser();
    //check if productId and title are valid
    if (!productId || !title) {
        console.log('missing fields')
        return ({ status: "error", message: "missing productId or title field" })
    }
    //if use is logged in
    if (user) {
        try {
            const isProduct = await getOneProduct({ productId: productId });
            if (isProduct) {
                const productExists = JSON.parse(isProduct);
                if (productExists) {
                    return { status: "error", message: "product id exists, choose another" }
                }
            }
            await Products.create({
                productId,
                title,
                description,
                price,
                user: user._id,
            })
        } catch (err) {
            console.log(err)
        }
        redirect('/dashboard/products')
    }
}


//find one and update product
export async function updateProduct(data) {
    const productId = data?.get('productId').toString();
    const title = data?.get('title').toString();
    const description = data?.get('description').toString();
    const price = data?.get('price')
    const _id = data?.get('_id');
    const user = await getUser();
    //set filter to find product
    const filter = { _id: _id, user: user };
    if (user) {
        try {
            const isProduct = await getOneProduct({ productId: productId });
            if (isProduct) {
                const productExists = JSON.parse(isProduct);
                if (productExists) {
                    if (productExists._id !== _id) {
                        console.log('product eixists', productExists.productId, productId);
                        return ({ status: 'error', message: 'product id exists, choose another' })
                    }
                }
            }
            await Products.findOneAndUpdate({ _id: _id }, {
                productId,
                title,
                description,
                price,
            })
        } catch (err) {
            console.log(err)
        }
        redirect('/dashboard/products')
    }
}

// get once product 
export async function getOneProduct(data) {
    let filter = {};
    const user = await getUser()
    if (user) {
        try {
            filter.user = user._id;
            if (data) {
                filter = { ...filter, ...data };
            }
            const product = await Products.findOne(filter)
            return (JSON.stringify(product))
        } catch (err) {
            console.log(err)
        }
    }
}

// delete one product
export async function deleteOneProduct(id) {
    const user = await getUser()
    if (user) {
        try {
            await Products.findOneAndDelete({ _id: id, user: user._id })
        } catch (err) {
            console.log("Error deleting Product", err)
        }
    }
}

