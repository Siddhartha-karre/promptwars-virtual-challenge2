import mongoose  from 'mongoose';

const timelineSchema = new mongoose.Schema({
  stage: {
    type: String,
    enum: ['announcement', 'code-of-conduct', 'polling', 'counting'],
    required: true,
  },
  title: String,
  description: String,
  details: [
    {
      heading: String,
      content: String,
    },
  ],
  date: Date,
  importance: {
    type: String,
    enum: ['high', 'medium', 'low'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('TimelineData', timelineSchema);
