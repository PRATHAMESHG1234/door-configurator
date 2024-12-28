// src/components/panels/HandlePanel.jsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { HandleGeometry } from '../3d/HandleGeometry';

// Preview component for individual handle
function HandlePreview({ style }) {
	return (
		<Canvas
			shadows
			camera={{ position: [0, 0, 0.3], fov: 50 }}
		>
			<Suspense fallback={null}>
				<Stage
					environment="city"
					intensity={0.5}
				>
					<HandleGeometry
						style={style}
						position={[0, 0, 0]}
					/>
				</Stage>
				<OrbitControls
					enableZoom={false}
					enablePan={false}
					minPolarAngle={Math.PI / 3}
					maxPolarAngle={Math.PI / 1.8}
				/>
			</Suspense>
		</Canvas>
	);
}

export function HandlePanel({ handleStyle, setHandleStyle, handleStyles }) {
	return (
		<div className="flex flex-col h-full">
			<h3 className="text-lg font-medium mb-4">Handle Style</h3>

			{/* Main scrollable content */}
			<div className="flex-1 overflow-y-auto pr-2 -mr-2">
				<div className="grid grid-cols-2 gap-4">
					{handleStyles.map((style) => (
						<div
							key={style.id}
							onClick={() => setHandleStyle(style)}
							className={`
                flex flex-col
                p-3 rounded-lg cursor-pointer
                transition-all duration-200
                ${
									handleStyle.id === style.id
										? 'bg-blue-50 border-blue-500 shadow-lg'
										: 'bg-white border-gray-200 hover:border-blue-300'
								}
                border-2
              `}
						>
							{/* Preview container */}
							<div className="aspect-square w-full bg-gray-50 rounded-md mb-2 overflow-hidden">
								<HandlePreview style={style} />
							</div>

							{/* Handle info */}
							<div className="flex justify-between items-center">
								<div>
									<h4 className="font-medium text-sm">{style.name}</h4>
									<p className="text-blue-600 font-semibold">${style.price}</p>
								</div>
								{handleStyle.id === style.id && (
									<div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
										<svg
											className="w-3 h-3 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Selected handle summary - fixed at bottom */}
			<div className="mt-4 pt-4 border-t border-gray-200">
				<div className="flex justify-between items-center">
					<div>
						<p className="text-sm text-gray-600">Selected Handle</p>
						<p className="font-medium">{handleStyle.name}</p>
					</div>
					<p className="text-lg font-bold text-blue-600">
						${handleStyle.price}
					</p>
				</div>
			</div>
		</div>
	);
}
