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
    const newPhoto = await Photos.create({
      imageUrl: req.file.path,
      publicId: req.file.public_id,
      caption,
    });
    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(500).json({ message: "Upload Failed" });
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const photo = await Photos.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: "Not found" });

    await cloudinary.uploader.destroy(photo.publicId);
    await photo.remove();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete Failed" });
  }
};
