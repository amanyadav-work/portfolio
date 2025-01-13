import { MdArrowOutward } from "react-icons/md";
import { FaHtml5 } from "react-icons/fa6";
import { FaSquareJs } from "react-icons/fa6";
import { FaWordpressSimple } from "react-icons/fa";
import { SiElementor } from "react-icons/si";
import { FaReact } from "react-icons/fa6";
import { SiThreedotjs } from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import { FaSquareUpwork } from "react-icons/fa6";
import { FaBehanceSquare } from "react-icons/fa";
import { SiBlockchaindotcom } from "react-icons/si";
import { motion } from 'framer-motion'
import Slider from './Slider';
import { MdDownload } from "react-icons/md";
import Tabs from './Tabs';
import gsap from 'gsap';
import { useEffect, useState, useRef } from 'react';
import emailjs from "emailjs-com";
import './styles/Home.css'


const NavbarHome = ({ secRef, isMobile }) => {
  const form = useRef();
  const [status, setStatus] = useState({});

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_01giuqc', 'template_ty6kg9s', form.current, 'ZbIpsqh-31UoGH_Hs')
      .then(
        () => {
          console.log('SUCCESS!');
          setStatus({
            color: '#46ff46b5',
            msg: 'Thanks.. We\'ll be in touch soon'
          })
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send message.');
          setStatus({
            color: '#851101',
            msg: `Error: ${error.text}`
          })
        }
      );
  };



  useEffect(() => {
    gsap.set(".cursor-circle", { xPercent: -50, yPercent: -50 });

    let xTo = gsap.quickTo(".cursor-circle", "x", { duration: 0.5, ease: "expo.out" });
    let yTo = gsap.quickTo(".cursor-circle", "y", { duration: 0.5, ease: "expo.out" });

    // Add mousemove event listener to move the cursor circle
    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    gsap.from(".navhome:before",

      {
        x: 0,                // Move to the original position
        borderRadius: "0",   // Set border radius back to 0
        border: "1px solid", // Change the border color
        duration: 2,
      });
    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);


  return (
    <>
      <div className="cursor-circle"></div>
      <div className="navhome">
        <h1 className='h4'>A.</h1>
        <div className='navbar-nav ul-nav'>
          <a className='nav-link rotate-link pl-2 pr-2' href="#section1" style={{ marginBottom: "-15px", marginTop: '-7px' }}>Home</a>
          <a className='nav-link rotate-link pl-2 pr-2' href="#section-2" >About</a>
          <a className='nav-link rotate-link pl-2 pr-2' href="#section-3" >Experience</a>
          <a className='nav-link rotate-link pl-2 pr-2' href="#section-4" >Projects</a>
          <a className='nav-link rotate-link pl-2 pr-2' href="#section-5" >Contact</a>
          <a className='nav-link rotate-link pl-2 pr-2' target='_blank' href="https://drive.google.com/file/d/167-7sY_7SmEK5q2nlGTJPRVF5a9dXKTI/view" style={{ marginTop: "-13px" }}>CV<MdArrowOutward /></a>
        </div>

        <div className="col-4">
          <div id="list-example" className="list-group fontsm">
            <a className="list-group-item list-group-item-action" aria-label="Section-Navigation" href="#section1"><SiBlockchaindotcom />
              <span className='child-active'>Introducting Me</span></a>
            <a className="list-group-item list-group-item-action" aria-label="Section-Navigation" href="#section-2"><SiBlockchaindotcom />
              <span className='child-active'>Walking Through About</span></a>
            <a className="list-group-item list-group-item-action" aria-label="Section-Navigation" href="#section-3"><SiBlockchaindotcom />
              <span className='child-active'>Look Experience</span></a>
            <a className="list-group-item list-group-item-action" aria-label="Section-Navigation" href="#section-4"><SiBlockchaindotcom />
              <span className='child-active'>Processing Works</span></a>
            <a className="list-group-item list-group-item-action" aria-label="Section-Navigation" href="#section-5"><SiBlockchaindotcom />
              <span className='child-active'>In Touch</span></a>
          </div>
        </div>
      </div>

      <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example " tabIndex="0">
        <motion.div
          initial={isMobile ? undefined : { opacity: 0, y: "-100px" }}
          whileInView={isMobile ? undefined : { opacity: 1, y: "0px" }}
          viewport={isMobile ? undefined : { margin: "-400px", once: false }}
          transition={isMobile ? undefined : { delay: 0.3 }} // Wait for 2 seconds before fading in
          className="hero"
          id="section1"
          ref={secRef.sectionRef1}
        >
          <p className='top-status'>
            ~ By Aman Yadav</p>

          <div className="hero-container">
            <div className="hero-content">
              <p className="hero-text">It took me a while to say that...</p>
              <h1 className="hero-heading gradient-title1 g-grey">
                I Have Been Fixing The Web Since February 2021.
                <a href="https://www.linkedin.com/in/amanyadav-workprofile/" target="_blank" aria-label="Linkedin Profile"> LinkedIn <MdArrowOutward /></a> 
              </h1>
            </div>
          </div>
        </motion.div>


        <div className="p-relative" id="section-2">


          <motion.div
            initial={isMobile ? undefined : { opacity: 0, y: "-100px" }}
            whileInView={isMobile ? undefined : { opacity: 1, y: "0px" }}
            viewport={isMobile ? undefined : { margin: "-400px", once: false }}
            transition={isMobile ? undefined : { delay: 0.3 }}
            exit={isMobile ? undefined : { opacity: 0, y: "400px" }}
            className="hero p-sticky"
            id="section2"
            ref={secRef.sectionRef2}
          >

            <div className="hero-container hero-container-new" bis_skin_checked="1">
              <div className="hero-content hero-content-new" bis_skin_checked="1">
                <div bis_skin_checked="1"></div>
                <div className="hero-text-new d-flex" bis_skin_checked="1">
                  <div className='d-flex gap-3'>
                    <FaHtml5 className='icon-blur' />
                    <FaCss3Alt className='icon-blur' />
                    <FaSquareJs className='icon-blur' />
                  </div>
                  <div className='d-flex gap-3'>
                    <FaWordpressSimple className='icon-blur' />
                    <SiElementor className='icon-blur' />
                    <FaReact className='icon-blur' />
                  </div>
                  <SiThreedotjs className='icon-blur' />

                </div>
              </div>
            </div>

            <div className="hero-container">
              <div className="hero-content">
                <div
                />
                <p className="" style={{ color: "#8a3535" }}>An brief introductory chapter regarding..</p>
                <h1 className="hero-heading gradient-title1 g-redish hero-bannerr">
                  About Aman Yadav, and The Tech Skills Stack.
                  <a href="https://github.com/amanyadav-work" target="_blank" aria-label="github-profile"> GitHub <MdArrowOutward color='red' /></a>
                </h1>
                <p className="hero-text gradient-title1 g-redish opacity-75">
                  I’m a 20-year-old frontend web developer working on improving my skills, ranging from WordPress to React and Three.js. Passionate about learning, building great projects, and connecting with others in the dev community.
                </p>
                <div className="d-flex boxs text-light mt-3">
                  <ul className="list-group w-75">
                    <li className="list-group-item d-flex justify-content-between align-items-center text-light aboutli edu-li">
                      HSC 12th Science
                      <span className="badge text-bg-danger rounded-pill">2022</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center text-light edu-li">
                      BCA
                      <span className="badge text-bg-danger rounded-pill">Current</span>
                    </li>

                  </ul>
                  <a href="https://drive.google.com/file/d/167-7sY_7SmEK5q2nlGTJPRVF5a9dXKTI/view" target="_blank" className='w-25 d-flex justify-content-center flex-column align-items-center edu-li'><MdDownload className='icon-blur h1' />CV</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>


        <div className="p-relative" id="section-3">
          <motion.div
            initial={isMobile ? undefined : { opacity: 0, y: "-100px" }}
            whileInView={isMobile ? undefined : { opacity: 1, y: "0px" }}
            viewport={isMobile ? undefined : { margin: "-400px", once: false }}
            transition={isMobile ? undefined : { delay: 0.3 }}
            exit={isMobile ? undefined : { opacity: 0, y: "400px" }}
            className="hero p-sticky"
            id="section3"
            ref={secRef.sectionRef3}
          >

            <div className="hero-container left-side">
              <div className="hero-content">
                <p className="hero-text" style={{ color: "#9595fc70" }}>An extremely short chapter regarding..</p>
                <h1 className="hero-heading gradient-title1 g-blue">
                  Past Experiences From Innois to Web Promos.
                  <a href="https://www.behance.net/aman-yadav" target="_blank" aria-label="Behance Profile Link"> Behance <MdArrowOutward color='blue' /></a>
                </h1>
                <p className="hero-text gradient-title1 g-blue opacity-100">

                  It was all about frontend development, crafting responsive, interactive websites that nailed seamless user experiences across projects and cutting-edge tech.
                </p>
                <div className="parabox-list">
                  <Tabs />
                </div>
              </div>
            </div>
          </motion.div>
        </div>


        <section id="section-4">

          <Slider secRef={secRef} isMobile={isMobile} />

        </section>


        <section className='p-relative' id='section-5'>
          <motion.div
            initial={isMobile ? undefined : { opacity: 0, y: "-100px" }}
            whileInView={isMobile ? undefined : { opacity: 1, y: "0px" }}
            viewport={isMobile ? undefined : { margin: "-400px", once: false }}
            transition={isMobile ? undefined : { delay: 0.3 }}
            exit={isMobile ? undefined : { opacity: 0, y: "400px" }}
            className="hero p-sticky"
            id="section5"
            ref={secRef.sectionRef5}
          >
            <div className="hero-container right-side">
              <div className="hero-content">
                <div
                />
                <p className="" style={{ color: "#ffffff80" }}>An brief regarding..</p>
                <h1 className="hero-heading gradient-title1 g-grey hero-bannerr">
                  Let's Be In Talk
                </h1>
                <p className="hero-text gradient-title1 g-grey opacity-75">
                  Have a project in mind? I'm always excited to discuss new ideas, collaborate on innovative solutions, and create amazing web experiences together with creative minds.

                </p>
                <form ref={form} onSubmit={sendEmail}>
                  <div className="mb-3 mt-4" data-bs-theme='dark'>
                    <input type="email" pattern='^\w+@[a-zA-z]+\.(com|in)' className="form-control form-control-sm bg-transparent gradient-title1 g-grey" id="exampleFormControlInput1" name='email' placeholder="name@example.com" onInvalid={(e) => {
                      e.target.setCustomValidity("Please enter a valid email address with .com or .in domain.");
                    }} onInput={(e) => {
                      e.target.setCustomValidity("");  // Reset custom message when user starts typing
                    }} required />
                  </div>
                  <div className="mb-3" data-bs-theme='dark'>
                    <textarea className="form-control form-control-sm bg-transparent gradient-title1 g-grey" id="exampleFormControlTextarea1" rows="6" name='message' placeholder="Your Message" required></textarea>
                  </div>
                  <div className="mt-2 d-flex gap-2 align-items-center">
                    <button type="submit" className=" btn btn-sm btn-outline-secondary">Send Message</button>
                    <button type="reset" className=" btn btn-sm btn-outline-secondary">Reset</button>
                    {status && <span style={{ color: status.color, marginLeft: '5px', fontSize: '13px' }}>{status.msg}</span>}
                  </div>
                </form>
              </div>
            </div></motion.div>
        </section>

        <section id="section6" style={{ height: "100vh", position: "relative", zIndex: "99", color: "#ffb7a1" }} ref={secRef.sectionRef6}>


          <motion.div
            initial={isMobile ? undefined : { opacity: 0, y: "-100px" }}
            whileInView={isMobile ? undefined : { opacity: 1, y: "0px" }}
            viewport={isMobile ? undefined : { margin: "-400px", once: false }}
            transition={isMobile ? undefined : { delay: 0.3 }}
            exit={isMobile ? undefined : { opacity: 0, y: "400px" }}
            className="hero-container right-side">
            <div className="hero-content d-flex gap-2 flex-direction-col">
              <div>
                <a target='_blank' aria-label='linkedin-account-link' href="https://www.linkedin.com/in/amanyadav-workprofile/"><BsLinkedin className='icon-blur footericons' /></a>
                <a target='_blank' aria-label='github-profile-link' href="https://github.com/amanyadav-work"><FaGithubSquare className='icon-blur footericons' /></a>
                <a target='_blank' aria-label='upwork-account-link' href="https://www.upwork.com/freelancers/~01d92c3dd126cf590e?mp_source=share"><FaSquareUpwork className='icon-blur footericons' /></a>
                <a target='_blank' aria-label="behance-profile-link" href="https://www.behance.net/aman-yadav"><FaBehanceSquare className='icon-blur footericons' /></a>
                <div>
                </div>

                <p className="hero-text gradient-title1 g-orange opacity-100 mt-3">

                  The site is built with code, passion, and a bit of experimentation. It’s all about showcasing cool projects, learning new tricks, and pushing web dev boundaries with every line of code. The sphere bot model credits goes to <a target='_blank' aria-label="model-creditor-profile" style={{ borderBottom: '1px solid #ff572261' }} href="https://sketchfab.com/3d-models/sphere-bot-6c3a32958c2d43cdbf12a7109616bdbe">haupt from sketchfab.</a>
                </p>

                <p className="hero-text gradient-title1 g-orange opacity-100 border-top foot-border pt-2 pb-2 border-bottom">
                  Proudly Designed & Developed By Aman Yadav
                </p>
              </div>

            </div>

          </motion.div>


        </section>

      </div>
    </>
  );
};

export default NavbarHome;
