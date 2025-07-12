import mongoose  from "mongoose";
import { Transaction } from "./transaction.model";
const transactionSchema=mongoose.Schema(
    {
        event_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Event"
        },
        voluteer_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        description:{
            type:"String",
            required:true
        },
        photoUrl:{
            type:"String",
            required:true
        }

    },{timestamps:true})
    export const Transaction=mongoose.model("Transaction",transactionSchema)