// src/components/Student.jsx
import React from 'react';
import '../styles/Student.css';
import useStudentReveal from '../hooks/studentreveal';

const Student = () => {
  const heroReveal = useStudentReveal();
  const clubsReveal = useStudentReveal();
  const supportReveal = useStudentReveal();
  const lifeReveal = useStudentReveal();

  return (
    <div className="page student-page">
      {/* Hero */}
      <section
        ref={heroReveal.ref}
        className={`student-hero reveal ${
          heroReveal.isVisible ? 'reveal-visible' : ''
        }`}
      >
        <div className="student-hero-content">
          <h1>Student Corner</h1>
          <p>
            The student corner brings together information on clubs, events,
            academic and examination updates, student committees and support
            services at CMRIT Hyderabad.
          </p>
          <p>
            Under the Dean, Students Affairs &amp; Activities, various forums
            help students grow academically, professionally and personally
            through mentoring and co‑curricular engagement.
          </p>
        </div>
      </section>

      {/* Clubs & Activities */}
      <section
        ref={clubsReveal.ref}
        className={`student-section reveal ${
          clubsReveal.isVisible ? 'reveal-visible' : ''
        }`}
      >
        <h2>Clubs &amp; Student Activities</h2>
        <div className="student-grid">
          <article className="student-card">
            <h3>Technical &amp; Coding Clubs</h3>
            <p>
              Students participate in clubs such as TechTribe (Technical Club),
              Pro‑Grammars Club and GDG‑style coding communities that conduct
              coding contests, workshops and tech talks.
            </p>
          </article>

          <article className="student-card">
            <h3>Cultural &amp; Literary Clubs</h3>
            <p>
              Music, Dance, Fine Arts, Literary, PURE Youth and other clubs
              organize fests, competitions and celebrations like Bathukamma,
              fostering creativity and cultural vibrancy on campus.
            </p>
          </article>

          <article className="student-card">
            <h3>Professional &amp; Service Forums</h3>
            <p>
              NSS and various student forums engage learners in social outreach,
              blood donation camps, leadership programmes and community‑oriented
              activities.
            </p>
          </article>
        </div>
      </section>

      {/* Support & Committees */}
      <section
        ref={supportReveal.ref}
        className={`student-section reveal ${
          supportReveal.isVisible ? 'reveal-visible' : ''
        }`}
      >
        <h2>Student Support &amp; Welfare</h2>
        <div className="student-grid">
          <article className="student-card">
            <h3>Student Affairs &amp; Mentoring</h3>
            <p>
              The Dean, Students Affairs &amp; Activities coordinates mentoring,
              counselling, and student development initiatives in collaboration
              with departments and clubs.
            </p>
          </article>

          <article className="student-card">
            <h3>Committees &amp; Grievance Redressal</h3>
            <p>
              Institutional committees such as Grievance Redressal, Anti‑Ragging,
              Internal Complaints and SC/ST committees ensure a safe, inclusive
              and supportive campus environment.
            </p>
          </article>

          <article className="student-card">
            <h3>Training, Placement &amp; Careers</h3>
            <p>
              Training and Placement support includes aptitude, coding and
              soft‑skills training, internship guidance and campus recruitment
              opportunities through a dedicated T&amp;P Cell.
            </p>
          </article>
        </div>
      </section>

      {/* Campus Life */}
      <section
        ref={lifeReveal.ref}
        className={`student-section reveal ${
          lifeReveal.isVisible ? 'reveal-visible' : ''
        }`}
      >
        <h2>Campus Life &amp; Facilities</h2>
        <div className="student-grid single">
          <article className="student-card">
            <h3>Engaging Student Experience</h3>
            <p>
              CMRIT provides a vibrant campus life with sports, clubs, technical
              and cultural fests, supported by library, data centre and
              e‑resources for holistic student development.
            </p>
            <p>
              Regular events, hackathons, workshops and competitions scheduled
              by various clubs and cells keep students connected to both academic
              and extracurricular learning.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Student;
