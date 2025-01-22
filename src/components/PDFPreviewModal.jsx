// src/components/modals/PDFPreviewModal.jsx
import { Modal, Button, Card, Typography, Space, Divider } from 'antd';
import {
	DownloadOutlined,
	CloseOutlined,
	PrinterOutlined,
} from '@ant-design/icons';
import { PDFViewer } from './PDFViewer';

const { Title } = Typography;

export function PDFPreviewModal({ isOpen, onClose, doorConfig }) {
	return (
		<Modal
			open={isOpen}
			onCancel={onClose}
			footer={null}
			width={1000}
			centered
			destroyOnClose
			className="pdf-preview-modal"
		>
			<Card
				bordered={false}
				className="preview-card"
			>
				<div className="flex justify-between items-center mb-6">
					<Title
						level={3}
						style={{ margin: 0 }}
					>
						Door Configuration Preview
					</Title>
					<Space>
						<Button
							icon={<PrinterOutlined />}
							onClick={() => window.print()}
						>
							Print
						</Button>
						<Button
							type="primary"
							icon={<DownloadOutlined />}
							onClick={() => window.print()} // Replace with actual PDF download
						>
							Download PDF
						</Button>
						<Button
							icon={<CloseOutlined />}
							onClick={onClose}
						/>
					</Space>
				</div>
				<Divider />
				<div
					className="pdf-content"
					style={{ maxHeight: '70vh', overflowY: 'auto' }}
				>
					<PDFViewer doorConfig={doorConfig} />
				</div>
			</Card>
		</Modal>
	);
}
