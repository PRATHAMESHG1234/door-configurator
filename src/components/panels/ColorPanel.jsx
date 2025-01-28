// src/components/panels/ColorPanel.jsx
import { Card, Typography, Image, Row, Col } from 'antd';
import { useState, useEffect } from 'react';

const { Title, Text } = Typography;

export function ColorPanel({ selectedDoor, selectedColor, onColorSelect }) {
	const [colorVariants, setColorVariants] = useState([]);

	useEffect(() => {
		if (selectedDoor?.color_variants) {
			// Transform the color_variants object into an array
			const variants = Object.entries(selectedDoor.color_variants).map(
				([colorCode, urls]) => ({
					id: colorCode,
					name: colorCode,
					sampleImage: urls.sample_image_url,
					doorImage: urls.door_image_url,
				})
			);
			setColorVariants(variants);
		}
	}, [selectedDoor]);

	return (
		<div className="color-panel">
			<Title
				level={4}
				className="panel-title"
			>
				Color Selection
			</Title>

			<Row gutter={[12, 12]}>
				{colorVariants.map((color) => (
					<Col
						xs={12}
						sm={8}
						md={12}
						lg={8}
						key={color.id}
					>
						<Card
							hoverable
							onClick={() => onColorSelect(color)}
							className={`color-card ${
								selectedColor?.id === color.id ? 'selected' : ''
							}`}
							bodyStyle={{ padding: 12 }}
						>
							<div className="color-preview">
								<Image
									src={color.sampleImage}
									alt={color.name}
									preview={false}
									className="color-image"
								/>
							</div>
							<div className="color-info">
								<Text strong>{color.name}</Text>
							</div>
						</Card>
					</Col>
				))}
			</Row>

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

				@media (max-width: 768px) {
					.color-panel {
						padding: 16px 0;
					}
				}
			`}</style>
		</div>
	);
}
