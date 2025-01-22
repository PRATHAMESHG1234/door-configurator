export const materialPresets = [
	{
		id: 'matte-white',
		name: 'Matte White',
		color: '#ffffff',
		metalness: 0,
		roughness: 0.9,
		price: 0,
		properties: {
			clearcoat: 0,
			clearcoatRoughness: 0,
		},
	},
	{
		id: 'brushed-metal',
		name: 'Brushed Metal',
		color: '#b0b0b0',
		metalness: 0.8,
		roughness: 0.5,
		price: 200,
		properties: {
			clearcoat: 0.3,
			clearcoatRoughness: 0.4,
		},
	},
	{
		id: 'glossy-black',
		name: 'Glossy Black',
		color: '#1a1a1a',
		metalness: 0.1,
		roughness: 0.1,
		price: 150,
		properties: {
			clearcoat: 1,
			clearcoatRoughness: 0.1,
		},
	},
	{
		id: 'wood-finish',
		name: 'Wood Finish',
		color: '#8B4513',
		metalness: 0,
		roughness: 0.7,
		price: 300,
		properties: {
			clearcoat: 0.5,
			clearcoatRoughness: 0.3,
		},
	},
];
