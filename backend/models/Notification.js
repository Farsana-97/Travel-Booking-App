import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  type: {
    type: String,
    enum: ["booking", "cancellation", "payment"],
    required: true,
  },
  message: { type: String, required: true },
});

const Notification = mongoose.model("notification", notificationSchema);

export default Notification;
