import UserProgress  from '../models/UserProgress.js';
import User  from '../models/User.js';

export const getUserProgress = async (req, res) => {
  try {
    const userId = req.userId;

    let progress = await UserProgress.findOne({ userId });
    if (!progress) {
      progress = new UserProgress({ userId });
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserBadges = async (req, res) => {
  try {
    const userId = req.userId;
    const { badgeName, description } = req.body;

    const progress = await UserProgress.findOne({ userId });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    const badgeExists = progress.badges.some((b) => b.name === badgeName);
    if (!badgeExists) {
      progress.badges.push({
        name: badgeName,
        achievedAt: new Date(),
        description,
      });
    }

    await progress.save();

    // Update user badges
    await User.findByIdAndUpdate(userId, { $addToSet: { badges: badgeName } });

    res.json({ message: 'Badge awarded', progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const calculateAwarenessScore = async (req, res) => {
  try {
    const userId = req.userId;

    const progress = await UserProgress.findOne({ userId });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    let score = 0;

    // Calculate based on completed modules
    if (progress.modulesCompleted.voterGuideCompleted) score += 20;
    score += Math.min(progress.modulesCompleted.simulatorCount * 15, 30);
    score += Math.min(progress.modulesCompleted.misinformationChallenges * 5, 25);
    if (progress.modulesCompleted.timelineExplored) score += 15;
    score += Math.min(progress.modulesCompleted.assistantQuestions * 2, 10);

    progress.awarenessScore = Math.min(score, 100);
    await progress.save();

    res.json({
      awarenessScore: progress.awarenessScore,
      breakdown: {
        voterGuide: progress.modulesCompleted.voterGuideCompleted ? 20 : 0,
        simulator: Math.min(progress.modulesCompleted.simulatorCount * 15, 30),
        misinformation: Math.min(
          progress.modulesCompleted.misinformationChallenges * 5,
          25
        ),
        timeline: progress.modulesCompleted.timelineExplored ? 15 : 0,
        assistant: Math.min(progress.modulesCompleted.assistantQuestions * 2, 10),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const leaderboard = await UserProgress.find()
      .sort({ awarenessScore: -1 })
      .limit(parseInt(limit))
      .populate('userId', 'username');

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
