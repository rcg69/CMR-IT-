import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Club.css';

const getApiBase = () => {
  if (import.meta.env.DEV) return 'http://localhost:5000';
  return 'https://irah.onrender.com';
};
const API_BASE = getApiBase();

const ClubSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, club } = location.state || {};

  const [meetings, setMeetings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isPresident, setIsPresident] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student || !club) {
      navigate('/clubs');
      return;
    }
    loadClubData();
  }, []);

  const loadClubData = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/clubs/${club.id}`);
      const data = await res.json();

      setMeetings(data.meetings || []);
      setMessages(data.messages || []);
      setPendingRequests(data.club.pendingRequests || []);
      setIsPresident(data.club.presidentEmail === student.email);
    } catch (err) {
      console.error(err);
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
        clubId: club.id,
        senderEmail: student.email,
        senderName: student.name,
        text: newMessage
      })
    });

    setNewMessage('');
    loadClubData();
  };

  const approveMember = async (email) => {
    await fetch(`${API_BASE}/api/clubs/approve-member`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clubId: club.id,
        studentEmail: email,
        presidentEmail: student.email
      })
    });

    loadClubData();
  };

  if (loading) return <div className="club-loading">Loading club...</div>;

  return (
    <div className="club-section-page">
      <h1>{club.name}</h1>
      <p>{club.description}</p>

      <h2>📅 Meetings</h2>
      {meetings.length === 0 ? <p>No meetings yet</p> : meetings.map(m => (
        <div key={m._id}>
          <strong>{m.topic}</strong> — {m.date}
        </div>
      ))}

      <h2>💬 Discussions</h2>
      <form onSubmit={postMessage}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type message..."
        />
        <button type="submit">Post</button>
      </form>

      {messages.map(msg => (
        <div key={msg._id}>
          <strong>{msg.senderName}</strong>: {msg.text}
        </div>
      ))}

      {isPresident && pendingRequests.length > 0 && (
        <>
          <h2>✅ Pending Requests</h2>
          {pendingRequests.map(email => (
            <div key={email}>
              {email}
              <button onClick={() => approveMember(email)}>Approve</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ClubSection;
