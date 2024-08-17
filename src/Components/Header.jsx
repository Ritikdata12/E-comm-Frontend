import React, { useState, useEffect } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5'; 
import './Header.css';
import Sidebar from './Sidebar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollActive, setScrollActive] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrollActive(true);
      } else {
        setScrollActive(false);
      }
      setMenuOpen(false); 
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <header className={scrollActive ? 'scrolled' : ''}>
    <a href="/" className="logo">
  <img src="/e-comm.svg"  alt="Logo" className="logo-icon" />
  E-comm 
</a>

      <div id="menu" onClick={toggleMenu}>
        {menuOpen ? <IoClose className="menu-icon" /> : <IoMenu className="menu-icon" />}
      </div>

      <nav className={`navbar ${menuOpen ? 'nav-toggle' : ''}`}>
        <ul>
          <li><a className="active" href="/">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
<div className="space">

</div>
    </>
  );
};

export default Header;
