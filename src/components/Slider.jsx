import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CardItem from "./CardItem";
import './styles/Slider.css'
import { MdArrowOutward } from "react-icons/md";



const Slider = ({ secRef, isMobile }) => {
  const projectsData = [
    {
      cardTitle: "VR Career Engine",
      cardUrl: "https://career-ai-brown.vercel.app/",
      cardImg: "/assets/micro-career-ai.webp",
    },
    {
      cardTitle: "Oxyra Cloud Pipeline",
      cardUrl: "https://github.com/amanyadav-work/oxyra-cloud-pipeline",
      cardImg: "/assets/oxyra_cloud.webp",
      btnTxt: "View System"
    },
    {
      cardTitle: "Minimal DNS Server",
      cardUrl: "https://github.com/amanyadav-work/dns-server",
      cardImg: "/assets/dns-server-infographic.webp",
      btnTxt: "See Code"
    },
    {
      cardTitle: "The Spring Marketplace",
      cardUrl: "https://springshop.vercel.app",
      cardImg: "/assets/spring_ecommerce_platform.webp",

    },
    {
      cardTitle: "The Absento Ai",
      cardUrl: "https://absento-ai.vercel.app",
      cardImg: "/assets/Abesento-ai-face-recognition-system.webp",
    },
    {
      cardTitle: "Hirred Job Portal",
      cardUrl: "https://github.com/amanyadav-work/job-portal",
      cardImg: "/assets/Hirred_Job_Portal.webp",
      btnTxt: "Look Inside"
    },
    {
      cardTitle: "Static Wystra Museum",
      cardUrl: "https://amandevportfolio.blogspot.com/p/wystra-museum.html",
      cardImg: "/assets/wystra-museum.webp",

    },
    {
      cardTitle: "Cloud9 Infosystem",
      cardUrl: "https://www.cloud9infosystems.com/",
      cardImg: "/assets/cloud9-infosystem-project-made-by-aman.webp",

    },
    {
      cardTitle: "Mehta & Co Website",
      cardUrl: "https://mncoarchitects.com/",
      cardImg: "/assets/kmehta-project-website-by-aman.webp",

    },
    {
      cardTitle: "Extended Ocean Shipping",
      cardUrl: "https://eosdxb.com/",
      cardImg: "/assets/Ocean-Shipping-Website-WorkSample.webp",

    },
  ];

  const targetRef = useRef();
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (

    <section ref={targetRef} className="slider-container" style={{

      position: "relative", height: "300vh"
    }}>
      <div className="slider" style={{ position: "sticky", top: 0, display: "flex", height: "100vh", overflow: "hidden" }}>


        <a href="https://github.com/amanyadav-work?tab=repositories" aria-label="github-profile-link" className="slideritem know gradient-title1 g-yellow">See More Of Projects <MdArrowOutward /></a>
        <p className="top-status gradient-title1 g-yellow">Recent Works</p>
        <motion.div className="d-flex slideritem gap-3" style={{ x }}>

          {projectsData.map((item, index) => (
            <CardItem key={index} cardTitle={item.cardTitle} cardImg={item.cardImg} cardUrl={item.cardUrl} btnTxt={item.btnTxt}/>
          ))}

        </motion.div>

        <motion.div
          initial={isMobile ? undefined : { opacity: 0, y: "-100px" }}
          whileInView={isMobile ? undefined : { opacity: 1, y: "0px" }}
          viewport={isMobile ? undefined : { margin: "-200px", once: false }}
          transition={{ delay: 0.3 }}
          exit={isMobile ? undefined : { opacity: 0, y: "400px" }}
          className="text-slider-bottom" ref={secRef.sectionRef4} id="section4">
          <div className="hero-content w-31 ">
            <p className="hero-text gradient-title1 g-yellow">Highlights the recent</p>
            <h1 className="hero-heading gradient-title1 g-yellow smdesk-slider-heading">
              Distributed Systems
            </h1>
          </div>
          <div className="hero-content w-31">
            <p className="hero-text gradient-title1 g-yellow">Proudly Showcases</p>
            <h1 className="hero-heading gradient-title1 g-yellow smdesk-slider-heading">
              UI/UX Designs & Architecture
            </h1>
          </div>
        </motion.div>




      </div>



    </section>
  );
};

export default Slider;
