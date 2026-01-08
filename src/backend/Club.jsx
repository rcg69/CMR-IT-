import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Remove '../styles/Club.css' - use AdminDashboard's StudentDashboard.css
import '../styles/StudentDashboard.css'; 

const getApiBase = () => {
  if (import.meta.env.DEV) return 'http://localhost:5000';
  return 'https://irah.onrender.com';
};
const API_BASE = getApiBase();

const Club = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student;

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!student?.email) {
      navigate('/student-login');
      return;
    }
    fetchClubs();
  }, [student?.email]);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE}/api/clubs/by-student?email=${encodeURIComponent(student.email)}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to load clubs');

      setClubs(Array.isArray(data.clubs) ? data.clubs : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenClub = (club) => {
    const id = club._id || club.id;
    if (!id) {
      console.error('Club id missing:', club);
      alert('Unable to open club: missing id');
      return;
    }

    navigate(`/clubs/${id}`, {
      state: {
        student,
        club: {
          id,
          name: club.name,
          description: club.description,
          presidentEmail: club.presidentEmail
        }
      }
    });
  };

  if (loading) return (
    <div className="student-dashboard-page">
      <div className="student-dashboard-container">
        <div className="student-info-card" style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Loading your clubs...
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="student-dashboard-page">
      <div className="student-dashboard-container">
        <div className="student-info-card" style={{ 
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#ef4444'
        }}>
          {error}
        </div>
      </div>
    </div>
  );

  return (
    <div className="student-dashboard-page">
      <div className="student-dashboard-container">
        <div className="student-dashboard-card">
          <div className="student-dashboard-header">
            <div className="student-dashboard-title-block">
              <h1>🎭 Your Clubs</h1>
              <p>{clubs.length} club(s) you're part of</p>
            </div>
          </div>

          <div className="student-dashboard-grid">
            {clubs.length === 0 ? (
              <div className="student-info-card" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem' }}>
                <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>No clubs yet</h3>
                <p style={{ color: 'var(--text-muted)' }}>Join or create clubs to connect with students!</p>
              </div>
            ) : (
              clubs.map((club) => (
                <div
                  key={club._id || club.id}
                  className="student-info-card"
                  style={{ 
                    cursor: 'pointer',
                    background: 'rgba(59, 130, 246, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => handleOpenClub(club)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                >
                  <div className="student-info-label" style={{ color: '#3b82f6', fontWeight: 600 }}>
                    {club.name}
                  </div>
                  <div className="student-info-value">
                    <p style={{ marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                      {club.description}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)'
                    }}>
                      <span>👑 President: {club.presidentEmail}</span>
                      <span>👥 {club.members?.length || 0} members</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              className="student-dashboard-primary-btn"
              onClick={() => navigate('/create-club', { state: { student } })}
              style={{ background: '#10b981', padding: '0.875rem 2rem', fontSize: '1rem' }}
            >
              🆕 Create New Club
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Club;
