import React, { useEffect, useState } from 'react';
import { timelineAPI } from '../services/api';
import './FeaturePages.css';

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    try {
      const response = await timelineAPI.getAllTimeline();
      setTimeline(response.data);
    } catch (err) {
      setError('Failed to load timeline');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="feature-container"><p>Loading...</p></div>;

  const stages = ['announcement', 'code-of-conduct', 'polling', 'counting'];
  const stageNames = {
    announcement: 'Election Announcement',
    'code-of-conduct': 'Model Code of Conduct',
    polling: 'Polling Day',
    counting: 'Result Counting',
  };

  return (
    <div className="feature-container">
      <h1>📅 Election Timeline</h1>
      <p className="subtitle">Understand the election process stage by stage</p>

      {error && <div className="error-message">{error}</div>}

      <div className="timeline-container">
        {stages.map((stage) => {
          const stageData = timeline.find((t) => t.stage === stage);
          return (
            <div key={stage} className="timeline-item">
              <h3>{stageNames[stage]}</h3>
              {stageData ? (
                <>
                  <p>{stageData.description}</p>
                  {stageData.details && stageData.details.length > 0 && (
                    <div className="details">
                      {stageData.details.map((detail, idx) => (
                        <div key={idx}>
                          <strong>{detail.heading}</strong>
                          <p>{detail.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p>Information coming soon...</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
