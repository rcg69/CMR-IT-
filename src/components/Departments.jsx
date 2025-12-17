import React from 'react';
import '../styles/department.css';

const Departments = () => {
  return (
    <div className="section">
      <div className="section-header">
        <div className="section-kicker">DEPARTMENTS</div>
        <h2 className="section-title">Centres of Learning</h2>
        <p className="section-desc">
          CMRIT Hyderabad offers industry-focused programs through specialised departments,
          integrating strong fundamentals with hands-on learning and research culture.
        </p>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <img
            className="feature-icon"
            src="/image.png"
            alt="Computer Science & Engineering icon"
          />
          <div className="feature-title">Computer Science &amp; Engineering (CSE)</div>
          <div className="feature-text">
            Core computer science with focus on software engineering, systems, data structures,
            and emerging technologies.
          </div>
        </div>

        <div className="feature-card">
          <img
            className="feature-icon"
            src="/image.png"
            alt="CSE AI & ML icon"
          />
          <div className="feature-title">CSE (Artificial Intelligence &amp; ML)</div>
          <div className="feature-text">
            Specialized in AI, machine learning, deep learning, and data-driven intelligent
            systems for real-world applications.
          </div>
        </div>

        <div className="feature-card">
          <img
            className="feature-icon"
            src="/image.png"
            alt="CSE Data Science icon"
          />
          <div className="feature-title">CSE (Data Science)</div>
          <div className="feature-text">
            Emphasis on data analytics, big data technologies, statistical modelling, and
            decision-making using data.
          </div>
        </div>

        <div className="feature-card">
          <img
            className="feature-icon"
            src="/image.png"
            alt="ECE icon"
          />
          <div className="feature-title">
            Electronics &amp; Communication Engineering (ECE)
          </div>
          <div className="feature-text">
            VLSI, embedded systems, communication networks, and IoT with well-equipped labs
            and project-based learning.
          </div>
        </div>

        <div className="feature-card">
          <img
            className="feature-icon"
            src="/image.png"
            alt="Humanities and Sciences icon"
          />
          <div className="feature-title">Humanities &amp; Sciences</div>
          <div className="feature-text">
            Foundation courses in Mathematics, Physics, Chemistry, and communication skills
            that strengthen engineering fundamentals.
          </div>
        </div>

        <div className="feature-card">
          <img
            className="feature-icon"
            src="/image.png"
            alt="MBA icon"
          />
          <div className="feature-title">Master of Business Administration (MBA)</div>
          <div className="feature-text">
            Management education focusing on leadership, analytics, and industry-oriented
            business practices for future professionals.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
