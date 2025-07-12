import { required } from "joi";
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
    approved_status:{
        type:Boolean,
        required:true
    },
    hitcount:{
        type:Number,
        required:trusted
    }
})
export const Waitlist=mongoose.model("Waitlist",waitlistSchema)