import MisinformationChallenge  from '../models/MisinformationChallenge.js';
import MisinformationContent  from '../models/MisinformationContent.js';
import UserProgress  from '../models/UserProgress.js';

export const getChallenge = async (req, res) => {
  try {
    const content = await MisinformationContent.findOne()
      .sort({ usageCount: 1 })
      .limit(1);

    if (!content) {
      return res.status(404).json({ message: 'No challenges available' });
    }

    res.json({
      contentId: content._id,
      content: content.content,
      contentType: content.contentType,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { contentId, userResponse } = req.body;
    const userId = req.userId;

    const content = await MisinformationContent.findById(contentId);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    const isCorrect = userResponse === content.isReal;

    let challenge = await MisinformationChallenge.findOne({ userId });
    if (!challenge) {
      challenge = new MisinformationChallenge({ userId, challenges: [] });
    }

    challenge.challenges.push({
      contentId,
      content: content.content,
      contentType: content.contentType,
      isReal: content.isReal,
      userResponse,
      isCorrect,
      feedback: isCorrect
        ? 'Correct! Well done.'
        : `Incorrect. This is ${content.isReal ? 'real' : 'fake'}. ${content.explanation}`,
      timestamp: new Date(),
    });

    if (isCorrect) {
      challenge.correctAnswers += 1;
      challenge.totalScore += 10;
    }

    await challenge.save();
    content.usageCount += 1;
    await content.save();

    // Update user progress
    await UserProgress.findOneAndUpdate(
      { userId },
      { $inc: { 'modulesCompleted.misinformationChallenges': 1 } },
      { upsert: true }
    );

    res.json({
      isCorrect,
      feedback: challenge.challenges[challenge.challenges.length - 1].feedback,
      score: challenge.totalScore,
      correctAnswers: challenge.correctAnswers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserChallengeStats = async (req, res) => {
  try {
    const userId = req.userId;
    const challenge = await MisinformationChallenge.findOne({ userId });

    if (!challenge) {
      return res.json({
        totalScore: 0,
        correctAnswers: 0,
        totalChallenges: 0,
      });
    }

    res.json({
      totalScore: challenge.totalScore,
      correctAnswers: challenge.correctAnswers,
      totalChallenges: challenge.challenges.length,
      accuracy:
        challenge.challenges.length > 0
          ? (
              (challenge.correctAnswers / challenge.challenges.length) *
              100
            ).toFixed(2)
          : 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
