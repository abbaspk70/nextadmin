'use server'
import { connectMongoDb } from "@/lib/mongodb";
import Courses from "@/model/courses";



//for gettting courses
export async function GetCoures(user) {
    try {
        await connectMongoDb();
        const courses = await Courses.find({user});
        return {status: "success", courses: courses};
    } catch (err) { 
        console.log(err);
        return {status: "error", courses: courses};
    }
}

//for deleting course
export async function DeletCourse(id) {
    try {
        await connectMongoDb();
        const courses = await Courses.findByIdAndDelete(id)
        return {status: "success", message: "Deleted successfully"};
    } catch (err) { 
        console.log(err);
        return {status: "error", message: "Error deleting course"};
    }
}