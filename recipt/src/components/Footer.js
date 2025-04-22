
import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        <p>&copy; {new Date().getFullYear()} My Recipe Website. All rights reserved.</p>
        <div>
          <a href="/about" style={linkStyle}>About</a>
          <a href="/privacy-policy" style={linkStyle}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};


const footerStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '20px',
  textAlign: 'center',
  marginTop: '40px',
};

const footerContentStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  margin: '0 10px',
};

export default Footer;
