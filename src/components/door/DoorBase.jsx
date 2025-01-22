import { useTexture } from '@react-three/drei';
import { createDoorMaterial } from '../../utils/materialUtils';
import { BoxGeometry, DoubleSide } from 'three';

export const DoorBase = ({ design, material, selected }) => {
	const texture = useTexture(design.texture);
	const doorGeometry = new BoxGeometry(
		design.dimensions.width,
		design.dimensions.height,
		design.dimensions.depth
	);

	const materialProps = createDoorMaterial({
		...material,
		emissive: selected ? '#ffffff' : '#000000',
		emissiveIntensity: selected ? 0.2 : 0,
	});

	return (
		<mesh geometry={doorGeometry}>
			<meshStandardMaterial
				{...materialProps}
				map={texture}
				side={DoubleSide}
			/>
		</mesh>
	);
};
