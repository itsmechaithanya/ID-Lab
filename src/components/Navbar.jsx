import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If scrolling down and past 50px, hide. If scrolling up, show.
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Common classes and the dynamic transform for both layers
  const baseWrapperClasses = `fixed top-0 left-0 w-full flex items-center justify-between px-[4vw] py-4 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
    isVisible ? 'translate-y-0' : '-translate-y-full'
  }`;

  return (
    <>
      {/* Blended Layer: Handles Logo and Links */}
      <nav className={`${baseWrapperClasses} z-40 mix-blend-difference pointer-events-none`}>
        <div className="flex items-center gap-2 pointer-events-auto">
          <img src={logo} alt="Logo" className="h-[10vh] w-auto brightness-0 invert" />
        </div>

        <div className="hidden md:flex gap-8 text-white text-sm tracking-wide font-medium pointer-events-auto">
          <a href="#contact" className="hover:opacity-75 transition-opacity">Projects</a>
          <a href="#work" className="hover:opacity-75 transition-opacity">Events</a>
          <a href="#about" className="hover:opacity-75 transition-opacity">About</a>
          <a href="#contact" className="hover:opacity-75 transition-opacity">Our Team</a>
        </div>
        
        {/* Invisible button to keep exact spacing */}
        <button className="invisible px-6 py-2 text-sm font-medium">
          Let's Talk
        </button>
      </nav>

      {/* Normal Layer: Handles only the Button without blending */}
      <div className={`${baseWrapperClasses} z-50 pointer-events-none`}>
        {/* Invisible layout clone of the left side */}
        <div className="flex items-center gap-2 invisible">
          <img src={logo} alt="Logo" className="h-[10vh] w-auto" />
        </div>

        {/* Invisible layout clone of the center links */}
        <div className="hidden md:flex gap-8 text-sm tracking-wide font-medium invisible">
          <a href="#contact">Projects</a>
          <a href="#work">Events</a>
          <a href="#about">About</a>
          <a href="#contact">Our Team</a>
        </div>

        {/* Visible Button */}
        <button className="bg-white text-black border border-white px-6 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300 pointer-events-auto shadow-sm">
          Let's Talk
        </button>
      </div>
    </>
  );
};

export default Navbar;
