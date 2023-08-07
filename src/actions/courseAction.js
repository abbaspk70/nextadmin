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

//for creating course
export async function CreateCourse(data) {
        const title = await data.title.toString();
        const description = await data.description.toString();
        const user = await data.user;
        const price = await data.price;
        console.log(title, description, user, price);
        if(!title || !user)
        return {status: "error", message: "title or user not found"};

    try {
        await connectMongoDb();
        const courses = new Courses({
            title,
            description,
            price,
            user
        });
        await courses.save();
        return {status: "success", message: "Created successfully"};

    } catch (err) { 
        console.log(err);
        return {status: "error", message: "Error creating course"};
    }
}