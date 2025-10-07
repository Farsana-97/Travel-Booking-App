import express from "express"
import { getPayments, paymentSession, updatePaymentStatus } from "../controllers/paymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const paymentRouter = express.Router()

paymentRouter.post("/",authMiddleware, paymentSession)
paymentRouter.get("/",authMiddleware, getPayments)
paymentRouter.post("/update", updatePaymentStatus);



export default paymentRouter;