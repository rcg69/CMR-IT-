import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/StudentDashboard.css';

const API_BASE = 'https://irah.onrender.com';

const TeacherDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const teacher = location.state?.teacher;

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [classDate, setClassDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [slot, setSlot] = useState(1);
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

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
        {/* session expired JSX as in your original */}
      </div>
    );
  }

  const handleStatusChange = (studentEmail, status) => {
    setAttendance((prev) => ({ ...prev, [studentEmail]: status }));
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
        `Attendance saved for ${classDate}, Slot ${slot} - ${subject}. Records: ${data.count}`
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
      {/* ... your existing TeacherDashboard JSX unchanged, using handleSaveAttendance etc. ... */}
    </div>
  );
};

export default TeacherDashboard;
