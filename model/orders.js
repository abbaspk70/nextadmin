import mongoose,{Schema,models} from 'mongoose'

const OrdersSchema = new Schema({
    orderId: {type: String, required: true, unique: true},
    status: {type: String, default: "Pending"},
    customerObjId: {type: Schema.Types.ObjectId, ref: 'Customers'},
    shipping: {street: {type: String}, city: {type: String}, state: {type: String},zip: {type: String}, country: {type: String}},
    billing: {street: {type: String}, city: {type: String}, state: {type: String},zip: {type: String}, country: {type: String}},
    terms: {type: String},
    items: [{itemId: {type: String,}, itemName: {type: String,},description: {type: String}, quantity: {type: Number},price: {type: Number}}],
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    
}, {timestamps: true},);

const Orders = models.Orders || mongoose.model('Orders', OrdersSchema);
export default Orders;