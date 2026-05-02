import express  from 'express';
import * as misinformationController from '../controllers/misinformationController.js';
import authMiddleware  from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/challenge', misinformationController.getChallenge);
router.post('/submit-answer', authMiddleware, misinformationController.submitAnswer);
router.get('/stats', authMiddleware, misinformationController.getUserChallengeStats);

export default router;
