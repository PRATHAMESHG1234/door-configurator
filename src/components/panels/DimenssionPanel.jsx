import {
	Card,
	Typography,
	Row,
	Col,
	Slider,
	Input,
	Space,
	Button,
	Tooltip,
} from 'antd';
import { useState, useEffect } from 'react';
import { FullscreenOutlined, UndoOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Define dimension constraints
const DIMENSIONS = {
	width: {
		min: 300,
		max: 500,
		default: 359,
	},
	height: {
		min: 600,
		max: 800,
		default: 687,
	},
};

export function DimensionsPanel({ dimensions, onDimensionsChange }) {
	// Local state for handling input values
	const [localDimensions, setLocalDimensions] = useState({
		width: dimensions?.width || DIMENSIONS.width.default,
		height: dimensions?.height || DIMENSIONS.height.default,
	});

	// Update local state when props change
	useEffect(() => {
		setLocalDimensions({
			width: dimensions?.width || DIMENSIONS.width.default,
			height: dimensions?.height || DIMENSIONS.height.default,
		});
	}, [dimensions]);

	// Handle slider changes
	const handleSliderChange = (type) => (value) => {
		const newDimensions = {
			...localDimensions,
			[type]: value,
		};
		setLocalDimensions(newDimensions);
		onDimensionsChange(newDimensions);
	};

	// Handle input changes
	const handleInputChange = (type) => (e) => {
		const value = parseInt(e.target.value) || 0;
		if (value >= DIMENSIONS[type].min && value <= DIMENSIONS[type].max) {
			const newDimensions = {
				...localDimensions,
				[type]: value,
			};
			setLocalDimensions(newDimensions);
			onDimensionsChange(newDimensions);
		}
	};

	// Handle reset
	const handleReset = () => {
		const defaultDimensions = {
			width: DIMENSIONS.width.default,
			height: DIMENSIONS.height.default,
		};
		setLocalDimensions(defaultDimensions);
		onDimensionsChange(defaultDimensions);
	};

	return (
		<div className="dimensions-panel">
			<div className="panel-header">
				<Title
					level={4}
					className="panel-title"
				>
					Door Dimensions
				</Title>
				<Tooltip title="Reset to Default">
					<Button
						icon={<UndoOutlined />}
						onClick={handleReset}
						type="text"
					>
						Reset
					</Button>
				</Tooltip>
			</div>

			<Card className="dimensions-card">
				<Row gutter={[24, 24]}>
					{/* Width Control */}
					<Col
						xs={24}
						sm={12}
					>
						<div className="dimension-control">
							<div className="dimension-header">
								<FullscreenOutlined className="dimension-icon" />
								<Text strong>Width</Text>
							</div>
							<Space
								direction="vertical"
								className="w-full"
							>
								<div className="input-group">
									<Input
										value={localDimensions.width}
										onChange={handleInputChange('width')}
										suffix="px"
										type="number"
										min={DIMENSIONS.width.min}
										max={DIMENSIONS.width.max}
									/>
								</div>
								<Slider
									value={localDimensions.width}
									min={DIMENSIONS.width.min}
									max={DIMENSIONS.width.max}
									onChange={handleSliderChange('width')}
									tooltip={{
										formatter: (value) => `${value}px`,
									}}
								/>
								<Text
									type="secondary"
									className="dimension-range"
								>
									Range: {DIMENSIONS.width.min}px - {DIMENSIONS.width.max}px
								</Text>
							</Space>
						</div>
					</Col>

					{/* Height Control */}
					<Col
						xs={24}
						sm={12}
					>
						<div className="dimension-control">
							<div className="dimension-header">
								<FullscreenOutlined
									className="dimension-icon"
									style={{ transform: 'rotate(90deg)' }}
								/>
								<Text strong>Height</Text>
							</div>
							<Space
								direction="vertical"
								className="w-full"
							>
								<div className="input-group">
									<Input
										value={localDimensions.height}
										onChange={handleInputChange('height')}
										suffix="px"
										type="number"
										min={DIMENSIONS.height.min}
										max={DIMENSIONS.height.max}
									/>
								</div>
								<Slider
									value={localDimensions.height}
									min={DIMENSIONS.height.min}
									max={DIMENSIONS.height.max}
									onChange={handleSliderChange('height')}
									tooltip={{
										formatter: (value) => `${value}px`,
									}}
								/>
								<Text
									type="secondary"
									className="dimension-range"
								>
									Range: {DIMENSIONS.height.min}px - {DIMENSIONS.height.max}px
								</Text>
							</Space>
						</div>
					</Col>
				</Row>

				{/* Door Preview */}
				<div className="preview-section">
					<div
						className="door-preview"
						style={{
							width: `${(localDimensions.width / DIMENSIONS.width.max) * 100}%`,
							height: `${
								(localDimensions.height / DIMENSIONS.height.max) * 100
							}%`,
						}}
					>
						<div className="door-handle" />
					</div>
				</div>
			</Card>

			<style jsx>{`
				.dimensions-panel {
					padding: 20px 0;
				}

				.panel-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24px;
				}

				.panel-title {
					margin: 0 !important;
				}

				.dimensions-card {
					border-radius: 8px;
				}

				.dimension-control {
					display: flex;
					flex-direction: column;
					gap: 16px;
				}

				.dimension-header {
					display: flex;
					align-items: center;
					gap: 8px;
					margin-bottom: 8px;
				}

				.dimension-icon {
					color: #1890ff;
					font-size: 20px;
				}

				.input-group {
					width: 100%;
				}

				.dimension-range {
					font-size: 12px;
				}

				.preview-section {
					margin-top: 24px;
					padding: 24px;
					background-color: #f5f5f5;
					border-radius: 8px;
					display: flex;
					justify-content: center;
					align-items: center;
					min-height: 200px;
					position: relative;
				}

				.door-preview {
					background-color: #ffffff;
					border: 2px solid #d9d9d9;
					border-radius: 4px;
					position: relative;
					transition: all 0.3s ease;
					max-width: 100px;
					max-height: 180px;
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
					.preview-section {
						min-height: 160px;
					}
				}
			`}</style>
		</div>
	);
}
