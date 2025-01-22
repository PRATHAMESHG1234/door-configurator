// src/components/door/DoorGlass.jsx
import { useTexture } from '@react-three/drei';
import { createGlassMaterial } from '../../utils/materialUtils';
import { DoubleSide } from 'three';

export const DoorGlass = ({ configuration, pattern }) => {
	if (!configuration) return null;

	// Default dimensions and offset
	const defaultConfig = {
		dimensions: {
			width: 0.8,
			height: 1.6,
		},
		offset: {
			x: 0,
			y: 0,
			z: 0.01,
		},
	};

	// Get dimensions and offset with fallbacks
	const dimensions = configuration.dimensions || defaultConfig.dimensions;
	const offset = configuration.offset || defaultConfig.offset;

	// Only try to load texture if it exists and is a valid path
	let texture = null;
	try {
		if (pattern?.texture) {
			texture = useTexture(pattern.texture);
		}
	} catch (error) {
		console.warn('Failed to load glass texture:', error);
	}

	// Create material properties
	const materialProps = createGlassMaterial(pattern || {});

	return (
		<mesh position={[offset.x || 0, offset.y || 0, offset.z || 0.01]}>
			<planeGeometry
				args={[dimensions.width || 0.8, dimensions.height || 1.6]}
			/>
			<meshPhysicalMaterial
				{...materialProps}
				map={texture}
			/>
		</mesh>
	);
};
