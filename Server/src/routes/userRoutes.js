import express from "express";
import { getAllUsers, getStats, getUser, searchUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/search",searchUsers )
router.get("/stats", getStats)
router.get("/me/:id", getUser)

export default router;
