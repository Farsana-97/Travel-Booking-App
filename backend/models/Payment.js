import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "booking",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  amount: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ["card", "upi", "netbanking"],
    default: "card",
  },
  transactionId: {type: String,required: true,
  },
  status: {
    type: String,
    enum: ["pending", "success", "failed", "refunded"],
    default: "pending",
  },
});

const Payment = mongoose.model("payment", paymentSchema);

export default Payment;
