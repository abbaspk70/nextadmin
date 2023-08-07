'use server'
import { connectMongoDb } from "@/lib/mongodb";
import Courses from "@/model/courses";



//for gettting courses
export async function GetCoures(user) {
    try {
        await connectMongoDb();
        const coursesList = await Courses.find({user})
        console.log(coursesList);
        return coursesList;
    } catch (err) { 
        console.log(err);
    }
}