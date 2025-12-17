// src/components/AboutUs.jsx
import React from 'react';
import '../styles/AboutUs.css';
import useRevealOnScroll from '../hooks/aboutsreveal';

const AboutUs = () => {
  const heroReveal = useRevealOnScroll();
  const card1 = useRevealOnScroll();
  const card2 = useRevealOnScroll();
  const card3 = useRevealOnScroll();
  const card4 = useRevealOnScroll();

  return (
    <div className="page about-page">
      {/* Hero section with founder / chairman */}
      <section
        ref={heroReveal.ref}
        className={`about-hero reveal ${heroReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <div className="about-hero-text">
          <h1>About CMRIT Hyderabad</h1>
          <p className="about-hero-sub">
            CMR Institute of Technology, Hyderabad was founded under the vision
            of the CMR Group leadership to provide quality technical education
            that blends strong fundamentals with industry‑ready skills.
          </p>
        </div>

        <div className="about-hero-founder">
          <img
            src="/image3.jpeg"
            alt="Founder and Chairman"
            className="about-founder-photo"
          />
          <div className="about-founder-meta">
            <div className="about-founder-name">Sri Ch. Malla Reddy</div>
            <div className="about-founder-role">
              Founder–Chairman, CMR Group of Institutions
            </div>
          </div>
        </div>
      </section>

      {/* Main about content as cards */}
      <section className="about-content-grid">
        <article
          ref={card1.ref}
          className={`about-card reveal ${card1.isVisible ? 'reveal-visible' : ''}`}
        >
          <div className="about-card-content">
            <h3>Institution Profile</h3>
            <p>
              CMR Institute of Technology (CMRIT) Hyderabad is a private
              engineering college established in 2005 under the MGR Educational
              Society at Kandlakoya village, Medchal, Hyderabad, Telangana,
              with a 10‑acre urban campus that houses modern laboratories,
              a central library, auditoriums, and separate hostels.
            </p>
          </div>
        </article>

        <article
          ref={card2.ref}
          className={`about-card reveal ${card2.isVisible ? 'reveal-visible' : ''}`}
        >
          <div className="about-card-content">
            <h3>Accreditations &amp; Autonomy</h3>
            <p>
              The institute is approved by AICTE, permanently affiliated to
              JNTUH, and enjoys UGC‑Autonomous status. It is accredited by
              NAAC with an A grade and has NBA accreditation for key B.Tech
              programmes such as CSE and ECE, supporting outcome‑based,
              industry‑oriented education.
            </p>
          </div>
        </article>

        <article
          ref={card3.ref}
          className={`about-card reveal ${card3.isVisible ? 'reveal-visible' : ''}`}
        >
          <div className="about-card-content">
            <h3>Vision &amp; Academic Offering</h3>
            <p>
              With a vision to create world‑class technocrats for societal
              needs, CMRIT offers B.Tech programmes in Computer Science with
              specialisations like AI &amp; ML and Data Science, Electronics
              and Communication Engineering, and other disciplines, along with
              MBA and foundational Humanities &amp; Sciences courses.
            </p>
          </div>
        </article>

        <article
          ref={card4.ref}
          className={`about-card reveal ${card4.isVisible ? 'reveal-visible' : ''}`}
        >
          <div className="about-card-content">
            <h3>Placements &amp; Campus Life</h3>
            <p>
              A dedicated Training &amp; Placement Cell drives aptitude, coding
              and soft‑skills training while coordinating recruitment drives
              with leading IT, product and core engineering companies, and an
              active campus life with clubs, fests and student‑driven
              initiatives complements academic rigour and modern infrastructure.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default AboutUs;
