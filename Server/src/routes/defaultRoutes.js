import express from 'express';
import { getStats } from '../controllers/userController.js';

const router = express.Router();

// Make this public
router.get('/stats', getStats);

export default router;