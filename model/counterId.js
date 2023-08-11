
import mongoose, {Schema, models} from "mongoose";

const counterSchema = new Schema ({
    id: {type: String},
    seq: {type:Number},
});

const Counter = models.counter || mongoose.model("counter", counterSchema);

export default Counter;