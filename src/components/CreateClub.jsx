import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/StudentDashboard.css';

const getApiBase = () => {
  if (import.meta.env.DEV) return 'http://localhost:5000';
  return 'https://irah.onrender.com';
};
const API_BASE = getApiBase();

const CreateClub = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state?.student;

  const [clubName, setClubName] = useState('');
  const [description, setDescription] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [loading, setLoading] = useState(false);

  // Safety check
  if (!student?.email) {
    navigate('/student-login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clubName.trim() || !description.trim() || !secretKey.trim()) {
      alert('All fields required');
      return;
    }

    if (secretKey !== 'club@123') {
      alert('Invalid secret key');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/clubs/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clubName,
          description,
          presidentEmail: student.email
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Failed to create club');
        return;
      }

      alert('Club created successfully!');
      navigate('/clubs', { state: { student } });

    } catch (err) {
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-dashboard-page">
      <div className="student-dashboard-container">
        <div className="student-dashboard-card">
          <div className="student-dashboard-header">
            <div className="student-dashboard-title-block">
              <h1>🆕 Create New Club</h1>
              <p>Build your student community</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="student-dashboard-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="student-info-card">
              <div className="student-info-label">Club Name</div>
              <div className="student-info-value">
                <input
                  type="text"
                  placeholder="Enter club name (e.g., TechTribe, Pro-Grammars)"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  style={{
                    width: '100%', padding: '0.875rem', borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="student-info-card">
              <div className="student-info-label">Club Description</div>
              <div className="student-info-value">
                <textarea
                  placeholder="Describe your club's purpose, activities, and vision..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  style={{
                    width: '100%', padding: '0.875rem', borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="student-info-card">
              <div className="student-info-label">Secret Key</div>
              <div className="student-info-value">
                <input
                  type="password"
                  placeholder="Enter secret key"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  style={{
                    width: '100%', padding: '0.875rem', borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                  disabled={loading}
                />
              </div>
            </div>

            <div style={{ justifySelf: 'center', marginTop: '1rem' }}>
              <button 
                type="submit" 
                className="student-dashboard-primary-btn"
                disabled={loading}
                style={{ 
                  padding: '1rem 2.5rem', 
                  fontSize: '1.1rem',
                  background: '#10b981'
                }}
              >
                {loading ? 'Creating...' : '🚀 Launch Club'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClub;
