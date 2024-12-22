// src/components/3d/Scene.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Door } from './Door';

export function Scene({ design, color, handleStyle }) {
	return (
		<Canvas
			shadows
			camera={{ position: [0, 0, 2.5], fov: 50 }}
		>
			<Suspense fallback={null}>
				<Stage
					environment="city"
					intensity={0.5}
				>
					<Door
						design={design}
						color={color}
						handleStyle={handleStyle}
					/>
				</Stage>
				<OrbitControls
					autoRotate
					autoRotateSpeed={0.5}
					enableZoom={true}
					enablePan={true}
					minPolarAngle={Math.PI / 4}
					maxPolarAngle={Math.PI / 1.5}
				/>
			</Suspense>
		</Canvas>
	);
}
