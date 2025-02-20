import React, { useState } from 'react';
import { Typography, Slider, Collapse, InputNumber, Space } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Panel } = Collapse;

export function GlassPanel({
	selectedPosition,
	setSelectedPosition,
	glassDimensions = {},
	updateGlassDimensions,
}) {
	const glassPositions = [
		{ id: 'none', name: 'No Glass' },
		{ id: 'top', name: 'Top Panel' },
		{ id: 'left', name: 'Left Panel' },
		{ id: 'right', name: 'Right Panel' },
		{ id: 'top+left', name: 'Top and Left Panel' },
		{ id: 'top+right', name: 'Top and Right Panel' },
		{ id: 'top+2left', name: 'Top and Two Left Panels' },
		{ id: 'top+2right', name: 'Top and Two Right Panels' },
		{ id: '2left', name: 'Two Left Panels' },
		{ id: '2right', name: 'Two Right Panels' },
		{ id: 'left+right', name: 'Left and Right Panels' },
		{ id: 'top+left+right', name: 'Top, Left, and Right Panels' },
	];

	const getImagePath = (id) => {
		return `/assets/glass/previews/${id}.png`;
	};

	return (
		<div className="py-5">
			<Title
				level={4}
				className="mb-6"
			>
				Glass Position
			</Title>
			<Text
				type="secondary"
				className="block mb-4"
			>
				Select where you want to place the glass panel
			</Text>

			{/* Position Selection Grid */}
			<div className="grid grid-cols-2 gap-0 mb-6">
				{glassPositions.map((position) => (
					<div
						key={position.id}
						className={`relative w-auto cursor-pointer h-45 overflow-hidden bg-no-repeat object-contain ${
							selectedPosition === position.id
								? 'ring-2 ring-blue-500'
								: 'ring-1 ring-gray-300'
						}`}
						onClick={() => setSelectedPosition(position.id)}
					>
						<img
							src={getImagePath(position.id)}
							className="h-40 object-contain m-auto py-8"
							alt={position.name}
						/>
						{selectedPosition === position.id && (
							<div className="absolute top-2 right-2 text-white">
								<CheckCircleOutlined style={{ color: 'green' }} />
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default GlassPanel;
