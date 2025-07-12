import { ApiError } from "../utils/ApiError.js"

export const roleMiddleware = (type) => (req, res, next) => {
    if (!type) {
        throw new ApiError("the role is empty")
    }
    
    const allowedRoles = Array.isArray(type) ? type : [type];
    
    if (allowedRoles.includes(req.user.type)) {
        next()
    } else {
        throw new ApiError(401, "unauthorized request, you don't have access rights")
    }
}
