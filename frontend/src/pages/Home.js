import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ElectraLearn</h1>
          <p>Your Interactive Election Education Platform</p>
          <p className="subtitle">
            Learn about elections, vote with confidence, and detect misinformation
          </p>
          {!user ? (
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            </div>
          ) : (
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <h2>Our Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Interactive Simulator</h3>
              <p>
                Experience the election process through role-based simulations.
                Learn as a voter, candidate, or election officer.
              </p>
            </div>
            <div className="feature-card">
              <h3>AI Assistant</h3>
              <p>
                Get instant answers to your election questions with our AI-powered
                assistant based on official guidelines.
              </p>
            </div>
            <div className="feature-card">
              <h3>Voter Guide</h3>
              <p>
                Step-by-step guide for first-time voters with checklists and
                required documentation information.
              </p>
            </div>
            <div className="feature-card">
              <h3>Detect Misinformation</h3>
              <p>
                Learn to identify fake news and misinformation with our
                gamified detection challenges.
              </p>
            </div>
            <div className="feature-card">
              <h3>Learning Timeline</h3>
              <p>
                Explore the election process timeline from announcement to
                counting with detailed explanations.
              </p>
            </div>
            <div className="feature-card">
              <h3>Progress Tracking</h3>
              <p>
                Track your learning progress, earn badges, and compete on
                the leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
