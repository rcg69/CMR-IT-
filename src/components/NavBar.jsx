import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/layout.css';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      {/* Top mini strip */}
      <div className="navbar-top-strip">
        <div className="navbar-top-strip-inner">
          <span>
            EAMCET/ECET/PGCET CODE: <strong>CMRM</strong>
          </span>
          <span className="navbar-top-links">
            <a href="#360">360° View</a>
            <a href="#nirf">NIRF</a>
            <a href="#ariia">ARIIA</a>
            <a href="#grievance">Online Grievance</a>
            <a href="#mandatory">Mandatory Disclosure</a>
            <a href="#nisp">NISP</a>
            <a href="#infra">CMRIT Infrastructure</a>
            <a href="#nba">NBA</a>
            <a href="#iqac">IQAC</a>
            <a href="#rti">RTI</a>
            <a href="#aicte">AICTE</a>
          </span>
        </div>
      </div>

      {/* Main dark nav bar that matches hero theme */}
      <div className="nav-main-band">
        <div className="nav-inner">
          {/* LEFT: logo + name (click => home) */}
          <Link to="/" className="nav-brand-cluster">
            <img
              className="nav-logo"
              src="/image.png"
              alt="CMRIT Hyderabad logo"
            />
            <span className="nav-brand-text">CMRIT</span>
          </Link>

          {/* CENTER: main menu links */}
          <nav className="nav-links">
            <Link to="/">HOME</Link>
            <Link to="/about-us">ABOUT US</Link>
            <Link to="/approvals">APPROVALS</Link>
            <Link to="/administration">ADMINISTRATION</Link>
            <Link to="/academics">ACADEMICS</Link>
            <Link to="/departments">DEPARTMENTS</Link>
            <Link to="/rd">R &amp; D</Link>
            <Link to="/student">STUDENT</Link>
            <Link to="/alumni">ALUMNI</Link>
            <Link to="/achievements">ACHIEVEMENTS</Link>
            <Link to="/certification">CERTIFICATION</Link>
          </nav>

          {/* RIGHT: buttons */}
          <div className="nav-cta">
            <button
              className="nav-outline-box"
              onClick={() => navigate('/updates')}
            >
              CMRIT Updates
            </button>
            <button
              className="nav-solid-box"
              onClick={() => navigate('/admissions')}
            >
              Admissions 2025-26
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
