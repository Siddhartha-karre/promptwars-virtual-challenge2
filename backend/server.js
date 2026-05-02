import authRoutesRouter from './routes/authRoutes.js';
import userRoutesRouter from './routes/userRoutes.js';
import simulatorRoutesRouter from './routes/simulatorRoutes.js';
import assistantRoutesRouter from './routes/assistantRoutes.js';
import voterGuideRoutesRouter from './routes/voterGuideRoutes.js';
import misinformationRoutesRouter from './routes/misinformationRoutes.js';
import timelineRoutesRouter from './routes/timelineRoutes.js';
import progressRoutesRouter from './routes/progressRoutes.js';
import express  from 'express';
import mongoose  from 'mongoose';
import cors  from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

import { MongoMemoryServer } from 'mongodb-memory-server';

// MongoDB Connection
const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;
    if (!uri) {
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log('Started in-memory MongoDB server');
    }
    await mongoose.connect(uri);
    console.log('MongoDB connected to:', uri);
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutesRouter);
app.use('/api/users', userRoutesRouter);
app.use('/api/simulator', simulatorRoutesRouter);
app.use('/api/assistant', assistantRoutesRouter);
app.use('/api/voter-guide', voterGuideRoutesRouter);
app.use('/api/misinformation', misinformationRoutesRouter);
app.use('/api/timeline', timelineRoutesRouter);
app.use('/api/progress', progressRoutesRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
