import mongoose from "mongoose";

const {MONGODB_URI} = process.env
if(!MONGODB_URI){
    throw new Error("Invalid environment variable: MONGODB_URI");
}
export const connectMongoDb = async()=>{
    try {
       const {connection} = await mongoose.connect(MONGODB_URI);
        console.log("Connected to database");
        if (connection.readyState === 1) {
            return Promise.resolve(true)
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error)

    }

};
