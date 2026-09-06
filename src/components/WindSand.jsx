import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. Define custom shaders to animate the particles via the GPU
const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform vec3 uWindDirection;
  uniform float uWindStrength;
  
  varying float vLife;

  // Simple algorithmic noise to simulate wind turbulence
  float hash(float n) { return fract(sin(n) * 43758.5453123); }
  float noise(vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0 + 113.0*p.z;
    return mix(mix(mix(hash(n+0.0), hash(n+1.0), f.x),
                   mix(hash(n+57.0), hash(n+58.0), f.x), f.y),
               mix(mix(hash(n+113.0), hash(n+114.0), f.x),
                   mix(hash(n+170.0), hash(n+171.0), f.x), f.y), f.z);
  }

  void main() {
    // Unique offset per instance based on initial position
    vec3 instancePos = instanceMatrix[3].xyz;
    
    // Calculate progress/time loop for continuous flow
    float time = uTime * uSpeed;
    float cycle = fract(time + hash(instancePos.x + instancePos.y));
    
    // Base wind movement + turbulent noise displacement
    vec3 windOffset = uWindDirection * uWindStrength * cycle;
    float turbulence = noise(instancePos + time) * 0.5;
    windOffset += vec3(turbulence, sin(time + instancePos.x) * 0.2, turbulence);

    // Apply transformation
    vec3 transformed = position + windOffset;
    
    // Pass life progress to fragment shader for fading edges
    vLife = cycle;

    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(transformed, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying float vLife;
  
  void main() {
    // Fade out particles at the start and end of their loop cycle
    float alpha = smoothstep(0.0, 0.2, vLife) * smoothstep(1.0, 0.7, vLife);
    
    gl_FragColor = vec4(uColor, alpha * 0.8);
  }
`;

export function SandStorm({ 
  count = 2000,           // Particle density
  speed = 0.5,            // Animation speed
  color = "#E1A95F",      // Particle color (hex)
  size = 0.01,            // Particle size
  shape = "sphere"        // Geometry shape: 'sphere', 'box', 'cone'
}) {
  const meshRef = useRef();

  // 2. Initialize particle starting positions randomly in a 3D box boundary
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Convert hex color to RGB vector
  const colorVec = useMemo(() => {
    const col = new THREE.Color(color);
    return new THREE.Vector3(col.r, col.g, col.b);
  }, [color]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSpeed: { value: speed },
    uWindDirection: { value: new THREE.Vector3(1.0, 0.1, 0.2).normalize() },
    uWindStrength: { value: 15.0 },
    uColor: { value: colorVec }
  }), [speed, colorVec]);

  // Set initial random matrices on mount
  useMemo(() => {
    const range = 20;
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * range,
        (Math.random() - 0.2) * (range / 2),
        (Math.random() - 0.5) * range
      );
      dummy.updateMatrix();
      // Temporary setup, will apply to actual instance mesh after compile
    }
  }, [count, dummy]);

  // Handle rendering updates per frame
  useFrame((state) => {
    if (meshRef.current) {
      // Update time uniform to drive the vertex shader animation
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  // Inject initial positions once instance reference is bound
  const onMeshMount = (mesh) => {
    if (!mesh) return;
    meshRef.current = mesh;
    const range = 25;
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * range,
        (Math.random() - 0.3) * (range * 0.3), 
        (Math.random() - 0.5) * range
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  };

  // Create geometry based on shape prop
  const geometryComponent = useMemo(() => {
    switch (shape.toLowerCase()) {
      case 'box':
      case 'cube':
        return <boxGeometry args={[size, size, size]} />;
      case 'cone':
        return <coneGeometry args={[size * 0.5, size, 4]} />;
      case 'cylinder':
        return <cylinderGeometry args={[size * 0.4, size * 0.4, size, 8]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[size]} />;
      case 'sphere':
      default:
        return <sphereGeometry args={[size, 8, 8]} />;
    }
  }, [size, shape]);

  return (
    <instancedMesh ref={onMeshMount} args={[null, null, count]}>
      {geometryComponent}
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export default SandStorm;
