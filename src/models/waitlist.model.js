
import mongoose, { trusted } from "mongoose";
const waitlistSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    hitcount:{
        type:Number,
        required:true
    }
})
export const Waitlist=mongoose.model("Waitlist",waitlistSchema)