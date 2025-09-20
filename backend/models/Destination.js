import mongoose from "mongoose";

const destinationSchema = mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Destination = mongoose.model("destination", destinationSchema);

export default Destination;
