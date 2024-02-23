import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';


connect();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { username, email, password } = reqbody;

        // console.log(reqbody);

            const user = await User.findOne({ email });
        
        if (user) { return NextResponse.json({ error: "User with entered data , already exists" }, { status: 400 });

        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
      username,
          email,
  password: hashedPassword
        })
        const savedUser =await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User created Successfully",
            success: true,


        })

    } catch (error: any) {
        NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
