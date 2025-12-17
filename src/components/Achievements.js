// src/components/Achievements.jsx
import React from 'react';
import '../styles/Achievements.css';
import useAchievementsReveal from '../hooks/achievementsreveal';

const Achievements = () => {
  const heroReveal = useAchievementsReveal();
  const collegeReveal = useAchievementsReveal();
  const studentReveal = useAchievementsReveal();
  const recognitionReveal = useAchievementsReveal();

  return (
    <div className="page achievements-page">
      {/* Hero */}
      <section
        ref={heroReveal.ref}
        className={`ach-hero reveal ${heroReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <div className="ach-hero-content">
          <h1>Achievements</h1>
          <p>
            Students and faculty at CMR Institute of Technology, Hyderabad receive
            recognition through project competitions, research contributions, awards and
            institutional rankings. [web:149][web:132]
          </p>
          <p>
            These achievements reflect the institute&apos;s emphasis on skills, innovation,
            sustainability and societal impact. [web:149][web:154]
          </p>
        </div>
      </section>

      {/* College / Institutional Achievements */}
      <section
        ref={collegeReveal.ref}
        className={`ach-section reveal ${collegeReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <h2>Institutional Highlights</h2>
        <div className="ach-grid">
          <article className="ach-card">
            <h3>Top Engineering College</h3>
            <p>
              CMRIT Hyderabad is recognized among the prominent engineering colleges in
              Hyderabad, supported by strong academic processes, infrastructure and
              placement outcomes. [web:79][web:156]
            </p>
          </article>

          <article className="ach-card">
            <h3>Awards &amp; Recognitions</h3>
            <p>
              The institution has received awards and certificates of excellence from
              recognized agencies, including national‑level awards related to cleanliness,
              smart campus and sustainable practices. [web:150][web:147][web:154]
            </p>
          </article>

          <article className="ach-card">
            <h3>Green &amp; Sustainable Campus</h3>
            <p>
              Green rankings and appreciation for maintaining a healthy and sustainable
              campus environment acknowledge CMRIT&apos;s efforts towards eco‑friendly
              infrastructure and practices. [web:147][web:154]
            </p>
          </article>
        </div>
      </section>

      {/* Student Achievements */}
      <section
        ref={studentReveal.ref}
        className={`ach-section reveal ${studentReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <h2>Student Achievements</h2>
        <div className="ach-grid">
          <article className="ach-card">
            <h3>Placements &amp; Offers</h3>
            <p>
              CMRIT students secure placements in leading IT, product and core companies,
              with full‑time offers highlighted in the Students Placed and Achievements
              sections. [web:132][web:149][web:162]
            </p>
          </article>

          <article className="ach-card">
            <h3>Competitions &amp; Hackathons</h3>
            <p>
              Students participate in inter‑college technical, cultural and sports events,
              winning prizes and recognitions that are documented under yearly student
              achievement reports. [web:149][web:160]
            </p>
          </article>

          <article className="ach-card">
            <h3>Research &amp; Innovation</h3>
            <p>
              UG and PG students contribute to projects, publications and innovation
              activities coordinated through the R&amp;D cell and various clubs and forums. [web:95][web:149]
            </p>
          </article>
        </div>
      </section>

      {/* Faculty & Societal Recognition */}
      <section
        ref={recognitionReveal.ref}
        className={`ach-section reveal ${recognitionReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <h2>Faculty &amp; Societal Impact</h2>
        <div className="ach-grid single">
          <article className="ach-card">
            <h3>Faculty Awards &amp; Distinctions</h3>
            <p>
              Faculty members receive awards and letters of appreciation for academic,
              research and extension activities, including recognition from external
              bodies for impactful work. [web:160][web:161][web:124]
            </p>
            <p>
              Such achievements add to the academic profile of the institute and provide
              role models for students across departments. [web:160][web:149]
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
