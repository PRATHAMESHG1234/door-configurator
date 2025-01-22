import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import { HandleGeometry } from '../3d/HandleGeometry';

export function HandlePreview({ style }) {
	return (
		<>
			<Stage
				environment="city"
				intensity={0.5}
				adjustCamera={false}
			>
				<HandleGeometry style={style} />
			</Stage>
			<OrbitControls
				enableZoom={false}
				enablePan={false}
				minPolarAngle={Math.PI / 3}
				maxPolarAngle={Math.PI / 1.8}
				autoRotate
				autoRotateSpeed={4}
			/>
		</>
	);
}
