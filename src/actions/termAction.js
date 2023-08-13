'use server'
import { connectMongoDb } from "@/lib/mongodb";
import Terms from "@/model/terms";

export async function CreateTerms(data) {
    const description = await data.get("description").toString();
    const user = await data.get("user");
    if (description && user) {
        try{
            await connectMongoDb().catch(err =>console.log(err));
            await Terms.findOneAndUpdate(
                {user: user},
                {description: description},
                { new: true, upsert : true}
        ); 
        } catch(err)
        {console.log(err);
        return({status: 'error', message: err});
    }
    }
}
// get Terms 
export async function GetTerms(user) {
    if (user) {
        try{
            await connectMongoDb().catch(err =>console.log(err));
            const terms = await Terms.findOne({user: user});
            return terms;
        } catch(err) {
            console.log(err);
        return({status: 'error', message: err});
    }
    }
}