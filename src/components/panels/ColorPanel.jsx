// src/components/panels/ColorPanel.jsx
import { Card, Typography, Tabs, Image, Row, Col } from 'antd';
import { colorCategories, colorPresets } from '../../config/colorStyles';

const { Title, Text } = Typography;

export function ColorPanel({ selectedMaterial, setSelectedMaterial }) {
	return (
		<div className="color-panel">
			<Title
				level={4}
				className="panel-title"
			>
				Color Selection
			</Title>

			<Tabs defaultActiveKey="L Series">
				{Object.entries(colorCategories).map(([category, colors]) => (
					<Tabs.TabPane
						tab={`${category} (${colors.length})`}
						key={category}
					>
						<Row gutter={[12, 12]}>
							{colors.map((color) => (
								<Col
									xs={12}
									sm={8}
									md={12}
									lg={8}
									key={color.id}
								>
									<Card
										hoverable
										onClick={() => setSelectedMaterial(color)}
										className={`color-card ${
											selectedMaterial?.id === color.id ? 'selected' : ''
										}`}
										bodyStyle={{ padding: 12 }}
									>
										<div className="color-preview">
											<Image
												src={color.image}
												alt={color.name}
												preview={false}
												className="color-image"
											/>
										</div>
										<div className="color-info">
											<Text strong>{color.name}</Text>
											<Text
												type="secondary"
												className="price"
											>
												${color.price}
											</Text>
										</div>
									</Card>
								</Col>
							))}
						</Row>
					</Tabs.TabPane>
				))}
			</Tabs>

			<style jsx>{`
				.color-panel {
					padding: 20px 0;
				}

				.panel-title {
					margin-bottom: 24px;
				}

				.color-card {
					border-radius: 8px;
					transition: all 0.3s ease;
				}

				.color-card.selected {
					border-color: #1890ff;
					box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
				}

				.color-preview {
					width: 100%;
					aspect-ratio: 1;
					overflow: hidden;
					border-radius: 4px;
					margin-bottom: 8px;
				}

				.color-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}

				.color-info {
					display: flex;
					flex-direction: column;
					gap: 4px;
				}

				.price {
					color: #1890ff;
				}

				@media (max-width: 768px) {
					.color-panel {
						padding: 16px 0;
					}
				}
			`}</style>
		</div>
	);
}
