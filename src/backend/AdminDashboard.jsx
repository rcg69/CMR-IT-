import React, { useState } from 'react';
import '../styles/StudentDashboard.css';

const API_BASE = 'https://irah.onrender.com';

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
      {/* your existing JSX, change only calls: */}
      {/* Upload Students */}
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

      {/* Upload Teachers */}
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

      {/* rest of your JSX including file inputs and status display */}
    </div>
  );
};

export default AdminDashboard;
