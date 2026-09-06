'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Model from './Model';
import PortfolioNavigation from './PortfolioNavigation'
import { MODEL_ASSET_PATH } from '../constants/portfolio';
import { useSectionScrollSnap } from '../hooks/useSectionScrollSnap';


const PortfolioShell = () => {
  const [gltf, setGltf] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0); // State for loading progress
  const [isMobile, setIsMobile] = useState(false);
  const introRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);
  const sectionRefs = useMemo(() => ({
    intro: introRef,
    about: aboutRef,
    experience: experienceRef,
    projects: projectsRef,
    contact: contactRef,
    footer: footerRef,
  }), [aboutRef, contactRef, experienceRef, footerRef, introRef, projectsRef]);

  useSectionScrollSnap({
    enabled: !isMobile && Boolean(gltf),
  });

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Check if screen width is mobile
    };

    // Initial check on component mount
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Cleanup the listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      {(!gltf && !isMobile) &&
        <div className='gradient-title1 g-grey' style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          height: '100vh',
          width: '100%',
          zIndex: 99999999999999,
          backdropFilter: 'blur(100px)',
          alignItems: 'center',
          color: 'white',
          fontSize: '12px',
          justifyContent: 'center',
        }}>

          <div className='w-50 main-loading'>
            <div className='loading-container'
              style={{
                display: "inline-block",
                whiteSpace: "nowrap",
                fontSize: "4.5rem",
                fontWeight: "bold",
                border: '3px solid #f5f5f5',
                width: '100%',
                color: 'white',
                textAlign: 'center',
                marginBottom: '7px'
              }}
            >
              <span className='gradient-title1 g-grey'>EXECUTING FOLIO</span>
            </div>
            <div className="progress mb-1" role="progressbar" aria-label="Model loading progress" aria-valuenow={loadingProgress} aria-valuemin="0" aria-valuemax="100" style={{ height: '3px', background: 'transparent' }}>

              <div className="progress-bar " style={{ width: `${loadingProgress}%` }}></div>

            </div>
            Loading Assets & Dependencies: &nbsp; {Math.round(loadingProgress)}%

          </div>
        </div>

      }
      {!isMobile && <Model modelPath={MODEL_ASSET_PATH} setLoadingProgress={setLoadingProgress} loadingProgress={loadingProgress} gltf={gltf} setGltf={setGltf} sectionRefs={sectionRefs} />}
      <PortfolioNavigation sectionRefs={sectionRefs} isMobile={isMobile} />

    </>
  )
}

export default PortfolioShell

import './styles/mobile.css'
import './styles/smdesktop.css'