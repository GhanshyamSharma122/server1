import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const getPosts=asyncHandler(async (req,res) => {
    const posts=await Post.find()
    return res
    .status(200)
    .json(
       new ApiResponse(
         200,
            posts,
            "all posts fetched successfully"
       )
    )
})
const eventGallery=asyncHandler(async (req,res)=>{
    const eventId=req.params.eventId
    const posts=await Post.find({eventId,}).select("photoUrl")
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            posts,
            "all event images retrieved"
        )
    )

})
export {getPosts,eventGallery}