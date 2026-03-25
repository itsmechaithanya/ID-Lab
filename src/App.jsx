import React, { useEffect, useRef, useState } from 'react'
import hero from './assets/hero2.png'
import rectangle from './assets/rectangle.png'
import videoThumbnail from './assets/VideoThumbnail.jpeg'
import S from './assets/S.png'
import bosch from './assets/bosch.jpg'
import crypto from './assets/crypto.png'
import drive from './assets/drive.png'
import director from './assets/director.webp'
import videoThumbnail2 from './assets/VideoThumbnail2.jpeg'
import LocomotiveScroll from 'locomotive-scroll'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Dynamically import all Frame*.png images from assets
const frameModules = import.meta.glob('./assets/Frame*.png', { eager: true, import: 'default' });
const frames = Object.values(frameModules);

function App() {
  const expandDivRef = useRef(null)
  const cursorRef = useRef(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const renderAnimatedWords = (text, customClass = 'hero-word') => {
    return text.split(' ').map((word, i) => (
      <span key={i} className={`${customClass} inline-block opacity-0 mr-[0.25em] translate-y-[20px]`}>
        {word}
      </span>
    ));
  };

  const renderAnimatedLetters = (text, customClass = 'hero-char') => {
    return text.split(' ').map((word, i, arr) => (
      <React.Fragment key={i}>
        <span className="inline-flex overflow-hidden align-bottom pb-[0.2em] -mb-[0.2em]">
          {word.split('').map((char, j) => (
            <span key={j} className={`${customClass} inline-block translate-y-[120%] opacity-0`}>
              {char}
            </span>
          ))}
        </span>
        {i < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
      </React.Fragment>
    ));
  };

  const handleMouseEnter = () => {
    if (!isVideoPlaying) {
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })
    }
  }

  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.out' })
  }

  const handleMouseMove = (e) => {
    if (!isVideoPlaying) {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out'
      })
    }
  }

  const handleVideoClick = () => {
    setIsVideoPlaying(true)
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.out' })
  }

  useEffect(() => {
    // Initial setup for the custom cursor
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

    const locomotiveScroll = new LocomotiveScroll();

    // GSAP ScrollTrigger for expanding the div
    gsap.to(expandDivRef.current, {
      width: '92vw',
      borderRadius: '20px',
      ease: 'none',
      scrollTrigger: {
        trigger: expandDivRef.current,
        start: 'top 85%', // Animation starts when top of element hits 85% of viewport
        end: 'top 20%',   // Ends when element is 20% from top
        scrub: 1,         // Smooth scrubbing with 1 second lag
      }
    });

    // Hero Text Letter Reveal - Concurrent execution for both sections
    gsap.to('.hero-word', {
      y: 0,
      opacity: 1,
      duration: 0.3,
      stagger: 0.02,
      ease: 'power2.out',
      delay: 0.2
    });
    
    gsap.to('.hero-char-2', {
      y: '0%',
      opacity: 1,
      duration: 0.5,
      stagger: 0.015,
      ease: 'power3.out',
      delay: 0.2
    });

    gsap.utils.toArray('.fade-up').forEach((el) => {
      gsap.fromTo(el,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
      // Clean up GSAP instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className='w-screen overflow-x-hidden bg-white'>
      <Navbar />
      <div>
        <div className='h-[110vh] overflow-hidden relative'>
          <img className='w-full h-screen object-cover object-center md:object-top' src={hero} alt="Hero" />
          <img className='absolute bottom-[-13vh] z-10 w-[120vw] left-[10vw]' src={rectangle} alt="" />
          <div className='absolute top-[12vh] md:top-[20vh] right-[4vw] md:right-[6vw] max-w-[85%] md:w-auto mt-[2vh] md:mt-0'>
            <p className='text-white font-regular text-lg md:text-2xl lg:text-[2vh] leading-[1.6] md:leading-[3vh] text-right md:text-right w-full flex flex-col items-end drop-shadow-md'>
              <span className="block">{renderAnimatedWords("Design intuitive user experiences,")}</span>
              <span className="block">{renderAnimatedWords("develop scalable digital products, and")}</span>
              <span className="block">{renderAnimatedWords("deliver intelligent AI solutions.")}</span>
            </p>
          </div>
          <div className='absolute bottom-[15vh] md:bottom-auto md:top-[70vh] left-[4vw] w-[92vw] md:w-auto'>
            <h1 className="text-[#000000] font-medium text-[8vw] sm:text-5xl md:text-6xl lg:text-6xl leading-[1.1]">
              {renderAnimatedLetters("We Turn Ideas into Scalable", "hero-char-2")}
            </h1>
            <h1 className='text-[#000000] font-bold text-[14vw] sm:text-6xl md:text-7xl lg:text-9xl tracking-tight leading-none md:leading-[1.1] mt-[1vh] md:mt-0'>
              {renderAnimatedLetters("Digital Products", "hero-char-2")}
            </h1>
          </div>
        </div>
        <div
          ref={expandDivRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClick={handleVideoClick}
          className={`h-[40vh] md:h-[80vh] w-[90vw] md:w-[75vw] mx-auto flex justify-center items-center bg-black overflow-hidden rounded-[20px] relative transition-cursor ${!isVideoPlaying ? 'cursor-none' : ''}`}
        >
          {!isVideoPlaying ? (
            <img
              src={videoThumbnail}
              alt="Video Thumbnail"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          ) : (
            <iframe
              className='w-full h-full'
              src="https://www.youtube.com/embed/F8OTUpSV_Ss?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen>
            </iframe>
          )}
        </div>
        <div className='h-auto md:h-[50vh] py-[10vh] md:py-0 px-[4vw] flex items-center fade-up'>
          <p className='text-[#353535] font-regular text-2xl md:text-5xl lg:text-[4vh] leading-relaxed md:leading-[5vh] w-[90%] md:w-[70%] lg:w-1/2'>Transforms innovative ideas into impactful digital solutions through collaborative design, agile development, and AI-driven insights, delivering user-centered products that help businesses adapt and succeed in a rapidly evolving world.</p>
        </div>
        <div className='h-auto md:h-[20vh] py-[5vh] md:py-0 px-[4vw] flex items-center fade-up'>
          <h1 className='text-[#000000] font-medium text-4xl sm:text-5xl md:text-6xl lg:text-6xl w-full md:w-[85%]'>Our Clients, from bold startups to global industry icons</h1>
        </div>

        {/* Infinite Marquee Section */}
        <div className="relative w-full overflow-hidden whitespace-nowrap py-[8vh] mt-[2vh] bg-white">
          {/* Left Fade Gradient */}
          <div className="absolute top-0 left-0 w-[30vw] h-full bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>

          {/* Right Fade Gradient */}
          <div className="absolute top-0 right-0 w-[30vw] h-full bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* We double the frames array so the marquee loops seamlessly (-50% transform) */}
          <div className="inline-flex items-center gap-[4vw] w-max animate-marquee pr-[4vw]">
            {[...frames, ...frames].map((frame, index) => (
              <img
                key={index}
                src={frame}
                alt={`Partner Frame ${index}`}
                className="h-[8vh] md:h-[12vh] w-auto object-contain shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </div>
        </div>
        <div className='h-auto md:h-[20vh] py-[5vh] px-[4vw] flex items-center mt-[5vh] md:mt-[10vh] fade-up'>
          <h1 className='text-[#000000] font-medium text-4xl sm:text-5xl md:text-6xl lg:text-6xl w-full md:w-[85%]'>We have the skill to shape what's next.</h1>
        </div>
        <div className="px-[4vw] py-[2vh] h-auto md:h-[80vh] flex flex-col md:flex-row gap-[4vh] md:gap-[2vw] w-full fade-up">
          {/* Card 1 */}
          <div className="rounded-[24px] p-8 md:p-10 flex flex-col h-[55vh] md:h-[65vh] min-w-[85vw] md:min-w-[30vw] md:flex-1 relative overflow-hidden bg-[#dddddd] cursor-pointer group">
            <img src={S} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="relative z-10 max-w-full md:max-w-[90%]">
              <h2 className="text-2xl md:text-[1.8vw] font-medium mb-4 text-[#000000] w-2/3">Software Development</h2>
              <p className="text-[#8c8c8c] text-base md:text-[1.1vw] md:leading-[1.6vw] lg:text-[2vh] leading-[3vh] font-medium">We design, program, code and test customized software solutions that answer your unique business needs. We partner with you to develop your ideas and ensure it meets excellent quality standards for your organization.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-[24px] p-8 md:p-10 flex flex-col h-[55vh] md:h-[65vh] min-w-[85vw] md:min-w-[30vw] md:flex-1 relative overflow-hidden bg-[#dddddd] cursor-pointer group">
            <img src={S} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="relative z-10 max-w-full md:max-w-[90%]">
              <h2 className="text-2xl md:text-[1.8vw] font-medium mb-4 text-[#000000] w-3/4">User Experience & Interface Design</h2>
              <p className="text-[#8c8c8c] text-base md:text-[1.1vw] md:leading-[1.6vw] lg:text-[2vh] leading-[3vh] font-medium">We design your innovative product, process, or service by creating functional user-friendly interfaces that provide an excellent experience.</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="rounded-[24px] p-8 md:p-10 flex flex-col h-[55vh] md:h-[65vh] min-w-[85vw] md:min-w-[30vw] md:flex-1 relative overflow-hidden bg-[#dddddd] cursor-pointer group">
            <img src={S} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="relative z-10 max-w-full md:max-w-[90%]">
              <h2 className="text-2xl md:text-[1.8vw] font-medium mb-4 text-[#1A1A1A] w-3/4">Next-Gen AI & Data Services</h2>
              <p className="text-[#8c8c8c] text-base md:text-[1.1vw] md:leading-[1.6vw] lg:text-[2vh] leading-[3vh] font-medium">We harness the power of Artificial Intelligence and Data Analytics to unlock actionable insights, automate complex processes, and create intelligent, scalable solutions that drive real business impact.</p>
            </div>
          </div>
        </div>
        <div className='h-auto md:h-[20vh] py-[5vh] md:py-0 px-[4vw] flex items-center mt-[5vh] md:mt-0 fade-up'>
          <h1 className='text-[#000000] font-medium text-4xl sm:text-5xl md:text-6xl lg:text-6xl w-full md:w-[85%]'>Our work, from petal to planet.</h1>
        </div>
        {/* Project 1: Bosch */}
        <div className="border-t border-[#EAEAEA] py-[6vh] mx-[4vw] flex flex-col md:flex-row gap-[4vw] mt-[2vh] fade-up">
          {/* Left Column: Text & Tags */}
          <div className="w-full md:w-[32%] flex flex-col justify-between py-[1vh]">
            <div>
              <h2 className="text-[2rem] md:text-[2.2vw] font-medium text-[#1A1A1A] mb-[1.5vh]">Bosch</h2>
              <p className="text-[#999999] text-[1rem] md:text-[1.1vw] leading-[1.6] md:leading-[1.6vw] font-regular pr-[2vw]">
                We analyzed and designed a unique, usable map-based interface to enhance visualizations for quick processing of data on several geographic levels. And we developed a fully functional MVP desktop application with interactive dashboards for sales, forecasts and reporting.
              </p>
            </div>
            <div className="mt-[4vh] md:mt-0">
              <button className="border border-[#1A1A1A] text-[#1A1A1A] text-[1rem] md:text-[0.9vw] font-medium px-[6vw] md:px-[2vw] py-[1.5vh] md:py-[0.8vw] rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300 w-fit">
                Know More
              </button>
            </div>
          </div>

          {/* Right Column: Graphic Card */}
          <div className="w-full md:w-[68%] h-[40vh] md:h-[70vh] bg-[#F6F6F6] rounded-[1.5vw] flex items-center justify-center overflow-hidden">
            <img src={bosch} alt="Bosch" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>

        {/* Project 2: Digital Mint */}
        <div className="border-t border-[#EAEAEA] py-[6vh] mx-[4vw] flex flex-col md:flex-row gap-[4vw] fade-up">
          {/* Left Column: Text & Tags */}
          <div className="w-full md:w-[32%] flex flex-col justify-between py-[1vh]">
            <div>
              <h2 className="text-[2rem] md:text-[2.2vw] font-medium text-[#1A1A1A] mb-[1.5vh]">Digital Mint</h2>
              <p className="text-[#999999] text-[1rem] md:text-[1.1vw] leading-[1.6] md:leading-[1.6vw] font-regular pr-[2vw]">
                We designed a usable interface with the objective to appeal to both existing and potential crypto currency users, and we developed a responsive web application that provides existing customers the ability to view market trends and manage their account effectively.
              </p>
            </div>
            <div className="mt-[4vh] md:mt-0">
              <button className="border border-[#1A1A1A] text-[#1A1A1A] text-[1rem] md:text-[0.9vw] font-medium px-[6vw] md:px-[2vw] py-[1.5vh] md:py-[0.8vw] rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300 w-fit">
                Know More
              </button>
            </div>
          </div>

          {/* Right Column: Graphic Card */}
          <div className="w-full md:w-[68%] h-[40vh] md:h-[70vh] bg-[#F6F6F6] rounded-[1.5vw] flex items-center justify-center overflow-hidden">
            <img src={crypto} alt="Digital Mint" className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>

        {/* Project 3: Insurance Liability */}
        <div className="border-t border-b border-[#EAEAEA] py-[6vh] mx-[4vw] flex flex-col md:flex-row gap-[4vw] mb-[10vh] fade-up">
          {/* Left Column: Text & Tags */}
          <div className="w-full md:w-[32%] flex flex-col justify-between py-[1vh]">
            <div>
              <h2 className="text-[2rem] md:text-[2.2vw] font-medium text-[#1A1A1A] mb-[1.5vh]">Insurance Liability Solution for Rideshare Drivers</h2>
              <p className="text-[#999999] text-[1rem] md:text-[1.1vw] leading-[1.6] md:leading-[1.6vw] font-regular pr-[2vw]">
                We developed an iOS prototype to collect mobile sensor data and digital fingerprints. We used predictive analytics to identify when rideshare drivers are engaging in personal driving versus rideshare driving, allowing Allstate to know which insurance policies could apply during an incident with a rideshare driver.
              </p>
            </div>
            <div className="mt-[4vh] md:mt-0">
              <button className="border border-[#1A1A1A] text-[#1A1A1A] text-[1rem] md:text-[0.9vw] font-medium px-[6vw] md:px-[2vw] py-[1.5vh] md:py-[0.8vw] rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300 w-fit">
                Know More
              </button>
            </div>
          </div>

          {/* Right Column: Graphic Card */}
          <div className="w-full md:w-[68%] h-[40vh] md:h-[70vh] bg-[#F6F6F6] rounded-[1.5vw] flex items-center justify-center overflow-hidden">
            <img src={drive} alt="Insurance Liability" className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>
        <div className='h-[20vh] px-[4vw] flex items-center mt-[10vh] fade-up'>
          <h1 className='text-[#000000] font-medium text-5xl sm:text-6xl md:text-7xl lg:text-6xl w-7/8'>The mind behind it.</h1>
        </div>

        {/* Director Bio Section */}
        <div className="pb-[8vh] mx-[4vw] flex flex-col md:flex-row gap-[6vw] fade-up">
          {/* Left Column: Graphic / Image */}
          <div className="w-full md:w-[35%] flex items-start justify-center">
            <img src={director} alt="Dr. Olayele Adelakun" className="w-full h-auto object-cover rounded-[24px]" />
          </div>

          {/* Right Column: Text */}
          <div className="w-full md:w-[65%] flex flex-col justify-center pt-[1vh] pr-[2vw]">
            <h3 className="text-[#333333] text-[1.1rem] md:text-[1.2vw] font-medium mb-[1.5vh]">iD Lab Founder & Director</h3>
            <h2 className="text-[#325CC0] text-[2.5rem] md:text-[3.5vw] font-medium mb-[4vh] ">Dr. Olayele Adelakun</h2>
            <p className="text-[#555555] text-[1rem] md:text-[1.1vw] leading-[1.8] md:leading-[2vw] font-medium">
              Olayele Adelakun is an Associate Professor of MIS at DePaul University's College of Computing and Digital Media (CDM) in Chicago, Illinois. His research focuses on IT outsourcing, ERP systems implementation, and IT evaluation, with studies conducted in Europe, Africa, and the United States. Dr. Adelakun has chaired numerous academic and industry conferences and initiated CDM's study abroad program in 1994. He has published over eighty articles and led various executive presentations. Dr. Adelakun holds an M.S. in Information Processing Science from the University of Oulu, Finland, and a Ph.D. in Information Systems from the Turku School of Economics and Business Administration, Finland.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-[10vh] mx-[4vw] mb-[10vh] fade-up">
          <h2 className="text-[#1A1A1A] font-medium text-[2.5rem] md:text-[3.5vw] w-full md:w-[85%] mb-[8vh] leading-[1.1] tracking-tight pr-[5vw]">
            We're an international multi-disciplinary team of curious designers, developers, and strategists.
          </h2>

          <div className="h-[50vh] md:h-[80vh] w-full md:w-[92vw] mx-auto flex justify-center items-center overflow-hidden rounded-[20px] relative bg-[#f5f5f5]">
            <img
              src={videoThumbnail2}
              alt="Team"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        <Footer />
      </div>

      {/* Custom Video Play Cursor */}
      <div
        ref={cursorRef}
        className='fixed top-0 left-0 w-[80px] h-[80px] bg-white text-black rounded-full flex justify-center items-center font-bold text-sm pointer-events-none z-50 mix-blend-difference'
        style={{ scale: 0, opacity: 0 }}
      >
        Click
      </div>
    </div>
  )
}

export default App