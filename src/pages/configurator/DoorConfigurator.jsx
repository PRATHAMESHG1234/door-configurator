import { useState, useEffect } from 'react';
import { Menu, Layout, Button, Typography, Drawer, Row, Col, Spin } from 'antd';
import {
	MenuOutlined,
	ShoppingCartOutlined,
	ReloadOutlined,
	EyeOutlined,
	AppstoreOutlined,
	BgColorsOutlined,
	SwapOutlined,
	BorderOuterOutlined,
	ArrowLeftOutlined,
} from '@ant-design/icons';
import { useDoorConfiguration } from '../../hooks/useDoorConfiguration';
import { GlassPanel } from '../../components/panels/GlassPanel';
import { ColorPanel } from '../../components/panels/ColorPanel';
import { DesignPanel } from '../../components/panels/DesignPanel';
import { Scene } from '../../components/scene/Scene';
import { PDFPreviewModal } from '../../components/PDFPreviewModal';
import { ConstructionPanel } from '../../components/panels/ConstructionPanel';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBigLeft, ArrowBigLeftDash } from 'lucide-react';

const menuItems = [
	{
		key: 'design',
		label: (
			<div className="flex flex-col items-center text-xs text-gray-700">
				<AppstoreOutlined className="text-2xl mb-2" />
				<span className="font-medium">Design</span>
			</div>
		),
	},
	{
		key: 'color',
		label: (
			<div className="flex flex-col items-center text-xs text-gray-700">
				<BgColorsOutlined className="text-2xl mb-2" />
				<span className="font-medium">Color</span>
			</div>
		),
	},
	{
		key: 'construction',
		label: (
			<div className="flex flex-col items-center text-xs text-gray-700">
				<SwapOutlined className="text-2xl mb-2" />
				<span className="font-medium">Opening</span>
			</div>
		),
	},
	{
		key: 'glass',
		label: (
			<div className="flex flex-col items-center text-xs text-gray-700">
				<BorderOuterOutlined className="text-2xl mb-2" />
				<span className="font-medium">Glass</span>
			</div>
		),
	},
];

const { Content } = Layout;
const { Text } = Typography;

export function DoorConfigurator() {
	const { doorId } = useParams();
	const navigate = useNavigate();

	const {
		config,
		loading,
		error,
		totalPrice,
		updateDoor,
		updateColor,
		updateOpeningDirection,
		resetConfig,
		updateGlassPosition,
		doors,
	} = useDoorConfiguration();

	const [activeSidebar, setActiveSidebar] = useState('design');
	const [selectedDoorId, setSelectedDoorId] = useState(null);
	const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);

	// Handle initial door selection from URL parameter
	useEffect(() => {
		if (!loading && doors.length > 0 && doorId) {
			const door = doors.find((d) => d.id === doorId);
			if (door) {
				updateDoor(door);
			} else {
				console.warn('Invalid door ID:', doorId);
				navigate('/configurator', { replace: true });
			}
		}
	}, [doorId]);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const handleDoorSelect = (door) => {
		updateDoor(door);
		navigate(`/configurator/${door.id}`, { replace: true });
		setActiveSidebar('color'); // Move to color selection after door selection
	};

	const handleReset = () => {
		resetConfig();
		navigate('/configurator', { replace: true });
		setActiveSidebar('design');
	};

	if (loading) {
		return (
			<div className="h-screen flex items-center justify-center">
				<Spin
					size="large"
					tip="Loading doors..."
				/>
			</div>
		);
	}

	if (error) {
		return (
			<div className="h-screen flex items-center justify-center">
				<Text type="danger">{error}</Text>
			</div>
		);
	}

	const panels = {
		design: (
			<DesignPanel
				availableDoors={doors}
				selectedDoor={config.selectedDoor}
				onSelectDoor={handleDoorSelect}
			/>
		),
		color: (
			<ColorPanel
				selectedDoor={config.selectedDoor}
				selectedColor={config.selectedColor}
				onColorSelect={updateColor}
			/>
		),
		glass: (
			<GlassPanel
				selectedDoor={config.selectedDoor}
				selectedColor={config.selectedColor}
				selectedPosition={config.glassPosition}
				setSelectedPosition={updateGlassPosition}
			/>
		),
		construction: (
			<ConstructionPanel
				selectedDirection={config.openingDirection}
				setSelectedDirection={updateOpeningDirection}
			/>
		),
	};

	const PriceBar = () => (
		<div className="bg-white border-t border-gray-200 p-4">
			<div className="flex justify-between items-center mb-4">
				<Text>Total Price:</Text>
				<Text className="text-2xl text-blue-500 font-bold">
					${totalPrice?.toFixed(2)}
				</Text>
			</div>
			<Row gutter={8}>
				<Col span={6}>
					<Button
						icon={<ReloadOutlined />}
						onClick={handleReset}
						className="w-full"
					>
						Reset
					</Button>
				</Col>
				<Col span={6}>
					<Button
						icon={<EyeOutlined />}
						onClick={() => setIsPDFModalOpen(true)}
						className="w-full"
						disabled={!config.selectedDoor || !config.selectedColor}
					>
						Preview
					</Button>
				</Col>
				<Col span={12}>
					<Button
						type="primary"
						icon={<ShoppingCartOutlined />}
						className="w-full"
						disabled={!config.selectedDoor || !config.selectedColor}
					>
						Checkout
					</Button>
				</Col>
			</Row>
		</div>
	);

	return (
		<Layout className="h-screen">
			{/* Mobile Header */}
			{isMobile && (
				<div className="sticky top-0 z-50 bg-white border-b border-gray-200">
					<div className="flex items-center justify-between p-4">
						<Button
							icon={<MenuOutlined />}
							onClick={() => setDrawerVisible(true)}
							className="flex items-center"
						>
							<span className="ml-2">Menu</span>
						</Button>
						<Text className="text-lg font-semibold">
							{
								menuItems.find((item) => item.key === activeSidebar)?.label
									?.props?.children[1]?.props?.children
							}
						</Text>
						<div className="text-blue-500 font-bold">
							${totalPrice?.toFixed(2)}
						</div>
					</div>
				</div>
			)}

			<Row className="h-full overflow-hidden">
				{/* Column 1: Menu Sider - Desktop */}
				<div
					className="h-full flex flex-col"
					style={{ width: 80 }}
				>
					{/* Top Header Row */}
					<div className="h-14 bg-white border-b border-gray-200 flex items-center justify-center">
						<ArrowLeftOutlined
							size={24}
							color="black"
						/>
					</div>

					{/* Menu Items */}
					<div className="flex-1 bg-white flex flex-col justify-start items-center shadow-md">
						{menuItems.map((item) => (
							<div
								key={item.key}
								className={`flex flex-col items-center justify-center w-full py-4 cursor-pointer ${
									activeSidebar === item.key
										? 'bg-[#A0436B] text-white'
										: 'text-gray-700'
								}`}
								onClick={() => setActiveSidebar(item.key)}
							>
								{item.label.props.children[0]}
								<span
									className={`text-xs font-medium mt-2 ${
										activeSidebar === item.key ? 'text-white' : 'text-gray-700'
									}`}
								>
									{item.label.props.children[1].props.children}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Column 2: Config Panel */}
				<Col
					className="bg-white border-r border-gray-200 h-full overflow-hidden flex flex-col"
					style={{ width: isMobile ? '100%' : 320 }}
				>
					{/* Top Header Row */}
					<div className="h-14 bg-white border-b border-gray-200 flex items-center px-4">
						<h1 className="text-lg text-black font-medium">{selectedDoorId}</h1>
					</div>

					{/* Config Content */}
					<div className="flex-1 overflow-hidden flex flex-col">
						<div className="flex-1 overflow-y-auto">
							<div className="p-5">{panels[activeSidebar]}</div>
						</div>
						{!isMobile && <PriceBar />}
					</div>
				</Col>

				{/* Column 3: Scene */}
				<Col
					flex="1"
					className={`bg-gray-100 ${
						isMobile ? 'fixed bottom-16 left-0 right-0' : 'h-full'
					} overflow-hidden`}
					style={{ height: isMobile ? '40vh' : 'auto' }}
				>
					<Scene
						doorConfig={config}
						onSelect={(id) => setSelectedDoorId(id)}
						onDeselect={() => setSelectedDoorId(null)}
					/>
				</Col>

				{isMobile && (
					<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
						<Row className="py-2">
							{menuItems.map((item) => (
								<Col
									span={6}
									key={item.key}
									onClick={() => setActiveSidebar(item.key)}
									className={`text-center py-1 ${
										activeSidebar === item.key
											? 'text-blue-500'
											: 'text-gray-600'
									}`}
								>
									<div className="flex flex-col items-center">
										{item.label.props.children[0]}
										<span className="text-xs mt-1">
											{item.label.props.children[1].props.children}
										</span>
									</div>
								</Col>
							))}
						</Row>
					</div>
				)}

				<Drawer
					title={
						<div className="flex items-center">
							{
								menuItems.find((item) => item.key === activeSidebar)?.label
									?.props?.children[0]
							}
							<span className="ml-2">
								{
									menuItems.find((item) => item.key === activeSidebar)?.label
										?.props?.children[1]?.props?.children
								}
							</span>
						</div>
					}
					placement="left"
					onClose={() => setDrawerVisible(false)}
					open={drawerVisible && isMobile}
					bodyStyle={{ padding: 0 }}
					width="100%"
					className="mobile-drawer"
				>
					<div className="h-full flex flex-col">
						<div className="flex-1 overflow-y-auto">
							<Menu
								mode="inline"
								selectedKeys={[activeSidebar]}
								onClick={({ key }) => {
									setActiveSidebar(key);
									setDrawerVisible(false);
								}}
								items={menuItems}
								className="mb-4"
							/>
							<div className="p-4">{panels[activeSidebar]}</div>
						</div>
					</div>
				</Drawer>

				{isMobile && (
					<div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 z-40">
						<PriceBar />
					</div>
				)}

				{/* PDF Preview Modal */}
				<PDFPreviewModal
					isOpen={isPDFModalOpen}
					onClose={() => setIsPDFModalOpen(false)}
					doorConfig={{
						...config,
						totalPrice,
					}}
				/>
			</Row>
		</Layout>
	);
}

export default DoorConfigurator;
