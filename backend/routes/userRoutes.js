import express  from 'express';
import * as userController from '../controllers/userController.js';
import authMiddleware  from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, userController.updateUserProfile);

export default router;
