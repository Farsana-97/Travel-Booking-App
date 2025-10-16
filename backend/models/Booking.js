import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "package",
    required: true,
  },
  totalPersons: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  travelDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  bookingStatus: {
    type: String,
    enum: ["pending","confirmed","cancelled"],
    default: "confirmed",
  },
});

const Booking = mongoose.model("booking", bookingSchema);

export default Booking;
