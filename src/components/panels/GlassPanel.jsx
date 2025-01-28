import { Typography, Radio } from 'antd';

const { Title, Text } = Typography;

export function GlassPanel({ selectedPosition, setSelectedPosition }) {
	const glassPositions = [
		{ id: 'top', name: 'Top Panel' },
		{ id: 'left', name: 'Left Panel' },
		{ id: 'right', name: 'Right Panel' },
		{ id: 'twoLeft', name: 'Two Panels on Left' },
		{ id: 'twoRight', name: 'Two Panels on Right' },
	];

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

			<Radio.Group
				value={selectedPosition}
				onChange={(e) => setSelectedPosition(e.target.value)}
				className="w-full flex flex-col gap-3"
			>
				{glassPositions.map((position) => (
					<Radio.Button
						key={position.id}
						value={position.id}
					>
						{position.name}
					</Radio.Button>
				))}
			</Radio.Group>
		</div>
	);
}
