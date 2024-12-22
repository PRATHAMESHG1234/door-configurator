// src/data/handleStyles.js
export const handleStyles = [
	{
		id: 1,
		name: 'Modern Rectangle',
		price: 49,
		shape: 'rectangle',
		dimensions: { width: 0.05, height: 0.15, depth: 0.02 },
	},
	{
		id: 2,
		name: 'Cylinder Bar',
		price: 69,
		shape: 'cylinder',
		dimensions: { radius: 0.01, height: 0.18 },
	},
	{
		id: 3,
		name: 'Sphere Knob',
		price: 39,
		shape: 'sphere',
		dimensions: { radius: 0.03 },
	},
	{
		id: 4,
		name: 'Curved Blade',
		price: 89,
		shape: 'curved-rectangle',
		dimensions: {
			width: 0.04,
			height: 0.2,
			depth: 0.02,
			curve: 0.1, // Amount of curve
		},
	},
	{
		id: 5,
		name: 'Double Bar',
		price: 99,
		shape: 'double-cylinder',
		dimensions: {
			radius: 0.008,
			height: 0.16,
			spacing: 0.02, // Space between bars
		},
	},
	{
		id: 6,
		name: 'T-Bar Handle',
		price: 79,
		shape: 't-shape',
		dimensions: {
			mainWidth: 0.04,
			mainHeight: 0.16,
			crossWidth: 0.12,
			crossHeight: 0.03,
			depth: 0.02,
		},
	},
	{
		id: 7,
		name: 'Geometric Knob',
		price: 59,
		shape: 'octagon',
		dimensions: {
			radius: 0.035,
			depth: 0.03,
			sides: 8,
		},
	},
	{
		id: 8,
		name: 'Wave Handle',
		price: 109,
		shape: 'wave',
		dimensions: {
			width: 0.04,
			height: 0.18,
			depth: 0.02,
			amplitude: 0.02, // Wave height
			frequency: 3, // Number of waves
		},
	},
	{
		id: 9,
		name: 'Minimalist Slot',
		price: 45,
		shape: 'slot',
		dimensions: {
			width: 0.08,
			height: 0.02,
			depth: 0.03,
			inset: 0.01, // How deep the slot goes
		},
	},
	{
		id: 10,
		name: 'Twist Bar',
		price: 119,
		shape: 'twisted-cylinder',
		dimensions: {
			radius: 0.012,
			height: 0.2,
			twistAmount: Math.PI * 2, // One full twist
			segments: 16,
		},
	},
	{
		id: 11,
		name: 'Diamond Pull',
		price: 129,
		shape: 'diamond',
		dimensions: {
			width: 0.06,
			height: 0.12,
			depth: 0.03,
			angle: Math.PI / 6, // Tilt angle
		},
	},
	{
		id: 12,
		name: 'Floating Ring',
		price: 149,
		shape: 'ring',
		dimensions: {
			outerRadius: 0.04,
			innerRadius: 0.03,
			depth: 0.02,
			gap: 0.015, // Space from door
		},
	},
];
