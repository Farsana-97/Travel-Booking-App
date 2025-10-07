import Package from "../models/Package.js";

// Add Package

export const addPackage = async (req, res) => {
  try {
    const {
      title,
      destination,
      description,
      itinerary,
      price,
      availableFrom,
      availableTo,
    } = req.body;

    const itineraryArray = itinerary
      ? Array.isArray(itinerary)
        ? itinerary
        : JSON.parse(itinerary)
      : [];

    let uploadedImages = [];
    if (req.files) {
      uploadedImages = req.files.map((file) => file.path);
    }

    const newPackage = await Package.create({
      title,
      destination,
      description,
      itinerary: itineraryArray,
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
    const packages = await Package.find().populate("destination", "name");
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get package by id

export const getPackageById = async (req, res) => {
  try {
    const id = req.params.id;
    const packageItem = await Package.findById(id).populate(
      "destination",
      "name"
    );
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

    res.json({ message: "Package updated successfully", updatedPackage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Package

export const deletePackage = async (req, res) => {
  try {
    const id = req.params.id;
    const packageItem = await Package.findByIdAndDelete(id);
    res.json({ message: "Package deleted successfully", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const filterPackages = async (req, res) => {
  try {
    const filters = req.query;
    const query = {};

    if (filters.destination) {
      query.destination = filters.destination;
    }

    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
      if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
    }

    if (filters.availableFrom || filters.availableTo) {
      query.$and = [];
      if (filters.availableFrom)
        query.$and.push({ availableFrom: { $lte: filters.availableFrom } });
      if (filters.availableTo)
        query.$and.push({ availableTo: { $gte: filters.availableTo } });
    }

    if (filters.title) {
      query.title = { $regex: filters.title, $options: "i" };
    }

    const packages = await Package.find(query).populate("destination", "name");

    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
