// src/backend/TeacherDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/StudentDashboard.css';

// Universal API_BASE - Dev + Prod
const getApiBase = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:5000'; // Backend dev port
  }
  return 'https://irah.onrender.com'; // Production
};
const API_BASE = getApiBase();

const TeacherDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const teacher = location.state?.teacher;

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [classDate, setClassDate] = useState(
    () => new Date().toISOString().slice(0, 10)
  );
  const [slot, setSlot] = useState(1); // 1..8
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  // ✅ NEW: navigate to examinations
  const handleOpenExaminations = () => {
    navigate('/examinations', { state: { teacher } });
  };

  // Fetch students assigned to this teacher
  useEffect(() => {
    const fetchStudents = async () => {
      if (!teacher?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const res = await fetch(`${API_BASE}/api/admin/students-by-mentor`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mentorTeacherEmail: teacher.email }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch students');
        }

        setStudents(data.students || []);

        const initial = {};
        (data.students || []).forEach((s) => {
          initial[s.email] = 'present';
        });
        setAttendance(initial);
      } catch (err) {
        console.error('Fetch students error:', err);
        setError(err.message || 'Could not fetch assigned students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [teacher?.email]);

  if (!teacher) {
    return (
      <div className="student-dashboard-page">
        <div className="student-dashboard-container">
          <div className="student-dashboard-card">
            <div className="student-dashboard-header">
              <div className="student-dashboard-title-block">
                <h1>Session expired</h1>
                <p>Please login again to access your teacher dashboard.</p>
              </div>
              <div className="student-dashboard-actions">
                <button
                  className="student-dashboard-primary-btn"
                  onClick={() => navigate('/student-login')}
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleStatusChange = (studentEmail, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentEmail]: status,
    }));
  };

  const handleSaveAttendance = async () => {
    if (!classDate) {
      setSaveMessage('Please select a date');
      return;
    }
    if (!slot) {
      setSaveMessage('Please select a slot');
      return;
    }
    if (!subject.trim()) {
      setSaveMessage('Please enter subject name');
      return;
    }
    if (students.length === 0) {
      setSaveMessage('No students to mark attendance for');
      return;
    }

    setSaving(true);
    setSaveMessage('');

    try {
      const records = students.map((s) => ({
        studentEmail: s.email,
        status: attendance[s.email] || 'absent',
      }));

      const res = await fetch(`${API_BASE}/api/teacher/mark-attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mentorTeacherEmail: teacher.email,
          date: classDate,
          slot: Number(slot),
          subject: subject.trim(),
          records,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || 'Failed to save attendance');
      }

      setSaveMessage(
        `✅ Attendance saved for ${classDate}, Slot ${slot} - ${subject}. Records: ${data.count}`
      );
    } catch (err) {
      console.error('Save attendance error:', err);
      setSaveMessage(err.message || 'Error saving attendance');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="student-dashboard-page">
      <div className="student-dashboard-container">
        <div className="student-dashboard-card">
          {/* Header */}
          <div className="student-dashboard-header">
            <div className="student-dashboard-title-block">
              <h1>Welcome, {teacher.name || 'IRAH Teacher'}</h1>
              <p>Department: {teacher.dept || 'N/A'}</p>
            </div>

            <div className="student-dashboard-actions">
              <button
                className="student-dashboard-primary-btn"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>

              {/* ✅ NEW: Examinations */}
              <button
                className="student-dashboard-primary-btn"
                onClick={handleOpenExaminations}
              >
                Examinations
              </button>

              <button
                className="student-dashboard-ghost-btn"
                onClick={() => navigate('/student-login')}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Top info */}
          <div className="student-dashboard-grid">
            <div className="student-info-card">
              <div className="student-info-label">Email</div>
              <div className="student-info-value">{teacher.email}</div>
            </div>

            <div className="student-info-card">
              <div className="student-info-label">Role</div>
              <div className="student-info-value">Mentor Faculty</div>
            </div>

            <div className="student-info-card">
              <div className="student-info-label">Assigned Students</div>
              <div className="student-info-value">
                {loading ? 'Loading...' : students.length}
              </div>
            </div>
          </div>

          {/* Date Slot Subject Save */}
          <div
            style={{
              marginTop: '1.5rem',
              marginBottom: '1rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.25rem',
                }}
              >
                Class Date
              </label>
              <input
                type="date"
                value={classDate}
                onChange={(e) => setClassDate(e.target.value)}
                style={{
                  background: 'rgba(5, 8, 25, 0.85)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '0.5rem 0.75rem',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.25rem',
                }}
              >
                Slot (1-8)
              </label>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                style={{
                  background: 'rgba(5, 8, 25, 0.85)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '0.5rem 0.75rem',
                  color: 'var(--text-primary)',
                  minWidth: '80px',
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ minWidth: '180px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.25rem',
                }}
              >
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Mathematics"
                style={{
                  background: 'rgba(5, 8, 25, 0.85)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '0.5rem 0.75rem',
                  color: 'var(--text-primary)',
                  minWidth: '180px',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button
                className="student-dashboard-primary-btn"
                onClick={handleSaveAttendance}
                disabled={saving || loading || students.length === 0}
              >
                {saving ? 'Saving...' : 'Save Attendance'}
              </button>

              {saveMessage ? (
                <span
                  style={{
                    fontSize: '0.9rem',
                    color: saveMessage.includes('saved') ? '#22c55e' : '#f97316',
                  }}
                >
                  {saveMessage}
                </span>
              ) : null}
            </div>
          </div>

          {/* Error */}
          {error ? (
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
              {error}
            </div>
          ) : null}

          {/* Students list */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              Loading your students...
            </div>
          ) : students.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              No students assigned yet. Ensure students have your email in mentorTeacherEmail.
            </div>
          ) : (
            <div
              className="student-list-container"
              style={{ maxHeight: '400px', overflowY: 'auto', marginTop: '1rem' }}
            >
              {students.map((student) => (
                <div
                  key={student.id || student.email}
                  className="student-info-card"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                      {student.name || 'Unnamed Student'}
                    </div>
                    <div
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        gap: '1rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span>{student.rollNo || 'No Roll No'}</span>
                      <span>{student.email}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                      className="student-dashboard-primary-btn"
                      type="button"
                      style={{
                        padding: '0.4rem 0.8rem',
                        background:
                          attendance[student.email] === 'present'
                            ? 'linear-gradient(135deg, #22c55e, #4ade80)'
                            : undefined,
                      }}
                      onClick={() => handleStatusChange(student.email, 'present')}
                    >
                      P
                    </button>

                    <button
                      className="student-dashboard-ghost-btn"
                      type="button"
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderColor: attendance[student.email] === 'absent' ? '#ef4444' : undefined,
                        color: attendance[student.email] === 'absent' ? '#ef4444' : undefined,
                      }}
                      onClick={() => handleStatusChange(student.email, 'absent')}
                    >
                      A
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
