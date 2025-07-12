import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "./ApiError.js";
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
const genAI=new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
const model=genAI.getGenerativeModel({model:"gemini-2.0-flash-lite"})
export const generateContent=async(prompt)=>{
    try {
        const result=await model.generateContent(prompt)
        const response=result.response
        return response.text().trim();
    } catch (error) {
        console.error("google ai provider error",error);
        throw new ApiError(502,"failed to generate content from google ai.")
    }
}