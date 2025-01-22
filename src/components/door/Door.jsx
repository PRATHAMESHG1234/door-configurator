import { useRef } from 'react';
import { DoorBase } from './DoorBase';
import { DoorHandle } from './DoorHandle';
import { DoorGlass } from './DoorGlass';
import { useDragControls } from '../../hooks/useDragControls';

export const Door = ({ config, selected, onSelect, onDeselect }) => {
	const groupRef = useRef();
	const {
		isDragging,
		handleDragStart,
		handleDragMove,
		handleDragEnd,
		setPointerOver,
		cancelDrag,
	} = useDragControls(groupRef);

	// Only render glass if both glass style and pattern are selected
	const shouldRenderGlass =
		config.glass && config.glass.id !== 'no-glass' && config.glassPattern;

	return (
		<group
			ref={groupRef}
			onPointerOver={(event) => {
				event.stopPropagation();
				setPointerOver(true);
			}}
			onPointerOut={(event) => {
				event.stopPropagation();
				setPointerOver(false);
				if (isDragging) cancelDrag(); // Cancel drag when pointer leaves the component
			}}
			onPointerDown={handleDragStart}
			onPointerMove={handleDragMove}
			onPointerUp={handleDragEnd}
		>
			<DoorBase
				design={config.design}
				material={config.material}
				selected={selected}
			/>

			{shouldRenderGlass && (
				<DoorGlass
					configuration={config.glass.configuration}
					pattern={config.glassPattern}
				/>
			)}

			{config.handle && (
				<DoorHandle
					style={config.handle}
					selected={selected}
				/>
			)}
		</group>
	);
};
