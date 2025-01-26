import { useRef } from 'react';

export const Door = ({ config, selected, onSelect, onDeselect }) => {
	const doorRef = useRef();
	const scale = config.openingDirection?.mirror ? -1 : 1;

	// Get the appropriate door image based on configuration
	const getDoorImage = () => {
		return config.design?.texture || '/src/assets/doors/default-door.jpg';
	};
	console.log(config);
	// Get glass image if glass is selected
	const getGlassImage = () => {
		if (config.glass && config.glass.id !== 'no-glass' && config.glassPattern) {
			return config.glassPattern.image;
		}
		return null;
	};

	const glassImage = getGlassImage();

	return (
		<div
			ref={doorRef}
			className={`door-container ${selected ? 'selected' : ''}`}
			onClick={() => onSelect && onSelect()}
		>
			<div className="door-image-container">
				{/* Base Door Image */}
				<img
					src={getDoorImage()}
					alt="Door Preview"
					className="door-image"
					style={{
						transform: `scaleX(${scale})`,
					}}
				/>

				{/* Glass Overlay */}
				{glassImage && (
					<div
						className="glass-overlay"
						style={{ transform: `scaleX(${scale})` }}
					>
						<img
							src={glassImage}
							alt="Glass Pattern"
							className="glass-image"
						/>
					</div>
				)}
			</div>

			<style jsx>{`
				.door-container {
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					cursor: pointer;
					padding: 20px;
					transition: all 0.3s ease;
				}

				.door-container.selected {
					outline: 2px solid #1890ff;
					background-color: rgba(24, 144, 255, 0.05);
				}

				.door-image-container {
					width: 100%;
					max-width: 400px;
					aspect-ratio: 1/2;
					position: relative;
					overflow: hidden;
					border-radius: 8px;
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
				}

				.door-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: transform 0.3s ease;
					position: absolute;
					top: 0;
					left: 0;
				}

				.glass-overlay {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					pointer-events: none;
					transition: transform 0.3s ease;
				}

				.glass-image {
					width: 100%;
					height: 100%;
					object-fit: contain;
					opacity: 0.8;
					mix-blend-mode: overlay;
				}

				@media (max-width: 768px) {
					.door-container {
						padding: 10px;
					}

					.door-image-container {
						max-width: 300px;
					}
				}

				@media (min-width: 769px) and (max-width: 1024px) {
					.door-image-container {
						max-width: 350px;
					}
				}

				@media (min-width: 1025px) {
					.door-container {
						padding: 30px;
					}
				}
			`}</style>
		</div>
	);
};
