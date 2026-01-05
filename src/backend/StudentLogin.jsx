import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StudentLogin.css';

// Universal API_BASE - Dev + Prod
const getApiBase = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:5000'; // Backend dev port
  }
  return 'https://irah.onrender.com'; // Production
};

const API_BASE = getApiBase();

const StudentLogin = () => {
  const navigate = useNavigate();

  // ✅ NEW: single toggle to choose which form is visible
  const [activeRole, setActiveRole] = useState('student'); // 'student' | 'teacher' | 'admin'

  // student login state
  const [login, setLogin] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // admin login state
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminLogin, setAdminLogin] = useState({ email: '', password: '' });
  const [adminError, setAdminError] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  // teacher login state
  const [showTeacher, setShowTeacher] = useState(false);
  const [teacherLogin, setTeacherLogin] = useState({ email: '', password: '' });
  const [teacherError, setTeacherError] = useState('');
  const [teacherLoading, setTeacherLoading] = useState(false);

  // ✅ NEW: keep your old booleans, but sync them to the selected role
  const selectRole = (role) => {
    setActiveRole(role);

    // make only one form visible at a time (as you requested)
    setShowAdmin(role === 'admin');
    setShowTeacher(role === 'teacher');

    // optional: clear messages when switching
    setError('');
    setAdminError('');
    setTeacherError('');
  };

  // student handlers
  const handleChange = (e) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!login.email.includes('@cmrit.ac.in')) {
      setError('Please use your CMRIT email (student@cmrit.ac.in)');
      setLoading(false);
      return;
    }

    if (login.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/student/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const student = data;
      console.log('IRAH: student login success', student);
      navigate('/student-dashboard', { state: { student, appName: 'IRAH' } });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // admin handlers
  const handleAdminChange = (e) => {
    setAdminLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setAdminError('');
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminError('');

    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminLogin),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || 'Admin login failed');
      }

      console.log('IRAH: admin login success', data);
      navigate('/admin-dashboard');
    } catch (err) {
      setAdminError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setAdminLoading(false);
    }
  };

  // teacher handlers
  const handleTeacherChange = (e) => {
    setTeacherLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setTeacherError('');
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    setTeacherLoading(true);
    setTeacherError('');

    try {
      const res = await fetch(`${API_BASE}/api/teacher/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherLogin),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || 'Teacher login failed');
      }

      const teacher = data;
      console.log('IRAH: teacher login success', teacher);
      navigate('/teacher-dashboard', { state: { teacher, appName: 'IRAH' } });
    } catch (err) {
      setTeacherError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setTeacherLoading(false);
    }
  };

  return (
    <div className="student-login-page">
      <div className="login-container">
        <button className="back-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>

        <div className="login-card">
          <div className="login-header">
            <h1>IRAH Portal Login</h1>
            <p>Students, Teachers &amp; Admin access</p>
          </div>

          {/* ✅ NEW: Role toggle buttons */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center',
              margin: '0.75rem 0 1rem',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              className="login-btn"
              style={{
                width: 'auto',
                padding: '0.55rem 0.9rem',
                opacity: activeRole === 'student' ? 1 : 0.65,
              }}
              onClick={() => selectRole('student')}
            >
              Student
            </button>

            <button
              type="button"
              className="login-btn"
              style={{
                width: 'auto',
                padding: '0.55rem 0.9rem',
                opacity: activeRole === 'teacher' ? 1 : 0.65,
              }}
              onClick={() => selectRole('teacher')}
            >
              Teacher
            </button>

            <button
              type="button"
              className="login-btn"
              style={{
                width: 'auto',
                padding: '0.55rem 0.9rem',
                opacity: activeRole === 'admin' ? 1 : 0.65,
              }}
              onClick={() => selectRole('admin')}
            >
              Admin
            </button>
          </div>

          {/* Student login form (visible only when student selected) */}
          {activeRole === 'student' && (
            <form onSubmit={handleSubmit} className="login-form">
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <label htmlFor="studentEmail">Student Email</label>
                <input
                  id="studentEmail"
                  type="email"
                  name="email"
                  value={login.email}
                  onChange={handleChange}
                  placeholder="student@cmrit.ac.in"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="studentPassword">Password</label>
                <input
                  id="studentPassword"
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  disabled={loading}
                />
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Signing in...' : 'Student Sign In'}
              </button>
            </form>
          )}

          {/* Admin login form (visible only when admin selected) */}
          {showAdmin && activeRole === 'admin' && (
            <form
              onSubmit={handleAdminSubmit}
              className="login-form"
              style={{
                marginTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '1.2rem',
              }}
            >
              {adminError && <div className="error-message">{adminError}</div>}

              <div className="form-group">
                <label htmlFor="adminEmail">Admin Email</label>
                <input
                  id="adminEmail"
                  type="email"
                  name="email"
                  value={adminLogin.email}
                  onChange={handleAdminChange}
                  placeholder="admin@cmrit.ac.in"
                  required
                  disabled={adminLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="adminPassword">Admin Password</label>
                <input
                  id="adminPassword"
                  type="password"
                  name="password"
                  value={adminLogin.password}
                  onChange={handleAdminChange}
                  placeholder="Enter admin password"
                  required
                  disabled={adminLoading}
                />
              </div>

              <button type="submit" className="login-btn" disabled={adminLoading}>
                {adminLoading ? 'Verifying...' : 'Login as Admin'}
              </button>
            </form>
          )}

          {/* Teacher login form (visible only when teacher selected) */}
          {showTeacher && activeRole === 'teacher' && (
            <form
              onSubmit={handleTeacherSubmit}
              className="login-form"
              style={{
                marginTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '1.2rem',
              }}
            >
              {teacherError && <div className="error-message">{teacherError}</div>}

              <div className="form-group">
                <label htmlFor="teacherEmail">Teacher Email</label>
                <input
                  id="teacherEmail"
                  type="email"
                  name="email"
                  value={teacherLogin.email}
                  onChange={handleTeacherChange}
                  placeholder="teacher@cmrit.ac.in"
                  required
                  disabled={teacherLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="teacherPassword">Teacher Password</label>
                <input
                  id="teacherPassword"
                  type="password"
                  name="password"
                  value={teacherLogin.password}
                  onChange={handleTeacherChange}
                  placeholder="Enter teacher password"
                  required
                  disabled={teacherLoading}
                />
              </div>

              <button type="submit" className="login-btn" disabled={teacherLoading}>
                {teacherLoading ? 'Verifying...' : 'Login as Teacher'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
