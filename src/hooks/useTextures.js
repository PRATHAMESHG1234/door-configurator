// src/hooks/useTextures.js
import { useState, useEffect } from 'react';
import * as THREE from 'three';

export const useTextures = (textureUrls = {}) => {
	const [textures, setTextures] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const textureLoader = new THREE.TextureLoader();
		const loadedTextures = {};
		const totalTextures = Object.keys(textureUrls).length;
		let loadedCount = 0;

		setLoading(true);
		setError(null);

		Object.entries(textureUrls).forEach(([key, url]) => {
			textureLoader.load(
				url,
				(texture) => {
					loadedTextures[key] = texture;
					loadedCount++;

					if (loadedCount === totalTextures) {
						setTextures(loadedTextures);
						setLoading(false);
					}
				},
				undefined,
				(err) => {
					setError(`Failed to load texture: ${url}`);
					setLoading(false);
				}
			);
		});

		return () => {
			// Cleanup textures
			Object.values(loadedTextures).forEach((texture) => texture.dispose());
		};
	}, [textureUrls]);

	return { textures, loading, error };
};
