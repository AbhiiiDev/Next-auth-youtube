import mongoose from "mongoose";

const {Schema} =mongoose;


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please provide Email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide Password"],
        unique:true
    }
        ,
        isVerfied: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
})


const User=mongoose.models.User || mongoose.model("Users",userSchema);

export default User;
