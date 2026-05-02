import express from 'express';
import * as progressController from '../controllers/progressController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/user', authMiddleware, progressController.getUserProgress);
router.post('/award-badge', authMiddleware, progressController.updateUserBadges);
router.get('/awareness-score', authMiddleware, progressController.calculateAwarenessScore);
router.get('/leaderboard', progressController.getLeaderboard);

export default router;
