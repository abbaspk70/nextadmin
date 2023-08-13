import mongoose, {Schema, models} from "mongoose";

const TermsSchema = new Schema({
    description: {type: String},
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }
    }, {timestamps: true});

    const Terms = models.Terms || mongoose.model("Terms", TermsSchema);
    export default Terms;