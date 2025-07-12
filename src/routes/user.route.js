import { Router } from "express";
import { registerUser,loginUser,logoutUser,refershAccessToken,getCurrentUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()
router.route("/register").post(
    registerUser
)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refershAccessToken)
router.route("/get-current-user").get(verifyJWT, getCurrentUser)
export default router