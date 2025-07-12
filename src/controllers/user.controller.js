import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import Joi from "joi"
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {

   const userSchema = Joi.object({
    name: Joi.string()
        .required(),
    
    email: Joi.string()
        .email()
        .lowercase()
        .trim(),
    
    aadhar: Joi.string()
        .required()
        .lowercase()
        .trim(),
    
    phone: Joi.string()
        .required(),
    
    address: Joi.string()
        .required(),
    
    type: Joi.string()
        .valid('admin', 'donor', 'volunteer1', 'volunteer2')
        .required(),
    
    password: Joi.string()
        .required()
})

    userSchema.validate(req.body)
    const {name,email,aadhar,phone,address,type,password}=req.body
    const existedUser = await User.findOne({
        aadhar,})
    if (existedUser) {
        throw new ApiError(409, "user with same aadhar exists")
    }

    
    const user = await User.create({
        name,email,aadhar,phone,address,type,password
    })


    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const loginSchema=Joi.object({
        phone:Joi.string().required(),
        password:Joi.string().required()
    })
    loginSchema.validate(req.body)
    const { phone, password } = req.body
    if (!phone) {
        throw new ApiError(400, "phone is required")
    }
    const user = await User.findOne({
        phone,
    })
    if (!user) {
        throw new ApiError(404, "user doesnot exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "invalid user credentials")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
    const loggedInUser = await User.findById(user._id).
        select("-password -refreshToken")


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in successfully"
            )
        )
})
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user logged out"))
})

const refershAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if (!user) {
            throw new ApiError("invalid refresh token")
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "refresh token is expired or used")

        }
        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken: newRefreshToken
                    },
                    "access token refreshed successfully"

                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid refresh token")
    }
})


const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user, "current user fetched successfully"
        ))
})


export {
    registerUser, loginUser, logoutUser
    , getCurrentUser,refershAccessToken
}