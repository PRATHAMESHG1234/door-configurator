import React from 'react';
import { DoubleSide } from 'three';
import { useTexture } from '@react-three/drei';
import doorImage from '../../assets/doors/19-20.jpg';
import { HandleGeometry } from './HandleGeometry';

function Door({ handleStyle, onClick, selected }) {
	const texture = useTexture(doorImage);

	return (
		<group
			onClick={onClick}
			onPointerOver={(e) => {
				e.stopPropagation();
				document.body.style.cursor = 'pointer';
			}}
			onPointerOut={() => {
				document.body.style.cursor = 'default';
			}}
		>
			<mesh>
				<boxGeometry args={[1, 2, 0.05]} />
				<meshStandardMaterial
					map={texture}
					side={DoubleSide}
					emissive={selected ? '#ffffff' : '#000000'}
					emissiveIntensity={selected ? 0.2 : 0}
				/>
			</mesh>

			{/* Handle with same interaction capabilities */}
			<mesh position={[0.4, 0, 0.035]}>
				<HandleGeometry style={handleStyle} />
				<meshStandardMaterial
					color={selected ? '#aaaaaa' : '#808080'}
					metalness={0.9}
					roughness={0.2}
				/>
			</mesh>
		</group>
	);
}

export default Door;
