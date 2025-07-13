import { Post } from "../models/post.model";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getPosts=asyncHandler(async (req,res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            await Post.find(),
            "fetched all the posts"
        )
    )
})
export {getPosts}