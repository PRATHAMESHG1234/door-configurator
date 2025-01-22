// src/components/3d/HandleGeometry.jsx
import { useMemo } from 'react';
import { BoxGeometry, CylinderGeometry } from 'three';
import { generateWaveGeometry } from '../../utils/geometryGenerators';

export function HandleGeometry({ style }) {
	const geometry = useMemo(() => {
		switch (style.shape) {
			case 'rectangle':
				return new BoxGeometry(
					style.dimensions.width,
					style.dimensions.height,
					style.dimensions.depth
				);

			case 'cylinder':
				return new CylinderGeometry(
					style.dimensions.radius,
					style.dimensions.radius,
					style.dimensions.height,
					32
				);

			case 'wave':
				return generateWaveGeometry(
					style.dimensions.width,
					style.dimensions.height,
					style.dimensions.depth,
					style.dimensions.amplitude,
					style.dimensions.frequency
				);

			default:
				return new BoxGeometry(0.05, 0.15, 0.02);
		}
	}, [style]);

	// Instead of returning the geometry directly, return it as a property of the mesh
	return (
		<mesh>
			<primitive
				object={geometry}
				attach="geometry"
			/>
			<meshStandardMaterial
				color={style.material?.color || '#808080'}
				metalness={style.material?.metalness || 0.9}
				roughness={style.material?.roughness || 0.2}
			/>
		</mesh>
	);
}
