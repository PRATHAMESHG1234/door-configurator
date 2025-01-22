// src/components/panels/GlassPanel.jsx
import { Card, Tabs, Typography, Row, Col, Image, Tag } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export function GlassPanel({
	selectedGlassStyle,
	setSelectedGlassStyle,
	selectedPattern,
	setSelectedPattern,
	glassStyles,
	glassPatterns,
}) {
	const items = [
		{
			key: 'style',
			label: 'Style',
			children: (
				<Row
					gutter={[16, 16]}
					style={{ marginTop: 16 }}
				>
					{glassStyles.map((style) => (
						<Col
							span={12}
							key={style.id}
						>
							<Card
								hoverable
								onClick={() => setSelectedGlassStyle(style)}
								style={{
									borderColor:
										selectedGlassStyle?.id === style.id ? '#1890ff' : undefined,
									backgroundColor:
										selectedGlassStyle?.id === style.id ? '#e6f7ff' : undefined,
								}}
								bodyStyle={{ padding: 16 }}
							>
								<div>
									<Text
										strong
										style={{ fontSize: 16 }}
									>
										{style.name}
									</Text>

									<Text
										type="secondary"
										style={{ display: 'block', margin: '8px 0', fontSize: 14 }}
									>
										{style.description}
									</Text>

									<Tag
										color="blue"
										icon={<DollarOutlined />}
										style={{ marginTop: 8 }}
									>
										${style.price}
									</Tag>
								</div>
							</Card>
						</Col>
					))}
				</Row>
			),
		},
		{
			key: 'pattern',
			label: 'Pattern',
			disabled: !selectedGlassStyle?.id,
			children: (
				<Row
					gutter={[16, 16]}
					style={{ marginTop: 16 }}
				>
					{glassPatterns.map((pattern) => (
						<Col
							span={12}
							key={pattern.id}
						>
							<Card
								hoverable
								onClick={() => setSelectedPattern(pattern)}
								style={{
									borderColor:
										selectedPattern?.id === pattern.id ? '#1890ff' : undefined,
									backgroundColor:
										selectedPattern?.id === pattern.id ? '#e6f7ff' : undefined,
								}}
								bodyStyle={{ padding: 16 }}
								cover={
									pattern.texture && (
										<div style={{ padding: '16px 16px 0' }}>
											<Image
												src={pattern.texture}
												alt={pattern.name}
												style={{
													width: '100%',
													height: 'auto',
													borderRadius: 8,
													aspectRatio: '1',
												}}
												preview={false}
											/>
										</div>
									)
								}
							>
								<div>
									<Text
										strong
										style={{ fontSize: 16 }}
									>
										{pattern.name}
									</Text>

									<Tag
										color="blue"
										icon={<DollarOutlined />}
										style={{ marginTop: 8, display: 'block' }}
									>
										${pattern.price}
									</Tag>
								</div>
							</Card>
						</Col>
					))}
				</Row>
			),
		},
	];

	return (
		<div style={{ padding: '20px 0' }}>
			<Title
				level={4}
				style={{ marginBottom: 24 }}
			>
				Glass Configuration
			</Title>

			<Tabs
				defaultActiveKey="style"
				items={items}
				style={{ width: '100%' }}
				animated={{ inkBar: true, tabPane: true }}
			/>
		</div>
	);
}
