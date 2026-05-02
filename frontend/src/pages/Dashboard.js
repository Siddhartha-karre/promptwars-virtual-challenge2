import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { progressAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [progress, setProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await progressAPI.getUserProgress();
      setProgress(response.data);
    } catch (err) {
      setError('Failed to load progress');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="dashboard-container"><p>Loading...</p></div>;

  return (
    <div className="dashboard-container">
      <h1>Your Learning Dashboard</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-grid">
        <div className="card progress-card">
          <h2>Overall Progress</h2>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress?.awarenessScore || 0}%` }}
            ></div>
          </div>
          <p className="score">{Math.round(progress?.awarenessScore || 0)}% Awareness Score</p>
        </div>

        <div className="card badges-card">
          <h2>Badges Earned</h2>
          <div className="badges-list">
            {progress?.badges?.length > 0 ? (
              progress.badges.map((badge, idx) => (
                <span key={idx} className="badge">
                  {badge.name}
                </span>
              ))
            ) : (
              <p>No badges yet. Keep learning!</p>
            )}
          </div>
        </div>

        <div className="card modules-card">
          <h2>Modules Completed</h2>
          <ul className="modules-list">
            <li>
              Simulators: {progress?.modulesCompleted?.simulatorCount || 0}
            </li>
            <li>
              Voter Guide:{' '}
              {progress?.modulesCompleted?.voterGuideCompleted ? '✓' : '○'}
            </li>
            <li>
              Misinformation Challenges:{' '}
              {progress?.modulesCompleted?.misinformationChallenges || 0}
            </li>
            <li>
              Timeline Explored:{' '}
              {progress?.modulesCompleted?.timelineExplored ? '✓' : '○'}
            </li>
          </ul>
        </div>
      </div>

      <div className="features-section">
        <h2>Start Learning</h2>
        <div className="features-links">
          <Link to="/simulator" className="feature-link">
            📊 Election Simulator
          </Link>
          <Link to="/assistant" className="feature-link">
            🤖 AI Assistant
          </Link>
          <Link to="/voter-guide" className="feature-link">
            📋 Voter Guide
          </Link>
          <Link to="/misinformation" className="feature-link">
            🔍 Detect Misinformation
          </Link>
          <Link to="/timeline" className="feature-link">
            📅 Election Timeline
          </Link>
          <Link to="/leaderboard" className="feature-link">
            🏆 Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
