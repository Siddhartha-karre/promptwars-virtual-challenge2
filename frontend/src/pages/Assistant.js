import React, { useState } from 'react';
import { assistantAPI } from '../services/api';
import './FeaturePages.css';

const Assistant = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    try {
      const response = await assistantAPI.searchAnswers(query);
      setResults(response.data.results);
      if (response.data.results.length === 0) {
        setError('No answers found for your query. Try different keywords.');
      }
    } catch (err) {
      setError('Failed to search answers');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="feature-container">
      <h1>🤖 AI Election Assistant</h1>
      <p className="subtitle">Ask any question about elections and voting</p>

      {error && <div className="error-message">{error}</div>}

      <div className="card search-card">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Ask your question... (e.g., 'How do I vote?', 'What is NOTA?')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading} className="btn-primary">
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {results.length > 0 && (
        <div className="results-section">
          <h2>Found {results.length} Answer(s)</h2>
          <div className="answers-grid">
            {results.map((result) => (
              <div key={result._id} className="answer-card">
                <h3>{result.question}</h3>
                <p className="category">{result.category}</p>
                <p className="answer">{result.answer}</p>
                <p className="source">Source: {result.source}</p>
                {result.relatedTopics.length > 0 && (
                  <div className="related-topics">
                    <strong>Related:</strong> {result.relatedTopics.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card faq-card" style={{ marginTop: '2rem' }}>
        <h2>Common Questions</h2>
        <div className="faq-suggestions">
          <p>Try searching for:</p>
          <ul>
            <li>How do I register to vote?</li>
            <li>What is NOTA?</li>
            <li>What documents do I need for voting?</li>
            <li>How does the counting process work?</li>
            <li>What is the Model Code of Conduct?</li>
            <li>Can I vote by proxy?</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
