import mongoose  from 'mongoose';

const misinformationContentSchema = new mongoose.Schema({
  content: String,
  contentType: {
    type: String,
    enum: ['news', 'social-media', 'meme'],
  },
  isReal: Boolean,
  explanation: String,
  source: String,
  category: String,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  },
  usageCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('MisinformationContent', misinformationContentSchema);
