// src/backend/StudentDashboard.jsx
import React, { useEffect, useState, useMemo } from 'react';
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

const StudentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student;

  // ✅ NEW: navigate to examinations
  const handleOpenExaminations = () => {
    navigate('/examinations', { state: { student } });
  };

  // ✅ NEW: navigate to clubs (ADDED)
  const handleOpenClubs = () => {
    navigate('/clubs', { state: { student } });
  };

  // Attendance summary state
  const [attendance, setAttendance] = useState({
    totalClasses: 0,
    present: 0,
    absent: 0,
    percentage: 0,
  });
  const [attLoading, setAttLoading] = useState(true);
  const [attError, setAttError] = useState('');

  // Attendance records state
  const [records, setRecords] = useState([]);
  const [recLoading, setRecLoading] = useState(true);
  const [recError, setRecError] = useState('');

  // Calendar state
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

  // Profile state
  const [profile, setProfile] = useState({
    phone: '',
    branch: '',
    year: '',
    section: '',
    address: '',
    interests: '',
    guardianName: '',
    guardianPhone: '',
    bloodGroup: '',
    extraInfo: '',
    profileImageUrl: '',
  });
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  // Toggle for showing/hiding profile section
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  // SUMMARY - Fetch attendance summary
  useEffect(() => {
    const fetchAttendance = async () => {
      if (!student?.email) {
        setAttLoading(false);
        return;
      }

      try {
        setAttLoading(true);
        setAttError('');

        const res = await fetch(
          `${API_BASE}/api/student/attendance-summary?email=${encodeURIComponent(student.email)}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to load attendance');

        setAttendance({
          totalClasses: data.totalClasses || 0,
          present: data.present || 0,
          absent: data.absent || 0,
          percentage: data.percentage || 0,
        });
      } catch (err) {
        console.error('Attendance summary error:', err);
        setAttError(err.message || 'Could not load attendance');
      } finally {
        setAttLoading(false);
      }
    };

    fetchAttendance();
  }, [student?.email]);

  // RECORDS - Fetch attendance records
  useEffect(() => {
    const fetchRecords = async () => {
      if (!student?.email) {
        setRecLoading(false);
        return;
      }

      try {
        setRecLoading(true);
        setRecError('');

        const res = await fetch(
          `${API_BASE}/api/student/attendance-records?email=${encodeURIComponent(student.email)}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to load attendance records');

        setRecords(Array.isArray(data.records) ? data.records : []);
      } catch (err) {
        console.error('Attendance records error:', err);
        setRecError(err.message || 'Could not load attendance records');
      } finally {
        setRecLoading(false);
      }
    };

    fetchRecords();
  }, [student?.email]);

  // PROFILE FETCH
  useEffect(() => {
    const fetchProfile = async () => {
      if (!student?.email) {
        setProfileLoading(false);
        return;
      }

      try {
        setProfileLoading(true);
        setProfileError('');
        setProfileMessage('');

        const res = await fetch(
          `${API_BASE}/api/student/profile?email=${encodeURIComponent(student.email)}`
        );

        if (res.status === 404) {
          setProfileLoading(false);
          return;
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load profile');

        const p = data.profile;

        setProfile({
          phone: p.phone || '',
          branch: p.branch || '',
          year: p.year || '',
          section: p.section || '',
          address: p.address || '',
          interests: Array.isArray(p.interests) ? p.interests.join(', ') : p.interests || '',
          guardianName: p.guardianName || '',
          guardianPhone: p.guardianPhone || '',
          bloodGroup: p.bloodGroup || '',
          extraInfo: p.extraInfo || '',
          profileImageUrl: p.profileImageUrl || '',
        });
      } catch (err) {
        console.error('Profile load error:', err);
        setProfileError(err.message || 'Could not load profile');
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [student?.email]);

  // handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setProfileMessage('');
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    setProfileMessage('');
  };

  const handleImageUpload = async () => {
    if (!imageFile || !student?.email) return;

    try {
      setProfileError('');
      setProfileMessage('Uploading image...');

      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('email', student.email);

      const res = await fetch(`${API_BASE}/api/student/profile-image`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to upload image');

      const fullUrl = `${API_BASE}${data.profileImageUrl}`;

      setProfile((prev) => ({ ...prev, profileImageUrl: data.profileImageUrl }));
      setImagePreviewUrl(fullUrl);
      setProfileMessage('Image uploaded successfully!');
    } catch (err) {
      setProfileError(err.message || 'Could not upload image');
      setProfileMessage('');
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!student?.email) {
      setProfileError('Session expired. Please login again.');
      return;
    }

    setProfileSaving(true);
    setProfileError('');
    setProfileMessage('');

    try {
      const payload = {
        email: student.email,
        phone: profile.phone,
        branch: profile.branch,
        year: profile.year,
        section: profile.section,
        address: profile.address,
        interests: profile.interests,
        guardianName: profile.guardianName,
        guardianPhone: profile.guardianPhone,
        bloodGroup: profile.bloodGroup,
        extraInfo: profile.extraInfo,
      };

      const res = await fetch(`${API_BASE}/api/student/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save profile');

      setProfileMessage('Profile saved successfully!');
    } catch (err) {
      setProfileError(err.message || 'Could not save profile');
    } finally {
      setProfileSaving(false);
    }
  };

  // calendar helpers
  const dayStatusMap = useMemo(() => {
    const map = {};
    records.forEach((r) => {
      const d = r.date;

      if (!map[d]) {
        map[d] = { present: 0, absent: 0, slots: {} };
      }

      if (r.status === 'present') map[d].present += 1;
      if (r.status === 'absent') map[d].absent += 1;

      map[d].slots[r.slot] = { status: r.status, subject: r.subject };
    });
    return map;
  }, [records]);

  const daysInMonth = useMemo(
    () => new Date(viewYear, viewMonth + 1, 0).getDate(),
    [viewYear, viewMonth]
  );

  const firstDay = useMemo(
    () => new Date(viewYear, viewMonth, 1).getDay(),
    [viewYear, viewMonth]
  );

  const calendarDays = useMemo(() => {
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(
        2,
        '0'
      )}`;

      days.push({
        dayNumber: d,
        dateStr,
        status: dayStatusMap[dateStr] || { present: 0, absent: 0, slots: {} },
      });
    }

    return days;
  }, [viewYear, viewMonth, daysInMonth, firstDay, dayStatusMap]);

  const getDayColor = (info) => {
    if (!info) return 'transparent';
    const { present, absent } = info.status;
    if (present > 0 && absent === 0) return 'rgba(34, 197, 94, 0.3)';
    if (present > 0 && absent > 0) return 'rgba(234, 179, 8, 0.3)';
    if (present === 0 && absent > 0) return 'rgba(239, 68, 68, 0.25)';
    return 'rgba(255, 255, 255, 0.03)';
  };

  const handlePrevMonth = () => {
    setSelectedDate(null);
    setViewMonth((prev) => {
      if (prev === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setSelectedDate(null);
    setViewMonth((prev) => {
      if (prev === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  if (!student) {
    return (
      <div className="student-dashboard-page">
        <div className="student-dashboard-container">
          <div className="student-dashboard-card">
            <div className="student-dashboard-header">
              <div className="student-dashboard-title-block">
                <h1>Session expired</h1>
                <p>Please login again to access your student dashboard.</p>
              </div>
              <div className="student-dashboard-actions">
                <button className="student-dashboard-primary-btn" onClick={() => navigate('/student-login')}>
                  Go to Student Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const monthName = new Date(viewYear, viewMonth, 1).toLocaleString('default', { month: 'long' });
  const selectedInfo = selectedDate ? dayStatusMap[selectedDate] : null;

  const storedImage = profile.profileImageUrl;
  const displayImage = imagePreviewUrl
    ? imagePreviewUrl
    : storedImage
    ? storedImage.startsWith('http')
      ? storedImage
      : `${API_BASE}${storedImage}`
    : '';

  const avatarInitial = student.name?.[0]?.toUpperCase() || student.email?.[0]?.toUpperCase() || '?';

  return (
    <div className="student-dashboard-page">
      <div className="student-dashboard-container">
        <div className="student-dashboard-card">
          {/* Header */}
          <div className="student-dashboard-header">
            <div className="student-dashboard-title-block">
              <h1>Welcome, {student.name || 'IRAH Student'}</h1>
              <p>Your CMRIT student dashboard overview.</p>
            </div>

            <div className="student-dashboard-actions">
              <button className="student-dashboard-primary-btn" onClick={() => navigate('/')}>
                Back to Home
              </button>

              <button className="student-dashboard-primary-btn" onClick={handleOpenExaminations}>
                Examinations
              </button>

              {/* ✅ NEW CLUBS BUTTON - Added under Examinations */}
              <button 
                className="student-dashboard-primary-btn" 
                onClick={handleOpenClubs}
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  marginTop: '0.5rem',
                  border: 'none'
                }}
              >
                🎭 Clubs
              </button>

              <button className="student-dashboard-ghost-btn" onClick={() => navigate('/student-login')}>
                Logout
              </button>
            </div>
          </div>

          {/* Toggle profile info */}
          <div style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>
            <button
              type="button"
              className="student-dashboard-ghost-btn"
              onClick={() => setShowProfileInfo((prev) => !prev)}
            >
              {showProfileInfo ? 'Hide Info' : 'Show Info'}
            </button>
          </div>

          {/* Profile summary row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 2.2fr) minmax(0, 1.8fr)',
              gap: '1.5rem',
              marginTop: '0.5rem',
            }}
          >
            {/* Profile section */}
            {showProfileInfo ? (
              <div
                style={{
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: '1rem 1.25rem',
                  background: 'rgba(12, 18, 40, 0.8)',
                }}
              >
                {/* Avatar basic info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid rgba(129, 178, 241, 0.7)',
                      background: 'rgba(15,23,42,0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {displayImage ? (
                      <img
                        src={displayImage}
                        alt="Profile"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      avatarInitial
                    )}
                  </div>

                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                      {student.name}
                    </h3>
                    <p style={{ margin: '0.15rem 0 0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {student.rollNo} - CMRIT Student
                    </p>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {student.mentorTeacherEmail ? `Mentor: ${student.mentorTeacherEmail}` : 'Mentor not assigned'}
                    </p>
                  </div>
                </div>

                {/* File input upload */}
                <div className="student-file-row">
                  <label className="student-file-label">
                    <span className="student-file-button">Choose Photo</span>
                    <span className="student-file-text">{imageFile ? imageFile.name : 'No file chosen'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="student-file-input"
                      onChange={handleImageFileChange}
                    />
                  </label>

                  <button
                    type="button"
                    className="student-dashboard-primary-btn"
                    onClick={handleImageUpload}
                    disabled={!imageFile}
                  >
                    Upload Photo
                  </button>
                </div>

                {/* Profile form */}
                <form onSubmit={handleProfileSubmit} className="student-profile-form">
                  <div className="student-profile-grid2">
                    <div>
                      <label className="student-profile-label">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        className="student-profile-input"
                      />
                    </div>

                    <div>
                      <label className="student-profile-label">Branch</label>
                      <input
                        type="text"
                        name="branch"
                        value={profile.branch}
                        onChange={handleProfileChange}
                        className="student-profile-input"
                      />
                    </div>
                  </div>

                  <div className="student-profile-grid2">
                    <div>
                      <label className="student-profile-label">Year</label>
                      <input
                        type="text"
                        name="year"
                        value={profile.year}
                        onChange={handleProfileChange}
                        className="student-profile-input"
                      />
                    </div>

                    <div>
                      <label className="student-profile-label">Section</label>
                      <input
                        type="text"
                        name="section"
                        value={profile.section}
                        onChange={handleProfileChange}
                        className="student-profile-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="student-profile-label">Interests (comma separated)</label>
                    <input
                      type="text"
                      name="interests"
                      value={profile.interests}
                      onChange={handleProfileChange}
                      className="student-profile-input"
                    />
                  </div>

                  <div className="student-profile-grid2">
                    <div>
                      <label className="student-profile-label">Guardian Name</label>
                      <input
                        type="text"
                        name="guardianName"
                        value={profile.guardianName}
                        onChange={handleProfileChange}
                        className="student-profile-input"
                      />
                    </div>

                    <div>
                      <label className="student-profile-label">Guardian Phone</label>
                      <input
                        type="text"
                        name="guardianPhone"
                        value={profile.guardianPhone}
                        onChange={handleProfileChange}
                        className="student-profile-input"
                      />
                    </div>
                  </div>

                  <div className="student-profile-grid2">
                    <div>
                      <label className="student-profile-label">Blood Group</label>
                      <input
                        type="text"
                        name="bloodGroup"
                        value={profile.bloodGroup}
                        onChange={handleProfileChange}
                        className="student-profile-input"
                      />
                    </div>

                    <div>
                      <label className="student-profile-label">Address</label>
                      <textarea
                        name="address"
                        value={profile.address}
                        onChange={handleProfileChange}
                        rows={2}
                        className="student-profile-textarea"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="student-profile-label">Extra Info</label>
                    <textarea
                      name="extraInfo"
                      value={profile.extraInfo}
                      onChange={handleProfileChange}
                      rows={2}
                      className="student-profile-textarea"
                    />
                  </div>

                  {profileError ? <div className="student-profile-error">{profileError}</div> : null}
                  {profileMessage ? <div className="student-profile-success">{profileMessage}</div> : null}

                  <button
                    type="submit"
                    className="student-dashboard-primary-btn"
                    disabled={profileSaving || profileLoading}
                  >
                    {profileSaving ? 'Saving profile...' : profileLoading ? 'Loading profile...' : 'Save Profile'}
                  </button>
                </form>
              </div>
            ) : (
              <div />
            )}

            {/* Summary cards */}
            <div className="student-dashboard-grid">
              <div className="student-info-card">
                <div className="student-info-label">Registered Email</div>
                <div className="student-info-value">{student.email}</div>
              </div>

              <div className="student-info-card">
                <div className="student-info-label">Roll Number</div>
                <div className="student-info-value">{student.rollNo}</div>
              </div>

              <div className="student-info-card">
                <div className="student-info-label">Account Type</div>
                <div className="student-info-value">CMRIT Student</div>
              </div>

              <div className="student-info-card">
                <div className="student-info-label">Status</div>
                <div className="student-info-value">Active (demo)</div>
              </div>

              {student.mentorTeacherEmail ? (
                <div className="student-info-card">
                  <div className="student-info-label">Mentor Teacher</div>
                  <div className="student-info-value">{student.mentorTeacherEmail}</div>
                </div>
              ) : null}

              <div className="student-info-card">
                <div className="student-info-label">Attendance</div>
                <div className="student-info-value">
                  {attLoading ? 'Loading...' : `${attendance.percentage}% (${attendance.present}/${attendance.totalClasses})`}
                </div>
              </div>

              {attError ? <div className="student-profile-warning">{attError}</div> : null}
            </div>
          </div>

          {/* Attendance calendar */}
          <div style={{ marginTop: '2rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem',
              }}
            >
              <h3
                style={{
                  fontSize: '1.2rem',
                  margin: 0,
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-soft))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {monthName} {viewYear} Attendance
              </h3>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button className="student-dashboard-ghost-btn" type="button" onClick={handlePrevMonth}>
                  Prev
                </button>
                <button className="student-dashboard-ghost-btn" type="button" onClick={handleNextMonth}>
                  Next
                </button>
              </div>
            </div>

            {recError ? (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  marginBottom: '0.75rem',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  color: '#ef4444',
                  fontSize: '0.85rem',
                }}
              >
                {recError}
              </div>
            ) : null}

            {/* Weekday headers */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                gap: '0.35rem',
                fontSize: '0.8rem',
                marginBottom: '0.5rem',
                color: 'var(--text-muted)',
              }}
            >
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Calendar days */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                gap: '0.35rem',
              }}
            >
              {calendarDays.map((info, idx) => {
                if (!info) {
                  return <div key={`empty-${idx}`} style={{ minHeight: '40px' }} />;
                }

                const color = getDayColor(info);
                const isSelected = info.dateStr === selectedDate;

                return (
                  <button
                    key={info.dateStr}
                    type="button"
                    onClick={() => setSelectedDate(info.dateStr)}
                    style={{
                      minHeight: '40px',
                      borderRadius: '10px',
                      padding: '0.25rem 0.35rem',
                      background: color,
                      border: isSelected
                        ? '2px solid rgba(129, 178, 241, 0.9)'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'left' }}>
                      {info.dayNumber}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'left' }}>
                      {Object.keys(info.status.slots).length === 0
                        ? 'Slots: 0'
                        : `Slots: ${Object.keys(info.status.slots).length}`}
                    </div>
                  </button>
                );
              })}
            </div>

            {recLoading ? (
              <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Loading calendar...
              </div>
            ) : null}

            {/* Selected day slot details */}
            {selectedDate ? (
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  {selectedDate} - Slot wise attendance
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
                  {Array.from({ length: 8 }).map((_, idx) => {
                    const s = idx + 1;
                    const info = selectedInfo?.slots?.[s];
                    const status = info?.status || 'no-record';
                    const subject = info?.subject;

                    const label = status === 'present' ? 'Present' : status === 'absent' ? 'Absent' : 'No class';

                    const bg =
                      status === 'present'
                        ? 'rgba(34, 197, 94, 0.2)'
                        : status === 'absent'
                        ? 'rgba(239, 68, 68, 0.2)'
                        : 'rgba(148, 163, 184, 0.15)';

                    return (
                      <div
                        key={s}
                        style={{
                          borderRadius: '10px',
                          background: bg,
                          border: '1px solid rgba(148, 163, 184, 0.4)',
                          padding: '0.4rem 0.6rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600 }}>Slot {s}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {subject ? `Subject: ${subject}` : 'Subject: -'}
                          </div>
                        </div>

                        <div>
                          <span
                            style={{
                              fontWeight: 600,
                              color:
                                status === 'present'
                                  ? '#16a34a'
                                  : status === 'absent'
                                  ? '#dc2626'
                                  : '#9ca3af',
                            }}
                          >
                            {label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
