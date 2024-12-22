import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { ColorPicker, Slider } from 'antd';
import { DoubleSide } from 'three';

// Enhanced handle styles with geometric shapes
const handleStyles = [
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
];

const doorDesigns = [
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
];

const colorPresets = [
	{
		id: 1,
		name: 'Silver Gray',
		hex: '#C0C0C0',
		metalness: 0.8,
		roughness: 0.2,
	},
	{
		id: 2,
		name: 'Matte Black',
		hex: '#28282B',
		metalness: 0.7,
		roughness: 0.7,
	},
	{ id: 3, name: 'Bronze', hex: '#CD7F32', metalness: 0.9, roughness: 0.3 },
	{ id: 4, name: 'White', hex: '#FFFFFF', metalness: 0.1, roughness: 0.8 },
];

function HandleGeometry({ style, position }) {
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
					<meshStandardMaterial
						color="#808080"
						metalness={0.9}
						roughness={0.2}
					/>
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
					<meshStandardMaterial
						color="#808080"
						metalness={0.9}
						roughness={0.2}
					/>
				</mesh>
			);
		case 'sphere':
			return (
				<mesh position={position}>
					<sphereGeometry args={[style.dimensions.radius, 32, 32]} />
					<meshStandardMaterial
						color="#808080"
						metalness={0.9}
						roughness={0.2}
					/>
				</mesh>
			);
		default:
			return null;
	}
}

function Door({ design, color, handleStyle }) {
	return (
		<group>
			<mesh position={[0, 0, 0]}>
				<boxGeometry args={[1, 2, 0.05]} />
				<meshStandardMaterial
					color={color.hex}
					metalness={color.metalness}
					roughness={color.roughness}
					side={DoubleSide}
				/>
			</mesh>

			{design.panels.map((panel, index) => (
				<mesh
					key={index}
					position={panel.position}
				>
					<boxGeometry args={panel.size} />
					<meshStandardMaterial
						color={color.hex}
						metalness={color.metalness}
						roughness={color.roughness - 0.1}
						side={DoubleSide}
					/>
				</mesh>
			))}

			<HandleGeometry
				style={handleStyle}
				position={[0.4, 0, 0.035]}
			/>
		</group>
	);
}

function Scene({ design, color, handleStyle }) {
	return (
		<Canvas
			shadows
			camera={{ position: [0, 0, 2.5], fov: 50 }}
		>
			<Suspense fallback={null}>
				<Stage
					environment="city"
					intensity={0.5}
				>
					<Door
						design={design}
						color={color}
						handleStyle={handleStyle}
					/>
				</Stage>
				<OrbitControls
					autoRotate
					autoRotateSpeed={0.5}
					enableZoom={true}
					enablePan={true}
					minPolarAngle={Math.PI / 4}
					maxPolarAngle={Math.PI / 1.5}
				/>
			</Suspense>
		</Canvas>
	);
}

const DoorConfigurator = () => {
	const [selectedDesign, setSelectedDesign] = useState(doorDesigns[0]);
	const [selectedColor, setSelectedColor] = useState(colorPresets[0]);
	const [handleStyle, setHandleStyle] = useState(handleStyles[0]);
	const [activeSidebar, setActiveSidebar] = useState('design');

	const totalPrice = () => {
		return selectedDesign.price + handleStyle.price;
	};

	const DesignPanel = () => (
		<div className="space-y-4">
			<h3 className="text-lg font-medium">Door Design</h3>
			{doorDesigns.map((design) => (
				<div
					key={design.id}
					onClick={() => setSelectedDesign(design)}
					className={`p-4 rounded-lg cursor-pointer ${
						selectedDesign.id === design.id
							? 'bg-blue-50 border-blue-500'
							: 'bg-white border-gray-200'
					} border-2`}
				>
					<h4 className="font-medium">{design.name}</h4>
					<p className="text-blue-600">${design.price}</p>
				</div>
			))}
		</div>
	);

	const ColorPanel = () => (
		<div className="space-y-6">
			<h3 className="text-lg font-medium">Color & Material</h3>
			<div className="grid grid-cols-2 gap-4">
				{colorPresets.map((color) => (
					<div
						key={color.id}
						onClick={() => setSelectedColor(color)}
						className="text-center"
					>
						<div
							className={`w-12 h-12 rounded-full mx-auto border-2 ${
								selectedColor.id === color.id
									? 'border-blue-500'
									: 'border-gray-200'
							}`}
							style={{ backgroundColor: color.hex }}
						/>
						<span className="text-sm mt-1">{color.name}</span>
					</div>
				))}
			</div>
			<div>
				<label className="block text-sm font-medium mb-2">Custom Color</label>
				<ColorPicker
					value={selectedColor.hex}
					onChange={(color) =>
						setSelectedColor((prev) => ({ ...prev, hex: color.toHexString() }))
					}
					className="w-full"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium mb-2">Metalness</label>
				<Slider
					value={selectedColor.metalness}
					onChange={(value) =>
						setSelectedColor((prev) => ({ ...prev, metalness: value }))
					}
					min={0}
					max={1}
					step={0.1}
				/>
			</div>
			<div>
				<label className="block text-sm font-medium mb-2">Roughness</label>
				<Slider
					value={selectedColor.roughness}
					onChange={(value) =>
						setSelectedColor((prev) => ({ ...prev, roughness: value }))
					}
					min={0}
					max={1}
					step={0.1}
				/>
			</div>
		</div>
	);

	const HandlePanel = () => (
		<div className="space-y-4">
			<h3 className="text-lg font-medium">Handle Style</h3>
			{handleStyles.map((style) => (
				<div
					key={style.id}
					onClick={() => setHandleStyle(style)}
					className={`p-4 rounded-lg cursor-pointer ${
						handleStyle.id === style.id
							? 'bg-blue-50 border-blue-500'
							: 'bg-white border-gray-200'
					} border-2`}
				>
					<h4 className="font-medium">{style.name}</h4>
					<p className="text-blue-600">${style.price}</p>
				</div>
			))}
		</div>
	);

	return (
		<div className="h-screen flex">
			{/* Left Sidebar */}
			<div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
				<div className="space-y-2">
					<button
						onClick={() => setActiveSidebar('design')}
						className={`w-full p-2 text-left rounded ${
							activeSidebar === 'design'
								? 'bg-blue-50 text-blue-600'
								: 'hover:bg-gray-100'
						}`}
					>
						Design
					</button>
					<button
						onClick={() => setActiveSidebar('color')}
						className={`w-full p-2 text-left rounded ${
							activeSidebar === 'color'
								? 'bg-blue-50 text-blue-600'
								: 'hover:bg-gray-100'
						}`}
					>
						Color & Material
					</button>
					<button
						onClick={() => setActiveSidebar('handle')}
						className={`w-full p-2 text-left rounded ${
							activeSidebar === 'handle'
								? 'bg-blue-50 text-blue-600'
								: 'hover:bg-gray-100'
						}`}
					>
						Handle
					</button>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex">
				<div className="flex-1 bg-gray-100">
					<Scene
						design={selectedDesign}
						color={selectedColor}
						handleStyle={handleStyle}
					/>
				</div>

				{/* Right Sidebar */}
				<div className="w-80 bg-white border-l border-gray-200 p-6">
					{activeSidebar === 'design' && <DesignPanel />}
					{activeSidebar === 'color' && <ColorPanel />}
					{activeSidebar === 'handle' && <HandlePanel />}

					<div className="mt-auto pt-6 border-t">
						<div className="flex justify-between items-center mb-4">
							<span className="font-medium">Total Price:</span>
							<span className="text-xl font-bold text-blue-600">
								${totalPrice()}
							</span>
						</div>
						<button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
							Proceed to Checkout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoorConfigurator;
