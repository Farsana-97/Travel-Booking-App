import express from "express"
import { addBooking, cancelBooking, getAllBookings, getBookingById, getBookingByUserId } from "../controllers/bookingController.js"
import { admin, authMiddleware } from "../middlewares/authMiddleware.js"

const bookingRouter = express.Router()

bookingRouter.post('/',authMiddleware, addBooking)
bookingRouter.get('/',authMiddleware,admin,getAllBookings)

bookingRouter.get('/:id',authMiddleware,getBookingByUserId)
bookingRouter.get('/bookingById/:id',authMiddleware, getBookingById);
bookingRouter.put('/cancel/:id',authMiddleware, cancelBooking);
bookingRouter.put('/filter/:id',authMiddleware, cancelBooking);



export default bookingRouter;