import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import destiRouter from "./routes/destinationRoutes.js";
import packageRouter from "./routes/packageRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import notifiRouter from "./routes/notifiRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";


dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({origin:'https://travel-booking-app-swart.vercel.app'}))


app.use("/api/auth", authRouter);
app.use("/api/destination", destiRouter);
app.use("/api/package", packageRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/notification",notifiRouter)

connect();

app.use(errorHandler)


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
