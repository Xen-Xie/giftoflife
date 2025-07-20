import express from "express";
import { addDonationDate, getUser, toggleAvailability } from "../controllers/userController.js";

const router = express.Router();
router.get("/me/:id", getUser)
router.patch("/me/add-donation/:id", addDonationDate)
router.patch("/available", toggleAvailability)

export default router;