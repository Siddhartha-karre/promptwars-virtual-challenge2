import express  from 'express';
import * as assistantController from '../controllers/assistantController.js';
import authMiddleware  from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/search', assistantController.searchAnswers);
router.get('/common-questions', assistantController.getCommonQuestions);
router.get('/category/:category', assistantController.getAnswerByCategory);

export default router;
