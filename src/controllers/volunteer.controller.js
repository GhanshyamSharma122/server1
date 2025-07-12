import { asyncHandler } from "../utils/asyncHandler.js";
import {Event} from "../models/event.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

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
    
})
export {rsvp}