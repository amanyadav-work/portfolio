import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CardItem from "./CardItem";
import './styles/Slider.css'
import { MdArrowOutward } from "react-icons/md";



const Slider = ({ secRef,isMobile }) => {
  const projectsData = [
    {
      cardTitle: "The Wystra Museum",
      cardUrl: "https://www.amanwebdev.site/p/wystra-museum.html",
      cardImg: "/assets/wystra-museum.webp",

    },
    {
      cardTitle: "Cloud9Infosystem.com",
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
    {
      cardTitle: "About Team Page",
      cardUrl: "https://www.behance.net/gallery/198334841/Globe-Creations-Wordpress-Website-Design-Sample",
      cardImg: "/assets/About-us-page-designed-website-made-by-aman.webp",

    },
    {
      cardTitle: "Course Sales Web Page",
      cardUrl: "https://res.cloudinary.com/upwork-fp/image/upload/v1694095379/profile/portfolio/1692488493541781504/kwcrpumedhbwlbl25xx1.pdf",
      cardImg: "/assets/Course-Selling-Website-Project-By-Aman.webp",

    },
    {
      cardTitle: "Foodera Redesigned",
      cardUrl: "https://res.cloudinary.com/upwork-fp/image/upload/v1694072125/profile/portfolio/1692488493541781504/tq8caqqc4ogcvkq3t2lf.pdf",
      cardImg: "/assets/Foodera-Redesign-Made-By-Aman.webp",

    },
    {
      cardTitle: "Portfolio Website Page",
      cardUrl: "https://www.behance.net/gallery/198337663/Elementor-Portfolio-Site-Design-Showcase",
      cardImg: "/assets/Portfolio-Page-Made-By-Aman-Using-Wordpress-and-Elementor.webp",

    },
    {
      cardTitle: "ManeTamR Contest Finalist",
      cardUrl: "https://www.behance.net/gallery/198095067/ManeTamR-Recent-Web-Design-Finalist-on-99designs",
      cardImg: "/assets/ManeTamR-Website-99Designs-Contest-Finalist.webp",

    },
    {
      cardTitle: "Lintern Marketing Page",
      cardUrl: "https://res.cloudinary.com/upwork-fp/image/upload/v1694094276/profile/portfolio/1692488493541781504/j2x3xl9rmfhfaswfzo5p.pdf",
      cardImg: "/assets/Lintern-Demo-Comapany-Project-Website-Made-By-Aman.webp",

    },
    {
      cardTitle: "Globe Creations Profile",
      cardUrl: "https://www.behance.net/gallery/198374123/Work-Sample-Agency-Page",
      cardImg: "/assets/About-Us-Page-Showcase-Website-Made-By-Aman-Using-Elementor-Page-Builder.webp",

    },
    {
      cardTitle: "Pranada Live Page",
      cardUrl: "https://res.cloudinary.com/upwork-fp/image/upload/v1694095379/profile/portfolio/1692488493541781504/kwcrpumedhbwlbl25xx1.pdf",
      cardImg: "/assets/Pranada-Previous-Health-Website-Project-Made-By-Aman.webp",

    },
    {
      cardTitle: "Company Profile",
      cardUrl: "https://www.behance.net/gallery/196587291/Digital-Agency-Web-Design-Made-With-Elementor",
      cardImg: "/assets/Company-Web-Design-Profile-Page-Made-By-Aman-Yadav.webp",

    },
    {
      cardTitle: "Course Sales Web Page",
      cardUrl: "https://www.behance.net/gallery/198273115/Empowering-Design-with-Elementor-A-Highlight",
      cardImg: "/assets/Black-Portfolio-Website-Made-By-Aman.webp",

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


        <a href="https://www.behance.net/aman-yadav" aria-label="behance-profile-link" className="slideritem know gradient-title1 g-yellow">See More Of Projects <MdArrowOutward /></a>
        <p className="top-status gradient-title1 g-yellow">Previous Works</p>
        <motion.div className="d-flex slideritem gap-3" style={{ x }}>

          {projectsData.map((item, index) => (
            <CardItem key={index} cardTitle={item.cardTitle} cardImg={item.cardImg} cardUrl={item.cardUrl} />
          ))}

        </motion.div>

        <motion.div
          initial={isMobile ? undefined :{ opacity: 0, y: "-100px" }}
          whileInView={isMobile ? undefined :{ opacity: 1, y: "0px" }}
          viewport={isMobile ? undefined :{ margin:"-200px",once: false }}
          transition={{ delay: 0.3 }}
          exit={isMobile ? undefined :{ opacity: 0, y: "400px" }} 
          className="text-slider-bottom" ref={secRef.sectionRef4} id="section4">
          <div className="hero-content w-31 ">
            <p className="hero-text gradient-title1 g-yellow">Includes the recent..</p>
            <h1 className="hero-heading gradient-title1 g-yellow smdesk-slider-heading">
              Web Frontend Developments
            </h1>
          </div>
          <div className="hero-content w-31">
            <p className="hero-text gradient-title1 g-yellow">Also includes the past..</p>
            <h1 className="hero-heading gradient-title1 g-yellow smdesk-slider-heading">
              Wordpress CMS Web Projects !
            </h1>
          </div>
        </motion.div>




      </div>



    </section>
  );
};

export default Slider;
