import React, { useEffect, useState } from 'react';
import { progressAPI } from '../services/api';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await progressAPI.getLeaderboard(50);
      setLeaderboard(response.data);
    } catch (err) {
      setError('Failed to load leaderboard');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;

  return (
    <div className="leaderboard-container">
      <h1>🏆 Leaderboard</h1>
      <p className="subtitle">Top learners on ElectraLearn</p>

      {error && <div className="error-message">{error}</div>}

      <div className="leaderboard-card">
        {leaderboard.length > 0 ? (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Awareness Score</th>
                <th>Modules Completed</th>
                <th>Badges</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry._id} className={index < 3 ? 'top-rank' : ''}>
                  <td className="rank">
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index >= 3 && `#${index + 1}`}
                  </td>
                  <td className="username">{entry.userId?.username || 'Anonymous'}</td>
                  <td className="score">{Math.round(entry.awarenessScore || 0)}%</td>
                  <td className="modules">
                    {(entry.modulesCompleted?.simulatorCount || 0) +
                      (entry.modulesCompleted?.misinformationChallenges || 0) +
                      (entry.modulesCompleted?.voterGuideCompleted ? 1 : 0) +
                      (entry.modulesCompleted?.timelineExplored ? 1 : 0)}
                  </td>
                  <td className="badges">{entry.badges?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No leaderboard data available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
