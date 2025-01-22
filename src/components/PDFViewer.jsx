import {
	Card,
	Row,
	Col,
	Typography,
	Tag,
	Descriptions,
	Statistic,
	Divider,
} from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export function PDFViewer({ doorConfig }) {
	const { design, material, handle, glass, glassPattern, totalPrice } =
		doorConfig;

	return (
		<div className="pdf-viewer">
			<Card className="mb-6 text-center">
				<Title level={2}>Door Configuration Summary</Title>
				<Text type="secondary">
					Generated on {new Date().toLocaleDateString()}
				</Text>
			</Card>

			<Row gutter={[24, 24]}>
				{/* Door Design Section */}
				<Col span={24}>
					<Card
						title="Door Design"
						className="design-section"
					>
						<Row gutter={24}>
							<Col span={12}>
								<img
									src={design.thumbnail}
									alt={design.name}
									style={{
										width: '100%',
										height: 'auto',
										borderRadius: 8,
										boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
									}}
								/>
							</Col>
							<Col span={12}>
								<Title level={4}>{design.name}</Title>
								<Text>{design.description}</Text>
								<Divider />
								<div className="features-list">
									{design.features.map((feature, index) => (
										<Tag
											key={index}
											icon={<CheckCircleOutlined />}
											color="blue"
											style={{ margin: '4px' }}
										>
											{feature}
										</Tag>
									))}
								</div>
							</Col>
						</Row>
					</Card>
				</Col>

				{/* Materials and Customizations */}
				<Col span={8}>
					<Card
						title="Material & Color"
						className="h-full"
					>
						<div
							className="color-preview mb-4"
							style={{
								height: 100,
								backgroundColor: material.color,
								borderRadius: 8,
							}}
						/>
						<Descriptions column={1}>
							<Descriptions.Item label="Material">
								{material.name}
							</Descriptions.Item>
							<Descriptions.Item label="Finish">
								{material.metalness > 0.5 ? 'Metallic' : 'Matte'}
							</Descriptions.Item>
							<Descriptions.Item label="Price">
								${material.price}
							</Descriptions.Item>
						</Descriptions>
					</Card>
				</Col>

				<Col span={8}>
					{glass.id !== 'no-glass' && (
						<Card
							title="Glass Configuration"
							className="h-full"
						>
							<Descriptions column={1}>
								<Descriptions.Item label="Style">
									{glass.name}
								</Descriptions.Item>
								<Descriptions.Item label="Pattern">
									{glassPattern.name}
								</Descriptions.Item>
								<Descriptions.Item label="Price">
									${glass.price + glassPattern.price}
								</Descriptions.Item>
							</Descriptions>
							{glassPattern.texture && (
								<img
									src={glassPattern.texture}
									alt={glassPattern.name}
									style={{
										width: '100%',
										height: 100,
										objectFit: 'cover',
										borderRadius: 8,
										marginTop: 16,
									}}
								/>
							)}
						</Card>
					)}
				</Col>

				<Col span={8}>
					<Card
						title="Handle Style"
						className="h-full"
					>
						<Descriptions column={1}>
							<Descriptions.Item label="Style">{handle.name}</Descriptions.Item>
							<Descriptions.Item label="Material">
								{handle.material.metalness > 0.5 ? 'Metallic' : 'Standard'}
							</Descriptions.Item>
							<Descriptions.Item label="Price">
								${handle.price}
							</Descriptions.Item>
						</Descriptions>
					</Card>
				</Col>
			</Row>

			{/* Price Summary */}
			<Card className="mt-6">
				<Row
					justify="space-between"
					align="middle"
				>
					<Col>
						<Title
							level={4}
							style={{ margin: 0 }}
						>
							Total Configuration Price
						</Title>
						<Text type="secondary">Including all customizations</Text>
					</Col>
					<Col>
						<Statistic
							value={totalPrice}
							precision={2}
							prefix="$"
							valueStyle={{ color: '#1890ff', fontSize: 28 }}
						/>
					</Col>
				</Row>
			</Card>
		</div>
	);
}
