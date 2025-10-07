import Booking from "../models/Booking.js";

// Add Booking

export const addBooking = async (req, res) => {
  const { userId, packageId, totalPersons, travelDate, totalAmount } = req.body;

  try {
    const newBooking = await Booking.create({
      user: userId,
      package: packageId,
      totalPersons,
      travelDate,
      totalAmount,
    });

    res.status(201).json({
      message: "Booking added successfully",
      booking: newBooking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get All Bookings

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "username")
      .populate("package", "title");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//Get booking for a user

export const getBookingByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const bookings = await Booking.find({ user: userId })
      .populate("package", "title price destination images")
      .sort({ bookingDate: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "username email")
      .populate("package", "title price");
    
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};