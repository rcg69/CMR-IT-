// src/components/Administration.jsx
import React from 'react';
import '../styles/Administration.css';
import useAdminReveal from '../hooks/adminreveal';

const Administration = () => {
  const heroReveal = useAdminReveal();
  const councilReveal = useAdminReveal();
  const leadershipReveal = useAdminReveal();
  const qualityReveal = useAdminReveal();

  return (
    <div className="page administration-page">
      {/* Hero / Intro */}
      <section
        ref={heroReveal.ref}
        className={`admin-hero reveal ${heroReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <div className="admin-hero-content">
          <h1>Administration & Governance</h1>
          <p>
            CMR Institute of Technology, Hyderabad follows a structured and transparent
            governance model to deliver quality engineering education and continuous
            improvement across academics, research and campus services.
          </p>
        </div>
      </section>

      {/* Governance bodies */}
      <section
        ref={councilReveal.ref}
        className={`admin-section reveal ${councilReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <h2>Governing Bodies</h2>
        <div className="admin-grid">
          <article className="admin-card">
            <h3>Governing Body</h3>
            <p>
              The Governing Body, constituted by the sponsoring MGR Educational Society
              along with industry and academic experts, provides strategic direction to
              CMRIT in line with its vision to be among the top engineering colleges in
              Hyderabad.
            </p>
          </article>

          <article className="admin-card">
            <h3>Academic Council</h3>
            <p>
              The Academic Council oversees curriculum design, academic regulations,
              programme outcomes and periodic syllabus revisions to keep pace with
              emerging technologies and industry needs.
            </p>
          </article>

          <article className="admin-card">
            <h3>Boards of Studies</h3>
            <p>
              Department-level Boards of Studies comprising faculty and external experts
              recommend course structures, electives and industry-relevant specializations
              in B.Tech and PG programmes.
            </p>
          </article>
        </div>
      </section>

      {/* Key Leadership */}
      <section
        ref={leadershipReveal.ref}
        className={`admin-section reveal ${leadershipReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <h2>Leadership Team</h2>
        <div className="admin-grid">
          <article className="admin-card">
            <h3>Principal</h3>
            <p>
              The Principal provides academic and administrative leadership, ensuring
              implementation of the Governing Body and Academic Council decisions across
              all departments and support units.
            </p>
          </article>

          <article className="admin-card">
            <h3>Deans &amp; Controllers</h3>
            <p>
              Deans for Academics, Research &amp; Development, Student Affairs and
              Examination coordinate academic delivery, research initiatives and student
              support mechanisms.
            </p>
          </article>

          <article className="admin-card">
            <h3>Heads of Departments</h3>
            <p>
              HoDs of various engineering, management and sciences departments drive
              departmental planning, faculty development, and programme-level academic
              quality.
            </p>
          </article>
        </div>
      </section>

      {/* Quality & Compliance */}
      <section
        ref={qualityReveal.ref}
        className={`admin-section reveal ${qualityReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <h2>Quality, Reviews &amp; Compliance</h2>
        <div className="admin-grid single">
          <article className="admin-card">
            <h3>Quality Assurance &amp; Accreditation</h3>
            <p>
              Administrative processes emphasize transparency, documented policies,
              and periodic internal audits to support NAAC, NBA, AICTE and JNTUH
              compliance requirements.
            </p>
            <p>
              Regular academic and administrative reviews, stakeholder feedback, and
              data-driven decision making help CMRIT sustain its standing among the
              leading engineering institutes in Hyderabad.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Administration;
