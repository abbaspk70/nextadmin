import { connectMongoDb } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Courses from "@/model/courses";

export async function POST(req) {
    try {
        const { user } = await req.json();
        if (!user)
            return NextResponse.json({ message: "Error getting data" }, { status: 405 });
        connectMongoDb().catch(err => req.json(err));
        const coursesList = await Courses.find({ user: user });
        return NextResponse.json({ coursesList });
    } catch (error) {
        console.log("error:", error)
    }
}