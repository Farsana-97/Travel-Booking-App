import Package from "../models/Package.js";

// Add new package

export const addPackage = async (req, res) => {
  try {
    const {title,destination,description,itinerary,price,availableFrom,availableTo,} = req.body;

    let uploadedImages = [];

    if (req.files) {
      uploadedImages = req.files.map((file) => file.path);
    }

    const newPackage = await Package.create({
      title,
      destination,
      description,
      itinerary: JSON.parse(itinerary || "[]"),
      price,
      images: uploadedImages,
      availableFrom,
      availableTo,
    });

    res.status(201).json({ message: "Package added successfully", newPackage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all packages

export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get package by id

export const getPackageById = async (req, res) => {
  try {
    const id = req.params.id;
    const packageItem = await Package.findById(id);
    res.json(packageItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Package

export const editPackage = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = {
      ...req.body,
      itinerary: req.body.itinerary ? JSON.parse(req.body.itinerary) : [],
    };

    if (req.files) {
      updateData.images = req.files.map((file) => file.path);
    }

    const updatedPackage = await Package.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({message: "Package updated successfully",package: updatedPackage,});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Package

export const deletePackage = async (req, res) => {
  try {
    const id = req.params.id;
    const packageItem = await Package.findByIdAndDelete(id);
    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
