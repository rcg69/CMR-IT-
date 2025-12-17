// src/backend/StudentLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StudentLogin.css';

const StudentLogin = () => {
  const navigate = useNavigate();

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
      const res = await fetch('http://localhost:5000/api/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const student = data;
      navigate('/student-dashboard', { state: { student } });
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
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminLogin),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || 'Admin login failed');
      }

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
      const res = await fetch('http://localhost:5000/api/teacher/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherLogin),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || 'Teacher login failed');
      }

      const teacher = data;
      navigate('/teacher-dashboard', { state: { teacher } });
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
          ← Back to Home
        </button>

        <div className="login-card">
          <div className="login-header">
            <h1>CMRIT Portal Login</h1>
            <p>Students, Teachers & Admin access</p>
          </div>

          {/* Student login form */}
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

          {/* Toggle admin & teacher login */}
          <div className="login-footer">
            <p>Other logins</p>
            <div>
              <button
                className="forgot-password"
                type="button"
                onClick={() => setShowAdmin((prev) => !prev)}
              >
                {showAdmin ? 'Hide Admin Login' : 'Admin Login'}
              </button>
              <button
                className="forgot-password"
                type="button"
                onClick={() => setShowTeacher((prev) => !prev)}
              >
                {showTeacher ? 'Hide Teacher Login' : 'Teacher Login'}
              </button>
            </div>
          </div>

          {/* Admin login form */}
          {showAdmin && (
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

              <button
                type="submit"
                className="login-btn"
                disabled={adminLoading}
              >
                {adminLoading ? 'Verifying...' : 'Login as Admin'}
              </button>
            </form>
          )}

          {/* Teacher login form */}
          {showTeacher && (
            <form
              onSubmit={handleTeacherSubmit}
              className="login-form"
              style={{
                marginTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '1.2rem',
              }}
            >
              {teacherError && (
                <div className="error-message">{teacherError}</div>
              )}

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

              <button
                type="submit"
                className="login-btn"
                disabled={teacherLoading}
              >
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
