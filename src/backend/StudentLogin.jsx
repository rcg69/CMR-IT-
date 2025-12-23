import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StudentLogin.css';

const API_BASE = 'https://irah.onrender.com';

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
      const res = await fetch(`${API_BASE}/api/admin/login`, {
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
      navigate('/teacher-dashboard', { state: { teacher } });
    } catch (err) {
      setTeacherError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setTeacherLoading(false);
    }
  };

  return (
    <div className="student-login-page">
      {/* ... your existing JSX unchanged ... */}
    </div>
  );
};

export default StudentLogin;
