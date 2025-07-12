import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { createTransaction, getTransaction } from "../controllers/transaction.controller.js";
const router=Router()
router.get("/:transactionId",verifyJWT,roleMiddleware(["donor","admin"]),getTransaction)
router.post("/",verifyJWT,roleMiddleware("volunteer2"),upload.single("invoice_image"),createTransaction)
export default router