import { connectMongoDb } from "@/lib/mongodb"
import { NextResponse } from "next/server"
import Users from "@/model/users";

export async function POST(req){
    try {
        await connectMongoDb().catch(err=>req.json(err))
        const {email} = await req.json();
        const user = await Users.findOne({email}).select("_id");
        console.log("user: ", user);
        return NextResponse.json({user});
    }
    catch (error) {
        console.log("error", error)
    }
}