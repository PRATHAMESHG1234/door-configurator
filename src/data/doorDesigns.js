// src/data/doorDesigns.js
export const doorDesigns = [
	{
		id: 1,
		name: 'Modern Flat',
		price: 599,
		panels: [],
	},
	{
		id: 2,
		name: 'Classic Panel',
		price: 699,
		panels: [
			{ position: [0, 0.3, 0.01], size: [0.6, 0.5, 0.02] },
			{ position: [0, -0.3, 0.01], size: [0.6, 0.5, 0.02] },
		],
	},
	{
		id: 3,
		name: 'Contemporary Grid',
		price: 799,
		panels: [
			{ position: [0, 0.5, 0.01], size: [0.8, 0.3, 0.02] },
			{ position: [0, 0, 0.01], size: [0.8, 0.3, 0.02] },
			{ position: [0, -0.5, 0.01], size: [0.8, 0.3, 0.02] },
		],
	},
	{
		id: 4,
		name: 'Craftsman Style',
		price: 899,
		panels: [
			{ position: [0, 0.6, 0.01], size: [0.8, 0.2, 0.02] },
			{ position: [0, 0.2, 0.01], size: [0.8, 0.6, 0.02] },
			{ position: [0, -0.5, 0.01], size: [0.8, 0.4, 0.02] },
		],
	},
	{
		id: 5,
		name: 'Double Square',
		price: 749,
		panels: [
			{ position: [-0.2, 0, 0.01], size: [0.3, 0.3, 0.02] },
			{ position: [0.2, 0, 0.01], size: [0.3, 0.3, 0.02] },
		],
	},
	{
		id: 6,
		name: 'Diamond Grid',
		price: 849,
		panels: [
			{ position: [0, 0.5, 0.01], size: [0.4, 0.4, 0.02] },
			{ position: [0, 0, 0.01], size: [0.4, 0.4, 0.02] },
			{ position: [0, -0.5, 0.01], size: [0.4, 0.4, 0.02] },
		],
	},
	{
		id: 7,
		name: 'Arch Top',
		price: 949,
		panels: [
			{ position: [0, 0.3, 0.01], size: [0.6, 0.8, 0.02] },
			{ position: [0, -0.4, 0.01], size: [0.6, 0.4, 0.02] },
		],
	},
];
