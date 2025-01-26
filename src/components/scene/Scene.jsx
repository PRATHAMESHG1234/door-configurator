// src/components/scene/Scene.jsx
import { useState } from 'react';
import { Door } from '../door/Door';
import { Alert } from '@/components/ui/alert';

export function Scene({ doorConfig, onSelect, onDeselect }) {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className="scene-container">
			{/* Background Grid */}
			<div className="background-grid" />

			{/* Door Display Area */}
			<div className="door-display">
				<Door
					config={doorConfig}
					onSelect={onSelect}
					onDeselect={onDeselect}
				/>
			</div>

			{/* Loading State */}
			{isLoading && (
				<div className="loading-overlay">
					<Alert>Loading...</Alert>
				</div>
			)}

			<style jsx>{`
				.scene-container {
					width: 100%;
					height: 100%;
					position: relative;
					background-color: #f5f5f5;
					overflow: hidden;
				}

				.background-grid {
					position: absolute;
					inset: 0;
					background-image: radial-gradient(
						circle at 1px 1px,
						#e0e0e0 1px,
						transparent 0
					);
					background-size: 20px 20px;
					opacity: 0.5;
				}

				.door-display {
					position: relative;
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					z-index: 1;
				}

				.loading-overlay {
					position: absolute;
					inset: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: rgba(255, 255, 255, 0.8);
					z-index: 2;
				}

				@media (max-width: 768px) {
					.scene-container {
						height: 50vh;
						min-height: 300px;
					}
				}
			`}</style>
		</div>
	);
}
