// src/components/Alumni.jsx
import React from 'react';
import '../styles/Alumni.css';
import useAlumniReveal from '../hooks/alumnireveal';

const Alumni = () => {
  const heroReveal = useAlumniReveal();
  const storiesReveal = useAlumniReveal();
  const connectReveal = useAlumniReveal();

  const alumniStories = [
    {
      name: 'Praharsha Konjerla',
      role: 'Software Engineer',
      company: 'Colruyt Group',
      text: 'CMRIT helped me build strong fundamentals in Computer Science and prepared me for product-based roles through projects and placement training.',
      image: '/alumini1.jpg',
    },
    {
      name: 'Dasari Samyuktha',
      role: 'Management Trainee',
      company: 'City Union Bank',
      text: 'The mix of classroom learning, internships and mentoring at CMRIT gave me confidence to start my career in the BFSI sector.',
      image: '/alumni2.jpg',
    },
    {
      name: 'Pidugu Rakesh',
      role: 'Analyst',
      company: 'Berkadia',
      text: 'Workshops, certification courses and the Training & Placement cell support played a key role in my transition from campus to corporate.',
      image: '/alumni3.jpg',
    },
  ];

  return (
    <div className="page alumni-page">
      {/* Hero */}
      <section
        ref={heroReveal.ref}
        className={`alumni-hero reveal ${heroReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <div className="alumni-hero-content">
          <h1>Alumni Network</h1>
          <p>
            CMRIT Hyderabad alumni work in reputed companies across IT, product, core
            engineering, banking and analytics, and also pursue higher education in
            leading universities in India and abroad. [web:132][web:130]
          </p>
          <p>
            The alumni association contributes to the institute through financial support,
            guest talks, mentoring and placement referrals, strengthening the link between
            campus and industry. [web:131][web:137][web:145]
          </p>
        </div>
      </section>

      {/* Featured Alumni Stories */}
      <section
        ref={storiesReveal.ref}
        className={`alumni-section reveal ${storiesReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <h2>Alumni Stories</h2>
        <div className="alumni-grid">
          {alumniStories.map((alum, idx) => (
            <article key={idx} className="alumni-card">
              <div className="alumni-photo-wrapper">
                <img
                  src={alum.image}
                  alt={alum.name}
                  className="alumni-photo"
                />
              </div>
              <div className="alumni-info">
                <h3>{alum.name}</h3>
                <div className="alumni-role">
                  {alum.role} · {alum.company}
                </div>
                <p className="alumni-text">{alum.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Connect & Mentoring */}
      <section
        ref={connectReveal.ref}
        className={`alumni-section reveal ${connectReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <h2>Connect, Mentor &amp; Give Back</h2>
        <div className="alumni-grid single">
          <article className="alumni-card">
            <h3>Mentoring &amp; Alumni Events</h3>
            <p>
              CMRIT organizes alumni meets, speed mentoring sessions and online interactions
              where alumni guide pre‑final year and final‑year students on careers, higher
              studies and professional skills. [web:136][web:139]
            </p>
            <p>
              Alumni support Training &amp; Placement activities by sharing openings,
              participating in mock interviews and delivering industry talks, creating a
              strong support system for current batches. [web:132][web:143]
            </p>
            <p>
              Registered alumni associations also contribute funds annually towards
              institutional development, student support and campus initiatives. [web:131][web:145]
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Alumni;
