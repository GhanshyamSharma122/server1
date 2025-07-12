import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true
    },
    aadhar:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
        
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:["admin","user","beneficiary","volunteer2"]
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true})
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10)
    next();
})
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=  function () {
    return jwt.sign({
        _id:this._id,
        email:this.email,
        name:this.name,
        type:this.type
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
    },process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
export const User=mongoose.model("User",userSchema)