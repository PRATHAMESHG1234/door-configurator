// src/hooks/useSceneSetup.js
import { useState, useCallback, useEffect } from 'react';
import * as THREE from 'three';

export const useSceneSetup = (options = {}) => {
	const [scene, setScene] = useState(null);
	const [camera, setCamera] = useState(null);
	const [renderer, setRenderer] = useState(null);
	const [controls, setControls] = useState(null);

	// Initialize scene
	useEffect(() => {
		const newScene = new THREE.Scene();

		// Setup camera
		const camera = new THREE.PerspectiveCamera(
			options.fov || 75,
			options.aspect || window.innerWidth / window.innerHeight,
			options.near || 0.1,
			options.far || 1000
		);
		camera.position.set(0, 0, 5);

		// Setup renderer
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMap.enabled = true;

		setScene(newScene);
		setCamera(camera);
		setRenderer(renderer);

		// Handle window resize
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			renderer.dispose();
		};
	}, [options]);

	// Animation frame
	const animate = useCallback(() => {
		if (!scene || !camera || !renderer) return;

		renderer.render(scene, camera);
		controls?.update();

		requestAnimationFrame(animate);
	}, [scene, camera, renderer, controls]);

	useEffect(() => {
		animate();
	}, [animate]);

	return {
		scene,
		camera,
		renderer,
		controls,
		setControls,
	};
};
