import mongoose, {Schema, models} from "mongoose";

const UserSchema = new Schema({
    name: {type: String, lowercase: true, required: [true, "can't be blank"]},
    email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true, unique: true},
    password: String,  
    image: String,
    }, {timestamps: true});

    const Users = models.Users || mongoose.model("Users", UserSchema);
    export default Users;