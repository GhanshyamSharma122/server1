import { Router } from "express";
import { eventGallery, getPosts, stats } from "../controllers/public.controllers.js";
const router=Router()
router.get("/event-gallery/:eventId",eventGallery)
router.get("/getPosts",getPosts)
router.get("/stats",stats)
export default router