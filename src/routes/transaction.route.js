import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"
import { roleMiddleware } from "../middlewares/role.middleware";
import { createTransaction, getTransaction } from "../controllers/transaction.controller";
const router=Router()
router.get("/",verifyJWT,roleMiddleware(["donor","admin"]),getTransaction)
router.post("/",verifyJWT,roleMiddleware("volunteer2"),upload.single("invoice_image"),createTransaction)