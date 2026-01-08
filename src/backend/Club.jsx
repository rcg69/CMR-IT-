import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Club.css';

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
    navigate('/club-section', {
      state: {
        student,
        club: {
          id: club._id,
          name: club.name,
          description: club.description,
          presidentEmail: club.presidentEmail
        }
      }
    });
  };

  if (loading) return <div className="club-loading">Loading your clubs...</div>;
  if (error) return <div className="club-error">{error}</div>;

  return (
    <div className="club-page">
      <div className="club-container">
        <div className="club-header">
          <h1>🎭 Your Clubs</h1>
          <p>{clubs.length} club(s) you're part of</p>
        </div>

        <div className="club-grid">
          {clubs.length === 0 ? (
            <div className="club-empty">
              <h3>No clubs yet</h3>
              <p>Join or create clubs to connect with students!</p>
            </div>
          ) : (
            clubs.map((club) => (
              <div
                key={club._id}
                className="club-card"
                onClick={() => handleOpenClub(club)}
              >
                <h3>{club.name}</h3>
                <p>{club.description}</p>
                <p>👑 President: {club.presidentEmail}</p>
                <p>👥 Members: {club.members?.length || 0}</p>
              </div>
            ))
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            className="club-primary-btn"
            onClick={() => navigate('/create-club', { state: { student } })}
          >
            🆕 Create New Club
          </button>
        </div>
      </div>
    </div>
  );
};

export default Club;
