import { Transaction } from "../models/transaction.model.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Joi} from "joi"

const createTransaction=asyncHandler(async(req,res)=>{
    const schema=Joi.object({
        amount:Joi.Number().required(),
        purpose:Joi.String().required(),
        remarks:Joi.String().required(),
    })
    const {error}=schema.validate(req.body)
    if(error){
        throw new ApiError(400,error.details[0].message)
    }
    const invoicecLocalPath = req.file?.path
    if (!invoicecLocalPath) {
        throw new ApiError(400, "avatar file is missing")
    }
    const invoice = await uploadOnCloudinary(invoicecLocalPath)
    if (!invoice.url) {
        throw new ApiError(400, "error while uploading on avatar")
    }
    const transaction=await Transaction.create({
        volunteerId:req.user._id,
        amount,
        purpose,
        remarks,
        invoice_imageUrl:invoice.url

    })
    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            transaction,
            "transaction created successfully"

        )
    )
    
})
const getTransaction=asyncHandler(async (req,res) => {
    const transactionId=req.params.transactionId
    const transaction=await Transaction.findById(transactionId)
    if(!transaction){
        throw new ApiError(400,"the transaction doesnot exist for the given id")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,transaction,"transaction is fetched successfully")
    )
})
export {createTransaction,getTransaction}