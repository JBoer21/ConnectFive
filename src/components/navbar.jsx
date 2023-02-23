import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h3 style={{ margin: '10px' }}>My App</h3>
      <div style={{ display: 'flex', justifyContent: 'center', marginLeft: 'auto' }}>
        <Link to="/" style={{ margin: '10px' }}>
          Home
        </Link>
        <Link to="/about" style={{ margin: '10px' }}>
          About
        </Link>
        <Link to="/contact" style={{ margin: '10px' }}>
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;