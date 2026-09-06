import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Model as CompressedSphereBot } from './CompressedSphereBot';
import { Environment, ContactShadows, Sparkles } from '@react-three/drei';
import { SandStorm } from './WindSand';

// Main model component
const Model = ({ modelPath, sectionRefs, loadingProgress, setLoadingProgress, gltf, setGltf }) => {
    const [playAnimationIndex, setPlayAnimationIndex] = useState(null);
    const [isContactSection, setIsContactSection] = useState(false);
    const [theme, setTheme] = useState({
        background: "#0d0d0d",
        lights: "white"
    });
    const [modelPosition, setModelPosition] = useState({
        x: 0,
        y: 2,
        z: 0
    });
    const [mouseX, setMouseX] = useState(0);

    const getAnimationSpeed = useCallback((index) => {
        // Section 3 (blue), section 5, and section 6 animations should be slower
        if (index === 1 || index === 5) {
            return 0.9; // 60% of normal speed (slower)
        }
        return 1; // Normal speed
    }, []);

    const handlePlayAnimation = useCallback((index) => {
        setPlayAnimationIndex(index);
    }, []);

    const modelposi = useCallback((x, y, z) => {
        setModelPosition((prevPosition) => {
            gsap.to(prevPosition, {
                x: x,
                y: y,
                z: z,
                duration: 2,
                ease: "expo.out",
                onUpdate: () => {
                    setModelPosition({
                        x: prevPosition.x,
                        y: prevPosition.y,
                        z: prevPosition.z
                    });
                }
            });
            return prevPosition;
        });
    }, []);

    const ambientLightRef = useRef();

    const changeTheme = useCallback((newBackground, newLights) => {
        gsap.to("canvas", {
            backgroundColor: newBackground,
            duration: 0.6,
        });

        if (ambientLightRef.current) {
            gsap.to(ambientLightRef.current, {
                color: newLights,
                duration: 1,
            });
        }

        setTheme({
            background: newBackground,
            lights: newLights
        });
    }, []);

    useEffect(() => {
        // Set initial progress to 100 since we're using JSX component
        setLoadingProgress(100);
        setGltf(true);
    }, [setLoadingProgress, setGltf]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalize mouse X position from window width to 3D coordinates (-4 to 4)
            const normalizedX = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
            const positionX = normalizedX * 4; // -4 to 4
            setMouseX(positionX);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target.id === "section1") {
                            setIsContactSection(true);
                            modelposi(-1.6, -2, 0);
                            handlePlayAnimation(2);
                            changeTheme("#0d0d0d", "white");
                        } else if (entry.target.id === "section2") {
                            setIsContactSection(false);
                            modelposi(-1.6, -2, 0);
                            handlePlayAnimation(4);
                            changeTheme("#0b0000", "red");
                        } else if (entry.target.id === "section3") {
                            setIsContactSection(false);
                            modelposi(1.7, -2, 0);
                            handlePlayAnimation(1);
                            changeTheme("#00000b", "#3b6cff");
                        } else if (entry.target.id === "section4") {
                            setIsContactSection(false);
                            modelposi(0, -4.99, -4);
                            handlePlayAnimation(3);
                            changeTheme("#090600", "gold");
                        } else if (entry.target.id === "section5") {
                            setIsContactSection(true);
                            modelposi(-2.6, -2, 0);
                            handlePlayAnimation(0);
                            changeTheme("#0d0d0d", "#e7fcfe");
                        }
                        else if (entry.target.id === "section6") {
                            setIsContactSection(false);
                            modelposi(-2.6, -2, -2);
                            handlePlayAnimation(5);
                            changeTheme("#0b0000", "orange");
                        }
                    }
                });
            },
            {
                threshold: 0.49,
            }
        );

        if (sectionRefs.intro.current) {
            observer.observe(sectionRefs.intro.current);
        }
        if (sectionRefs.about.current) {
            observer.observe(sectionRefs.about.current);
        }
        if (sectionRefs.experience.current) {
            observer.observe(sectionRefs.experience.current);
        }
        if (sectionRefs.projects.current) {
            observer.observe(sectionRefs.projects.current);
        }
        if (sectionRefs.contact.current) {
            observer.observe(sectionRefs.contact.current);
        }
        if (sectionRefs.footer.current) {
            observer.observe(sectionRefs.footer.current);
        }

        return () => {
            if (sectionRefs.intro.current) {
                observer.unobserve(sectionRefs.intro.current);
            }
            if (sectionRefs.about.current) {
                observer.unobserve(sectionRefs.about.current);
            }
            if (sectionRefs.experience.current) {
                observer.unobserve(sectionRefs.experience.current);
            }
            if (sectionRefs.projects.current) {
                observer.unobserve(sectionRefs.projects.current);
            }
            if (sectionRefs.contact.current) {
                observer.unobserve(sectionRefs.contact.current);
            }
            if (sectionRefs.footer.current) {
                observer.unobserve(sectionRefs.footer.current);
            }
        };
    }, [sectionRefs, modelposi, handlePlayAnimation, changeTheme]);


    return (
        <>
            <Canvas
                shadows="variance"
                dpr={[1, 2]}
                style={{
                    width: '100%',
                    height: '100vh',
                    backgroundColor: theme.background,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    maxWidth: "100vw",
                    overflow: "hidden",
                    pointerEvents: "none",
                }}
            >
                {/* Fog for visibility - dynamic based on model position */}
                <fog
                    attach="fog"
                    args={[
                        theme.background, 5, 20]}
                />

                {/* Environment Lighting Setup */}
                {/* <Environment preset="night" environmentIntensity={0.1}  /> */}
                <ambientLight intensity={0.1} />
                <directionalLight
                    position={[0, 2, 0]}
                    intensity={1.5}
                    color={theme.lights}
                    castShadow={true}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-near={0.5}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                    shadow-radius={10}
                    shadow-bias={-0.0001}
                />
                <spotLight
                    position={[-1, 2, -2]}
                    intensity={0.8}
                    color={theme.lights}

                    castShadow={true}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-radius={8}
                    shadow-bias={-0.0001}
                />
                <spotLight
                    position={[2, 2, -2]}
                    intensity={0.8}
                    castShadow={true}
                    color={theme.lights}

                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-radius={8}
                    shadow-bias={-0.0001}
                />

                {/* Point light that follows mouse */}
                <pointLight
                    position={[mouseX, 3.5, 2]}
                    intensity={15}
                    color={theme.lights}
                    distance={25}
                    decay={2}
                        shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-radius={8}
                    shadow-bias={-0.0001}
                    castShadow
                />

                <ModelWrapper playAnimationIndex={playAnimationIndex} modelPosition={modelPosition} themeColor={"#969595"} getAnimationSpeed={getAnimationSpeed} />

                {/* Wind Sand Effect - Only visible in Contact Section */}
                {isContactSection && (
                  <SandStorm 
                    count={900}
                    speed={0.7}
                    color={"#808080"}
                    size={0.008}
                    shape="sphere"
                  />
                )}

                {/* Sparkles around model */}
                <Sparkles
                    count={50}
                    scale={45}
                    size={2}
                    speed={2}
                    opacity={0.1}
                    color={theme.lights}
                />

                {/* Bloom effect for lights */}
                <EffectComposer >
                    <Bloom
                        intensity={0.5}
                        luminanceThreshold={1}
                        luminanceSmoothing={0.2}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </>
    );
};

export default Model;

// Wrapper component to handle animation control
const ModelWrapper = ({ playAnimationIndex, modelPosition, themeColor, getAnimationSpeed }) => {
    const modelRef = useRef();

    useEffect(() => {
        if (modelRef.current && modelRef.current.actions) {
            const actions = modelRef.current.actions;
            const actionList = Object.values(actions).filter(action => action);

            // Stop all animations first
            actionList.forEach((action) => {
                if (action && action.isRunning && action.isRunning()) {
                    action.stop();
                }
            });

            // Play selected animation
            if (playAnimationIndex !== null && actionList[playAnimationIndex]) {
                const selectedAction = actionList[playAnimationIndex];
                if (selectedAction) {
                    // Reset and play the animation with custom speed
                    selectedAction.reset();
                    selectedAction.timeScale = getAnimationSpeed(playAnimationIndex);
                    selectedAction.play();
                }
            }
        }
    }, [playAnimationIndex, getAnimationSpeed]);

    return (
        <group
            position={[modelPosition.x, modelPosition.y, modelPosition.z]}
            scale={2}
        >
            <CompressedSphereBot ref={modelRef} castShadow receiveShadow modelColor={themeColor} />
        </group>
    );
};


