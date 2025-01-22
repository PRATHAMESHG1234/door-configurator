import { useState } from 'react';
import { Menu, Layout, Alert, Button, Modal, Typography } from 'antd';
import { useDoorConfiguration } from '../../hooks/useDoorConfiguration';
import { HandlePanel } from '../../components/panels/HandlePanel';
import { GlassPanel } from '../../components/panels/GlassPanel';
import { ColorPanel } from '../../components/panels/ColorPanel';
import { DesignPanel } from '../../components/panels/DesignPanel';
import { Scene } from '../../components/scene/Scene';
import { WebGLErrorBoundary } from '../../components/ErrorBoundary';
import { PDFPreviewModal } from '../../components/PDFPreviewModal';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

export function DoorConfigurator() {
	const {
		config,
		errors,
		totalPrice,
		updateDesign,
		updateMaterial,
		updateHandle,
		updateGlass,
		updateGlassPattern,
		resetConfig,
	} = useDoorConfiguration();

	const [activeSidebar, setActiveSidebar] = useState('design');
	const [selectedDoorId, setSelectedDoorId] = useState(null);
	const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);

	const panels = {
		design: (
			<DesignPanel
				selectedDesign={config.design}
				setSelectedDesign={updateDesign}
				doorDesigns={config.availableDesigns}
			/>
		),
		color: (
			<ColorPanel
				selectedMaterial={config.material}
				setSelectedMaterial={updateMaterial}
				materialPresets={config.availableMaterials}
			/>
		),
		handle: (
			<HandlePanel
				handleStyle={config.handle}
				setHandleStyle={updateHandle}
				handleStyles={config.availableHandles}
			/>
		),
		glass: (
			<GlassPanel
				selectedGlassStyle={config.glass}
				setSelectedGlassStyle={updateGlass}
				selectedPattern={config.glassPattern}
				setSelectedPattern={updateGlassPattern}
				glassStyles={config.availableGlassStyles}
				glassPatterns={config.availableGlassPatterns}
			/>
		),
	};

	return (
		<Layout style={{ height: '100vh' }}>
			{/* Sidebar Navigation */}
			<Sider
				theme="light"
				width={200}
			>
				<Menu
					mode="inline"
					selectedKeys={[activeSidebar]}
					onClick={({ key }) => setActiveSidebar(key)}
					items={[
						{ key: 'design', label: 'Design' },
						{ key: 'color', label: 'Color & Material' },
						{ key: 'glass', label: 'Glass' },
						{ key: 'handle', label: 'Handle' },
					]}
				/>
			</Sider>

			<Layout>
				{/* Main Content */}
				<Content style={{ display: 'flex', flexDirection: 'row' }}>
					{/* 3D Viewer */}
					<div style={{ flex: 1, position: 'relative', padding: '16px' }}>
						<WebGLErrorBoundary>
							<Scene
								doorConfig={config}
								onSelect={(id) => setSelectedDoorId(id)}
								onDeselect={() => setSelectedDoorId(null)}
							/>
						</WebGLErrorBoundary>
					</div>

					{/* Right Configuration Panel */}
					<div
						style={{
							width: '320px',
							background: '#fff',
							borderLeft: '1px solid #f0f0f0',
							padding: '16px',
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
						}}
					>
						{/* Error Alerts
						{errors.length > 0 && (
							<Alert
								message="Configuration Errors"
								description={
									<ul style={{ margin: 0, paddingLeft: '20px' }}>
										{errors.map((error, index) => (
											<li key={index}>{error}</li>
										))}
									</ul>
								}
								type="error"
								showIcon
								style={{ marginBottom: '16px' }}
							/>
						)} */}

						{/* Active Panel */}
						<div style={{ flex: 1, overflowY: 'auto' }}>
							{panels[activeSidebar]}
						</div>

						{/* Price Summary & Actions */}
						<div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									marginBottom: '16px',
								}}
							>
								<Text strong>Total Price:</Text>
								<Text style={{ fontSize: '20px', color: '#1890ff' }}>
									${totalPrice.toFixed(2)}
								</Text>
							</div>

							<Button
								onClick={resetConfig}
								block
								style={{ marginBottom: '8px' }}
							>
								Reset Configuration
							</Button>
							<Button
								type="primary"
								block
								style={{ marginBottom: '8px' }}
								onClick={() => setIsPDFModalOpen(true)}
							>
								Preview Configuration
							</Button>
							<Button
								type="dashed"
								block
							>
								Proceed to Checkout
							</Button>
						</div>
					</div>
				</Content>
			</Layout>

			{/* PDF Preview Modal */}

			<PDFPreviewModal
				isOpen={isPDFModalOpen}
				onClose={() => setIsPDFModalOpen(false)}
				doorConfig={{
					...config,
					totalPrice,
				}}
			/>
		</Layout>
	);
}
