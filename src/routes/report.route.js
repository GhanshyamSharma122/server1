import { Router } from "express";
import { report,getReport } from "../controllers/report.controller.js";

const router=Router()
router.post("/",report)
router.get("/get_all",getReport)

export default router