import VoterGuide  from '../models/VoterGuide.js';
import UserProgress  from '../models/UserProgress.js';

export const getVoterGuide = async (req, res) => {
  try {
    const userId = req.userId;

    const defaultSteps = [
      {
        stepNumber: 1,
        stepName: 'Registration',
        description: 'Complete voter registration',
        completed: false,
        documents: ['Proof of identity', 'Proof of residence'],
      },
      {
        stepNumber: 2,
        stepName: 'Verification',
        description: 'Wait for verification',
        completed: false,
        documents: [],
      },
      {
        stepNumber: 3,
        stepName: 'Voter ID',
        description: 'Receive voter ID',
        completed: false,
        documents: ['Voter ID card'],
      },
      {
        stepNumber: 4,
        stepName: 'Voting Day',
        description: 'Cast your vote',
        completed: false,
        documents: ['Voter ID or other valid document'],
      },
    ];

    if (!userId) {
      return res.json({
        userId: null,
        steps: defaultSteps,
        progress: 0,
        completed: false,
      });
    }

    let guide = await VoterGuide.findOne({ userId });

    if (!guide) {
      guide = new VoterGuide({
        userId,
        steps: defaultSteps,
      });
      await guide.save();
    }

    res.json(guide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeStep = async (req, res) => {
  try {
    const { stepNumber } = req.body;
    const userId = req.userId;

    const guide = await VoterGuide.findOne({ userId });
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    const step = guide.steps.find((s) => s.stepNumber === stepNumber);
    if (step) {
      step.completed = true;
      step.completedAt = new Date();
    }

    const completedSteps = guide.steps.filter((s) => s.completed).length;
    guide.progress = (completedSteps / guide.steps.length) * 100;

    if (completedSteps === guide.steps.length) {
      guide.completed = true;
      guide.completedAt = new Date();
    }

    await guide.save();

    res.json({ message: 'Step completed', guide });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const guide = await VoterGuide.findOne({ userId });

    if (!guide) {
      return res.json({ progress: 0, completed: false });
    }

    res.json({
      progress: guide.progress,
      completed: guide.completed,
      steps: guide.steps,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
