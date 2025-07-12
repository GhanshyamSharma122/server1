import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {roleMiddleware} from "../middlewares/role.middleware.js"
import { createEvent, getAllEvents } from "../controllers/event.controller.js";

const router=Router()
router.post("/",verifyJWT,roleMiddleware(["admin"]),createEvent)
router.get("/",getAllEvents)
export default router;