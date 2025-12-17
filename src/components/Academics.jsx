// src/components/Academics.jsx
import React from 'react';
import '../styles/home.css';
import useAcademicsReveal from '../hooks/academicsreveal';

const Academics = () => {
  const headerReveal = useAcademicsReveal();
  const card1Reveal = useAcademicsReveal();
  const card2Reveal = useAcademicsReveal();
  const card3Reveal = useAcademicsReveal();

  return (
    <div className="section academics-section">
      <div
        ref={headerReveal.ref}
        className={`section-header reveal ${headerReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <div className="section-kicker">ACADEMICS</div>
        <h2 className="section-title">Programs &amp; Curriculum</h2>
        <p className="section-desc">
          CMRIT Hyderabad offers industry‑aligned B.Tech, M.Tech and MBA programmes with
          structured syllabi, laboratories, and academic regulations published through
          dedicated syllabus and examination sections. [web:89]
        </p>
        <p className="section-desc">
          Students can access B.Tech, M.Tech and MBA syllabi, B.Tech Minors &amp; Honors,
          academic calendars and exam notifications online, ensuring transparency and
          clarity in the teaching–learning process. [web:89][web:87]
        </p>
      </div>

      <div className="feature-grid">
        <div
          ref={card1Reveal.ref}
          className={`feature-card reveal ${card1Reveal.isVisible ? 'reveal-visible' : ''}`}
        >
          <img
            className="feature-icon"
            src="/image.png"
            alt="B.Tech programs icon"
          />
          <div className="feature-title">B.Tech Programmes</div>
          <div className="feature-text">
            Four‑year B.Tech degrees in CSE, CSE (Artificial Intelligence &amp; Machine
            Learning), CSE (Data Science) and ECE, supported by Humanities &amp; Sciences,
            with outcome‑based curricula and modern lab infrastructure. [web:89]
          </div>
          <div className="feature-text">
            Detailed B.Tech syllabus documents and options for Minors &amp; Honors are
            provided to help students customize their academic path. [web:89]
          </div>
        </div>

        <div
          ref={card2Reveal.ref}
          className={`feature-card reveal ${card2Reveal.isVisible ? 'reveal-visible' : ''}`}
        >
          <img
            className="feature-icon"
            src="/image.png"
            alt="M.Tech and PG icon"
          />
          <div className="feature-title">M.Tech &amp; MBA Studies</div>
          <div className="feature-text">
            Postgraduate offerings include M.Tech in Computer Science and VLSI as well as
            an MBA programme, with a focus on advanced coursework, research projects and
            case‑based learning. [web:89][web:80][web:81]
          </div>
          <div className="feature-text">
            Separate M.Tech and MBA syllabus documents, along with examination rules and
            policies, are made available under the Academics and Examination sections. [web:89]
          </div>
        </div>

        <div
          ref={card3Reveal.ref}
          className={`feature-card reveal ${card3Reveal.isVisible ? 'reveal-visible' : ''}`}
        >
          <img
            className="feature-icon"
            src="/image.png"
            alt="Academic calendar icon"
          />
          <div className="feature-title">Academic Calendar &amp; Exams</div>
          <div className="feature-text">
            Academic calendars are published every year for all B.Tech, M.Tech and MBA
            batches, covering instruction periods, holidays, examinations and evaluations. [web:87]
          </div>
          <div className="feature-text">
            Exam notifications, time tables, results and regulations are hosted under the
            Examination section, aligning assessments with the structured curriculum. [web:89][web:86]
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academics;
