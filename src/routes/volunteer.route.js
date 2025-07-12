import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {roleMiddleware} from "../middlewares/role.middleware.js"
import { post, rsvp } from "../controllers/volunteer.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router=Router()
router.post("/rsvp/:eventId",verifyJWT,roleMiddleware(["volunteer2","user"]),rsvp)
router.post("/post",upload.single("photo"),verifyJWT,post)
export default router