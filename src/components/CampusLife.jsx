import React from 'react';
import '../styles/home.css';

const CampusLife = () => {
  return (
    <div className="section">
      <div className="section-header">
        <div className="section-kicker">CAMPUS LIFE</div>
        <h2 className="section-title">Life at CMRIT Hyderabad</h2>
        <p className="section-desc">
          A vibrant campus with active clubs, fests, sports, and cultural activities
          that help students grow beyond the classroom.
        </p>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <img
            className="feature-icon"
            src="/image.png"
            alt="Clubs and committees icon"
          />
          <div className="feature-title">Clubs &amp; Committees</div>
          <div className="feature-text">
            Technical, cultural, music, dance and coding clubs, along with NSS and
            other student bodies that keep the campus engaged year-round.
          </div>
        </div>

        <div className="feature-card">
          <img
            className="feature-icon"
            src="/image.png"
            alt="Events and fests icon"
          />
          <div className="feature-title">Events &amp; Fests</div>
          <div className="feature-text">
            Annual techno-cultural fests, traditional celebrations, hackathons,
            workshops, and guest talks that showcase student talent.
          </div>
        </div>

        <div className="feature-card">
          <img
            className="feature-icon"
            src="/image.png"
            alt="Hostel and facilities icon"
          />
          <div className="feature-title">Hostel &amp; Facilities</div>
          <div className="feature-text">
            Separate hostels, library, sports facilities, Wi‑Fi enabled campus and
            student-friendly common spaces that support holistic development.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusLife;
