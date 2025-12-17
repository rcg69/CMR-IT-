// src/components/Brochure.jsx
import React from 'react';
import '../styles/brochure.css';

const Brochure = () => {
  return (
    <section className="page brochure-page">
  <div className="brochure-card">
    <h1>College Brochure</h1>
    <p>You can view or download the latest CMRIT Hyderabad brochure here.</p>

    <div className="brochure-actions">
      <a
        href="/sample.pdf"
        className="btn-view"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Brochure
      </a>

      <a
        href="/sample.pdf"
        className="btn-download"
        download="CMRIT_Hyderabad_Brochure.pdf"
      >
        Download PDF
      </a>
    </div>
  </div>
</section>

  );
};

export default Brochure;
