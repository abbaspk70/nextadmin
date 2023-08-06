import { NextResponse } from 'next/server'
import { connectMongoDb } from '@/lib/mongodb';
import { hash } from 'bcryptjs';
import Users from '@/model/users';

export async function POST(req){
    try {
    const {name, email, password} = await req.json();
    const hashPassword = await hash(password, 12);
    await connectMongoDb().catch(err => res.json(err))
    console.log(name,email,password);
    if(name === "" || email === "" || password === "")
        return NextResponse.json({message: "All fields must be filled"}, { status: 405})
    
    else if(password.length < 6) 
        return NextResponse.json({message: "Password must be at least 6 characters"}, { status: 405})   
    else{
        await Users.create({
            name,
            email,
            password: hashPassword,
        })
        return NextResponse.json({message: "User Created"}, { status: 201})   

    }
} catch(error) {
    return NextResponse.json({message:"An error occured while registering user"}, {status: 500})
}
}

export async function GET(){
    return NextResponse.json({message: 'Method not Allowed'})
}
