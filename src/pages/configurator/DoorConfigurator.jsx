// import { useState, useEffect } from 'react';
// import { Menu, Layout, Button, Typography, Drawer, Row, Col } from 'antd';
// import {
// 	MenuOutlined,
// 	ShoppingCartOutlined,
// 	ReloadOutlined,
// 	EyeOutlined,
// 	AppstoreOutlined,
// 	BgColorsOutlined,
// 	SwapOutlined,
// 	BorderOuterOutlined,
// } from '@ant-design/icons';
// import { useDoorConfiguration } from '../../hooks/useDoorConfiguration';
// import { GlassPanel } from '../../components/panels/GlassPanel';
// import { ColorPanel } from '../../components/panels/ColorPanel';
// import { DesignPanel } from '../../components/panels/DesignPanel';
// import { Scene } from '../../components/scene/Scene';
// import { PDFPreviewModal } from '../../components/PDFPreviewModal';
// import { ConstructionPanel } from '../../components/panels/ConstructionPanel';

// const { Content } = Layout;
// const { Text } = Typography;

// export function DoorConfigurator() {
// 	const {
// 		config,
// 		errors,
// 		totalPrice,
// 		updateDesign,
// 		updateMaterial,
// 		updateHandle,
// 		updateGlass,
// 		updateGlassPattern,
// 		resetConfig,
// 		updateOpeningDirection,
// 	} = useDoorConfiguration();

// 	const [activeSidebar, setActiveSidebar] = useState('design');
// 	const [selectedDoorId, setSelectedDoorId] = useState(null);
// 	const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
// 	const [isMobile, setIsMobile] = useState(false);
// 	const [drawerVisible, setDrawerVisible] = useState(false);

// 	useEffect(() => {
// 		const checkMobile = () => {
// 			setIsMobile(window.innerWidth <= 768);
// 		};
// 		checkMobile();
// 		window.addEventListener('resize', checkMobile);
// 		return () => window.removeEventListener('resize', checkMobile);
// 	}, []);

// 	const panels = {
// 		design: (
// 			<DesignPanel
// 				selectedDesign={config.design}
// 				setSelectedDesign={updateDesign}
// 				doorDesigns={config.availableDesigns}
// 			/>
// 		),
// 		color: (
// 			<ColorPanel
// 				selectedMaterial={config.material}
// 				setSelectedMaterial={updateMaterial}
// 				materialPresets={config.availableMaterials}
// 			/>
// 		),
// 		glass: (
// 			<GlassPanel
// 				selectedGlassStyle={config.glass}
// 				setSelectedGlassStyle={updateGlass}
// 				selectedPattern={config.glassPattern}
// 				setSelectedPattern={updateGlassPattern}
// 				glassStyles={config.availableGlassStyles}
// 				glassPatterns={config.availableGlassPatterns}
// 			/>
// 		),
// 		construction: (
// 			<ConstructionPanel
// 				selectedDirection={config.openingDirection}
// 				setSelectedDirection={updateOpeningDirection}
// 			/>
// 		),
// 	};

// 	const menuItems = [
// 		{
// 			key: 'design',
// 			label: (
// 				<div className="flex flex-col items-center text-xs">
// 					<AppstoreOutlined className="text-lg mb-1" />
// 					<span>Design</span>
// 				</div>
// 			),
// 		},
// 		{
// 			key: 'color',
// 			label: (
// 				<div className="flex flex-col items-center text-xs">
// 					<BgColorsOutlined className="text-lg mb-1" />
// 					<span>Color</span>
// 				</div>
// 			),
// 		},
// 		{
// 			key: 'construction',
// 			label: (
// 				<div className="flex flex-col items-center text-xs">
// 					<SwapOutlined className="text-lg mb-1" />
// 					<span>Opening</span>
// 				</div>
// 			),
// 		},
// 		{
// 			key: 'glass',
// 			label: (
// 				<div className="flex flex-col items-center text-xs">
// 					<BorderOuterOutlined className="text-lg mb-1" />
// 					<span>Glass</span>
// 				</div>
// 			),
// 		},
// 	];

// 	const PriceBar = () => (
// 		<div className="bg-white border-t border-gray-200 p-4">
// 			<div className="flex justify-between items-center mb-4">
// 				<Text>Total Price:</Text>
// 				<Text className="text-2xl text-blue-500 font-bold">
// 					${totalPrice.toFixed(2)}
// 				</Text>
// 			</div>
// 			<Row gutter={8}>
// 				<Col span={6}>
// 					<Button
// 						icon={<ReloadOutlined />}
// 						onClick={resetConfig}
// 						className="w-full"
// 					>
// 						Reset
// 					</Button>
// 				</Col>
// 				<Col span={6}>
// 					<Button
// 						icon={<EyeOutlined />}
// 						onClick={() => setIsPDFModalOpen(true)}
// 						className="w-full"
// 					>
// 						Preview
// 					</Button>
// 				</Col>
// 				<Col span={12}>
// 					<Button
// 						type="primary"
// 						icon={<ShoppingCartOutlined />}
// 						className="w-full"
// 					>
// 						Checkout
// 					</Button>
// 				</Col>
// 			</Row>
// 		</div>
// 	);

// 	return (
// 		<Layout className="h-screen">
// 			{/* Mobile Header */}
// 			{isMobile && (
// 				<div className="sticky top-0 z-50 bg-white border-b border-gray-200">
// 					<div className="flex items-center justify-between p-4">
// 						<Button
// 							icon={<MenuOutlined />}
// 							onClick={() => setDrawerVisible(true)}
// 							className="flex items-center"
// 						>
// 							<span className="ml-2">Menu</span>
// 						</Button>
// 						<Text className="text-lg font-semibold">
// 							{
// 								menuItems.find((item) => item.key === activeSidebar)?.label
// 									?.props?.children[1]?.props?.children
// 							}
// 						</Text>
// 						<div className="text-blue-500 font-bold">
// 							${totalPrice.toFixed(2)}
// 						</div>
// 					</div>
// 				</div>
// 			)}

// 			<Row className="h-full overflow-hidden">
// 				{/* Column 1: Menu Sider - Desktop */}
// 				<Col
// 					className="h-full bg-gray-900 hidden md:block"
// 					style={{ width: 80 }}
// 				>
// 					<Menu
// 						mode="inline"
// 						selectedKeys={[activeSidebar]}
// 						onClick={({ key }) => setActiveSidebar(key)}
// 						items={menuItems}
// 						className="border-none w-full h-full"
// 						theme="dark"
// 					/>
// 				</Col>

// 				{/* Column 2: Configuration Panel */}
// 				<Col
// 					className="bg-white border-r border-gray-200 h-full overflow-hidden"
// 					style={{ width: isMobile ? '100%' : 320 }}
// 				>
// 					<div className="h-full flex flex-col">
// 						<div className="flex-1 overflow-y-auto">
// 							<div className="p-5">{panels[activeSidebar]}</div>
// 						</div>
// 						{!isMobile && <PriceBar />}
// 					</div>
// 				</Col>

// 				{/* Column 3: Scene */}
// 				<Col
// 					flex="1"
// 					className={`bg-gray-100 ${
// 						isMobile ? 'fixed bottom-16 left-0 right-0' : 'h-full'
// 					} overflow-hidden`}
// 					style={{ height: isMobile ? '40vh' : 'auto' }}
// 				>
// 					<Scene
// 						doorConfig={config}
// 						onSelect={(id) => setSelectedDoorId(id)}
// 						onDeselect={() => setSelectedDoorId(null)}
// 					/>
// 				</Col>

// 				{/* Mobile Bottom Navigation */}
// 				{isMobile && (
// 					<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
// 						<Row className="py-2">
// 							{menuItems.map((item) => (
// 								<Col
// 									span={6}
// 									key={item.key}
// 									onClick={() => setActiveSidebar(item.key)}
// 									className={`text-center py-1 ${
// 										activeSidebar === item.key
// 											? 'text-blue-500'
// 											: 'text-gray-600'
// 									}`}
// 								>
// 									<div className="flex flex-col items-center">
// 										{item.label.props.children[0]}
// 										<span className="text-xs mt-1">
// 											{item.label.props.children[1].props.children}
// 										</span>
// 									</div>
// 								</Col>
// 							))}
// 						</Row>
// 					</div>
// 				)}

// 				{/* Mobile Configuration Drawer */}
// 				<Drawer
// 					title={
// 						<div className="flex items-center">
// 							{
// 								menuItems.find((item) => item.key === activeSidebar)?.label
// 									?.props?.children[0]
// 							}
// 							<span className="ml-2">
// 								{
// 									menuItems.find((item) => item.key === activeSidebar)?.label
// 										?.props?.children[1]?.props?.children
// 								}
// 							</span>
// 						</div>
// 					}
// 					placement="left"
// 					onClose={() => setDrawerVisible(false)}
// 					open={drawerVisible && isMobile}
// 					bodyStyle={{ padding: 0 }}
// 					width="100%"
// 					className="mobile-drawer"
// 				>
// 					<div className="h-full flex flex-col">
// 						<div className="flex-1 overflow-y-auto">
// 							<Menu
// 								mode="inline"
// 								selectedKeys={[activeSidebar]}
// 								onClick={({ key }) => {
// 									setActiveSidebar(key);
// 									setDrawerVisible(false);
// 								}}
// 								items={menuItems}
// 								className="mb-4"
// 							/>
// 							<div className="p-4">{panels[activeSidebar]}</div>
// 						</div>
// 					</div>
// 				</Drawer>

// 				{/* Mobile Fixed Price Bar */}
// 				{isMobile && (
// 					<div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 z-40">
// 						<PriceBar />
// 					</div>
// 				)}

// 				{/* PDF Preview Modal */}
// 				<PDFPreviewModal
// 					isOpen={isPDFModalOpen}
// 					onClose={() => setIsPDFModalOpen(false)}
// 					doorConfig={{
// 						...config,
// 						totalPrice,
// 					}}
// 				/>
// 			</Row>
// 		</Layout>
// 	);
// }
import React, { useRef, useState, useEffect } from 'react';

const ImageColorChanger = () => {
	const [selectedColor, setSelectedColor] = useState('#ff0000');
	const [originalPalette, setOriginalPalette] = useState([]);
	const [updatedPalette, setUpdatedPalette] = useState([]);
	const [colorComposition, setColorComposition] = useState([]);
	const canvasRef = useRef(null);
	const originalImage = useRef(new Image());

	useEffect(() => {
		const loadImage = async () => {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');

			originalImage.current.src = '/assets/doors/L001.png';
			originalImage.current.onload = () => {
				canvas.width = originalImage.current.width;
				canvas.height = originalImage.current.height;
				ctx.drawImage(originalImage.current, 0, 0);
				extractImagePalette();
			};
		};
		loadImage();
	}, []);

	const hexToRgb = (hex) => {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return { r, g, b };
	};

	const rgbToHex = ({ r, g, b }) => {
		return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g)
			.toString(16)
			.padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
	};

	const getPixelColor = (data, index) => ({
		r: data[index],
		g: data[index + 1],
		b: data[index + 2],
	});

	const colorDistance = (color1, color2) => {
		return Math.sqrt(
			Math.pow(color1.r - color2.r, 2) +
				Math.pow(color1.g - color2.g, 2) +
				Math.pow(color1.b - color2.b, 2)
		);
	};

	const extractImagePalette = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;

		const colorMap = new Map();
		const bucketSize = 24;

		for (let i = 0; i < data.length; i += 4) {
			const color = getPixelColor(data, i);

			const quantizedR = Math.round(color.r / bucketSize) * bucketSize;
			const quantizedG = Math.round(color.g / bucketSize) * bucketSize;
			const quantizedB = Math.round(color.b / bucketSize) * bucketSize;

			const colorKey = `${quantizedR},${quantizedG},${quantizedB}`;

			if (!colorMap.has(colorKey)) {
				colorMap.set(colorKey, {
					r: quantizedR,
					g: quantizedG,
					b: quantizedB,
					count: 0,
					actualColors: [],
				});
			}

			const bucket = colorMap.get(colorKey);
			bucket.count++;
			bucket.actualColors.push(color);
		}

		const refinedColors = Array.from(colorMap.entries()).map(
			([key, bucket]) => {
				if (bucket.actualColors.length > 0) {
					const sum = bucket.actualColors.reduce(
						(acc, color) => ({
							r: acc.r + color.r,
							g: acc.g + color.g,
							b: acc.b + color.b,
						}),
						{ r: 0, g: 0, b: 0 }
					);

					return {
						r: Math.round(sum.r / bucket.actualColors.length),
						g: Math.round(sum.g / bucket.actualColors.length),
						b: Math.round(sum.b / bucket.actualColors.length),
						count: bucket.count,
					};
				}
				return { ...bucket, actualColors: undefined };
			}
		);

		const sortedColors = refinedColors
			.sort((a, b) => b.count - a.count)
			.slice(0, 10)
			.map((color) => ({
				hex: rgbToHex(color),
				percentage: (color.count / (data.length / 4)) * 100,
			}));

		const extractedPalette = sortedColors.map((color) => color.hex);
		setOriginalPalette(extractedPalette);
		setColorComposition(sortedColors);
		calculateUpdatedPalette(selectedColor, sortedColors);
	};

	const calculateUpdatedPalette = (
		targetColor,
		composition = colorComposition
	) => {
		if (!composition.length) return;

		const targetRgb = hexToRgb(targetColor);
		const maxUsage = Math.max(...composition.map((c) => c.percentage));

		// Create variations of the target color
		const variations = {
			darker: {
				r: Math.round(targetRgb.r * 0.7),
				g: Math.round(targetRgb.g * 0.7),
				b: Math.round(targetRgb.b * 0.7),
			},
			darkest: {
				r: Math.round(targetRgb.r * 0.4),
				g: Math.round(targetRgb.g * 0.4),
				b: Math.round(targetRgb.b * 0.4),
			},
		};

		const newPalette = originalPalette.map((originalColor, index) => {
			const originalRgb = hexToRgb(originalColor);
			const usage = composition[index].percentage;
			const usageRatio = usage / maxUsage;
			const brightness =
				(originalRgb.r + originalRgb.g + originalRgb.b) / (3 * 255);

			// Determine role based on usage
			let role;
			let newColor;

			if (usageRatio > 0.3) {
				// Primary colors use the selected color
				role = 'primary';
				newColor = targetRgb;

				// Adjust brightness to maintain contrast
				if (brightness < 0.2) {
					newColor = variations.darker;
				}
			} else if (usageRatio > 0.1) {
				// Secondary colors use the darker variation
				role = 'secondary';
				newColor = variations.darker;

				// Adjust brightness for very dark original colors
				if (brightness < 0.2) {
					newColor = variations.darkest;
				}
			} else {
				// Tertiary colors use the darkest variation
				role = 'tertiary';
				newColor = variations.darkest;
			}

			// Ensure values stay within valid range
			newColor = {
				r: Math.max(0, Math.min(255, newColor.r)),
				g: Math.max(0, Math.min(255, newColor.g)),
				b: Math.max(0, Math.min(255, newColor.b)),
			};

			return {
				original: originalColor,
				updated: rgbToHex(newColor),
				usage: usage.toFixed(2) + '%',
				role,
			};
		});

		setUpdatedPalette(newPalette);
		replaceColors(newPalette);
	};

	const handleColorChange = (event) => {
		const newColor = event.target.value;
		setSelectedColor(newColor);
		calculateUpdatedPalette(newColor);
	};

	const replaceColors = (newPalette) => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(originalImage.current, 0, 0);
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;

		for (let i = 0; i < data.length; i += 4) {
			const currentColor = {
				r: data[i],
				g: data[i + 1],
				b: data[i + 2],
			};

			let minDistance = Infinity;
			let replacementColor = null;

			originalPalette.forEach((originalHex, index) => {
				const originalColor = hexToRgb(originalHex);
				const distance = colorDistance(currentColor, originalColor);

				if (distance < minDistance) {
					minDistance = distance;
					replacementColor = hexToRgb(newPalette[index].updated);
				}
			});

			if (replacementColor && minDistance < 30) {
				data[i] = replacementColor.r;
				data[i + 1] = replacementColor.g;
				data[i + 2] = replacementColor.b;
			}
		}

		ctx.putImageData(imageData, 0, 0);
	};

	return (
		<div className="flex flex-col items-center gap-4 p-4">
			<h2 className="text-2xl font-bold">Image Color Changer</h2>
			<canvas
				ref={canvasRef}
				className="border border-gray-300 h-44"
			/>
			<div className="flex flex-col items-center gap-2">
				<h3 className="text-xl">Select Replacement Color:</h3>
				<input
					type="color"
					value={selectedColor}
					onChange={handleColorChange}
					className="w-20 h-10 cursor-pointer"
				/>
			</div>
			<div className="flex flex-col items-center gap-2">
				<h3 className="text-xl">Extracted Color Palette:</h3>
				<div className="flex gap-2 flex-wrap">
					{colorComposition.map(({ hex, percentage }, index) => (
						<div
							key={index}
							className="flex flex-col items-center"
						>
							<div
								className="w-10 h-10 border border-gray-300"
								style={{ backgroundColor: hex }}
								title={`${hex}: ${percentage.toFixed(2)}%`}
							/>
							<span className="text-xs mt-1">{percentage.toFixed(1)}%</span>
						</div>
					))}
				</div>
			</div>
			<div className="flex flex-col items-center gap-2">
				<h3 className="text-xl">Updated Palette:</h3>
				<div className="flex gap-2 flex-wrap">
					{updatedPalette.map((color, index) => (
						<div
							key={index}
							className="flex flex-col items-center"
						>
							<div
								className="w-10 h-10 border border-gray-300"
								style={{ backgroundColor: color.updated }}
								title={`${color.original} → ${color.updated} (${color.role})`}
							/>
							<span className="text-xs mt-1">{color.usage}</span>
							<span className="text-xs">{color.role}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ImageColorChanger;
