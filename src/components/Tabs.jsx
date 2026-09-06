import React, { useState } from 'react';
import './styles/Tabs.css';
import { MdArrowOutward } from "react-icons/md";

const Tabs = () => {
  // State to track which tab (index) is currently active
  const [activeIndex, setActiveIndex] = useState(0);

  // Array of tab titles and content
  const tabs = [
    {
      title: 'TuringX',
      content: 'Worked on end-to-end data analytics applications, focusing on secure data pipelines, role-based access, and scalable frontend-backend integration using Next.js and Golang.',
      link: 'https://www.turingx.in/'
    },
    {
      title: 'Innois',
      content: 'Developed and deployed client websites using WordPress, ensuring responsive design, SEO optimization, and smooth user experience.',
      link: 'https://www.linkedin.com/company/innois'
    },
    {
      title: 'Web Promos',
      content: 'Contributed to website redesigns, building and optimizing 35+ pages with improved UI/UX and performance.',
      link: 'https://www.webpromosindia.com/'
    },
  ];

  // Toggle the active tab index
  const toggleTab = (index) => {
    if (activeIndex === index) {
      // setActiveIndex(null); // If the clicked tab is already active, hide the content
    } else {
      setActiveIndex(index); // Show the clicked tab content
    }
  };

  return (
    <div className="accordions d-flex mt-3" >
      {tabs.map((tab, index) => (
        <div key={index} className="accordion-items">
          {/* Title Section */}
          <h3
            onClick={() => toggleTab(index)} // Toggle content on title click
            className={activeIndex === index ? 'bgactive' : ''}
          >
            <span className='rotation w-100'>{tab.title}</span>
          </h3>

          {/* Content Section (visible only if this tab is active) */}
          {activeIndex === index && <p className='gradient-title1 g-blue'><a aria-label="company-experience-link" target='_blank' href={tab.link} className='exp-links'>See Website<MdArrowOutward color='blue' /></a> <br /><br />{tab.content}</p>}
        </div>
      ))}
    </div>
  );
};



export default Tabs
