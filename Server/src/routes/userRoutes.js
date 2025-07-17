import express from "express";
import { getAllUsers, getStats, searchUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/search",searchUsers )
router.get("/stats", getStats)

export default router;
