import mongoose, {Schema, models} from "mongoose";

const CourseSchema = new Schema({
    title: {type: String, required: [true, "can't be blank"]},
    description: {type: String},
    active: {type: Boolean, default: true},
    price: {type: Number},
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }
    }, {timestamps: true});

    const Courses = models.Courses || mongoose.model("Courses", CourseSchema);
    export default Courses;