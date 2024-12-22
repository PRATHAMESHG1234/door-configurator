// src/components/3d/HandleGeometry.jsx
import React, { useMemo } from 'react';
import { DoubleSide, Vector3, BufferGeometry, BufferAttribute } from 'three';
import { Cylinder, Box } from '@react-three/drei';

export function HandleGeometry({ style, position }) {
	const standardMaterial = {
		color: '#808080',
		metalness: 0.9,
		roughness: 0.2,
	};

	// Custom geometry generator for wave handle
	const generateWaveGeometry = (width, height, depth, amplitude, frequency) => {
		const segments = 32;
		const vertices = [];
		const indices = [];

		for (let i = 0; i <= segments; i++) {
			const y = (i / segments - 0.5) * height;
			const xOffset =
				Math.sin((i / segments) * Math.PI * 2 * frequency) * amplitude;

			// Front face vertices
			vertices.push(xOffset - width / 2, y, depth / 2);
			vertices.push(xOffset + width / 2, y, depth / 2);

			// Back face vertices
			vertices.push(xOffset - width / 2, y, -depth / 2);
			vertices.push(xOffset + width / 2, y, -depth / 2);

			if (i < segments) {
				const baseIndex = i * 4;
				// Front face
				indices.push(baseIndex, baseIndex + 4, baseIndex + 1);
				indices.push(baseIndex + 4, baseIndex + 5, baseIndex + 1);
				// Back face
				indices.push(baseIndex + 2, baseIndex + 3, baseIndex + 6);
				indices.push(baseIndex + 6, baseIndex + 3, baseIndex + 7);
				// Side faces
				indices.push(baseIndex, baseIndex + 2, baseIndex + 4);
				indices.push(baseIndex + 4, baseIndex + 2, baseIndex + 6);
				indices.push(baseIndex + 1, baseIndex + 5, baseIndex + 3);
				indices.push(baseIndex + 5, baseIndex + 7, baseIndex + 3);
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

	// Custom geometry generator for curved rectangle
	const generateCurvedRectangle = (width, height, depth, curve) => {
		const segments = 32;
		const vertices = [];
		const indices = [];

		for (let i = 0; i <= segments; i++) {
			const y = (i / segments - 0.5) * height;
			const xOffset = Math.pow(y / (height / 2), 2) * curve;

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
				indices.push(baseIndex, baseIndex + 2, baseIndex + 4);
				indices.push(baseIndex + 4, baseIndex + 2, baseIndex + 6);
				indices.push(baseIndex + 1, baseIndex + 5, baseIndex + 3);
				indices.push(baseIndex + 5, baseIndex + 7, baseIndex + 3);
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

	// Custom geometry generator for twisted cylinder
	const generateTwistedCylinder = (radius, height, twistAmount, segments) => {
		const vertices = [];
		const indices = [];
		const radialSegments = segments;
		const heightSegments = segments;

		for (let h = 0; h <= heightSegments; h++) {
			const v = h / heightSegments;
			const twist = v * twistAmount;

			for (let r = 0; r <= radialSegments; r++) {
				const u = r / radialSegments;
				const angle = u * Math.PI * 2 + twist;

				const x = Math.cos(angle) * radius;
				const y = (v - 0.5) * height;
				const z = Math.sin(angle) * radius;

				vertices.push(x, y, z);

				if (h < heightSegments && r < radialSegments) {
					const a = h * (radialSegments + 1) + r;
					const b = h * (radialSegments + 1) + r + 1;
					const c = (h + 1) * (radialSegments + 1) + r;
					const d = (h + 1) * (radialSegments + 1) + r + 1;

					indices.push(a, b, d);
					indices.push(d, c, a);
				}
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

	// Generate custom geometries based on shape type
	const customGeometry = useMemo(() => {
		switch (style.shape) {
			case 'wave':
				return generateWaveGeometry(
					style.dimensions.width,
					style.dimensions.height,
					style.dimensions.depth,
					style.dimensions.amplitude,
					style.dimensions.frequency
				);
			case 'curved-rectangle':
				return generateCurvedRectangle(
					style.dimensions.width,
					style.dimensions.height,
					style.dimensions.depth,
					style.dimensions.curve
				);
			case 'twisted-cylinder':
				return generateTwistedCylinder(
					style.dimensions.radius,
					style.dimensions.height,
					style.dimensions.twistAmount,
					style.dimensions.segments
				);
			default:
				return null;
		}
	}, [style]);

	switch (style.shape) {
		case 'rectangle':
			return (
				<mesh position={position}>
					<boxGeometry
						args={[
							style.dimensions.width,
							style.dimensions.height,
							style.dimensions.depth,
						]}
					/>
					<meshStandardMaterial {...standardMaterial} />
				</mesh>
			);

		case 'cylinder':
			return (
				<mesh
					position={position}
					rotation={[0, 0, Math.PI / 2]}
				>
					<cylinderGeometry
						args={[
							style.dimensions.radius,
							style.dimensions.radius,
							style.dimensions.height,
							16,
						]}
					/>
					<meshStandardMaterial {...standardMaterial} />
				</mesh>
			);

		case 'sphere':
			return (
				<mesh position={position}>
					<sphereGeometry args={[style.dimensions.radius, 32, 32]} />
					<meshStandardMaterial {...standardMaterial} />
				</mesh>
			);

		case 'double-cylinder':
			return (
				<group position={position}>
					<mesh
						position={[0, style.dimensions.spacing / 2, 0]}
						rotation={[0, 0, Math.PI / 2]}
					>
						<cylinderGeometry
							args={[
								style.dimensions.radius,
								style.dimensions.radius,
								style.dimensions.height,
								16,
							]}
						/>
						<meshStandardMaterial {...standardMaterial} />
					</mesh>
					<mesh
						position={[0, -style.dimensions.spacing / 2, 0]}
						rotation={[0, 0, Math.PI / 2]}
					>
						<cylinderGeometry
							args={[
								style.dimensions.radius,
								style.dimensions.radius,
								style.dimensions.height,
								16,
							]}
						/>
						<meshStandardMaterial {...standardMaterial} />
					</mesh>
				</group>
			);

		case 't-shape':
			return (
				<group position={position}>
					<mesh>
						<boxGeometry
							args={[
								style.dimensions.mainWidth,
								style.dimensions.mainHeight,
								style.dimensions.depth,
							]}
						/>
						<meshStandardMaterial {...standardMaterial} />
					</mesh>
					<mesh
						position={[
							0,
							style.dimensions.mainHeight / 2 -
								style.dimensions.crossHeight / 2,
							0,
						]}
					>
						<boxGeometry
							args={[
								style.dimensions.crossWidth,
								style.dimensions.crossHeight,
								style.dimensions.depth,
							]}
						/>
						<meshStandardMaterial {...standardMaterial} />
					</mesh>
				</group>
			);

		case 'octagon':
			return (
				<mesh position={position}>
					<cylinderGeometry
						args={[
							style.dimensions.radius,
							style.dimensions.radius,
							style.dimensions.depth,
							style.dimensions.sides,
						]}
					/>
					<meshStandardMaterial {...standardMaterial} />
				</mesh>
			);

		case 'slot':
			return (
				<group position={position}>
					<mesh position={[0, 0, -style.dimensions.inset / 2]}>
						<boxGeometry
							args={[
								style.dimensions.width,
								style.dimensions.height,
								style.dimensions.depth - style.dimensions.inset,
							]}
						/>
						<meshStandardMaterial {...standardMaterial} />
					</mesh>
				</group>
			);

		case 'ring':
			return (
				<group
					position={[
						position[0],
						position[1],
						position[2] + style.dimensions.gap,
					]}
				>
					<mesh>
						<torusGeometry
							args={[
								style.dimensions.outerRadius -
									(style.dimensions.outerRadius -
										style.dimensions.innerRadius) /
										2,
								(style.dimensions.outerRadius - style.dimensions.innerRadius) /
									2,
								16,
								32,
							]}
						/>
						<meshStandardMaterial {...standardMaterial} />
					</mesh>
				</group>
			);

		case 'wave':
		case 'curved-rectangle':
		case 'twisted-cylinder':
			return (
				<mesh
					position={position}
					geometry={customGeometry}
				>
					<meshStandardMaterial
						{...standardMaterial}
						side={DoubleSide}
					/>
				</mesh>
			);

		case 'diamond':
			const diamondRotation = new Vector3(0, 0, style.dimensions.angle);
			return (
				<mesh
					position={position}
					rotation={diamondRotation}
				>
					<boxGeometry
						args={[
							style.dimensions.width,
							style.dimensions.height,
							style.dimensions.depth,
						]}
					/>
					<meshStandardMaterial {...standardMaterial} />
				</mesh>
			);

		default:
			return (
				<mesh position={position}>
					<boxGeometry args={[0.05, 0.15, 0.02]} />
					<meshStandardMaterial {...standardMaterial} />
				</mesh>
			);
	}
}
