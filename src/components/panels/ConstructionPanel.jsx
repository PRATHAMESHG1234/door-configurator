// src/components/panels/ConstructionPanel.jsx
import { Card, Typography, Row, Col, Image } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { doorOpeningDirections } from '../../config/doorConstructionConfig';

const { Title, Text } = Typography;

export function ConstructionPanel({ selectedDirection, setSelectedDirection }) {
	return (
		<div className="construction-panel">
			<Title
				level={4}
				className="panel-title"
			>
				Door Opening Direction
			</Title>

			<div className="direction-selection">
				<Row gutter={[16, 16]}>
					{doorOpeningDirections.map((direction) => (
						<Col
							xs={24}
							sm={12}
							key={direction.id}
						>
							<Card
								hoverable
								onClick={() => setSelectedDirection(direction)}
								className={`direction-card ${
									selectedDirection?.id === direction.id ? 'selected' : ''
								}`}
							>
								<div className="direction-content">
									<div className="icon-container">
										<SwapOutlined
											className={`direction-icon ${
												direction.mirror ? 'mirrored' : ''
											}`}
										/>
									</div>
									<div className="direction-info">
										<Text strong>{direction.name}</Text>
										<Text type="secondary">{direction.description}</Text>
									</div>
									<div className="preview-container">
										<Image
											src={direction.image}
											alt={direction.name}
											preview={false}
											className={`preview-image ${
												direction.mirror ? 'mirrored' : ''
											}`}
										/>
									</div>
								</div>
							</Card>
						</Col>
					))}
				</Row>
			</div>

			<style jsx>{`
				.construction-panel {
					padding: 20px 0;
				}

				.panel-title {
					margin-bottom: 24px;
				}

				.direction-card {
					border-radius: 8px;
					transition: all 0.3s ease;
				}

				.direction-card.selected {
					border-color: #1890ff;
					box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
				}

				.direction-content {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 16px;
				}

				.icon-container {
					font-size: 24px;
					color: #1890ff;
				}

				.direction-icon {
					transition: transform 0.3s ease;
				}

				.direction-icon.mirrored {
					transform: scaleX(-1);
				}

				.direction-info {
					text-align: center;
				}

				.preview-container {
					width: 100%;
					max-width: 200px;
					margin: 0 auto;
				}

				.preview-image {
					width: 100%;
					height: auto;
					transition: transform 0.3s ease;
				}

				.preview-image.mirrored {
					transform: scaleX(-1);
				}

				@media (max-width: 768px) {
					.direction-content {
						flex-direction: row;
						justify-content: space-between;
						text-align: left;
					}

					.direction-info {
						text-align: left;
						flex: 1;
						padding: 0 16px;
					}

					.preview-container {
						max-width: 80px;
					}
				}
			`}</style>
		</div>
	);
}
