import express  from 'express';
import * as timelineController from '../controllers/timelineController.js';
import authMiddleware  from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/all', timelineController.getAllTimeline);
router.get('/stage/:stage', timelineController.getTimelineByStage);
router.get('/overview', timelineController.getTimelineOverview);

export default router;
