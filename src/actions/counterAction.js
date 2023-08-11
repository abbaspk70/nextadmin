'use server'

import { connectMongoDb } from "@/lib/mongodb";
import Counter from '@/model/counterId'

export async function CreateCounter () {
    await connectMongoDb();
    const {seq} = await Counter.findOneAndUpdate(
        {id: "autoval"},
        {"$inc": {"seq": 1}},
        { new: true, upsert : true}
    )
    return seq;
}


