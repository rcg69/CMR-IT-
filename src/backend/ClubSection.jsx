import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../styles/StudentDashboard.css';

const getApiBase = () => {
  if (import.meta.env.DEV) return 'http://localhost:5000';
  return 'https://irah.onrender.com';
};
const API_BASE = getApiBase();

const ClubSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clubId } = useParams();

  // student may come from navigation state or localStorage
  const storedStudent = (() => { try { return JSON.parse(localStorage.getItem('student')); } catch (e) { return null; } })();
  const student = location.state?.student || storedStudent;

  const [club, setClub] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isPresident, setIsPresident] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student?.email || !clubId) {
      navigate('/student-login');
      return;
    }
    loadClubData();
    // eslint-disable-next-line
  }, [clubId]);

  const loadClubData = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/clubs/${clubId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to load club');
      }

      setClub(data.club);
      setMeetings(data.meetings || []);
      setMessages(data.messages || []);
      setPendingRequests(data.club?.pendingRequests || []);
      setIsPresident(data.club?.presidentEmail === student.email);

    } catch (err) {
      console.error(err);
      navigate('/clubs');
    } finally {
      setLoading(false);
    }
  };

  const postMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await fetch(`${API_BASE}/api/clubs/post-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clubId,
        senderEmail: student.email,
        senderName: student.name,
        text: newMessage
      })
    });

    setNewMessage('');
    alert('Message sent');
  };

  const approveMember = async (email) => {
    await fetch(`${API_BASE}/api/clubs/approve-member`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clubId,
        studentEmail: email,
        presidentEmail: student.email
      })
    });

    alert('Member approved');
  };

  const requestJoin = async () => {
    if (!student?.email) return navigate('/student-login');

    await fetch(`${API_BASE}/api/clubs/request-join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clubId, studentEmail: student.email, studentName: student.name })
    });

    alert('Join request sent');
  };

  if (loading) return (
    <div className="student-dashboard-page">
      <div className="student-dashboard-container">
        <div className="student-info-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ color: 'var(--text-muted)' }}>Loading club...</div>
        </div>
      </div>
    </div>
  );

  if (!club) return null;

  const isMember = club.members?.some(m => m === student.email);

  return (
    <div className="student-dashboard-page">
      <div className="student-dashboard-container">
        <div className="student-dashboard-card">
          <div className="student-dashboard-header">
            <div className="student-dashboard-title-block">
              <h1>{club.name}</h1>
              <p>{club.description}</p>
            </div>

            <div style={{ marginLeft: 'auto' }}>
              {isMember && <span style={{ color: 'var(--text-muted)' }}>You are a member</span>}
              {!isMember && !isPresident && (
                <button onClick={requestJoin} className="student-dashboard-primary-btn" style={{ marginLeft: '0.75rem', background: '#f59e0b' }}>
                  Request to Join
                </button>
              )}
            </div>
          </div>

          <div className="student-dashboard-grid">
            {/* Meetings */}
            <div className="student-info-card">
              <div className="student-info-label">📅 Meetings</div>
              <div className="student-info-value">
                {meetings.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>No meetings yet</p>
                ) : (
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {meetings.map(m => (
                      <div key={m._id} style={{ 
                        padding: '0.75rem', 
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        fontSize: '0.9rem'
                      }}>
                        <strong>{m.topic}</strong> — {m.date}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Discussions */}
            <div className="student-info-card" style={{ gridColumn: '1/-1' }}>
              <div className="student-info-label">💬 Discussions</div>
              <div className="student-info-value">
                <form onSubmit={postMessage} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type message..."
                      style={{
                        flex: 1, padding: '0.75rem', borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <button 
                      type="submit" 
                      className="student-dashboard-primary-btn"
                      style={{ padding: '0.75rem 1.5rem' }}
                    >
                      Post
                    </button>
                  </div>
                </form>

                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {messages.map(msg => (
                    <div key={msg._id} style={{
                      padding: '0.75rem', 
                      background: 'rgba(59,130,246,0.05)',
                      borderRadius: '8px',
                      marginBottom: '0.5rem',
                      borderLeft: '3px solid #3b82f6'
                    }}>
                      <strong style={{ color: '#3b82f6' }}>{msg.senderName}</strong>: {msg.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* President Controls */}
            {isPresident && pendingRequests.length > 0 && (
              <div className="student-info-card" style={{ background: 'rgba(16,185,129,0.05)' }}>
                <div className="student-info-label" style={{ color: '#10b981' }}>✅ Pending Requests</div>
                <div className="student-info-value">
                  {pendingRequests.map(email => (
                    <div key={email} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)'
                    }}>
                      <span>{email}</span>
                      <button 
                        onClick={() => approveMember(email)}
                        className="student-dashboard-primary-btn"
                        style={{ 
                          padding: '0.5rem 1rem', 
                          fontSize: '0.8rem',
                          background: '#10b981'
                        }}
                      >
                        Approve
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubSection;
