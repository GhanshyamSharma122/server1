import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {roleMiddleware} from "../middlewares/role.middleware.js"
import { rsvp } from "../controllers/volunteer.controller.js";
const router=Router()
router.post("/rsvp/:eventId",verifyJWT,roleMiddleware(["volunteer2","user"]),rsvp)
export default router