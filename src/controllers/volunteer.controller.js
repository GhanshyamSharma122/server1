import { asyncHandler } from "../utils/asyncHandler.js";
import {Event} from "../models/event.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {Post} from "../models/post.model.js"
import Joi from "joi";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const rsvp=asyncHandler(async (req ,res)=>{
    const volunteer_id=req.user._id
    const event_id=req.params.eventId
    const event =await Event.findById(event_id)
    if(event.voluteers.includes(volunteer_id)){
        throw new ApiError(400,"user already added")
    }
    event.voluteers=event.voluteers.push(volunteer_id)
    event.save({validateBeforeSave:false})
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "done"
        )
    )

})
const post=asyncHandler(async (req,res) => {
    const userId=req.user._id
    const schema=Joi.object({
        event_id:Joi.string().required(),
        description:Joi.string().required(),
    })
    const {event_id,description}=req.body
    const {error}=schema.validate(req.body)
    if(error){
        throw new ApiError(400,error.details[0].message)
    }
    const postPhotoLocalPath = req.file?.path
        if (!postPhotoLocalPath) {
            throw new ApiError(400, "avatar file is missing")
        }
        const photo = await uploadOnCloudinary(postPhotoLocalPath)
        if (!photo.url) {
            throw new ApiError(400, "error while uploading on avatar")
        }
    const post=await Post.create({
        volunteer_id:req.user._id,
        event_id,
        description,
        photoUrl:photo.url
    })
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            post,
            "post created succesfully"
        )
    )
    
})
export {rsvp,post}