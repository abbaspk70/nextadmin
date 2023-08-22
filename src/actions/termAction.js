'use server'
import Terms from "@/model/terms";
import { getUser } from "./productAction";

export async function CreateTerms(data) {
    const description = await data?.get("description").toString();
    const user = await getUser();
    if (user && description) {
            try {
                await Terms.findOneAndUpdate(
                    { user: user._id },
                    { description: description },
                    { upsert: true }
                );
            } catch (err) {
                console.log(err);
                return ({ status: 'error', message: err });
            }
        }
    }

// get Terms 
export async function GetTerms() {
    const user = await getUser();
    if (user) {
        try {
            const terms = await Terms.findOne({ user: user._id });
            return terms;
        } catch (err) {
            console.log(err);
            return ({ status: 'error', message: err });
        }
    }
}