// src/components/Home.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import useHomeReveal from '../hooks/homereveal';
import useCountUp from '../hooks/useCountUp';

const Home = () => {
  const navigate = useNavigate();
  const campusReveal = useHomeReveal();

  // -------- Glimpse stats visibility (intersection observer) --------
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Count-up values
  const established = useCountUp(2005, 1200, statsVisible);
  const awards = useCountUp(110, 1200, statsVisible);
  const admitted = useCountUp(1050, 1200, statsVisible);
  const onCampus = useCountUp(4500, 1200, statsVisible);
  const graduated = useCountUp(10000, 1500, statsVisible);
  const centers = useCountUp(2, 800, statsVisible);
  const supervisors = useCountUp(10, 800, statsVisible);
  const scholars = useCountUp(20, 1000, statsVisible);
  const scopus = useCountUp(1145, 1500, statsVisible);
  const patentsGranted = useCountUp(20, 1000, statsVisible);
  const patentsPublished = useCountUp(111, 1200, statsVisible);

  return (
    <div className="home-root">
      {/* Hero section */}
      <section className="hero" id="top">
        <div className="hero-left">
          <div className="hero-kicker">
            <span>CMRIT HYDERABAD</span>
            <span>•</span>
            <span>UGC Autonomous • Affiliated to JNTUH</span>
          </div>

          <h1 className="hero-title">
            Build your <span className="hero-gradient">future in tech</span> with CMRIT.
          </h1>

          <p className="hero-subtitle">
            A premier engineering institution in Telangana offering B.Tech, M.Tech and MBA
            with strong industry linkages, modern infrastructure and a growing placement
            record in top IT and product companies.
          </p>

          <div className="hero-cta-row">
            <button
              className="nav-btn-primary"
              onClick={() => navigate('/admissions')}
            >
              Apply for 2025 Admissions
            </button>
            <button
              className="nav-btn-ghost"
              onClick={() => navigate('/brochure')}
            >
              Download Brochure
            </button>
            {/* NEW: Student Login button */}
            <button
  className="nav-btn-ghost"
  onClick={() => navigate('/student-login')}
  style={{
    backgroundColor: '#f97316',      // orange
    color: '#0b1120',
    border: 'none',
    padding: '0.4rem 1rem',
    borderRadius: '999px',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 6px 14px rgba(249, 115, 22, 0.45)',
    transition: 'transform 150ms ease, box-shadow 150ms ease',
  }}
>
  Login
</button>


          </div>

          <div className="hero-secondary-text">
            AICTE approved • NAAC &amp; NBA accredited programmes • JNTUH affiliated
            autonomous institute.
          </div>

          <div className="hero-metrics">
            <span>4000+ students on campus</span>
            <span>•</span>
            <span>Average packages around 6–7 LPA</span>
            <span>•</span>
            <span>Highest offers above 40 LPA in recent drives</span>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="hero-chip-row">
            <span className="hero-chip">Placements Snapshot</span>
            <span>HYD Campus</span>
          </div>

          <div className="hero-balance">
            <div className="hero-balance-label">Overall average package (recent)</div>
            <div className="hero-balance-value">₹6.9 LPA</div>
            <div className="hero-balance-sub">
              Recent highest package reported above ₹40 LPA with 150+ companies hiring.
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img
              className="hero-image"
              src="/image1.png"
              alt="CMRIT students and campus"
              loading="lazy"
            />
          </div>
        </aside>
      </section>

      {/* Campus section */}
      <section
        ref={campusReveal.ref}
        className={`home-campus-section reveal ${
          campusReveal.isVisible ? 'reveal-visible' : ''
        }`}
      >
        <div className="home-campus-content">
          <h2 className="home-campus-title">Our Hyderabad Campus</h2>
          <p className="home-campus-text">
            Spread across a serene suburban location near Medchal, the CMRIT campus
            offers modern classrooms, laboratories, a central library, sports and
            hostel facilities that support an immersive learning experience.
          </p>
        </div>

        <div className="home-campus-image-wrapper">
          <img
            src="/clg.webp"
            alt="CMRIT Hyderabad college campus"
            className="home-campus-image"
            loading="lazy"
          />
        </div>
      </section>

      {/* CMRIT Glimpse stats section */}
      <section ref={statsRef} className="cmrit-glimpse">
        <h2 className="cmrit-glimpse-title">CMRIT Glimpse</h2>

        <div className="cmrit-glimpse-grid">
          <div className="glimpse-card">
            <div className="glimpse-emoji">🏛️</div>
            <div className="glimpse-number">{established}</div>
            <div className="glimpse-label">Established</div>
          </div>

          <div className="glimpse-card">
            <div className="glimpse-emoji">🏅</div>
            <div className="glimpse-number">{awards}+</div>
            <div className="glimpse-label">Awards</div>
          </div>

          <div className="glimpse-card">
            <div className="glimpse-emoji">👥</div>
            <div className="glimpse-number">{admitted}+</div>
            <div className="glimpse-label">Students Admitted</div>
          </div>

          <div className="glimpse-card">
            <div className="glimpse-emoji">🧑‍🎓</div>
            <div className="glimpse-number">{onCampus}+</div>
            <div className="glimpse-label">Students On Campus</div>
          </div>

          <div className="glimpse-card">
            <div className="glimpse-emoji">🎓</div>
            <div className="glimpse-number">{graduated}</div>
            <div className="glimpse-label">Graduated</div>
          </div>
        </div>

        <div className="cmrit-glimpse-grid cmrit-glimpse-grid-secondary">
          <div className="glimpse-card">
            <div className="glimpse-emoji">🔬</div>
            <div className="glimpse-number">{centers}</div>
            <div className="glimpse-label">Research Centers</div>
          </div>

          <div className="glimpse-card">
            <div className="glimpse-emoji">👨‍🏫</div>
            <div className="glimpse-number">{supervisors}</div>
            <div className="glimpse-label">Research Supervisors</div>
          </div>

          <div className="glimpse-card">
            <div className="glimpse-emoji">👩‍🔬</div>
            <div className="glimpse-number">{scholars}+</div>
            <div className="glimpse-label">
              Research Scholars Under CMRIT Faculty
            </div>
          </div>

          <div className="glimpse-card">
            <div className="glimpse-emoji">📚</div>
            <div className="glimpse-number">{scopus}</div>
            <div className="glimpse-label">Scopus Indexed Publications</div>
          </div>

          <div className="glimpse-card">
            <div className="glimpse-emoji">📄</div>
            <div className="glimpse-number">{patentsGranted}</div>
            <div className="glimpse-label">Patents Granted</div>
          </div>

          <div className="glimpse-card">
            <div className="glimpse-emoji">🧾</div>
            <div className="glimpse-number">{patentsPublished}</div>
            <div className="glimpse-label">Patents Published</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
