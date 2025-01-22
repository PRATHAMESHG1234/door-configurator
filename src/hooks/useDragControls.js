import { useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

export const useDragControls = (objectRef, options = {}) => {
	const [isDragging, setIsDragging] = useState(false);
	const [pointerOver, setPointerOver] = useState(false);
	const dragStart = useRef(new THREE.Vector2());
	const objectStart = useRef(new THREE.Vector3());

	const handleDragStart = useCallback(
		(event) => {
			if (!pointerOver || !objectRef.current) return; // Only start drag if pointer is over the object

			event.stopPropagation();
			setIsDragging(true);

			// Set initial positions
			dragStart.current.set(event.clientX, event.clientY);
			objectStart.current.copy(objectRef.current.position);

			document.body.style.cursor = 'grabbing';
			options.onDragStart?.(event);
		},
		[pointerOver, options, objectRef]
	);

	const handleDragMove = useCallback(
		(event) => {
			if (!isDragging || !objectRef.current) return;

			event.stopPropagation();

			// Calculate movement delta
			const deltaX =
				(event.clientX - dragStart.current.x) * (options.sensitivity || 0.01);
			const deltaY =
				(event.clientY - dragStart.current.y) * (options.sensitivity || 0.01);

			objectRef.current.position.set(
				objectStart.current.x + deltaX,
				objectStart.current.y - deltaY,
				objectStart.current.z // Maintain Z-axis position
			);

			options.onDragMove?.(event);
		},
		[isDragging, objectRef, options]
	);

	const handleDragEnd = useCallback(
		(event) => {
			if (!isDragging) return;

			event.stopPropagation();
			setIsDragging(false);
			document.body.style.cursor = 'default';
			options.onDragEnd?.(event);
		},
		[isDragging, options]
	);

	const cancelDrag = useCallback(() => {
		if (!isDragging) return;

		setIsDragging(false);
		document.body.style.cursor = 'default';
	}, [isDragging]);

	return {
		isDragging,
		handleDragStart,
		handleDragMove,
		handleDragEnd,
		setPointerOver, // Export this to manage pointer state
		cancelDrag, // Export for external drag cancellation
	};
};
