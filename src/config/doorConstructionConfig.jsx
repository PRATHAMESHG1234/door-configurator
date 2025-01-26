// src/config/doorConstructionConfig.js

export const doorOpeningDirections = [
	{
		id: 'right',
		name: 'Right Opening',
		description: 'Door opens from right to left',
		image: '/src/assets/icons/door-right.svg', // You'll need to add these icons
		isDefault: true,
		mirror: false,
	},
	{
		id: 'left',
		name: 'Left Opening',
		description: 'Door opens from left to right',
		image: '/src/assets/icons/door-left.svg',
		isDefault: false,
		mirror: true,
	},
];

export const getDefaultDirection = () =>
	doorOpeningDirections.find((direction) => direction.isDefault) ||
	doorOpeningDirections[0];
