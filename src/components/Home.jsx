import React, { useRef, useState,useEffect } from 'react'
import Model from './Model';
import NavbarHome from './NavbarHome'


const Home = () => {
    const [gltf, setGltf] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0); // State for loading progress

  const [isMobile, setIsMobile] = useState(false);
  const secRef = {
    sectionRef1: useRef(),
    sectionRef2: useRef(),
    sectionRef3: useRef(),
    sectionRef4: useRef(),
    sectionRef5: useRef(),
    sectionRef6: useRef(),
  }

  useEffect(() => {
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
                                border:'3px solid #f5f5f5',
                                width:'100%',
                                color:'white',
                                textAlign:'center',
                                marginBottom:'7px'
                            }}
                        >
                          <span className='gradient-title1 g-grey'>EXECUTING FOLIO</span>
                        </div>
                        <div className="progress mb-1" role="progressbar" aria-label="Model loading progress" aria-valuenow={loadingProgress} aria-valuemin="0" aria-valuemax="100" style={{ height: '3px',background:'transparent' }}>

                            <div className="progress-bar " style={{ width: `${loadingProgress}%` }}></div>

                        </div>
                           Loading Assets & Dependencies: &nbsp; {Math.round(loadingProgress)}%

                    </div>
                </div>

            }
     {!isMobile && <Model modelPath="/models/Compressed-Sphere-Bot.glb" setLoadingProgress={setLoadingProgress} loadingProgress={loadingProgress} gltf={gltf} setGltf={setGltf} secRef={secRef} />}
      <NavbarHome secRef={secRef} isMobile={isMobile}/>

    </>
  )
}

export default Home

import './styles/mobile.css'
import './styles/smdesktop.css'