import { NextResponse } from "next/server"
import { connectMongoDb } from "@/lib/mongodb"
import mongoose, { connect } from "mongoose"
import User from "@/model/user"
import { hash } from "bcryptjs";


export async function POST(req, res) {
  connectMongoDb().catch(err => res.json(err))

    if (!req.json) return NextResponse.json({ error: "Data is missing" },{status: 400})
    const { fullName, email, password } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
      return NextResponse.json({ error: "User Already Exists" },{status: 409})
    }
    else {
      if(password.length < 6)
      return NextResponse.json({error: "Password be at least 6 characters long"},{status: 409})
      const hashPassword = await hash(password, 12)
      User.create({
        fullName,
        email,
        password: hashPassword
      },( error, data) => {
        if(error && error instanceof mongoose.Error.ValidationError) { 
          //mondo db will return array
          //but we only want to show one error at a time
          for (let field in error.errors) {
            const msg = error.errors[field].message
            return NextResponse.json({ error: msg},{status: 409})
          }
        }
        const user = {
          email: data.email,
          fullName: data.fullName,
          _id: data._id
        }
        return NextResponse.json({
          success: true,
          user
        },{status: 201})
      })
    }

};
