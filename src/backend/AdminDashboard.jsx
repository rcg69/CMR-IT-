// src/backend/AdminDashboard.jsx (only the inner part changed)
import React, { useState } from 'react';
import '../styles/StudentDashboard.css';

const AdminDashboard = () => {
  const [studentFile, setStudentFile] = useState(null);
  const [teacherFile, setTeacherFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file, url) => {
    if (!file) {
      setStatus('Please select a file first.');
      return;
    }
    setLoading(true);
    setStatus('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      setStatus(`${data.message} (processed: ${data.insertedCount})`);
    } catch (err) {
      setStatus(err.message || 'Something went wrong during upload.');
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
              <h1>Admin Dashboard</h1>
              <p>Manage students, teachers & mentor mapping.</p>
            </div>
          </div>

          <div className="student-dashboard-grid">
            <div className="student-info-card">
              <div className="student-info-label">Upload Students</div>
              <div className="student-info-value">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={(e) => setStudentFile(e.target.files[0] || null)}
                  disabled={loading}
                  style={{ marginBottom: '0.75rem' }}
                />
                <button
                  className="student-dashboard-primary-btn"
                  onClick={() => uploadFile(studentFile, 'http://localhost:5000/api/admin/upload-students')}
                  disabled={loading}
                >
                  {loading ? 'Uploading...' : 'Upload Students'}
                </button>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                  Columns: email, password, name, rollNo, mentorTeacherEmail
                </p>
              </div>
            </div>

            <div className="student-info-card">
              <div className="student-info-label">Upload Teachers</div>
              <div className="student-info-value">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={(e) => setTeacherFile(e.target.files[0] || null)}
                  disabled={loading}
                  style={{ marginBottom: '0.75rem' }}
                />
                <button
                  className="student-dashboard-primary-btn"
                  onClick={() => uploadFile(teacherFile, 'http://localhost:5000/api/admin/upload-teachers')}
                  disabled={loading}
                >
                  {loading ? 'Uploading...' : 'Upload Teachers'}
                </button>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                  Columns: email, password, name, dept
                </p>
              </div>
            </div>
          </div>

          {status && (
            <div
              className="upload-status"
              style={{ marginTop: '1rem' }}
            >
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
