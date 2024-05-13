import React from 'react';

const NavBar = () => {
  return (
    <nav className="transparent-nav">
      <div className="nav-container">
        <a href="/" className="logo">CarCare</a>
        <ul className="nav-list">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
