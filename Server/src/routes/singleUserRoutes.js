import express from "express";
import { addDonationDate, getUser } from "../controllers/userController.js";

const router = express.Router();
router.get("/me/:id", getUser)
router.patch("/me/:id", addDonationDate)

export default router;