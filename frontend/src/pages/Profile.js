import React, { useEffect, useState } from 'react';
import { userAPI, progressAPI } from '../services/api';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setProfile(response.data);
      setFormData({
        firstName: response.data.user.firstName || '',
        lastName: response.data.user.lastName || '',
        age: response.data.user.age || '',
      });
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await userAPI.updateProfile(formData);
      await fetchProfile();
      setEditMode(false);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (isLoading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      {error && <div className="error-message">{error}</div>}

      {profile && (
        <>
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {profile.user.username?.charAt(0).toUpperCase()}
              </div>
              <div className="profile-info">
                <h2>{profile.user.username}</h2>
                <p>{profile.user.email}</p>
                <span className="user-type">{profile.user.userType}</span>
              </div>
            </div>

            {editMode ? (
              <div className="profile-form">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                </div>
                <div className="button-group">
                  <button
                    onClick={handleSaveProfile}
                    className="btn-save"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="profile-details">
                  <div className="detail-row">
                    <span className="label">First Name:</span>
                    <span className="value">{profile.user.firstName || 'Not set'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Last Name:</span>
                    <span className="value">{profile.user.lastName || 'Not set'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Age:</span>
                    <span className="value">{profile.user.age || 'Not set'}</span>
                  </div>
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="btn-edit"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>

          {profile.progress && (
            <div className="progress-summary">
              <h3>Your Progress Summary</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="label">Awareness Score</span>
                  <span className="value">{profile.progress.awarenessScore || 0}%</span>
                </div>
                <div className="summary-item">
                  <span className="label">Simulators Completed</span>
                  <span className="value">
                    {profile.progress.modulesCompleted?.simulatorCount || 0}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="label">Misinformation Challenges</span>
                  <span className="value">
                    {profile.progress.modulesCompleted?.misinformationChallenges || 0}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="label">Badges Earned</span>
                  <span className="value">{profile.progress.badges?.length || 0}</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
