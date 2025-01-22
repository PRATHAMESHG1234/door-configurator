export const createDoorMaterial = (config) => {
	return {
		color: config.color || '#ffffff',
		metalness: config.metalness || 0,
		roughness: config.roughness || 0.5,
		clearcoat: config.properties?.clearcoat || 0,
		clearcoatRoughness: config.properties?.clearcoatRoughness || 0,
		...config.properties,
	};
};
// src/utils/materialUtils.js
export const createGlassMaterial = (pattern = {}) => {
	// Only include valid material properties
	return {
		color: pattern.color || '#ffffff',
		opacity: pattern.opacity || 0.5,
		transparent: true,
		transmission: pattern.transmission || 0.9,
		roughness: pattern.roughness || 0.1,
		metalness: pattern.metalness || 0,
		clearcoat: pattern.clearcoat || 1,
		clearcoatRoughness: pattern.clearcoatRoughness || 0,
		ior: pattern.ior || 1.5,
		thickness: pattern.thickness || 0.5,
		attenuationColor: pattern.attenuationColor || '#ffffff',
		attenuationDistance: pattern.attenuationDistance || 1,
		side: 2, // DoubleSide
	};
};
