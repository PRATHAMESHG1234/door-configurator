// src/components/panels/ConstructionPanel.jsx
import { Card, Typography, Row, Col, Image } from 'antd';
import { SwapOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const openingDirections = [
	{
		id: 'left',
		name: 'Left Opening',
		description: 'Door opens from left to right',
		mirror: false,
	},
	{
		id: 'right',
		name: 'Right Opening',
		description: 'Door opens from right to left',
		mirror: true,
	},
];

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
					{openingDirections.map((direction) => (
						<Col
							xs={24}
							sm={12}
							key={direction.id}
						>
							<Card
								hoverable
								onClick={() => setSelectedDirection(direction.id)}
								className={`direction-card ${
									selectedDirection === direction.id ? 'selected' : ''
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
										<div
											className={`door-preview ${
												direction.mirror ? 'mirrored' : ''
											}`}
										>
											<div className="door-handle" />
										</div>
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
					max-width: 100px;
					margin: 0 auto;
					aspect-ratio: 1/2;
					position: relative;
				}

				.door-preview {
					width: 100%;
					height: 100%;
					background-color: #f0f0f0;
					border: 2px solid #d9d9d9;
					border-radius: 4px;
					position: relative;
					transition: transform 0.3s ease;
				}

				.door-preview.mirrored {
					transform: scaleX(-1);
				}

				.door-handle {
					position: absolute;
					right: 10%;
					top: 50%;
					width: 20%;
					height: 10%;
					background-color: #1890ff;
					border-radius: 4px;
					transform: translateY(-50%);
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
						max-width: 60px;
					}
				}
			`}</style>
		</div>
	);
}
