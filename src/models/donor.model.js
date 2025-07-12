import mongoose from "mongoose";
const donorSchema=mongoose.Schema({
    donor_id:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
},
{timestamps:true})
export const Donor=mongoose.model("Donor",donorSchema)