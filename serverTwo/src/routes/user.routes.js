import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller.js';
import { userProtection } from '../middlewares/user.middleware.js';

const router = express.Router();

router.get('/profile', userProtection, getUserProfile);
router.put('/profile', userProtection, updateUserProfile);
export default router;
