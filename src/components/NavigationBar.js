import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
          </li>
          <li>
            <Link to="/about-us" className="text-white hover:text-yellow-300">About Us</Link>
          </li>
          <li>
            <Link to="/courses" className="text-white hover:text-yellow-300">Courses</Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:text-yellow-300">Login</Link>
          </li>
          <li>
            <Link to="/developer-support" className="text-white hover:text-yellow-300">Developer Support</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
