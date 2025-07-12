import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Event } from "../models/event.model.js";
import Joi from "joi";

const createEvent=asyncHandler(async (req ,res) => {
        const schema = Joi.object({
    name: Joi.string().required(),
    start: Joi.date().required(),
    end: Joi.date().required()
    });
    const {error}=schema.validate(req.body)
    if(error){
        throw new ApiError(400,error.details[0].message)
    }
    const {name,start,end}=req.body
    const event=await Event.create({
        name,
        start,
        end
    })
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            event,
            "event created successfully"
        )
    )

})
const getAllEvents=asyncHandler(async (req,res) => {
    const events=await Event.find()
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            events,
            "fetched all events"
        )
    )
})
export {createEvent,getAllEvents}