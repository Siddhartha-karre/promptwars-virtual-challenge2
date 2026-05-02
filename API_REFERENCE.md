# API Reference - ElectraLearn

All endpoints are prefixed with `/api/`

## Authentication

### POST /auth/signup
Register a new user
```json
{
  "username": "string (required)",
  "email": "string (required)",
  "password": "string (required)",
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "userType": "general|student|first-time-voter|educator"
}
```

### POST /auth/login
Login user
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

---

## Election Simulator

### POST /simulator/start
Start a new simulation session
```json
{
  "role": "voter|candidate|officer"
}
```

### POST /simulator/decide
Make a decision in simulator
```json
{
  "sessionId": "string",
  "decision": "string"
}
```

### GET /simulator/session/:sessionId
Get specific session details

### GET /simulator/my-sessions
Get all user's simulator sessions

---

## AI Election Assistant

### POST /assistant/search
Search knowledge base
```json
{
  "query": "string"
}
```

### GET /assistant/common-questions
Get list of common questions

### GET /assistant/category/:category
Get answers by category

---

## Misinformation Detection

### GET /misinformation/challenge
Get a random misinformation challenge

### POST /misinformation/submit-answer
Submit answer to challenge
```json
{
  "contentId": "string",
  "userResponse": "boolean (true=real, false=fake)"
}
```

### GET /misinformation/stats
Get user's misinformation statistics

---

## First-Time Voter Guide

### GET /voter-guide/guide
Get voter guide for user

### POST /voter-guide/complete-step
Mark a step as complete
```json
{
  "stepNumber": "number"
}
```

### GET /voter-guide/progress
Get voter guide progress

---

## Election Timeline

### GET /timeline/all
Get all timeline data

### GET /timeline/stage/:stage
Get timeline for specific stage (announcement|code-of-conduct|polling|counting)

### GET /timeline/overview
Get overview of all 4 stages

---

## User Progress

### GET /progress/user
Get user's overall progress

### POST /progress/award-badge
Award a badge to user
```json
{
  "badgeName": "string",
  "description": "string"
}
```

### GET /progress/awareness-score
Calculate and get awareness score

### GET /progress/leaderboard?limit=10
Get leaderboard (optional limit parameter)

---

## User Profile

### GET /users/profile
Get user profile with progress

### PUT /users/profile
Update user profile
```json
{
  "firstName": "string",
  "lastName": "string",
  "age": "number",
  "userType": "general|student|first-time-voter|educator"
}
```

---

## Authentication

All protected endpoints require Authorization header:
```
Authorization: Bearer {token}
```

## Response Format

Success (200):
```json
{
  "message": "Operation successful",
  "data": {}
}
```

Error (400/401/500):
```json
{
  "message": "Error description"
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

---

## Rate Limiting

Currently not implemented. Recommended for production:
- 100 requests per hour per user
- 1000 requests per hour per IP

---

## Pagination

Some endpoints support pagination:
- `?limit=10` - Number of results (default 10)
- `?skip=0` - Skip n results (default 0)

Example: `/progress/leaderboard?limit=50`

---

## Data Types

| Type | Format |
|------|--------|
| Boolean | true/false |
| Number | 0, 1, 123, etc. |
| String | "text" |
| Email | "user@example.com" |
| Date | ISO 8601: "2024-01-01T12:00:00Z" |
| ObjectId | MongoDB ObjectId string |

---

## Examples

### Login Flow
```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "user@example.com"
  }
}
```

### Start Simulator
```bash
POST /api/simulator/start
Headers: Authorization: Bearer {token}
{
  "role": "voter"
}

Response:
{
  "message": "Simulation started",
  "session": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "role": "voter",
    "currentStage": "registration",
    "score": 0,
    "completed": false
  }
}
```

### Get Challenge
```bash
GET /api/misinformation/challenge
Headers: Authorization: Bearer {token}

Response:
{
  "contentId": "507f1f77bcf86cd799439013",
  "content": "Voting is only for people over 21",
  "contentType": "news"
}
```

---

## Troubleshooting

### 401 Unauthorized
- Token expired or invalid
- Solution: Login again to get new token

### 404 Not Found
- Resource doesn't exist
- Solution: Verify correct ID and endpoint

### 500 Server Error
- Backend error
- Solution: Check backend logs

---

## Testing Endpoints

Use Postman or similar tool:

1. **Set Base URL**: http://localhost:5000/api
2. **Set Token**: Add Authorization header in tests after login
3. **Send Requests**: Follow examples above

---

Generated: April 28, 2026
