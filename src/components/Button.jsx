import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './styles/Button.css'
import './styles/CardItem.css'
import { MdArrowOutward } from "react-icons/md";

const Button = ({ text, defualtWidth, color, bgcolor, classes,link }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Replace spaces with non-breaking spaces so they can be handled by motion
  const textWithSpaces = text.split('').map(char => char === ' ' ? '\u00A0' : char); 

  return (
    <motion.a href={link} target='_blank'
      className={`text-container ${classes}`}
      style={{
        width: `${defualtWidth ? defualtWidth : "100%"}`,
        color: `${color ? color : "#191b19"}`,
        backgroundColor: `${bgcolor ? bgcolor : "#b4e300"}`
      }}
      onHoverStart={() => setIsHovered(true)} // Set hover state to true
      onHoverEnd={() => setIsHovered(false)} // Set hover state to false
    >
      {/* Original text */}
      <div className="original-text">
        {textWithSpaces.map((char, index) => (
          <motion.span
            key={index}
            className="wavy-letter"
            initial={{ opacity: 1 }}
            animate={{
              opacity: isHovered ? 0 : 1, // Fade out the original text on hover
              y: isHovered ? -30 : 0, // Move the original text upwards on hover
            }}
            transition={{
              duration: 0,
              delay: index * 0.025, // Staggered delay for each letter's animation
              ease: 'easeInOut', // Smooth easing for the animations
            }}
          >
            {char}
          </motion.span>
        ))}
        <MdArrowOutward />
      </div>

      {/* New text coming from the bottom */}
      <div className="new-text">
        {textWithSpaces.map((char, index) => (
          <motion.span
            key={index}
            className="wavy-letter"
            initial={{ y: 50, opacity: 0 }} // Start the new text from below with opacity 0
            animate={{
              y: isHovered ? 0 : 50, // New text comes from the bottom when hovered
              opacity: isHovered ? 1 : 0, // Fade in the new text on hover
            }}
            transition={{
              duration: 0,
              delay: index * 0.025, // Staggered delay for each letter's animation
              ease: 'easeInOut', // Smooth easing for the animations
            }}
          >
            {char}
          </motion.span>
        ))}
        <MdArrowOutward />
      </div>
    </motion.a>
  );
};

export default Button;
