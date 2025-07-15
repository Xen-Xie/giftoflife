import express from 'express';
import { getAllUsers, deletUser, updateUserRole } from '../controllers/adminController.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';


const router = express.Router();

router.use(authenticateToken, isAdmin);

router.get("/users", getAllUsers);
router.delete("/users/:id", deletUser);
router.patch("/users/:id/role", updateUserRole);

export default router ;