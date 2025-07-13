import mongoose from "mongoose";
const postSchema=mongoose.Schema({
    event_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true
    },
    volunteer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    description:{
        type:String,
        required:true

    },
    photoUrl:{
        type:String,
        required:true
    }
})
export const Post =mongoose.model("Post",postSchema)