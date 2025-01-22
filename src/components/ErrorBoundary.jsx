// src/components/ErrorBoundary.jsx
import React from 'react';
import { Alert, Typography, Button, Card, List } from 'antd';
import { ReloadOutlined, WarningOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export class WebGLErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.error('WebGL Error:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			const troubleshootingSteps = [
				'Refreshing the page',
				'Using a different browser',
				'Updating your graphics drivers',
				'Checking WebGL compatibility',
			];

			return (
				<Card
					className="error-boundary-card"
					style={{ margin: '24px' }}
				>
					<Alert
						type="error"
						showIcon
						icon={<WarningOutlined />}
						message={
							<Title
								level={4}
								style={{ margin: 0 }}
							>
								3D Rendering Error
							</Title>
						}
						description={
							<div
								className="error-content"
								style={{ marginTop: '16px' }}
							>
								<Text>
									There was an error rendering the 3D view. Please try the
									following steps:
								</Text>

								<List
									size="small"
									style={{ marginTop: '16px' }}
									dataSource={troubleshootingSteps}
									renderItem={(item) => (
										<List.Item>
											<Text>{item}</Text>
										</List.Item>
									)}
								/>

								<div style={{ marginTop: '24px', textAlign: 'center' }}>
									<Button
										type="primary"
										danger
										icon={<ReloadOutlined />}
										onClick={() => window.location.reload()}
										size="large"
									>
										Reload Page
									</Button>
								</div>
							</div>
						}
					/>
				</Card>
			);
		}

		return this.props.children;
	}
}
