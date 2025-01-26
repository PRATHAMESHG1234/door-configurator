// src/config/glassStyles.js

export const glassStyles = [
	{
		id: 'no-glass',
		name: 'No Glass',
		price: 0,
		description: 'Solid door without glass panels',
		image: null,
	},
	{
		id: 'full-glass',
		name: 'Full Glass Panel',
		price: 500,
		description: 'Elegant full-length glass panel',
		image: '/src/assets/glass/image.png',
	},
	{
		id: 'top-glass',
		name: 'Top Glass Panel',
		price: 300,
		description: 'Classic top window design',
		image: '/src/assets/glass/styles/top-glass.png',
	},
	{
		id: 'double-side-glass',
		name: 'Double Side Glass',
		price: 450,
		description: 'Modern dual vertical panels',
		image: '/src/assets/glass/styles/double-side.png',
	},
	{
		id: 'triple-glass',
		name: 'Triple Glass Design',
		price: 600,
		description: 'Contemporary three-panel layout',
		image: '/src/assets/glass/styles/triple-glass.png',
	},
	{
		id: 'bottom-glass',
		name: 'Bottom Glass Panel',
		price: 300,
		description: 'Unique bottom window design',
		image: '/src/assets/glass/styles/bottom-glass.png',
	},
	{
		id: 'diamond-glass',
		name: 'Diamond Pattern Glass',
		price: 700,
		description: 'Elegant diamond-shaped window',
		image: '/src/assets/glass/styles/diamond-glass.png',
	},
	{
		id: 'arch-glass',
		name: 'Arched Top Glass',
		price: 550,
		description: 'Classic arched window design',
		image: '/src/assets/glass/styles/arch-glass.png',
	},
];

export const glassPatterns = [
	{
		id: 'clear',
		name: 'Clear Glass',
		price: 0,
		description: 'Traditional clear glass finish',
		image: '/src/assets/glass/image.png',
		opacity: 0.3,
	},
	{
		id: 'frosted',
		name: 'Frosted Glass',
		price: 100,
		description: 'Privacy-focused frosted finish',
		image: '/src/assets/glass/patterns/frosted.png',
		opacity: 0.7,
	},
	{
		id: 'tinted',
		name: 'Tinted Glass',
		price: 150,
		description: 'Elegant light-reducing tint',
		image: '/src/assets/glass/patterns/tinted.png',
		opacity: 0.4,
	},
	{
		id: 'rain',
		name: 'Rain Pattern',
		price: 200,
		description: 'Textured rain drop effect',
		image: '/src/assets/glass/patterns/rain.png',
		opacity: 0.5,
	},
	{
		id: 'bamboo',
		name: 'Bamboo Pattern',
		price: 250,
		description: 'Asian-inspired bamboo texture',
		image: '/src/assets/glass/patterns/bamboo.png',
		opacity: 0.6,
	},
	{
		id: 'geometric',
		name: 'Geometric Pattern',
		price: 300,
		description: 'Modern geometric design',
		image: '/src/assets/glass/patterns/geometric.png',
		opacity: 0.5,
	},
];

// Helper functions
export const getGlassStyleById = (id) =>
	glassStyles.find((style) => style.id === id);
export const getGlassPatternById = (id) =>
	glassPatterns.find((pattern) => pattern.id === id);

// Function to combine glass style with pattern
export const combineGlassImages = (styleId, patternId) => {
	const style = getGlassStyleById(styleId);
	const pattern = getGlassPatternById(patternId);

	if (!style || !pattern || styleId === 'no-glass') {
		return null;
	}

	return {
		styleImage: style.image,
		patternImage: pattern.image,
		opacity: pattern.opacity,
		totalPrice: style.price + pattern.price,
	};
};
