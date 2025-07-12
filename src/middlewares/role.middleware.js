import { ApiError } from "../utils/ApiError.js"

export const roleMiddleware = (type)=>(req,res,next)=>{
    if(!type){
        throw new ApiError("the role is empty")
    }
    if(req.user.type===type){
        next()
    }else{
        throw new ApiError(401,"unauthorized request your don't have access right")
    }
}