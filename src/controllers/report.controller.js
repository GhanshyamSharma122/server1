
import {Waitlist} from "../models/waitlist.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import Joi from "joi"
import { asyncHandler } from "../utils/asyncHandler.js"
const report=asyncHandler(async (req ,res)=>{
    const schema=Joi.object({
        name:Joi.string().required(),
        address:Joi.string().required()
    })
    const {error}=schema.validate(req.body)
    if(error){
        throw new ApiError(200,error.details[0].message)
    }
    const hitcount=1
    const {name,address}=req.body
    const report=await Waitlist.create({
        name,
        address,
        hitcount
    })
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            report,
            "done generating report"
        )
    )

})
const getReport=asyncHandler(async(req,res)=>{
    const report=await Waitlist.find()
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            report,
            "fetched successfully"
        )
    )

})
export {report,getReport}