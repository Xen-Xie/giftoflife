import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";
import { getAllPhotos,uploadPhoto,deletePhoto } from "../controllers/imageController.js";

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "incident-photos",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }
});
const upload = multer({storage})

router.post("/upload",upload.single("image"),uploadPhoto);
router.delete("/:id",deletePhoto);

export default router