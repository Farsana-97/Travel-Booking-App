import express from "express"
import { paymentSession } from "../controllers/paymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const paymentRouter = express.Router()

paymentRouter.post("/",authMiddleware, paymentSession)


export default paymentRouter;