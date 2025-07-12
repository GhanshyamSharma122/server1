import mongoose  from "mongoose";
const transactionSchema=mongoose.Schema(
    {
        volunteerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        amount:{
            type:Number,
            required:true
            
        },
        purpose:{
            type:String,
            required:true
        },
        remarks:{
            type:String,
            required:true
        },
        invoice_imageUrl:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)
export const Transaction=mongoose.model("Transaction",transactionSchema)