import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import HoodieModel from './HoodieModel';
import Loader from './Loader';

export default function Scene() {
    return (
        <div className="w-full h-full relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 35 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.8} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />

                <Suspense fallback={<Loader />}>
                    <HoodieModel position={[0, 0, 0]} />
                    <Environment preset="city" />
                    {/* Removed ContactShadows for cleaner look in overlay mode, or adjust opacity */}
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 1.5}
                    enableDamping={true}
                    dampingFactor={0.05}
                    rotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
}
