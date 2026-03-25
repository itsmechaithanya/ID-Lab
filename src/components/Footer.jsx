import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#181615] pt-[12vh] pb-[6vh] px-[4vw] flex flex-col min-h-[60vh]">
      
      {/* Top Banner Section */}
      <div className="flex items-center">
        <a 
          href="#" 
          className="group inline-flex items-center gap-[3vw] md:gap-[1.5vw] text-white text-3xl md:text-[3.5vw] font-medium tracking-tight hover:opacity-75 transition-opacity leading-tight"
        >
          Ready to bring your innovative ideas to life?
          <span className="font-light tracking-normal transform transition-transform duration-300 group-hover:translate-x-2">→</span>
        </a>
      </div>

      {/* Main Links Section */}
      <div className="mt-[15vh] grid grid-cols-2 md:grid-cols-6 gap-y-[8vh] gap-x-[3vw] grow">
        
        {/* Empty spacer col mirroring the style image padding if desired, but we have 6 content blocks so we use all 6 */}
        
        {/* Contact Us - Placed first to mirror the style image 'London/SF' positioning */}
        <div className="flex flex-col gap-[1.5vh]">
          <h4 className="text-white text-[1rem] md:text-[1.1vw] font-medium mb-[1vh]">Contact Us</h4>
          <p className="text-[#888888] text-[0.9rem] md:text-[0.95vw] leading-[1.6] hover:text-white transition-colors cursor-pointer">
            243 S WABASH AVE,<br/>
            CHICAGO, IL<br/>
            60604, 9TH FLOOR
          </p>
        </div>

        {/* Home */}
        <div className="flex flex-col gap-[2vh]">
          <h4 className="text-white text-[1rem] md:text-[1.1vw] font-medium mb-[0.5vh]">Home</h4>
          <a href="#" className="text-[#888888] text-[0.9rem] md:text-[0.95vw] hover:text-white transition-colors">Our Expertise</a>
          <a href="#" className="text-[#888888] text-[0.9rem] md:text-[0.95vw] hover:text-white transition-colors">Featured Projects</a>
          <a href="#" className="text-[#888888] text-[0.9rem] md:text-[0.95vw] hover:text-white transition-colors">Our Clients</a>
        </div>

        {/* What We Do */}
        <div className="flex flex-col gap-[2vh]">
          <h4 className="text-white text-[1rem] md:text-[1.1vw] font-medium mb-[0.5vh]">What We Do</h4>
          <a href="#" className="text-[#888888] text-[0.9rem] md:text-[0.95vw] hover:text-white transition-colors">Mission & Vision</a>
        </div>

        {/* Meet Our Team */}
        <div className="flex flex-col gap-[2vh]">
          <h4 className="text-white text-[1rem] md:text-[1.1vw] font-medium mb-[0.5vh]">Meet Our Team</h4>
          <a href="#" className="text-[#888888] text-[0.9rem] md:text-[0.95vw] hover:text-white transition-colors">Leadership</a>
          <a href="#" className="text-[#888888] text-[0.9rem] md:text-[0.95vw] hover:text-white transition-colors">Board & Staff</a>
          <a href="#" className="text-[#888888] text-[0.9rem] md:text-[0.95vw] hover:text-white transition-colors">Members</a>
        </div>

        {/* Events */}
        <div className="flex flex-col gap-[2vh]">
          <h4 className="text-white text-[1rem] md:text-[1.1vw] font-medium mb-[0.5vh]">Events</h4>
          <a href="#" className="text-[#888888] text-[0.9rem] md:text-[0.95vw] hover:text-white transition-colors">ODi 2024</a>
          <a href="#" className="text-[#888888] text-[0.9rem] md:text-[0.95vw] hover:text-white transition-colors">ODi 2025</a>
        </div>
        
        {/* Placeholder Column to maintain grid spacing */}
        <div className="hidden md:block"></div>

      </div>

      {/* Bottom Footer Row */}
      <div className="mt-[12vh] flex flex-col md:flex-row justify-between items-start md:items-end gap-[4vh] md:gap-0">
        
        {/* Left: Brand Identity Logo (Replacing generic text with the stylized icon layout from the reference) */}
        <div className="flex flex-col">
          <h3 className="text-white text-[1.2rem] font-bold tracking-tight mb-[0.5vh]">iD LAB</h3>
          <p className="text-[#999999] text-[0.7rem] uppercase tracking-widest font-medium mb-[4vh] md:mb-[1vh]">DePaul Innovation Development Lab</p>
          <p className="text-[#666666] text-[0.8rem]">© 2025 DePaul iD Lab. All rights reserved.</p>
        </div>

        {/* Right: Social Links bar */}
        <div className="flex flex-wrap items-center gap-[4vw] md:gap-[3vw] mt-[4vh] md:mt-0">
          <a href="#" className="text-white text-[0.85rem] md:text-[0.9vw] font-medium tracking-wide hover:text-[#999999] transition-colors">LinkedIn</a>
          <a href="#" className="text-white text-[0.85rem] md:text-[0.9vw] font-medium tracking-wide hover:text-[#999999] transition-colors">Instagram</a>
          <a href="#" className="text-white text-[0.85rem] md:text-[0.9vw] font-medium tracking-wide hover:text-[#999999] transition-colors">X</a>
          <a href="#" className="text-white text-[0.85rem] md:text-[0.9vw] font-medium tracking-wide hover:text-[#999999] transition-colors">Join Us</a>
          <a href="#" className="text-white text-[0.85rem] md:text-[0.9vw] font-medium tracking-wide hover:text-[#999999] transition-colors">Newsletter</a>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
