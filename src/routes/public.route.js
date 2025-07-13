import { Router } from "express";
import { eventGallery, getPosts } from "../controllers/public.controllers.js";
const router=Router()
router.get("/event-gallery/:eventId",eventGallery)
router.get("/getPosts",getPosts)
export default router