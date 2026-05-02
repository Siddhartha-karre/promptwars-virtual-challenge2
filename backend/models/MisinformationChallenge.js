import mongoose  from 'mongoose';

const misinformationChallengeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  challenges: [
    {
      contentId: mongoose.Schema.Types.ObjectId,
      content: String,
      contentType: {
        type: String,
        enum: ['news', 'social-media', 'meme'],
      },
      isReal: Boolean,
      userResponse: Boolean,
      isCorrect: Boolean,
      feedback: String,
      timestamp: Date,
    },
  ],
  totalScore: {
    type: Number,
    default: 0,
  },
  correctAnswers: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('MisinformationChallenge', misinformationChallengeSchema);
