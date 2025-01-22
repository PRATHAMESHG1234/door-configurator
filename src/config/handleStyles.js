export const handleStyles = [
	{
		id: 'modern-rectangle',
		name: 'Modern Rectangle',
		price: 49,
		shape: 'rectangle',
		dimensions: {
			width: 0.05,
			height: 0.15,
			depth: 0.02,
		},
		position: {
			x: 0.4,
			y: 0,
			z: 0.035,
		},
		material: {
			color: '#808080',
			metalness: 0.7,
			roughness: 0.3,
		},
	},
	{
		id: 'cylinder-bar',
		name: 'Cylinder Bar',
		price: 69,
		shape: 'cylinder',
		dimensions: {
			radius: 0.01,
			height: 0.18,
		},
		position: {
			x: 0.4,
			y: 0,
			z: 0.035,
		},
		material: {
			color: '#606060',
			metalness: 0.8,
			roughness: 0.25,
		},
	},
	{
		id: 'sphere-knob',
		name: 'Sphere Knob',
		price: 39,
		shape: 'sphere',
		dimensions: {
			radius: 0.03,
		},
		position: {
			x: 0.4,
			y: 0,
			z: 0.035,
		},
		material: {
			color: '#707070',
			metalness: 0.9,
			roughness: 0.2,
		},
	},
	{
		id: 'curved-blade',
		name: 'Curved Blade',
		price: 89,
		shape: 'curved-rectangle',
		dimensions: {
			width: 0.04,
			height: 0.2,
			depth: 0.02,
			curve: 0.1, // Amount of curve
		},
		position: {
			x: 0.4,
			y: 0,
			z: 0.035,
		},
		material: {
			color: '#505050',
			metalness: 0.85,
			roughness: 0.3,
		},
	},
	{
		id: 'double-bar',
		name: 'Double Bar',
		price: 99,
		shape: 'double-cylinder',
		dimensions: {
			radius: 0.008,
			height: 0.16,
			spacing: 0.02, // Space between bars
		},
		position: {
			x: 0.4,
			y: 0,
			z: 0.035,
		},
		material: {
			color: '#404040',
			metalness: 0.9,
			roughness: 0.2,
		},
	},
	{
		id: 't-bar-handle',
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
		position: {
			x: 0.4,
			y: 0,
			z: 0.035,
		},
		material: {
			color: '#202020',
			metalness: 0.8,
			roughness: 0.3,
		},
	},
	{
		id: 'geometric-knob',
		name: 'Geometric Knob',
		price: 59,
		shape: 'octagon',
		dimensions: {
			radius: 0.035,
			depth: 0.03,
			sides: 8,
		},
		position: {
			x: 0.4,
			y: 0,
			z: 0.035,
		},
		material: {
			color: '#909090',
			metalness: 0.75,
			roughness: 0.35,
		},
	},
	{
		id: 'wave-handle',
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
		position: {
			x: 0.4,
			y: 0,
			z: 0.035,
		},
		material: {
			color: '#303030',
			metalness: 0.85,
			roughness: 0.3,
		},
	},
	{
		id: 'minimalist-slot',
		name: 'Minimalist Slot',
		price: 45,
		shape: 'slot',
		dimensions: {
			width: 0.08,
			height: 0.02,
			depth: 0.03,
			inset: 0.01, // How deep the slot goes
		},
		position: {
			x: 0.4,
			y: 0,
			z: 0.035,
		},
		material: {
			color: '#B0B0B0',
			metalness: 0.7,
			roughness: 0.4,
		},
	},
	{
		id: 'twist-bar',
		name: 'Twist Bar',
		price: 119,
		shape: 'twisted-cylinder',
		dimensions: {
			radius: 0.012,
			height: 0.2,
			twistAmount: Math.PI * 2, // One full twist
			segments: 16,
		},
		position: {
			x: 0.4,
			y: 0,
			z: 0.035,
		},
		material: {
			color: '#101010',
			metalness: 0.95,
			roughness: 0.15,
		},
	},
	{
		id: 'diamond-pull',
		name: 'Diamond Pull',
		price: 129,
		shape: 'diamond',
		dimensions: {
			width: 0.06,
			height: 0.12,
			depth: 0.03,
			angle: Math.PI / 6, // Tilt angle
		},
		position: {
			x: 0.4,
			y: 0,
			z: 0.035,
		},
		material: {
			color: '#D0D0D0',
			metalness: 0.85,
			roughness: 0.25,
		},
	},
	{
		id: 'floating-ring',
		name: 'Floating Ring',
		price: 149,
		shape: 'ring',
		dimensions: {
			outerRadius: 0.04,
			innerRadius: 0.03,
			depth: 0.02,
			gap: 0.015, // Space from door
		},
		position: {
			x: 0.4,
			y: 0,
			z: 0.035,
		},
		material: {
			color: '#707070',
			metalness: 0.9,
			roughness: 0.2,
		},
	},
];
