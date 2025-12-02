import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, Center } from '@react-three/drei';


export default function HoodieModel(props) {
    const group = useRef();
    const [hovered, setHover] = useState(false);

    // Load the GLTF model. Ensure 'hoodie.glb' is in the public folder.
    // We enable Draco compression support by passing a decoder path (CDN).
    const modelPath = `${import.meta.env.BASE_URL}hoodie.glb`;
    const { scene } = useGLTF(modelPath, 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

    const { viewport } = useThree();
    const isMobile = viewport.width < 5; // Rough estimate for mobile in R3F units

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Subtle floating animation is handled by <Float>, but we can add extra rotation if needed
        // group.current.rotation.y = Math.sin(t / 4) / 8;
    });

    useEffect(() => {
        if (scene) {
            console.log("Model loaded:", scene);
        }
    }, [scene]);

    return (
        <Float
            speed={1}
            rotationIntensity={1}
            floatIntensity={1}
            floatingRange={[-0.1, 0.1]}
        >
            <group
                ref={group}
                {...props}
                dispose={null}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                scale={1}
            >
                <Center>
                    <primitive object={scene} scale={isMobile ? 0.5 : 1} />
                </Center>


            </group>
        </Float>
    );
}

// Preload the model
useGLTF.preload(`${import.meta.env.BASE_URL}hoodie.glb`, 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
