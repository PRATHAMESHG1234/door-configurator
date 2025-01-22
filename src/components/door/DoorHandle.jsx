// src/components/door/DoorHandle.jsx
import { HandleGeometry } from '../3d/HandleGeometry';

export const DoorHandle = ({ style, selected }) => {
	return (
		<group
			position={[
				style.position?.x || 0.4,
				style.position?.y || 0,
				style.position?.z || 0.035,
			]}
		>
			<HandleGeometry style={style} />
		</group>
	);
};
