import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/FAB.css';

const FAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log('Option clicked:', option);

    switch (option) {
      case 'Logout':
        console.log('Navigating to /logout');
        navigate('/logout');
        break;
      case 'Contact Class Teacher':
        console.log('Navigating to /contact-class-teacher');
        navigate('/contact-class-teacher');
        break;
      case 'Contact Admin':
        console.log('Navigating to /contact-admin');
        navigate('/contact-admin');
        break;
      case 'Contact Developer':
        console.log('Navigating to /developer-support');
        navigate('/developer-support');
        break;
      default:
        break;
    }
  };

  return (
    <div className="fab-container">
      <button className={`fab ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <i className="fas fa-cog"></i> {/* FontAwesome icon */}
      </button>
      {isOpen && (
        <div className="fab-menu">
          <button onClick={() => handleOptionClick('Contact Class Teacher')}>Contact Class Teacher</button>
          <button onClick={() => handleOptionClick('Contact Admin')}>Contact Admin</button>
          <button onClick={() => handleOptionClick('Contact Developer')}>Contact Developer</button>
          <button onClick={() => handleOptionClick('Logout')}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default FAB;
