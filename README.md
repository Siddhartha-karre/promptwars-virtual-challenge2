# ElectraLearn - Interactive Election Education Platform

A comprehensive MERN stack application for interactive election education with simulations, AI assistance, and gamified learning.

## Features

### 1. **Interactive Election Simulator**
- Role-based simulations: Voter, Candidate, Election Officer
- Multi-stage progression: Registration → Campaign → Voting → Counting
- Decision-based outcomes with real-time feedback

### 2. **AI Election Assistant**
- Chat-based Q&A interface
- Knowledge base from Election Commission guidelines
- Instant answers to common questions

### 3. **First-Time Voter Guide**
- Step-by-step checklist for new voters
- Required documents tracker
- Progress monitoring

### 4. **Gamified Misinformation Detection**
- Identify fake news and misinformation
- Real vs. fake content challenges
- Scoring system and accuracy tracking

### 5. **Learning Timeline**
- Interactive election process breakdown
- 4 main stages: Announcement, Code of Conduct, Polling, Counting
- Clickable stages with detailed explanations

### 6. **User Progress System**
- Complete module tracking
- Awareness score calculation
- Badge system and leaderboard

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

### Frontend
- **Library**: React 18
- **Routing**: React Router v6
- **State Management**: Context API
- **HTTP Client**: Axios
- **Styling**: CSS

## Project Structure

```
challenge-2/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API route handlers
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth & error handling
│   ├── server.js         # Express server entry
│   ├── seedDatabase.js   # Database seeding script
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Feature pages
│   │   ├── services/     # API client
│   │   ├── context/      # React Context
│   │   ├── App.js        # Main app component
│   │   └── index.js      # React entry point
│   ├── public/
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js 14+
- MongoDB 4.4+
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will be available at `http://localhost:3000`

## Database Seeding

To populate initial data (knowledge base, timeline, misinformation content):

```bash
cd backend
npm run seed
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Election Simulator
- `POST /api/simulator/start` - Start new simulation
- `POST /api/simulator/decide` - Make a decision
- `GET /api/simulator/session/:sessionId` - Get session details
- `GET /api/simulator/my-sessions` - Get user's sessions

### AI Assistant
- `POST /api/assistant/search` - Search knowledge base
- `GET /api/assistant/common-questions` - Get common questions
- `GET /api/assistant/category/:category` - Get by category

### Misinformation Detection
- `GET /api/misinformation/challenge` - Get next challenge
- `POST /api/misinformation/submit-answer` - Submit answer
- `GET /api/misinformation/stats` - Get user stats

### Voter Guide
- `GET /api/voter-guide/guide` - Get voter guide
- `POST /api/voter-guide/complete-step` - Mark step complete
- `GET /api/voter-guide/progress` - Get progress

### Timeline
- `GET /api/timeline/all` - Get all timeline data
- `GET /api/timeline/stage/:stage` - Get by stage
- `GET /api/timeline/overview` - Get overview

### Progress & Leaderboard
- `GET /api/progress/user` - Get user progress
- `POST /api/progress/award-badge` - Award badge
- `GET /api/progress/awareness-score` - Calculate awareness score
- `GET /api/progress/leaderboard` - Get leaderboard

### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/electralearn
JWT_SECRET=your_secret_key_here
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Authentication Flow

1. User registers/logs in via `/login` or `/signup`
2. Backend returns JWT token and user data
3. Token is stored in localStorage
4. Token is included in all subsequent API requests via Authorization header
5. Protected routes redirect to login if no valid token

## Database Models

- **User**: User accounts and basic info
- **SimulatorSession**: Election simulation sessions
- **UserProgress**: User's learning progress
- **VoterGuide**: Voter guide progress
- **MisinformationChallenge**: Misinformation challenge records
- **MisinformationContent**: Misinformation content database
- **AssistantKnowledge**: Knowledge base for Q&A
- **TimelineData**: Election timeline information

## Features in Detail

### Interactive Simulator
- Users select a role (Voter, Candidate, Officer)
- Progress through 4 stages with decisions at each
- Get feedback on choices
- Earn scores based on decisions

### AI Assistant
- Search knowledge base with keywords
- Get answers from pre-defined Q&A
- Filter by category
- Related topics suggestions

### Voter Guide
- 4-step checklist for first-time voters
- Track required documents
- Mark steps as complete
- Progress bar visualization

### Misinformation Detection
- Random challenges from content database
- Identify real vs. fake content
- Get explanations for answers
- Track accuracy and scores

### Learning Timeline
- 4 main election stages
- Detailed information for each stage
- Interactive exploration
- Visual timeline representation

### Progress Dashboard
- Overall awareness score
- Badges earned
- Modules completed count
- Leaderboard ranking

## Contributing

To contribute to this project:

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License

## Support

For issues or questions, please contact the development team.

---

**ElectraLearn - Making Elections Interactive and Educational**
