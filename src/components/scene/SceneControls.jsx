// src/components/scene/SceneControls.jsx
import { useCallback } from 'react';
import { Card, Button, Space } from 'antd';
import {
	ReloadOutlined,
	BorderOutlined,
	CodeSandboxOutlined,
} from '@ant-design/icons';

export function SceneControls({
	onReset,
	onToggleGrid,
	onToggleWireframe,
	showGrid,
	showWireframe,
}) {
	return (
		<Card
			size="small"
			style={{
				position: 'absolute',
				bottom: 16,
				right: 16,
				width: 'auto',
				minWidth: 160,
				boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
				background: 'rgba(255, 255, 255, 0.9)',
				backdropFilter: 'blur(8px)',
			}}
			bodyStyle={{ padding: 12 }}
		>
			<Space
				direction="vertical"
				style={{ width: '100%' }}
				size={8}
			>
				<Button
					icon={<ReloadOutlined />}
					onClick={onReset}
					block
				>
					Reset View
				</Button>

				<Button
					icon={<BorderOutlined />}
					onClick={onToggleGrid}
					type={showGrid ? 'primary' : 'default'}
					block
				>
					Toggle Grid
				</Button>

				<Button
					icon={<CodeSandboxOutlined />}
					onClick={onToggleWireframe}
					type={showWireframe ? 'primary' : 'default'}
					block
				>
					Toggle Wireframe
				</Button>
			</Space>

			<style jsx>{`
				:global(.ant-card) {
					transition: opacity 0.3s ease;
				}

				:global(.ant-card:hover) {
					opacity: 1 !important;
				}

				:global(.ant-btn) {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 8px;
				}

				@media (max-width: 768px) {
					:global(.ant-card) {
						opacity: 0.7;
					}
				}
			`}</style>
		</Card>
	);
}

// Optional floating tooltip component
export function ControlTooltip({ children, title }) {
	return (
		<div className="control-tooltip">
			{children}
			<div className="tooltip-content">{title}</div>

			<style jsx>{`
				.control-tooltip {
					position: relative;
				}

				.tooltip-content {
					position: absolute;
					right: calc(100% + 8px);
					top: 50%;
					transform: translateY(-50%);
					background: rgba(0, 0, 0, 0.75);
					color: white;
					padding: 4px 8px;
					border-radius: 4px;
					font-size: 12px;
					white-space: nowrap;
					opacity: 0;
					pointer-events: none;
					transition: opacity 0.2s ease;
				}

				.control-tooltip:hover .tooltip-content {
					opacity: 1;
				}
			`}</style>
		</div>
	);
}
