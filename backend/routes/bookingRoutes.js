import express from "express"
import { addBooking, getAllBookings, getBookingByUserId } from "../controllers/bookingController.js"
import { admin, authMiddleware } from "../middlewares/authMiddleware.js"

const bookingRouter = express.Router()

bookingRouter.post('/',authMiddleware,admin, addBooking)
bookingRouter.get('/',authMiddleware,admin,getAllBookings)
bookingRouter.get('/:id',authMiddleware,getBookingByUserId)



export default bookingRouter;