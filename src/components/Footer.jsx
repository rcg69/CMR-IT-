import React from 'react';

const footerStyle = {
  background: 'radial-gradient(circle at top left, #0f172a 0%, #020617 55%, #000 100%)',
  borderTop: '1px solid rgba(148, 163, 184, 0.3)',
  color: '#e5e7eb',
  padding: '1.25rem 1.5rem',
  marginTop: '3rem',
  fontSize: '0.875rem',
};

const footerInnerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1.5rem',
  flexWrap: 'wrap',
};

const linksContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  justifyContent: 'flex-end',
};

const linkStyle = {
  cursor: 'pointer',
  color: '#9ca3af',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  fontSize: '0.75rem',
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={footerInnerStyle}>
        <div style={{ color: '#9ca3af' }}>
          © {new Date().getFullYear()} CMR Institute of Technology, Hyderabad.
        </div>
        <div style={linksContainerStyle}>
          <span style={linkStyle}>NAAC / NBA Accreditation</span>
          <span style={linkStyle}>AICTE Approved</span>
          <span style={linkStyle}>Privacy Policy</span>
          <span style={linkStyle}>Contact</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
