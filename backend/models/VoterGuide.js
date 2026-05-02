import mongoose  from 'mongoose';

const voterGuideSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  steps: [
    {
      stepNumber: Number,
      stepName: String,
      description: String,
      completed: Boolean,
      documents: [String],
      completedAt: Date,
    },
  ],
  progress: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('VoterGuide', voterGuideSchema);
