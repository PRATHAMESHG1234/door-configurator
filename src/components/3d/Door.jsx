import React, { useRef, useState } from 'react';
import { DoubleSide } from 'three';
import { useTexture } from '@react-three/drei';
import { HandleGeometry } from './HandleGeometry';
import { useFrame } from '@react-three/fiber';

function Door({ design, color, handleStyle, selected, onSelect, onDeselect }) {
	const texture = useTexture(design?.images?.front);
	const meshRef = useRef();
	const isDragging = useRef(false);
	const isRotating = useRef(false);

	const [hovered, setHovered] = useState(false);

	// Track dragging or rotating logic
	useFrame((state) => {
		if (isDragging.current && meshRef.current) {
			const { x, y } = state.pointer;
			meshRef.current.position.x = x * 1;
			meshRef.current.position.y = y * 1;
		}

		if (isRotating.current && meshRef.current) {
			const { deltaX } = state.pointerDelta;
			meshRef.current.rotation.y += deltaX * 0.01; // Adjust sensitivity for rotation
		}
	});

	// Handle pointer down event
	const handlePointerDown = (e) => {
		e.stopPropagation();

		if (e.shiftKey) {
			// Enable rotate mode if Shift key is pressed
			isRotating.current = true;
		} else {
			// Enable drag mode by default
			isDragging.current = true;
		}

		onSelect?.(); // Notify parent of selection
		document.body.style.cursor = 'grabbing'; // Set cursor to grabbing
	};

	// Handle pointer move event
	const handlePointerMove = (e) => {
		e.stopPropagation();
		// Smooth updates handled in `useFrame`
	};

	// Handle pointer up event
	const handlePointerUp = (e) => {
		e.stopPropagation();

		// Disable dragging and rotating
		isDragging.current = false;
		isRotating.current = false;

		onDeselect?.(); // Notify parent of deselection
		document.body.style.cursor = hovered ? 'pointer' : 'default'; // Reset cursor
	};

	// Handle pointer over event
	const handlePointerOver = (e) => {
		e.stopPropagation();
		setHovered(true);
		document.body.style.cursor = 'pointer'; // Set cursor to pointer on hover
	};

	// Handle pointer out event
	const handlePointerOut = (e) => {
		e.stopPropagation();
		setHovered(false);
		document.body.style.cursor = 'default'; // Reset cursor when not hovering
	};

	return (
		<group
			ref={meshRef}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerOver={handlePointerOver}
			onPointerOut={handlePointerOut}
		>
			{/* Door Mesh */}
			<mesh>
				<boxGeometry args={[1, 2, 0.05]} />
				<meshStandardMaterial
					map={texture} // Apply PNG texture
					color={color?.value || '#ffffff'} // Apply tint or overlay color
					side={DoubleSide}
					emissive={selected ? '#ffffff' : '#000000'} // Highlight when selected
					emissiveIntensity={selected ? 0.2 : 0}
					transparent={true} // Respect transparency in PNG
					alphaTest={0.5} // Remove fully transparent areas
				/>
			</mesh>

			{/* Handle Mesh */}
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
