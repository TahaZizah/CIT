import React from 'react';
import { Html, useProgress } from '@react-three/drei';

export default function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="text-white font-mono text-sm tracking-widest text-center">
                LOADING MODEL... {progress.toFixed(0)}%
                <br />
            </div>
        </Html>
    );
}
