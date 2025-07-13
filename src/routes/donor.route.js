import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {roleMiddleware} from "../middlewares/role.middleware.js"
import { createDonor, getHistory, getStats, } from "../controllers/donor.controller.js";

const router=Router()
router.post("/create",verifyJWT,roleMiddleware(["user"]),createDonor)
router.get("/history",verifyJWT,roleMiddleware(["user"]),getHistory)
router.get("/stats",verifyJWT,roleMiddleware(["user"]),getStats)
export default router