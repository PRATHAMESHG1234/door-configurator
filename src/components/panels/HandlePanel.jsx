// src/components/panels/HandlePanel.jsx
import { Card, Typography, Row, Col, Tag, Spin } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Stage } from '@react-three/drei';
import { HandlePreview } from '../previews/HandlePreview';

const { Title, Text } = Typography;

// Preview component with Ant Design styling
function HandlePreviewCard({ style }) {
	return (
		<div
			className="preview-container"
			style={{ aspectRatio: '1', position: 'relative' }}
		>
			<Suspense
				fallback={
					<div
						style={{
							width: '100%',
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							background: '#f5f5f5',
							borderRadius: 8,
						}}
					>
						<Spin />
					</div>
				}
			>
				<Canvas
					shadows
					camera={{ position: [0, 0, 0.3], fov: 50 }}
				>
					<HandlePreview style={style} />
				</Canvas>
			</Suspense>
		</div>
	);
}

export function HandlePanel({ handleStyle, setHandleStyle, handleStyles }) {
	return (
		<div style={{ padding: '20px 0' }}>
			<Title
				level={4}
				style={{ marginBottom: 24 }}
			>
				Handle Style
			</Title>

			<Row gutter={[16, 16]}>
				{handleStyles.map((style) => (
					<Col
						span={12}
						key={style.id}
					>
						<Card
							hoverable
							onClick={() => setHandleStyle(style)}
							style={{
								borderColor:
									handleStyle?.id === style.id ? '#1890ff' : undefined,
								backgroundColor:
									handleStyle?.id === style.id ? '#e6f7ff' : undefined,
							}}
							bodyStyle={{ padding: 16 }}
							cover={
								<div style={{ padding: '16px 16px 0' }}>
									<HandlePreviewCard style={style} />
								</div>
							}
						>
							<div>
								<Text
									strong
									style={{ fontSize: 16 }}
								>
									{style.name}
								</Text>

								{style.description && (
									<Text
										type="secondary"
										style={{
											display: 'block',
											margin: '8px 0',
											fontSize: 14,
										}}
									>
										{style.description}
									</Text>
								)}

								<div style={{ marginTop: 8 }}>
									<Tag
										color="blue"
										icon={<DollarOutlined />}
									>
										${style.price}
									</Tag>
									{style.material?.name && (
										<Tag color="cyan">{style.material.name}</Tag>
									)}
								</div>
							</div>
						</Card>
					</Col>
				))}
			</Row>

			<style jsx>{`
				:global(.preview-container) {
					background: #fafafa;
					border-radius: 8px;
					overflow: hidden;
				}

				:global(.ant-card-hoverable:hover) {
					transform: translateY(-2px);
					box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
				}

				:global(.ant-card) {
					transition: all 0.3s ease;
				}

				:global(.ant-card-cover) {
					background: #fafafa;
				}

				:global(.ant-spin-dot) {
					transform: scale(1.5);
				}
			`}</style>
		</div>
	);
}
