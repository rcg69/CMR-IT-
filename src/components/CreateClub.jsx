// Change import to StudentDashboard.css
import '../styles/StudentDashboard.css';

const CreateClub = () => {
  // ... keep all your existing logic ...

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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
