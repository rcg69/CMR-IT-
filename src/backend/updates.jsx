// src/components/Updates.jsx
import React from 'react';
import '../styles/Updates.css';
import useUpdatesReveal from '../hooks/updatesreveal';

const Updates = () => {
  const heroReveal = useUpdatesReveal();
  const academicReveal = useUpdatesReveal();
  const examsReveal = useUpdatesReveal();
  const eventsReveal = useUpdatesReveal();

  return (
    <section className="page updates-page">
      {/* Hero / intro */}
      <div
        ref={heroReveal.ref}
        className={`updates-hero reveal ${heroReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <h1>CMRIT Updates</h1>
        <p>
          Stay informed with the latest notifications, circulars, exam schedules and
          student‑centric announcements from CMR Institute of Technology, Hyderabad. [web:179][web:188]
        </p>
        <p>
          This section highlights academic notices, placement and training information,
          coding contests, and institutional circulars shared with students and staff. [web:179][web:143]
        </p>
      </div>

      {/* Academic & general notifications */}
      <div
        ref={academicReveal.ref}
        className={`updates-section reveal ${academicReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <h2>Notifications &amp; Circulars</h2>
        <div className="updates-grid">
          <article className="updates-card">
            <h3>Campus Notifications</h3>
            <p>
              General notifications include circulars for transportation details,
              vaccination drives, institute events and admission‑related information for
              B.Tech, M.Tech and MBA programmes. [web:179]
            </p>
          </article>

          <article className="updates-card">
            <h3>Coding &amp; Career Contests</h3>
            <p>
              Updates are shared for weekly and monthly coding contests, HackWithInfy
              registrations, Job‑A‑Thon challenges and other hiring‑linked coding events
              conducted in collaboration with platforms like GeeksforGeeks. [web:179]
            </p>
          </article>
        </div>
      </div>

      {/* Exam notifications */}
      <div
        ref={examsReveal.ref}
        className={`updates-section reveal ${examsReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <h2>Exam Notifications &amp; Time Tables</h2>
        <div className="updates-grid">
          <article className="updates-card">
            <h3>B.Tech / M.Tech / MBA Exams</h3>
            <p>
              The Exam Notifications section publishes fee notifications, mid‑term and
              end‑semester time tables, and circulars for B.Tech, M.Tech, MBA and Ph.D
              examinations for all regulations and batches. [web:86][web:188]
            </p>
          </article>

          <article className="updates-card">
            <h3>Important Dates</h3>
            <p>
              Students can track dates for mid‑term tests, regular and supplementary
              exams, and last dates for fee payment from the consolidated exam notices
              released each semester. [web:86][web:181]
            </p>
          </article>
        </div>
      </div>

      {/* Events & student activities */}
      <div
        ref={eventsReveal.ref}
        className={`updates-section reveal ${eventsReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <h2>Events &amp; Student Activities</h2>
        <div className="updates-grid single">
          <article className="updates-card">
            <h3>Workshops, Drives &amp; Celebrations</h3>
            <p>
              Notifications also cover institute‑level events such as National Science
              Day “Srishti”, innovation cell activities, placement drives, and cultural
              celebrations coordinated for students. [web:179][web:113]
            </p>
            <p>
              Students are advised to regularly check the updates section along with
              their departmental and examination pages for the latest circulars and
              schedules. [web:179][web:188]
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Updates;
