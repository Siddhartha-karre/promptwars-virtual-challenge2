import mongoose  from 'mongoose';

const simulatorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: String,
    enum: ['voter', 'candidate', 'officer'],
    required: true,
  },
  currentStage: {
    type: String,
    enum: ['registration', 'campaign', 'voting', 'counting'],
    default: 'registration',
  },
  decisions: [
    {
      stage: String,
      decision: String,
      timestamp: Date,
    },
  ],
  score: {
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

export default mongoose.model('SimulatorSession', simulatorSchema);
