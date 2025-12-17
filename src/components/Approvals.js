// src/components/Approvals.jsx
import React from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';
import '../styles/Approvals.css';

const Approvals = () => {
  const [ref1, visible1] = useRevealOnScroll();
  const [ref2, visible2] = useRevealOnScroll();
  const [ref3, visible3] = useRevealOnScroll();
  const [ref4, visible4] = useRevealOnScroll();

  const approvals = [
    {
      title: 'AICTE Approved',
      description: 'All India Council for Technical Education approval for quality technical education.',
      icon: '🅰️'
    },
    {
      title: 'JNTUH Affiliated',
      description: 'Affiliated to Jawaharlal Nehru Technological University Hyderabad (JNTUH).',
      icon: '🎓'
    },
    {
      title: 'NBA Accredited Programs',
      description: 'Several B.Tech programs accredited by National Board of Accreditation.',
      icon: '🏆'
    },
    {
      title: 'NAAC Accredited',
      description: 'Institute accredited by National Assessment and Accreditation Council.',
      icon: '⭐'
    }
  ];

  const stats = [
    { number: '2005', label: 'Established' },
    { number: '10 Acres', label: 'Campus Area' },
    { number: '31,132 Sq.M', label: 'Built-up Area' },
    { number: 'Top 10', label: 'Engineering Colleges in Hyderabad' }
  ];

  return (
    <div className="approvals page">
      <section
        ref={ref1}
        className={`hero-section ${visible1 ? 'visible' : ''}`}
      >
        <div className="container">
          <h1 className="hero-title">APPROVALS & ACCREDITATIONS</h1>
          <p className="hero-subtitle">Recognized Excellence in Engineering Education</p>
        </div>
      </section>

      <section
        ref={ref2}
        className={`stats-section ${visible2 ? 'visible' : ''}`}
      >
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={ref3}
        className={`approvals-section ${visible3 ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">REGULATORY APPROVALS</h2>
          <div className="approvals-grid">
            {approvals.map((approval, index) => (
              <div key={index} className="approval-card">
                <div className="approval-icon">{approval.icon}</div>
                <h3>{approval.title}</h3>
                <p>{approval.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={ref4}
        className={`about-section ${visible4 ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">INSTITUTE OVERVIEW</h2>
          <div className="overview-content">
            <p>
              Established in 2005 by MGR Educational Society, CMR Institute of Technology (CMRIT) Hyderabad
              spans 10 acres with 31,132.72 Sq.M built-up area. Recognized among Top 10 Engineering Colleges
              in Hyderabad for its academic framework and infrastructure.
            </p>
            <p>
              CMRIT focuses on building strong foundations in Engineering, Technology, and Management while
              emphasizing holistic personality development of students.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Approvals;
