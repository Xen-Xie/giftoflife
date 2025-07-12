import express from 'express';
import { Signup, Login } from '../controllers/authController.js';

const router = express.Router();

// Signup route
router.post('/signup', Signup);
// Login route
router.post('/login', Login);

export default router;