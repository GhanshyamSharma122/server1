import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import { Event } from "../models/event.model"; // Import Event model
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find();
    const enrichedPosts = await Promise.all(posts.map(async (post) => {
        const volunteer = await User.findById(post.volunteer_id);
        const event = await Event.findById(post.event_id);
        return {
            ...post.toObject(),
            volunteer_name: volunteer ? volunteer.name : null,
            event_name: event ? event.name : null
        };
    }));

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                enrichedPosts,
                "fetched all the posts"
            )
        );
});
export { getPosts }