import express from "express";
import { getUser } from "../controllers/userController";

const router = express.Router();
router.get("/me/:id", getUser)

export default router;