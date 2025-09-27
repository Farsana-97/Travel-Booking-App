import Destination from "../models/Destination.js";

// Add destination

export const addDestination = async (req, res) => {
  try {
    const { name, country, description } = req.body;
    if (!req.file) {
      return res.json({ error: "Image required" });
    }

    const newDestination = await Destination.create({
      name,
      country,
      description,
      imageUrl: req.file.path,
    });

    res.status(200).json({ message: "Destination added successfully", newDestination });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all destination

export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Update destination

export const editDestination = async (req, res) => {
  const id = req.params.id;
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const destination = await Destination.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({ message: "Destination updated successfully", destination });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete destination

export const deleteDestination = async (req, res) => {
  try {
    const id = req.params.id;
    const destination = await Destination.findByIdAndDelete(id);
    res.status(200).json({ message: "Destination deleted successfully",id });
  } catch (error) {
    res.status(500).json({error: error.message,});
  }
};
