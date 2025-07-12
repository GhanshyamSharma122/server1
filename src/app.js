import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()
app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use (cookieParser())

//routes import
import userRouter from "./routes/user.route.js"
import transactionRouter from "./routes/transaction.route.js"
import donorRouter from "./routes/donor.route.js"
import volunteerRouter from "./routes/volunteer.route.js"
import eventRouter from "./routes/event.route.js"
// routes definition
app.use("/api/v1/user",userRouter)
app.use("/api/v1/transaction",transactionRouter)
app.use("/api/v1/donor",donorRouter)
app.use("/api/v1/volunteer",volunteerRouter)
app.use("/api/v1/event",eventRouter)
export {app}