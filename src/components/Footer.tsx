import React from 'react';
import '../styles/footer.css'

const Footer: React.FC = () => {
  return (
    <div className='footerContainer'>
      <footer className='footer'>
        <a href="https://github.com/Pavlik07" target="_blank" rel="noopener noreferrer">
          My GitHub
        </a>
      </footer>
    </div>
  );
};

export default Footer;