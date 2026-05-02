import express  from 'express';
import * as simulatorController from '../controllers/simulatorController.js';
import authMiddleware  from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/start', authMiddleware, simulatorController.startSimulation);
router.post('/decide', authMiddleware, simulatorController.makeDecision);
router.get('/session/:sessionId', authMiddleware, simulatorController.getSessionDetails);
router.get('/my-sessions', authMiddleware, simulatorController.getUserSessions);

export default router;
