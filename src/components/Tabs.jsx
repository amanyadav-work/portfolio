import React,{useState} from 'react';
import './styles/Tabs.css';
import { MdArrowOutward } from "react-icons/md";

const Tabs = () => {
  // State to track which tab (index) is currently active
  const [activeIndex, setActiveIndex] = useState(0);

  // Array of tab titles and content
  const tabs = [
    { title: 'Innois', content: 'Built fully functional websites from scratch, enhancing my portfolio with international sites through teamwork.', link:'https://www.linkedin.com/company/innois' },
   
    { title: 'Web Promos', content: 'Assisted in starting a new brand, designing and developing 35+ crucial pages with modifications.', link:'https://www.webpromosindia.com/' },
   
  ];

  // Toggle the active tab index
  const toggleTab = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // If the clicked tab is already active, hide the content
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
          {activeIndex === index && <p className='gradient-title1 g-blue'><a aria-label="company-experience-link" target='_blank' href={tab.link} className='exp-links'>See Website<MdArrowOutward color='blue' /></a> <br/><br/>{tab.content}</p>}
        </div>
      ))}
    </div>
  );
};



export default Tabs
