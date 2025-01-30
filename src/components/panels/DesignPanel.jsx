// src/components/panels/DesignPanel.jsx
import { Card, Typography, Row, Col, Image } from 'antd';

const { Title, Text } = Typography;

export function DesignPanel({ availableDoors, selectedDoor, onSelectDoor }) {
	return (
		<div style={{ padding: '0', overflowX: 'hidden' }}>
			<Title
				level={4}
				style={{ marginBottom: 24 }}
			>
				Door Design
			</Title>

			<Row gutter={[16, 16]}>
				{availableDoors?.map((door) => (
					<Col
						span={12}
						key={door.id}
					>
						<Card
							hoverable
							bodyStyle={{ padding: 12 }}
							onClick={() => onSelectDoor(door)}
							style={{
								borderColor:
									selectedDoor?.id === door.id ? '#1890ff' : undefined,
								backgroundColor:
									selectedDoor?.id === door.id ? '#e6f7ff' : undefined,
								cursor: 'pointer',
							}}
							cover={
								<div style={{ padding: 8 }}>
									<Image
										src={door.main_image_url} // Using the main image URL from Firebase
										alt={door.name}
										style={{
											width: '100%',
											height: 'auto',
											borderRadius: 8,
											objectFit: 'cover',
											aspectRatio: '1',
										}}
										preview={false}
									/>
								</div>
							}
						>
							<div style={{ textAlign: 'center' }}>
								<Text strong>{door.name}</Text>
								{door.description && (
									<Text
										type="secondary"
										style={{ display: 'block', marginTop: 4 }}
									>
										{door.description}
									</Text>
								)}
								<div style={{ marginTop: 8 }}>
									<Text type="secondary">Available Colors: </Text>
									<Text
										type="primary"
										strong
										style={{ color: '#1890ff' }}
									>
										{door.available_colors?.length || 0}
									</Text>
								</div>
							</div>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
}
