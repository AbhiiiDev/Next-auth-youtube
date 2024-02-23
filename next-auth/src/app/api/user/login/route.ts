import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 


connect();


export async function POST(req: NextRequest, res: NextResponse) {
    try {

        const reqbody = await req.json();
        const { email, password } = reqbody;
        console.log(reqbody);

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: "User with entered data doens't exists" }, { status: 400 });
        }
        console.log("user exists");

        const validPassword=await bcrypt.compare(password,user.password);
        
        if(!validPassword){
            return res.json({error:"Invalid Password"},{status:400});
        }
        console.log(user)


//create token for user

const tokenData={
    id:user._id,   
    email:user.email,   
    username:user.username
}

//create token
const token=await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiredIn:'1d'});

const response= res.json({
    message:"Login Success",
    success:true
})

await response.cookies.set("token",token,{
    httpOnly:true,
})

return response;

    } catch (error) {
return res.json({error:error.message},{status:500});

    }

}