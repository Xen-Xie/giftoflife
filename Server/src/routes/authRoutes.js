import express from 'express';
import { Signup, Login } from '../controllers/authController.js';
import { validateSignup } from '../middleware/validateSignup.js';

const router = express.Router();

// Signup route
router.post('/signup', validateSignup, Signup);
// Login route
router.post('/login', Login);

export default router;