# Quick Start Guide - ElectraLearn

## Prerequisites
- Node.js 14+ installed
- MongoDB running locally or MongoDB Atlas connection string
- npm installed

## Step 1: Install Dependencies

From the project root:
```bash
npm run install-all
```

This installs dependencies for backend and frontend.

## Step 2: Configure Environment

### Backend Configuration
Navigate to `backend/.env.example` and copy it as `.env`:
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:
- `MONGODB_URI`: Set your MongoDB connection string (local or Atlas)
- `JWT_SECRET`: Set a strong secret key for JWT
- `PORT`: Keep as 5000 (or change and update frontend)
- `FRONTEND_URL`: Keep as http://localhost:3000

### Frontend Configuration
Frontend `.env` is already configured to `http://localhost:5000/api`

## Step 3: Seed Database (Optional but Recommended)

To populate the knowledge base, timeline, and misinformation content:

```bash
cd backend
npm run seed
```

This adds sample data to MongoDB.

## Step 4: Start the Application

### Option A: Terminal Tabs (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will open at http://localhost:3000

### Option B: From Project Root

If you prefer one terminal, use concurrently (optional setup).

## Step 5: Access the Application

1. Open http://localhost:3000 in your browser
2. Create a new account (Signup)
3. Start learning with available features!

## Test Data

After seeding, you can use any account created through the signup form to access the application.

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Or verify MongoDB Atlas connection string in `.env`

### Port Already in Use
- Backend: Change PORT in `.env` (update frontend API URL too)
- Frontend: npm will ask to use a different port

### Module Not Found
- Run `npm install` in the directory that's failing
- Clear node_modules and reinstall if needed

### CORS Errors
- Verify `FRONTEND_URL` in backend `.env`
- Ensure backend is running on the correct port

## Features Overview

### 1. Interactive Election Simulator
- Navigate to Dashboard → Election Simulator
- Choose a role (Voter, Candidate, Officer)
- Progress through 4 stages with interactive decisions

### 2. AI Election Assistant
- Go to Dashboard → AI Assistant
- Ask election-related questions
- Get instant answers from the knowledge base

### 3. First-Time Voter Guide
- Access from Dashboard → Voter Guide
- Complete 4-step checklist for voting
- Track progress with visual indicators

### 4. Misinformation Detection
- Open Dashboard → Detect Misinformation
- Identify fake news vs. real content
- Track your accuracy and score

### 5. Election Timeline
- View Dashboard → Election Timeline
- Explore 4 stages of the election process
- Learn detailed information for each stage

### 6. User Dashboard
- View overall progress and awareness score
- Check earned badges
- See modules completed
- Access all features from one place

### 7. Leaderboard
- Compete with other learners
- View top performers
- Check your ranking

## API Documentation

All API endpoints are documented in the main README.md

## Development

### Backend Structure
```
backend/
├── models/          # MongoDB schemas
├── controllers/     # Business logic
├── routes/         # API endpoints
├── middleware/     # Auth & validation
└── server.js       # Entry point
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/      # Feature pages
│   ├── services/   # API integration
│   ├── context/    # State management
│   └── App.js      # Main router
```

## Default Test Account

After seeding, no default accounts are created. You must:
1. Sign up with any email and password
2. Login with those credentials
3. Access the application

## Next Steps

1. **Customize Content**: Add more Q&A to knowledge base
2. **Extend Features**: Add video tutorials or live chat
3. **Mobile App**: Build React Native version
4. **Analytics**: Add user engagement tracking
5. **Gamification**: Enhanced badge system

## Support

For issues or questions, refer to the main README.md or the API documentation.

---

**Happy Learning!** 🎓
