import mongoose,{Schema,models} from 'mongoose';

const productSchema = new Schema({
    productId: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    price: {type: Number, default: 0},
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    
}, { timestamps: true});

const Products = models.Products || mongoose.model("Products",productSchema);
export default Products