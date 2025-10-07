import express from "express"
import { addBooking, getAllBookings, getBookingById, getBookingByUserId } from "../controllers/bookingController.js"
import { admin, authMiddleware } from "../middlewares/authMiddleware.js"

const bookingRouter = express.Router()

bookingRouter.post('/',authMiddleware, addBooking)
bookingRouter.get('/',authMiddleware,admin,getAllBookings)
bookingRouter.get('/:id',authMiddleware,getBookingByUserId)
bookingRouter.get('/bookingById/:id',authMiddleware, getBookingById);



export default bookingRouter;