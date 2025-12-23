// src/backend/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import '../styles/StudentDashboard.css';

const API_BASE = 'https://irah.onrender.com';

const AdminDashboard = () => {
  const [studentFile, setStudentFile] = useState(null);
  const [teacherFile, setTeacherFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState('');

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
      // refresh lists after upload
      await fetchUsers();
    } catch (err) {
      setStatus(err.message || 'Something went wrong during upload.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setListLoading(true);
      setListError('');
      const res = await fetch(`${API_BASE}/api/admin/list-users`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || 'Failed to load users');
      }
      setStudents(data.students || []);
      setTeachers(data.teachers || []);
    } catch (err) {
      setListError(err.message || 'Could not load users');
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="student-dashboard-page">
      <div className="student-dashboard-container">
        <div className="student-dashboard-card">
          <div className="student-dashboard-header">
            <div className="student-dashboard-title-block">
              <h1>IRAH Admin Dashboard</h1>
              <p>Manage students, teachers &amp; mentor mapping.</p>
            </div>
          </div>

          <div className="student-dashboard-grid">
            {/* Upload Students */}
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
                  onClick={() =>
                    uploadFile(
                      studentFile,
                      `${API_BASE}/api/admin/upload-students`
                    )
                  }
                  disabled={loading}
                >
                  {loading ? 'Uploading...' : 'Upload Students'}
                </button>
                <p
                  style={{
                    fontSize: '0.8rem',
                    marginTop: '0.5rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  Columns: email, password, name, rollNo, mentorTeacherEmail
                </p>
              </div>
            </div>

            {/* Upload Teachers */}
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
                  onClick={() =>
                    uploadFile(
                      teacherFile,
                      `${API_BASE}/api/admin/upload-teachers`
                    )
                  }
                  disabled={loading}
                >
                  {loading ? 'Uploading...' : 'Upload Teachers'}
                </button>
                <p
                  style={{
                    fontSize: '0.8rem',
                    marginTop: '0.5rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  Columns: email, password, name, dept
                </p>
              </div>
            </div>
          </div>

          {status && (
            <div
              className="upload-status"
              style={{ marginTop: '1rem', color: '#e5e7eb', fontSize: '0.9rem' }}
            >
              {status}
            </div>
          )}

          {/* Users list */}
          <div style={{ marginTop: '2rem' }}>
            <h2
              style={{
                fontSize: '1.1rem',
                marginBottom: '0.75rem',
                color: 'var(--text-primary)',
              }}
            >
              Active Users
            </h2>

            {listLoading ? (
              <div
                style={{
                  padding: '1rem',
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                }}
              >
                Loading users...
              </div>
            ) : listError ? (
              <div
                style={{
                  padding: '1rem',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  color: '#ef4444',
                  marginBottom: '1rem',
                }}
              >
                {listError}
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1.6fr)',
                  gap: '1.5rem',
                }}
              >
                {/* Students list */}
                <div>
                  <h3
                    style={{
                      fontSize: '1rem',
                      marginBottom: '0.5rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Students ({students.length})
                  </h3>
                  {students.length === 0 ? (
                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      No students added yet.
                    </p>
                  ) : (
                    <div
                      style={{
                        maxHeight: '260px',
                        overflowY: 'auto',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '0.75rem',
                      }}
                    >
                      {students.map((s) => (
                        <div
                          key={s._id || s.email}
                          style={{
                            padding: '0.6rem 0.75rem',
                            borderBottom:
                              '1px solid rgba(148, 163, 184, 0.25)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '0.75rem',
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: '0.9rem',
                              }}
                            >
                              {s.name || 'Student'}
                            </div>
                            <div
                              style={{
                                fontSize: '0.8rem',
                                color: 'var(--text-muted)',
                              }}
                            >
                              {s.rollNo || 'No Roll No'}
                            </div>
                            <div
                              style={{
                                fontSize: '0.78rem',
                                color: 'var(--text-muted)',
                              }}
                            >
                              {s.email}
                            </div>
                          </div>
                          <div
                            style={{
                              fontSize: '0.75rem',
                              color: '#22c55e',
                              alignSelf: 'center',
                            }}
                          >
                            Active
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Teachers list */}
                <div>
                  <h3
                    style={{
                      fontSize: '1rem',
                      marginBottom: '0.5rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Teachers ({teachers.length})
                  </h3>
                  {teachers.length === 0 ? (
                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      No teachers added yet.
                    </p>
                  ) : (
                    <div
                      style={{
                        maxHeight: '260px',
                        overflowY: 'auto',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '0.75rem',
                      }}
                    >
                      {teachers.map((t) => (
                        <div
                          key={t._id || t.email}
                          style={{
                            padding: '0.6rem 0.75rem',
                            borderBottom:
                              '1px solid rgba(148, 163, 184, 0.25)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '0.75rem',
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: '0.9rem',
                              }}
                            >
                              {t.name || 'Teacher'}
                            </div>
                            <div
                              style={{
                                fontSize: '0.8rem',
                                color: 'var(--text-muted)',
                              }}
                            >
                              {t.dept || 'Dept N/A'}
                            </div>
                            <div
                              style={{
                                fontSize: '0.78rem',
                                color: 'var(--text-muted)',
                              }}
                            >
                              {t.email}
                            </div>
                          </div>
                          <div
                            style={{
                              fontSize: '0.75rem',
                              color: '#22c55e',
                              alignSelf: 'center',
                            }}
                          >
                            Active
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
