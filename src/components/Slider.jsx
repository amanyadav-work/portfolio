import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CardItem from "./CardItem";
import './styles/Slider.css'
import { MdArrowOutward } from "react-icons/md";
import { EXTERNAL_LINKS, PROJECTS } from "../constants/portfolio";


const Slider = ({ sectionRefs, isMobile }) => {
  const { projects } = sectionRefs;

  const targetRef = useRef();
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (

    <section ref={targetRef} className="slider-container relative" data-scroll-track>
      <div className="slider">


        <a href={EXTERNAL_LINKS.githubRepositories} aria-label="github-profile-link" className="slideritem know gradient-title1 g-yellow">See More Of Projects <MdArrowOutward /></a>
        <p className="top-status gradient-title1 g-yellow">Recent Works</p>
        <motion.div 
          className="d-flex slideritem gap-3" 
          style={{ x }}
          layout={false}
          initial={false}
        >

          {PROJECTS.map((project) => (
            <CardItem key={project.title} {...project} />
          ))}

        </motion.div>

        <motion.div
          initial={isMobile ? undefined : { opacity: 0, y: "-100px" }}
          whileInView={isMobile ? undefined : { opacity: 1, y: "0px" }}
          viewport={isMobile ? undefined : { margin: "-200px", once: false }}
          transition={{ delay: 0.3 }}
          exit={isMobile ? undefined : { opacity: 0, y: "400px" }}
          className="text-slider-bottom" ref={projects} id="section4">
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
