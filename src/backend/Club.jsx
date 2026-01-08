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
  const storedStudent = (() => { try { return JSON.parse(localStorage.getItem('student')); } catch (e) { return null; } })();
  const student = location.state?.student || storedStudent;

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewAll, setViewAll] = useState(false); // false = my clubs, true = discover all

  useEffect(() => {
    if (!student?.email) {
      navigate('/student-login');
      return;
    }
    fetchClubs(viewAll);
  }, [student?.email, viewAll]);

  const fetchClubs = async (all = false) => {
    try {
      setLoading(true);

      const url = all
        ? `${API_BASE}/api/clubs`
        : `${API_BASE}/api/clubs/by-student?email=${encodeURIComponent(student.email)}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to load clubs');

      // handle both { clubs: [...] } and bare array responses
      const list = Array.isArray(data.clubs)
        ? data.clubs
        : Array.isArray(data)
        ? data
        : data.clubs || [];

      setClubs(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const requestJoin = async (club, e) => {
    // stop card click
    if (e && e.stopPropagation) e.stopPropagation();

    const id = club._id || club.id;
    if (!id) return alert('Cannot request to join: missing club id');

    try {
      const res = await fetch(`${API_BASE}/api/clubs/request-join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clubId: id, studentEmail: student.email, studentName: student.name })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to send request');
      }

      alert('Join request sent');
    } catch (err) {
      alert(err.message || 'Unable to send join request');
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
          <div className="student-dashboard-header" style={{ alignItems: 'center', display: 'flex', gap: '1rem' }}>
            <div className="student-dashboard-title-block">
              <h1>🎭 {viewAll ? 'Discover Clubs' : 'Your Clubs'}</h1>
              <p>{clubs.length} club(s) {viewAll ? 'available' : "you're part of"}</p>
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
              <button className="student-dashboard-btn" onClick={() => setViewAll(false)} disabled={!viewAll} style={{ padding: '0.5rem 0.75rem' }}>
                My Clubs
              </button>
              <button className="student-dashboard-btn" onClick={() => setViewAll(true)} disabled={viewAll} style={{ padding: '0.5rem 0.75rem' }}>
                Discover
              </button>
            </div>
          </div>

          <div className="student-dashboard-grid">
            {clubs.length === 0 ? (
              <div className="student-info-card" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem' }}>
                <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>No clubs yet</h3>
                <p style={{ color: 'var(--text-muted)' }}>Join or create clubs to connect with students!</p>
              </div>
            ) : (
              clubs.map((club) => {
                const isMember = club.members?.some(m => m === student.email);
                const isPresident = club.presidentEmail === student.email;
                return (
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

                      {viewAll && !isMember && !isPresident && (
                        <div style={{ marginTop: '0.75rem' }}>
                          <button onClick={(e) => requestJoin(club, e)} className="student-dashboard-primary-btn" style={{ background: '#f59e0b' }}>
                            Request to Join
                          </button>
                        </div>
                      )}

                      {isMember && <div style={{ marginTop: '0.75rem', color: 'var(--text-muted)' }}>You are a member</div>}
                    </div>
                  </div>
                );
              })
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
