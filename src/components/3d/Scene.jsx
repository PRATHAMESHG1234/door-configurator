import React, { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import {
	OrbitControls,
	Stage,
	Html,
	PerspectiveCamera,
} from '@react-three/drei';
import { Menu, Alert } from 'antd';
import Door from './Door';

function Scene3D({ door, color, handleStyle }) {
	const [contextMenu, setContextMenu] = useState(null);
	const [camera, setCamera] = useState({ position: [0, 0, 5], fov: 50 });
	const [doorPosition, setDoorPosition] = useState([0, 0, 0]); // Center the door
	const [isDragging, setIsDragging] = useState(false);

	// Handle context menu
	const handleContextMenu = useCallback((event) => {
		event.preventDefault();
		setContextMenu([event.clientX, event.clientY]);
	}, []);

	// Handle drag start
	const handleDragStart = (event) => {
		event.stopPropagation();
		setIsDragging(true);
		document.body.style.cursor = 'grabbing'; // Show grabbing cursor
	};

	// Handle drag move
	const handleDragMove = (event) => {
		if (isDragging) {
			event.stopPropagation();
			const { x, y } = event.unprojectedPoint; // Use unprojectedPoint for accurate positioning
			setDoorPosition([x, y, doorPosition[2]]);
		}
	};

	// Handle drag end
	const handleDragEnd = (event) => {
		event.stopPropagation();
		setIsDragging(false);
		document.body.style.cursor = 'default'; // Reset cursor
	};

	const handleAction = useCallback((action) => {
		switch (action) {
			case 'edit':
				// Placeholder for edit logic
				break;
			case 'duplicate':
				// Placeholder for duplication logic
				break;
			case 'delete':
				// Placeholder for deletion logic
				break;
			default:
				break;
		}
		setContextMenu(null);
	}, []);

	const menuItems = [
		{ key: 'edit', label: 'Edit Properties' },
		{ key: 'duplicate', label: 'Duplicate' },
		{ key: 'delete', label: 'Delete' },
	];

	return (
		<div className="relative w-full h-full">
			<Canvas shadows>
				<PerspectiveCamera
					makeDefault
					{...camera}
				/>
				<Suspense
					fallback={
						<Html center>
							<Alert
								message="Loading 3D Scene"
								type="info"
								showIcon
							/>
						</Html>
					}
				>
					<Stage
						environment="warehouse"
						intensity={0.5}
					>
						{/* Draggable Door */}
						<group
							position={doorPosition}
							onPointerDown={handleDragStart}
							onPointerMove={handleDragMove}
							onPointerUp={handleDragEnd}
						>
							<Door
								design={door}
								color={color}
								handleStyle={handleStyle}
							/>
						</group>
					</Stage>
					<OrbitControls
						enabled={!isDragging} // Disable controls during dragging
						minDistance={2}
						maxDistance={10}
						enablePan={true}
						enableZoom={true}
						minPolarAngle={0}
						maxPolarAngle={Math.PI}
					/>
				</Suspense>
			</Canvas>

			{/* Context Menu */}
			{contextMenu && (
				<Menu
					items={menuItems}
					onClick={({ key }) => handleAction(key)}
					style={{
						position: 'absolute',
						left: contextMenu[0],
						top: contextMenu[1],
						zIndex: 1000,
					}}
				/>
			)}
		</div>
	);
}

export function Scene({ door, color, handleStyle }) {
	return (
		<Scene3D
			door={door}
			color={color}
			handleStyle={handleStyle}
		/>
	);
}
