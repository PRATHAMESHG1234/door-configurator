import { BufferGeometry, BufferAttribute } from 'three';

export const generateWaveGeometry = (
	width,
	height,
	depth,
	amplitude,
	frequency
) => {
	const segments = 32;
	const vertices = [];
	const indices = [];

	for (let i = 0; i <= segments; i++) {
		const y = (i / segments - 0.5) * height;
		const xOffset =
			Math.sin((i / segments) * Math.PI * 2 * frequency) * amplitude;

		vertices.push(xOffset - width / 2, y, depth / 2);
		vertices.push(xOffset + width / 2, y, depth / 2);
		vertices.push(xOffset - width / 2, y, -depth / 2);
		vertices.push(xOffset + width / 2, y, -depth / 2);

		if (i < segments) {
			const baseIndex = i * 4;
			indices.push(baseIndex, baseIndex + 4, baseIndex + 1);
			indices.push(baseIndex + 4, baseIndex + 5, baseIndex + 1);
			indices.push(baseIndex + 2, baseIndex + 3, baseIndex + 6);
			indices.push(baseIndex + 6, baseIndex + 3, baseIndex + 7);
		}
	}

	const geometry = new BufferGeometry();
	geometry.setAttribute(
		'position',
		new BufferAttribute(new Float32Array(vertices), 3)
	);
	geometry.setIndex(indices);
	geometry.computeVertexNormals();
	return geometry;
};
