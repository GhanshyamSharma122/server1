import { Donor } from "../models/donor.model.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import Joi from "joi";

const createDonor=asyncHandler(async(req ,res)=>{
    const schema=Joi.object(
        {
            
            amount:Joi.string().required()
        }
    )
    const {error}=schema.validate(req.body)
    if(error)
    {
        throw new ApiError(400,error.details[0].message)
    }
    const {amount}=req.body
    const donor=await Donor.create({
        donor_id:req.user._id,
        amount,
    })
    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            donor,
            "donation done successfully"
        )
    )
})
const getStats=asyncHandler(async (req,res) => {
    const amounts=await Donor.find({donor_id:req.user._id,}).select("amount -_id")
    let totalAmount=0
    for (let amount of amounts){
        totalAmount+=amount.amount
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {totalAmount,},
            "total amount fetched successfully"
        )
    )
})
const getHistory=asyncHandler(async (req,res) => {
    const donor_id=req.user._id
    const donations = await Donor.find({ donor_id }).select("-donor_id");
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            donations,
            "history fetched successfully"
        )
    )

})
export {createDonor,getHistory,getStats}