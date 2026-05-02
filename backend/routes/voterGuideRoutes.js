import express  from 'express';
import * as voterGuideController from '../controllers/voterGuideController.js';
import authMiddleware  from '../middleware/authMiddleware.js';

import optionalAuthMiddleware from '../middleware/optionalAuthMiddleware.js';

const router = express.Router();

router.get('/guide', optionalAuthMiddleware, voterGuideController.getVoterGuide);
router.post('/complete-step', authMiddleware, voterGuideController.completeStep);
router.get('/progress', authMiddleware, voterGuideController.getProgress);

export default router;
