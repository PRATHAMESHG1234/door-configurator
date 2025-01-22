// src/components/panels/DesignPanel.jsx
import { Card, Typography, Row, Col, Image } from 'antd';

const { Title, Text } = Typography;

export function DesignPanel({
	selectedDesign,
	setSelectedDesign,
	doorDesigns,
}) {
	return (
		<div style={{ padding: '0', overflowX: 'hidden' }}>
			<Title
				level={4}
				style={{ marginBottom: 24 }}
			>
				Door Design
			</Title>

			<Row gutter={[16, 16]}>
				{doorDesigns?.map((design) => (
					<Col
						span={12}
						key={design.id}
					>
						<Card
							hoverable
							bodyStyle={{ padding: 12 }}
							onClick={() => setSelectedDesign(design)}
							style={{
								borderColor:
									selectedDesign?.id === design.id ? '#1890ff' : undefined,
								backgroundColor:
									selectedDesign?.id === design.id ? '#e6f7ff' : undefined,
								cursor: 'pointer',
							}}
							cover={
								<div style={{ padding: 8 }}>
									<Image
										src={design.thumbnail}
										alt={design.name}
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
								<Text strong>{design.name}</Text>
								{/* {design.description && (
									<Text
										type="secondary"
										style={{ display: 'block', marginTop: 4 }}
									>
										{design.description}
									</Text>
								)} */}
								{design.basePrice && (
									<div style={{ marginTop: 8 }}>
										<Text type="secondary">Base Price: </Text>
										<Text
											type="primary"
											strong
											style={{ color: '#1890ff' }}
										>
											${design.basePrice}
										</Text>
									</div>
								)}
							</div>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
}
