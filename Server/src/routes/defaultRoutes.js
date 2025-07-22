import express from 'express';
import { getStats } from '../controllers/userController.js';
import { getAllPhotos } from '../controllers/imageController.js';

const router = express.Router();

// Make this public
router.get('/stats', getStats);
router.get('/allphotos', getAllPhotos)

export default router;