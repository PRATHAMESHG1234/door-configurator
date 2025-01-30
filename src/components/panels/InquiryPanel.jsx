import React, { useRef } from 'react';
import {
	Card,
	Typography,
	Button,
	Divider,
	Tag,
	Descriptions,
	message,
} from 'antd';
import { PrinterOutlined, SendOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';

const { Title } = Typography;

const InquiryPanel = ({ config }) => {
	const {
		selectedDoor,
		selectedColor,
		openingDirection,
		glassPosition,
		dimensions,
	} = config;

	const generatePDF = () => {
		try {
			message.loading({ content: 'Generating PDF...', key: 'pdf-gen' });

			// Initialize PDF
			const pdf = new jsPDF();

			// Set font
			pdf.setFont('helvetica', 'bold');

			// Add title
			pdf.setFontSize(20);
			pdf.text('Door Configuration Summary', 20, 20);

			// Door Details section
			pdf.setFontSize(16);
			pdf.text('Door Details', 20, 40);

			// Set normal font for content
			pdf.setFont('helvetica', 'normal');
			pdf.setFontSize(12);

			// Add door details
			pdf.text(`Model: ${selectedDoor?.name || 'Not selected'}`, 30, 55);
			pdf.text(`Color: ${selectedColor?.name || 'Not selected'}`, 30, 65);
			pdf.text(
				`Opening Direction: ${
					openingDirection === 'left' ? 'Left Opening' : 'Right Opening'
				}`,
				30,
				75
			);

			const glassText = glassPosition
				? glassPosition === 'twoLeft'
					? 'Double Glass Left'
					: glassPosition === 'twoRight'
					? 'Double Glass Right'
					: glassPosition === 'left'
					? 'Single Glass Left'
					: 'Single Glass Right'
				: 'No Glass';
			pdf.text(`Glass Position: ${glassText}`, 30, 85);

			// Add line
			pdf.line(20, 95, 190, 95);

			// Dimensions section
			pdf.setFont('helvetica', 'bold');
			pdf.setFontSize(16);
			pdf.text('Dimensions', 20, 110);

			// Add dimensions
			pdf.setFont('helvetica', 'normal');
			pdf.setFontSize(12);
			pdf.text(`Width: ${dimensions?.width || 359}px`, 30, 125);
			pdf.text(`Height: ${dimensions?.height || 687}px`, 30, 135);

			// Add line
			pdf.line(20, 145, 190, 145);
			console.log(selectedColor);
			// Add preview image if available
			if (selectedDoor) {
				const imgUrl = selectedColor
					? selectedDoor.color_variants[selectedColor.id]?.door_image_url
					: selectedDoor.main_image_url;

				if (imgUrl) {
					// Add image title
					pdf.setFont('helvetica', 'bold');
					pdf.setFontSize(16);
					pdf.text('Door Preview', 20, 160);

					// We'll fetch the image first
					fetch(imgUrl)
						.then((response) => response.blob())
						.then((blob) => {
							const reader = new FileReader();
							reader.onload = function (e) {
								// Add image to PDF
								pdf.addImage(e.target.result, 'JPEG', 65, 170, 80, 100);

								// Save the PDF
								pdf.save(
									`Door-Configuration-${
										new Date().toISOString().split('T')[0]
									}.pdf`
								);
								message.success({
									content: 'PDF generated successfully!',
									key: 'pdf-gen',
								});
							};
							reader.readAsDataURL(blob);
						});
				} else {
					pdf.save(
						`Door-Configuration-${new Date().toISOString().split('T')[0]}.pdf`
					);
					message.success({
						content: 'PDF generated successfully!',
						key: 'pdf-gen',
					});
				}
			} else {
				pdf.save(
					`Door-Configuration-${new Date().toISOString().split('T')[0]}.pdf`
				);
				message.success({
					content: 'PDF generated successfully!',
					key: 'pdf-gen',
				});
			}
		} catch (error) {
			console.error('Error generating PDF:', error);
			message.error({ content: 'Failed to generate PDF', key: 'pdf-gen' });
		}
	};

	return (
		<div className="w-full max-w-md mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<Title
					level={4}
					className="!m-0"
				>
					Door Configuration Summary
				</Title>
				<div className="space-x-4">
					<Button
						icon={<PrinterOutlined />}
						onClick={generatePDF}
						type="default"
						size="small"
					>
						Download PDF
					</Button>
					<Button
						icon={<SendOutlined />}
						onClick={() => console.log('Sending inquiry:', config)}
						type="primary"
						size="small"
					>
						Send Inquiry
					</Button>
				</div>
			</div>

			<Card className="shadow-sm">
				<div className="space-y-6">
					<Descriptions
						title="Door Details"
						column={1}
						bordered
					>
						<Descriptions.Item label="Model">
							{selectedDoor?.name || 'Not selected'}
						</Descriptions.Item>
						<Descriptions.Item label="Color">
							<div className="flex items-center gap-2">
								{selectedColor?.name || 'Not selected'}
								{selectedColor && (
									<div className="w-4 h-4 rounded-full border bg-gray-100" />
								)}
							</div>
						</Descriptions.Item>
						<Descriptions.Item label="Opening Direction">
							<Tag color="blue">
								{openingDirection === 'left' ? 'Left Opening' : 'Right Opening'}
							</Tag>
						</Descriptions.Item>
						<Descriptions.Item label="Glass Position">
							{glassPosition ? (
								<Tag color="blue">
									{glassPosition === 'twoLeft'
										? 'Double Glass Left'
										: glassPosition === 'twoRight'
										? 'Double Glass Right'
										: glassPosition === 'left'
										? 'Single Glass Left'
										: 'Single Glass Right'}
								</Tag>
							) : (
								'No Glass'
							)}
						</Descriptions.Item>
					</Descriptions>

					<Divider />

					<Descriptions
						title="Dimensions"
						column={1}
						bordered
					>
						<Descriptions.Item label="Width">
							{dimensions?.width || 359}px
						</Descriptions.Item>
						<Descriptions.Item label="Height">
							{dimensions?.height || 687}px
						</Descriptions.Item>
					</Descriptions>

					{selectedDoor && (
						<>
							<Divider />
							<div>
								<Title level={5}>Door Preview</Title>
								<div className="flex justify-center p-4 bg-gray-50 rounded-lg">
									<img
										src={
											selectedColor
												? selectedDoor.color_variants[selectedColor.id]
														?.door_image_url
												: selectedDoor.main_image_url
										}
										alt="Door Preview"
										className="max-h-48 object-contain"
										style={{
											transform:
												openingDirection === 'left' ? 'scaleX(-1)' : 'none',
										}}
									/>
								</div>
							</div>
						</>
					)}
				</div>
			</Card>
		</div>
	);
};

export default InquiryPanel;
