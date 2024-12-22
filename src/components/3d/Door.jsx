// src/components/3d/Door.jsx
import React from 'react';
import { DoubleSide } from 'three';
import { HandleGeometry } from './HandleGeometry';

export function Door({ design, color, handleStyle }) {
	return (
		<group>
			{/* Main door body */}
			<mesh position={[0, 0, 0]}>
				<boxGeometry args={[1, 2, 0.05]} />
				<meshStandardMaterial
					color={color.hex}
					metalness={color.metalness}
					roughness={color.roughness}
					side={DoubleSide}
				/>
			</mesh>

			{/* Door panels */}
			{design.panels.map((panel, index) => (
				<mesh
					key={index}
					position={panel.position}
				>
					<boxGeometry args={panel.size} />
					<meshStandardMaterial
						color={color.hex}
						metalness={color.metalness}
						roughness={color.roughness - 0.1}
						side={DoubleSide}
					/>
				</mesh>
			))}

			{/* Door handle */}
			<HandleGeometry
				style={handleStyle}
				position={[0.4, 0, 0.035]}
			/>
		</group>
	);
}
