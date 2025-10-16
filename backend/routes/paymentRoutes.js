import express from "express"
import { getPayments, paymentSession } from "../controllers/paymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const paymentRouter = express.Router()

paymentRouter.post("/",authMiddleware, paymentSession)
paymentRouter.get("/",authMiddleware, getPayments)




export default paymentRouter;