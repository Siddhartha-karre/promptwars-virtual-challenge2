import mongoose  from 'mongoose';

const assistantKnowledgeSchema = new mongoose.Schema({
  category: String,
  question: String,
  answer: String,
  keywords: [String],
  relatedTopics: [String],
  source: {
    type: String,
    default: 'Election Commission of India',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('AssistantKnowledge', assistantKnowledgeSchema);
