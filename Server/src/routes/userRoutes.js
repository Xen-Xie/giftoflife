import express from "express";
import { getAllUsers, searchUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/search",searchUsers )

export default router;
