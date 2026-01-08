// Same imports, change to StudentDashboard.css
import '../styles/StudentDashboard.css';

const ClubSection = () => {
  // ... keep all your existing logic exactly the same ...

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

  return (
    <div className="student-dashboard-page">
      <div className="student-dashboard-container">
        <div className="student-dashboard-card">
          <div className="student-dashboard-header">
            <div className="student-dashboard-title-block">
              <h1>{club.name}</h1>
              <p>{club.description}</p>
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
