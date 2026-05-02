import SimulatorSession  from '../models/SimulatorSession.js';
import UserProgress  from '../models/UserProgress.js';

export const startSimulation = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.userId;

    const session = new SimulatorSession({
      userId,
      role,
      currentStage: 'registration',
    });

    await session.save();
    res.status(201).json({
      message: 'Simulation started',
      session,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const makeDecision = async (req, res) => {
  try {
    const { sessionId, decision } = req.body;

    const session = await SimulatorSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    session.decisions.push({
      stage: session.currentStage,
      decision,
      timestamp: new Date(),
    });

    // Move to next stage
    const stages = ['registration', 'campaign', 'voting', 'counting'];
    const currentIndex = stages.indexOf(session.currentStage);
    if (currentIndex < stages.length - 1) {
      session.currentStage = stages[currentIndex + 1];
    } else {
      session.completed = true;
      session.completedAt = new Date();
      session.score = Math.floor(Math.random() * 100) + 1; // Placeholder scoring
    }

    await session.save();
    res.json({ message: 'Decision recorded', session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSessionDetails = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await SimulatorSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserSessions = async (req, res) => {
  try {
    const userId = req.userId;
    const sessions = await SimulatorSession.find({ userId }).sort({
      createdAt: -1,
    });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
