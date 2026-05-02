import mongoose  from 'mongoose';

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  modulesCompleted: {
    simulatorCount: { type: Number, default: 0 },
    voterGuideCompleted: { type: Boolean, default: false },
    misinformationChallenges: { type: Number, default: 0 },
    timelineExplored: { type: Boolean, default: false },
    assistantQuestions: { type: Number, default: 0 },
  },
  scores: {
    simulatorTotal: { type: Number, default: 0 },
    misinformationTotal: { type: Number, default: 0 },
    overallScore: { type: Number, default: 0 },
  },
  badges: [
    {
      name: String,
      achievedAt: Date,
      description: String,
    },
  ],
  awarenessScore: {
    type: Number,
    default: 0,
  },
  lastActivityAt: Date,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('UserProgress', userProgressSchema);
