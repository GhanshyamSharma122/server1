import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Donor } from "../models/donor.model.js";
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
const stats=asyncHandler(async(req,res)=>{
    const noOfBeneficiary=await User.find({type:"beneficiary"}).countDocuments();
    const noOfVolunteersAndUsers=await User.find({$or:[{type:"volunteer2"},{"type":"user"}]}).countDocuments();
    const donationAmount=await Donor.aggregate([
  {
    $group: {
      _id: null,
      total: { $sum: "$amount" }
    }
  }
])
return res
.status(200)
.json(
    new ApiResponse(200,{donationAmount,noOfBeneficiary,noOfVolunteersAndUsers})
)
})
export {getPosts,eventGallery,stats}