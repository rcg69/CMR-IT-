import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/StudentDashboard.css';

const API_BASE = 'https://irah.onrender.com';

const StudentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student;

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
          `${API_BASE}/api/student/attendance-summary?email=${encodeURIComponent(
            student.email
          )}`
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
          `${API_BASE}/api/student/attendance-records?email=${encodeURIComponent(
            student.email
          )}`
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
        const p = data.profile || {};
        setProfile({
          phone: p.phone || '',
          branch: p.branch || '',
          year: p.year || '',
          section: p.section || '',
          address: p.address || '',
          interests: Array.isArray(p.interests)
            ? p.interests.join(', ')
            : p.interests || '',
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

  // calendar helpers etc. — keep your existing logic unchanged

  return (
    <div className="student-dashboard-page">
      {/* ... your existing JSX unchanged ... */}
    </div>
  );
};

export default StudentDashboard;
