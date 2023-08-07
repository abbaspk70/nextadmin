'use server'

import { connectMongoDb } from '@/lib/mongodb';
import Users from '@/model/users';
import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';


// for to get user id
export async function UserExists(email) {
    try {
        await connectMongoDb();
        const user = await Users.findOne({email}).select("_id");
        console.log(user);
        return user;
    } catch (err) { 
        console.log(err);
    }
}
// for creating user
export async function CreateUser(data) {
    try { 
        // const name = await data.get('name').toString();
        // const email = await data.get('email').toString();
        // const hashPassword = await hash(data.get('password').toString(),12);
        const name = await data.name.toString();
        const email = await data.email.toString();
        const hashPassword = await hash(data.password.toString(),12);
        console.log(name, email);

        if(!name || !email) {
            console.log("all fields are required");
            return;
        }
        await connectMongoDb();
        const user = await new Users({
            name,
            email, 
            password: hashPassword,
            image: data?.image? data.image : "/default-image.jpeg"
        });
        await user.save();
        return { status: "success", message: "User created succefully" };
    } catch (err) { 
        console.log(err);
        return { status: "Error", message: "Error while careating User" };

    }
   
}

