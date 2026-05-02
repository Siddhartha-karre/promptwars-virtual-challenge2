import React, { useEffect, useState } from 'react';
import { voterGuideAPI } from '../services/api';
import './FeaturePages.css';

const VoterGuide = () => {
  const [guide, setGuide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGuide();
  }, []);

  const fetchGuide = async () => {
    try {
      const response = await voterGuideAPI.getGuide();
      setGuide(response.data);
    } catch (err) {
      setError('Failed to load voter guide');
    } finally {
      setIsLoading(false);
    }
  };

  const completeStep = async (stepNumber) => {
    try {
      const response = await voterGuideAPI.completeStep(stepNumber);
      setGuide(response.data.guide);
    } catch (err) {
      setError('Failed to update step');
    }
  };

  if (isLoading) return <div className="feature-container"><p>Loading...</p></div>;

  return (
    <div className="feature-container">
      <h1>📋 First-Time Voter Guide</h1>
      <p className="subtitle">Complete checklist for your first voting experience</p>

      {error && <div className="error-message">{error}</div>}

      {guide && (
        <>
          <div className="card progress-card">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${guide.progress}%` }}
              ></div>
            </div>
            <p className="progress-text">{Math.round(guide.progress)}% Complete</p>
          </div>

          <div className="steps-container">
            {guide.steps.map((step) => (
              <div
                key={step.stepNumber}
                className={`step-card ${step.completed ? 'completed' : ''}`}
              >
                <div className="step-header">
                  <h3>
                    Step {step.stepNumber}: {step.stepName}
                  </h3>
                  <span className="step-status">
                    {step.completed ? '✓' : '○'}
                  </span>
                </div>
                <p className="step-description">{step.description}</p>
                {step.documents.length > 0 && (
                  <div className="documents">
                    <strong>Required Documents:</strong>
                    <ul>
                      {step.documents.map((doc, idx) => (
                        <li key={idx}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {!step.completed && (
                  <button
                    onClick={() => completeStep(step.stepNumber)}
                    className="btn-primary"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
            ))}
          </div>

          {guide.completed && (
            <div className="card completion-card">
              <h2>🎉 Congratulations!</h2>
              <p>You've completed all steps. You're ready to vote!</p>
              <p>Completed on: {new Date(guide.completedAt).toLocaleDateString()}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VoterGuide;
