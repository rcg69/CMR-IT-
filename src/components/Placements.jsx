import React from 'react';
import '../styles/home.css';

const Placements = () => {
  return (
    <div className="section">
      <div className="section-header">
        <div className="section-kicker">PLACEMENTS</div>
        <h2 className="section-title">Launch your career from CMRIT.</h2>
        <p className="section-desc">
          A dedicated Training &amp; Placement Cell, strong recruiter network,
          and continuous career guidance help students secure roles in leading
          IT, product, and core engineering companies.
        </p>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <img
            className="feature-icon"
            src="/image.png"
            alt="Top recruiters icon"
          />
          <div className="feature-title">Top Recruiters</div>
          <div className="feature-text">
            Regular campus drives from companies like Amazon, TCS, Accenture,
            Capgemini, Tech Mahindra and other major recruiters. 
          </div>
        </div>

        <div className="feature-card">
          <img
            className="feature-icon"
            src="/image.png"
            alt="Training programs icon"
          />
          <div className="feature-title">Training Programs</div>
          <div className="feature-text">
            Aptitude, coding, soft‑skills, mock interviews and domain-specific
            training conducted throughout the year by the T&amp;P Cell.
          </div>
        </div>

        <div className="feature-card">
          <img
            className="feature-icon"
            src="/image.png"
            alt="Placement records icon"
          />
          <div className="feature-title">Placement Records</div>
          <div className="feature-text">
            Consistently high placement numbers with competitive average and
            highest packages for B.Tech and MBA graduates.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placements;
