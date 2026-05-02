import React, { useEffect, useState } from 'react';
import { misinformationAPI } from '../services/api';
import './FeaturePages.css';

const Misinformation = () => {
  const [challenge, setChallenge] = useState(null);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    fetchChallenge();
    fetchStats();
  }, []);

  const fetchChallenge = async () => {
    setIsLoading(true);
    try {
      const response = await misinformationAPI.getChallenge();
      setChallenge(response.data);
    } catch (err) {
      setError('Failed to load challenge');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await misinformationAPI.getUserStats();
      setStats(response.data);
    } catch (err) {
      console.error('Failed to load stats');
    }
  };

  const submitAnswer = async (isReal) => {
    if (!challenge) return;
    setIsLoading(true);
    setFeedback(null);
    try {
      const response = await misinformationAPI.submitAnswer(
        challenge.contentId,
        isReal
      );
      setFeedback({
        isCorrect: response.data.isCorrect,
        message: response.data.feedback,
        score: response.data.score,
      });
      setTimeout(() => {
        fetchChallenge();
        fetchStats();
      }, 2000);
    } catch (err) {
      setError('Failed to submit answer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="feature-container">
      <h1>🔍 Gamified Misinformation Detection</h1>
      <p className="subtitle">Learn to identify fake news and misinformation</p>

      {error && <div className="error-message">{error}</div>}

      {stats && (
        <div className="stats-overview">
          <div className="stat-box">
            <h3>{stats.correctAnswers}</h3>
            <p>Correct Answers</p>
          </div>
          <div className="stat-box">
            <h3>{stats.totalChallenges}</h3>
            <p>Challenges Completed</p>
          </div>
          <div className="stat-box">
            <h3>{stats.accuracy}%</h3>
            <p>Accuracy</p>
          </div>
          <div className="stat-box">
            <h3>{stats.totalScore}</h3>
            <p>Total Score</p>
          </div>
        </div>
      )}

      {challenge && (
        <div className="card challenge-card">
          <h2>Is this real or fake?</h2>
          <div className="challenge-content">
            <div className="content-type">
              <span className="badge">{challenge.contentType}</span>
            </div>
            <p className="content-text">{challenge.content}</p>
          </div>

          {feedback ? (
            <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
              <h3>{feedback.isCorrect ? '✓ Correct!' : '✗ Incorrect'}</h3>
              <p>{feedback.message}</p>
              <p className="score-gained">Score: +{feedback.score - (stats?.totalScore || 0)}</p>
            </div>
          ) : (
            <div className="answer-buttons">
              <button
                onClick={() => submitAnswer(true)}
                disabled={isLoading}
                className="btn-real"
              >
                This is REAL
              </button>
              <button
                onClick={() => submitAnswer(false)}
                disabled={isLoading}
                className="btn-fake"
              >
                This is FAKE
              </button>
            </div>
          )}
        </div>
      )}

      {isLoading && <p className="loading">Loading next challenge...</p>}
    </div>
  );
};

export default Misinformation;
