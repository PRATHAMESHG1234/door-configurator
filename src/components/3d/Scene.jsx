import React, { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import {
	OrbitControls,
	Stage,
	Html,
	PerspectiveCamera,
} from '@react-three/drei';
import { Menu, Alert, Card, Typography, Button } from 'antd';
import {
	EditOutlined,
	CopyOutlined,
	DeleteOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import Door from './Door';

const { Title, Text } = Typography;

function Scene3D({ handleStyle }) {
	const [contextMenu, setContextMenu] = useState(null);
	const [selectedObjectData, setSelectedObjectData] = useState(null);
	const [camera, setCamera] = useState({ position: [0, 0, 2.5], fov: 50 });

	const handleContextMenu = useCallback((event) => {
		event.preventDefault();
		setContextMenu([event.clientX, event.clientY]);
	}, []);

	const handleClick = useCallback((event) => {
		if (event.button === 0 && event.object) {
			setSelectedObjectData({
				type: event.object.type || 'Unknown',
				position: event.object.position.toArray(),
			});
		}
	}, []);

	const handleAction = useCallback((action) => {
		switch (action) {
			case 'edit':
				break;
			case 'duplicate':
				break;
			case 'delete':
				setSelectedObjectData(null);
				break;
		}
		setContextMenu(null);
	}, []);

	const menuItems = [
		{ key: 'edit', label: 'Edit Properties', icon: <EditOutlined /> },
		{ key: 'duplicate', label: 'Duplicate', icon: <CopyOutlined /> },
		{ key: 'delete', label: 'Delete', icon: <DeleteOutlined /> },
	];

	return (
		<div
			className="relative w-full h-full"
			onContextMenu={handleContextMenu}
		>
			<Canvas shadows>
				<PerspectiveCamera
					makeDefault
					{...camera}
				/>
				<Suspense
					fallback={
						<Html center>
							<Alert
								message="Loading 3D Scene"
								type="info"
								showIcon
							/>
						</Html>
					}
				>
					<Stage
						environment="warehouse"
						intensity={0.5}
					>
						<Door
							handleStyle={handleStyle}
							onClick={handleClick}
							selected={!!selectedObjectData}
						/>
					</Stage>
					<OrbitControls
						minDistance={1.5}
						maxDistance={4}
						enablePan={true}
						enableZoom={true}
						minPolarAngle={Math.PI / 4}
						maxPolarAngle={Math.PI / 1.5}
						onChange={(e) => {
							setCamera((prev) => ({
								...prev,
								position: e.target?.object.position.toArray(),
							}));
						}}
					/>
				</Suspense>
			</Canvas>

			{contextMenu && (
				<Menu
					items={menuItems}
					onClick={({ key }) => handleAction(key)}
					style={{
						position: 'absolute',
						left: contextMenu[0],
						top: contextMenu[1],
						zIndex: 1000,
					}}
				/>
			)}

			{selectedObjectData && (
				<Card
					title={<Title level={5}>Selected Component</Title>}
					extra={<Button icon={<SettingOutlined />} />}
					style={{
						position: 'absolute',
						top: 16,
						right: 16,
						width: 300,
					}}
				>
					<div className="space-y-2">
						<Text strong>Type: </Text>
						<Text>{selectedObjectData.type}</Text>
						<br />
						<Text strong>Position: </Text>
						<Text>
							{selectedObjectData.position.map((n) => n.toFixed(2)).join(', ')}
						</Text>
					</div>
				</Card>
			)}
		</div>
	);
}

export function Scene(props) {
	return <Scene3D {...props} />;
}
