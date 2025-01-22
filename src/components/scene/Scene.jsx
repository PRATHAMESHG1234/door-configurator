// src/components/scene/Scene.jsx
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
	OrbitControls,
	Stage,
	PerspectiveCamera,
	Environment,
	Html,
} from '@react-three/drei';
import { Alert } from '@/components/ui/alert';
import { Door } from '../door/Door';

export function Scene({
	doorConfig,
	onSelect,
	onDeselect,
	environmentPreset = 'warehouse',
	cameraSettings = { position: [0, 0, 5], fov: 50 },
}) {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<div className="w-full h-full relative">
			{/* Grid Background */}
			<div
				className="absolute inset-0 bg-white"
				style={{
					backgroundImage: `radial-gradient(circle at 1px 1px, rgb(226, 232, 240) 1px, transparent 0)`,
					backgroundSize: '24px 24px',
				}}
			/>

			{/* 3D Scene */}
			<Canvas
				shadows
				className="absolute inset-0"
				onCreated={({ gl }) => {
					gl.setClearColor('#E2E8F0');
					setIsLoading(false);
				}}
			>
				<PerspectiveCamera
					makeDefault
					{...cameraSettings}
				/>

				<Suspense
					fallback={
						<Html center>
							<Alert variant="info">Loading 3D Scene...</Alert>
						</Html>
					}
				>
					<Stage
						environment={environmentPreset}
						intensity={0.5}
					>
						<Door
							config={doorConfig}
							onSelect={onSelect}
							onDeselect={onDeselect}
						/>
					</Stage>

					<OrbitControls
						minDistance={2}
						maxDistance={10}
						enablePan={true}
						enableZoom={true}
						minPolarAngle={0}
						maxPolarAngle={Math.PI}
					/>

					<Environment preset={environmentPreset} />
				</Suspense>
			</Canvas>

			{/* Loading Overlay */}
			{isLoading && (
				<div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
					<div className="text-center">
						<div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
						<p className="text-gray-600">Loading Scene...</p>
					</div>
				</div>
			)}
		</div>
	);
}
