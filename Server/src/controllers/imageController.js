// controllers/incidentController.js
import Photos from "../models/Photos.js";
import cloudinary from "../utils/cloudinary.js";

export const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photos.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const uploadPhoto = async (req, res) => {
  try {
    const { caption } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newPhoto = await Photos.create({
      imageUrl: req.file.path,
      publicId: req.file.filename,
      caption,
    });
    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(500).json({ message: "Upload Failed" });
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const photo = await Photos.findById(req.params.id); // FIXED
    if (!photo) return res.status(404).json({ message: "Photo not found" });

    // Delete from Cloudinary
    const publicId = photo.publicId;
    await cloudinary.uploader.destroy(publicId);

    // Delete from MongoDB
    await Photos.deleteOne({ _id: photo._id }); // FIXED

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting photo:", error);
    res.status(500).json({ message: "Delete Failed" });
  }
};
