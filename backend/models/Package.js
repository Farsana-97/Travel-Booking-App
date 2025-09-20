import mongoose from "mongoose";

const packageSchema = mongoose.Schema({
  title: { type: String, required: true },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "destination",
    required: true,
  },
  description: { type: String, required: true },
  itinerary: [{ type: String, required: true }],
  price: { type: Number, required: true },
  images: [{ type: String }],
  availableFrom: { type: Date, required: true },
  availableTo: { type: Date, required: true },
});

const Package = mongoose.model("package", packageSchema);

export default Package;
