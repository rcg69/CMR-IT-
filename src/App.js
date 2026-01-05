// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; // ✅ useLocation

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Approvals from './components/Approvals';
import Administration from './components/Administration';
import Academics from './components/Academics';
import Departments from './components/Departments';
import RD from './components/RD';
import Student from './components/Student';
import Alumni from './components/Alumni';
import Achievements from './components/Achievements';
import Certification from './components/Certification';

import Brochure from './backend/brochure';
import Updates from './backend/updates';
import Admissions from './backend/admissions';
import StudentLogin from './backend/StudentLogin';
import StudentDashboard from './backend/StudentDashboard';
import AdminDashboard from './backend/AdminDashboard';
import TeacherDashboard from './backend/TeacherDashboard';
import Examinations from "./backend/Examinations";

import ChatBot from './backend/ChatBot';
import ChatButton from './backend/ChatButton';

import './styles/global.css';
import './styles/layout.css';

const FloatingChatButton = () => {
  const location = useLocation();

  const allowedRoutes = new Set([
    '/student-dashboard',
    '/teacher-dashboard',
    '/admin-dashboard',
  ]);

  if (!allowedRoutes.has(location.pathname)) return null;

  return (
    <div style={{ position: 'fixed', right: 22, bottom: 22, zIndex: 2147483647 }}>
      <ChatButton />
    </div>
  );
};

const App = () => {
  return (
    <div className="app-root">
      <BrowserRouter>
        <NavBar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/rd" element={<RD />} />
            <Route path="/student" element={<Student />} />

            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />

            <Route path="/student/chat" element={<ChatBot />} />
           <Route path="/examinations" element={<Examinations />} />


            <Route path="/alumni" element={<Alumni />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/certification" element={<Certification />} />
            <Route path="/brochure" element={<Brochure />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/admissions" element={<Admissions />} />
          </Routes>
        </main>

        <Footer />

        {/* ✅ Only shows on student/teacher/admin dashboards */}
        <FloatingChatButton />
      </BrowserRouter>
    </div>
  );
};

export default App;
