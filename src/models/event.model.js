import mongoose from "mongoose";
const eventSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    voluteers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    benficiary:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]

},
{timestamps:true})
export const Event=mongoose.model("Event",eventSchema)