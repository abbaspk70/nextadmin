import { connectMongoDb } from "@/lib/mongodb";
import Courses from "@/model/courses";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const {title,description,price,user} = await req.json();
        await connectMongoDb().catch(err=>req.json(err));
        if(!title) 
        return NextResponse.json({message: "title is required"}, {status: 405});

        const res = await Courses.create({
            title,
            description,
            user,
            price
        })
         console.log(title, description, user);
    } catch (error) {
        console.log("error:", error)
    }
    return NextResponse.json({message: "from courses"})
}
export async function DELETE(req){
    try {
        const id = await req.nextUrl.searchParams.get("id");
        await connectMongoDb().catch(err=>req.json(err))
        await Courses.findByIdAndDelete(id);
        console.log({id})
        return NextResponse.json({id},{status: 202})
    } catch (error) {
        console.log(error)
    }
}


