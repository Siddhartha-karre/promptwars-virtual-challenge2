import React, { useState, useEffect } from 'react';
import { simulatorAPI } from '../services/api';
import './FeaturePages.css';

const Simulator = () => {
  const [role, setRole] = useState('voter');
  const [currentSession, setCurrentSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userSessions, setUserSessions] = useState([]);

  useEffect(() => {
    fetchUserSessions();
  }, []);

  const fetchUserSessions = async () => {
    try {
      const response = await simulatorAPI.getUserSessions();
      setUserSessions(response.data);
    } catch (err) {
      setError('Failed to load sessions');
    }
  };

  const startSimulation = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await simulatorAPI.startSimulation(role);
      setCurrentSession(response.data.session);
      setUserSessions([response.data.session, ...userSessions]);
    } catch (err) {
      setError('Failed to start simulation');
    } finally {
      setIsLoading(false);
    }
  };

  const makeDecision = async (decision) => {
    if (!currentSession) return;
    setIsLoading(true);
    try {
      const response = await simulatorAPI.makeDecision(currentSession._id, decision);
      setCurrentSession(response.data.session);
    } catch (err) {
      setError('Failed to record decision');
    } finally {
      setIsLoading(false);
    }
  };

  const getDecisionOptions = () => {
    if (!currentSession) return [];

    const options = {
      registration: [
        { text: 'Complete voter registration', value: 'register' },
        { text: 'Skip for now', value: 'skip' },
      ],
      campaign: [
        { text: 'Support Candidate A', value: 'candidate_a' },
        { text: 'Support Candidate B', value: 'candidate_b' },
        { text: 'Remain neutral', value: 'neutral' },
      ],
      voting: [
        { text: 'Vote for Candidate A', value: 'vote_a' },
        { text: 'Vote for Candidate B', value: 'vote_b' },
        { text: 'Vote NOTA', value: 'nota' },
      ],
      counting: [
        { text: 'Verify counting process', value: 'verify' },
        { text: 'Accept results', value: 'accept' },
      ],
    };

    return options[currentSession.currentStage] || [];
  };

  return (
    <div className="feature-container">
      <h1>Interactive Election Simulator</h1>

      {error && <div className="error-message">{error}</div>}

      {!currentSession ? (
        <div className="card">
          <h2>Select Your Role</h2>
          <div className="role-selection">
            <div className="role-option">
              <input
                type="radio"
                id="voter"
                name="role"
                value="voter"
                checked={role === 'voter'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="voter">
                <h3>Voter</h3>
                <p>Experience the voting process</p>
              </label>
            </div>
            <div className="role-option">
              <input
                type="radio"
                id="candidate"
                name="role"
                value="candidate"
                checked={role === 'candidate'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="candidate">
                <h3>Candidate</h3>
                <p>Run a campaign</p>
              </label>
            </div>
            <div className="role-option">
              <input
                type="radio"
                id="officer"
                name="role"
                value="officer"
                checked={role === 'officer'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="officer">
                <h3>Election Officer</h3>
                <p>Manage the election process</p>
              </label>
            </div>
          </div>
          <button onClick={startSimulation} disabled={isLoading} className="btn-primary">
            {isLoading ? 'Starting...' : 'Start Simulation'}
          </button>
        </div>
      ) : (
        <div className="card">
          <div className="simulation-progress">
            <h2>Current Stage: {currentSession.currentStage.toUpperCase()}</h2>
            <p>Score: {currentSession.score}</p>
            {currentSession.completed && (
              <p className="completed-message">✓ Simulation Completed!</p>
            )}
          </div>

          {!currentSession.completed && (
            <div className="decision-options">
              <p>What will you do?</p>
              <div className="options-grid">
                {getDecisionOptions().map((option) => (
                  <button
                    key={option.value}
                    onClick={() => makeDecision(option.value)}
                    disabled={isLoading}
                    className="option-btn"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setCurrentSession(null)}
            className="btn-secondary"
            style={{ marginTop: '2rem' }}
          >
            Start New Session
          </button>
        </div>
      )}

      <div className="card" style={{ marginTop: '2rem' }}>
        <h2>Your Sessions ({userSessions.length})</h2>
        <div className="sessions-list">
          {userSessions.slice(0, 5).map((session) => (
            <div key={session._id} className="session-item">
              <span className="role-badge">{session.role}</span>
              <span className="stage-badge">{session.currentStage}</span>
              <span className="score-badge">Score: {session.score || 0}</span>
              {session.completed && <span className="completed-badge">✓ Completed</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Simulator;
