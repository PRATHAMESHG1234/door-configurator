// src/components/panels/ColorPanel.jsx
import { Card, Slider, ColorPicker, Typography, Row, Col } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export function ColorPanel({
	selectedMaterial,
	setSelectedMaterial,
	materialPresets,
}) {
	const handleMaterialUpdate = (key, value) => {
		setSelectedMaterial((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	return (
		<div style={{ padding: '20px 0' }}>
			<Title
				level={4}
				style={{ marginBottom: 24 }}
			>
				Material & Finish
			</Title>

			<Row
				gutter={[16, 16]}
				style={{ marginBottom: 24 }}
			>
				{materialPresets.map((preset) => (
					<Col
						span={12}
						key={preset.id}
					>
						<Card
							hoverable
							onClick={() => setSelectedMaterial(preset)}
							style={{
								borderColor:
									selectedMaterial?.id === preset.id ? '#1890ff' : undefined,
								cursor: 'pointer',
							}}
							bodyStyle={{ padding: 16 }}
						>
							<div
								style={{
									width: '100%',
									height: 80,
									borderRadius: 8,
									backgroundColor: preset.color,
									opacity: preset.roughness ? 0.8 : 1,
									marginBottom: 12,
									border: '1px solid #f0f0f0',
								}}
							/>
							<Text strong>{preset.name}</Text>
							<div>
								<Text
									type="primary"
									style={{ color: '#1890ff' }}
								>
									${preset.price}
								</Text>
							</div>
						</Card>
					</Col>
				))}
			</Row>

			<div style={{ marginBottom: 24 }}>
				<Title level={5}>
					<BgColorsOutlined style={{ marginRight: 8 }} />
					Custom Color
				</Title>
				<ColorPicker
					value={selectedMaterial.color}
					onChange={(color) => handleMaterialUpdate('color', color)}
					style={{ width: '100%', marginTop: 8 }}
				/>
			</div>

			<Card style={{ marginBottom: 16 }}>
				<div style={{ marginBottom: 16 }}>
					<div
						style={{
							marginBottom: 8,
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Text strong>Metalness</Text>
						<Text type="secondary">
							{selectedMaterial.metalness.toFixed(2)}
						</Text>
					</div>
					<Slider
						value={selectedMaterial.metalness}
						min={0}
						max={1}
						step={0.01}
						onChange={(value) => handleMaterialUpdate('metalness', value)}
						tooltip={{
							formatter: (value) => value.toFixed(2),
						}}
					/>
				</div>

				<div>
					<div
						style={{
							marginBottom: 8,
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Text strong>Roughness</Text>
						<Text type="secondary">
							{selectedMaterial.roughness.toFixed(2)}
						</Text>
					</div>
					<Slider
						value={selectedMaterial.roughness}
						min={0}
						max={1}
						step={0.01}
						onChange={(value) => handleMaterialUpdate('roughness', value)}
						tooltip={{
							formatter: (value) => value.toFixed(2),
						}}
					/>
				</div>
			</Card>
		</div>
	);
}
