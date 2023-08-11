import mongoose, {Schema, models} from "mongoose";

const CustomerSchema = new Schema({
    customerId: {type: Number, required: true, unique: true},

    firstName: {type: String,lowercase: true, required: [true, "can't be blank"],
    minLength: [1, "Full name should be atleast 4 characters long"],
    maxLength: [30, "Full name shoud be less than  30 characters"]
},
    lastName: {type: String, lowercase: true,
        maxLength: [30, "Full name shoud be less than  30 characters"]
    },
    email: {type: String,},
    contact: {
        email: {type: String },
        phone: {type: String},
        mobile: {type: String},
},
    address: {street: String, city: String , state: String, country: String},
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }
    }, {timestamps: true});

    const Customers = models.customers || mongoose.model("customers", CustomerSchema);
    export default Customers;