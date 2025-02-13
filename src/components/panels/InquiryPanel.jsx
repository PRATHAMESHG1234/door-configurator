import React, { useState } from 'react';
import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Image,
	PDFDownloadLink,
	Font,
} from '@react-pdf/renderer';
import InquiryModal from '../InquiryModal';

// For this example, we continue using system fonts (Helvetica).
// If you need to use your local fonts, use Font.register() accordingly.

const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontFamily: 'Helvetica',
		fontSize: 11,
		color: '#2D3748',
		lineHeight: 1.6,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 2,
		borderBottomColor: '#4A5568',
		paddingBottom: 20,
		marginBottom: 30,
	},
	companyInfo: {
		flexGrow: 1,
	},
	companyName: {
		fontSize: 26,
		fontFamily: 'Helvetica-Bold',
		color: '#1a365d',
		marginBottom: 10,
	},
	companyContact: {
		fontSize: 10,
		color: '#4A5568',
		lineHeight: 1.8,
	},
	logo: {
		width: 120,
		height: 60,
		marginLeft: 20,
	},
	sectionTitle: {
		fontSize: 16,
		fontFamily: 'Helvetica-Bold',
		marginBottom: 15,
		color: '#2C5282',
		borderBottomWidth: 1,
		borderBottomColor: '#E2E8F0',
		paddingBottom: 8,
	},
	table: {
		display: 'table',
		width: 'auto',
		marginBottom: 25,
	},
	tableRow: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#E2E8F0',
		minHeight: 35,
		alignItems: 'center',
	},
	tableRowEven: {
		backgroundColor: '#F7FAFC',
	},
	tableColHeader: {
		width: '40%',
		padding: 10,
		fontFamily: 'Helvetica-Bold',
	},
	tableCol: {
		width: '60%',
		padding: 10,
	},
	tableCellHeader: {
		fontSize: 11,
		fontFamily: 'Helvetica-Bold',
		color: '#2D3748',
	},
	tableCell: {
		fontSize: 11,
		color: '#4A5568',
	},
	previewSection: {
		marginTop: 20,
	},
	previewContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 15,
		borderWidth: 1,
		borderColor: '#E2E8F0',
		borderRadius: 4,
		padding: 15,
		backgroundColor: '#F7FAFC',
	},
	previewColumn: {
		width: '48%',
	},
	imageContainer: {
		alignItems: 'center',
		backgroundColor: 'white',
		padding: 15,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#E2E8F0',
	},
	doorImage: {
		width: 170,
		height: 250,
		objectFit: 'contain',
	},
	colorSampleContainer: {
		alignItems: 'center',
		backgroundColor: 'white',
		padding: 15,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#E2E8F0',
	},
	colorSample: {
		width: 120,
		height: 120,
		marginTop: 10,
		borderRadius: 4,
	},
	previewLabel: {
		fontSize: 14,
		fontFamily: 'Helvetica-Bold',
		color: '#2C5282',
		marginBottom: 10,
		textAlign: 'center',
	},
	footer: {
		position: 'absolute',
		bottom: 40,
		left: 40,
		right: 40,
		textAlign: 'center',
		borderTopWidth: 1,
		borderTopColor: '#E2E8F0',
		paddingTop: 15,
	},
	footerText: {
		fontSize: 9,
		color: '#718096',
	},
	orderInfo: {
		backgroundColor: '#EBF8FF',
		padding: 15,
		borderRadius: 4,
		marginBottom: 25,
		borderWidth: 1,
		borderColor: '#90CDF4',
	},
	orderInfoText: {
		fontSize: 11,
		color: '#2C5282',
		fontFamily: 'Helvetica-Bold',
		marginBottom: 4,
	},
	orderInfoLabel: {
		color: '#2B6CB0',
		fontFamily: 'Helvetica-Bold',
		marginRight: 8,
	},
});

// Define our glass positions mapping
const glassPositionsMapping = {
	none: 'No Glass',
	top: 'Top Panel',
	left: 'Left Panel',
	right: 'Right Panel',
	'top+left': 'Top and Left Panel',
	'top+right': 'Top and Right Panel',
	'top+2left': 'Top and Two Left Panels',
	'top+2right': 'Top and Two Right Panels',
	'2left': 'Two Left Panels',
	'2right': 'Two Right Panels',
	'left+right': 'Left and Right Panels',
	'top+left+right': 'Top, Left, and Right Panels',
};

// Helper function to get display name for glass position
const getGlassPositionDisplay = (glassPosition) => {
	if (!glassPosition || glassPosition === 'none')
		return glassPositionsMapping.none;
	return glassPositionsMapping[glassPosition] || glassPosition;
};

// If needed, compute extra width for top panel based on glass positions.
// We assume that if a side is present, then if it is a "double" version (contains "2")
// we add 168, otherwise 100. In the new schema, we check:
const getTopPanelExtraWidth = (glassPosition) => {
	if (!glassPosition || glassPosition === 'none') return 0;
	let extraLeft = 0;
	let extraRight = 0;
	// Check left panel presence
	if (glassPosition.includes('left')) {
		// If the id contains '2left', then use 168, else 100.
		extraLeft = glassPosition.includes('2left') ? 168 : 100;
	}
	// Check right panel presence
	if (glassPosition.includes('right')) {
		extraRight = glassPosition.includes('2right') ? 168 : 100;
	}
	return extraLeft + extraRight;
};

const MyDocument = ({ config }) => {
	const {
		selectedDoor,
		selectedColor,
		openingDirection,
		glassPosition,
		dimensions,
		orderNumber = 'ORD-2024-001',
		date = new Date().toLocaleDateString(),
	} = config;

	const configData = [
		{ label: 'Door Model', value: selectedDoor?.name || 'Not selected' },
		{ label: 'Color', value: selectedColor?.name || 'Not selected' },
		{
			label: 'Opening Direction',
			value: openingDirection === 'left' ? 'Left Opening' : 'Right Opening',
		},
		{
			label: 'Glass Position',
			value: getGlassPositionDisplay(glassPosition),
		},
		{
			label: 'Dimensions',
			value: `${dimensions?.width || 359} px (W) x ${
				dimensions?.height || 687
			} px (H)`,
		},
	];

	// Compute extra width for the top panel (if needed)
	const topPanelExtraWidth = getTopPanelExtraWidth(glassPosition);

	return (
		<Document>
			<Page
				size="A4"
				style={styles.page}
			>
				{/* Header */}
				<View style={styles.header}>
					<View style={styles.companyInfo}>
						<Text style={styles.companyName}>Vizualis, d.o.o.</Text>
						<Text style={styles.companyContact}>Ljubljanska c. 89</Text>
						<Text style={styles.companyContact}>8000 Novo mesto</Text>
						<Text style={styles.companyContact}>T: +386 (0)59048068</Text>
						<Text style={styles.companyContact}>
							E: info@door-konfigurator.com
						</Text>
					</View>
					<Image
						src="https://via.placeholder.com/120x60?text=Logo"
						style={styles.logo}
					/>
				</View>

				{/* Order Info Box */}
				<View style={styles.orderInfo}>
					<Text style={styles.orderInfoText}>
						<Text style={styles.orderInfoLabel}>Order Number:</Text>
						{orderNumber}
					</Text>
					<Text style={styles.orderInfoText}>
						<Text style={styles.orderInfoLabel}>Date:</Text>
						{date}
					</Text>
				</View>

				{/* Configuration Summary */}
				<Text style={styles.sectionTitle}>Door Configuration Details</Text>
				<View style={styles.table}>
					{configData.map((row, index) => (
						<View
							key={index}
							style={[
								styles.tableRow,
								index % 2 === 0 ? styles.tableRowEven : {},
							]}
						>
							<View style={styles.tableColHeader}>
								<Text style={styles.tableCellHeader}>{row.label}</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>{row.value}</Text>
							</View>
						</View>
					))}
				</View>

				{/* If top glass panel is present, render it directly without an extra wrapper */}
				{/* {glassPosition && glassPosition.includes('top') && (
					// Use the computed extra width for top panel
					<SideGlassPanels
						position="top"
						type="single"
						height={dimensions.topGlassHeight}
						isTop={true}
						width={dimensions.doorWidth + topPanelExtraWidth}
					/>
				)} */}
			</Page>

			<Page
				size="A4"
				style={styles.page}
			>
				{/* Preview Section */}
				<View style={styles.previewSection}>
					<Text style={styles.sectionTitle}>Product Preview</Text>
					<View style={styles.previewContainer}>
						<View style={styles.previewColumn}>
							<Text style={styles.previewLabel}>Door Design</Text>
							<View style={styles.imageContainer}>
								<Image
									src={
										selectedColor
											? selectedDoor.color_variants[selectedColor.id]
													?.door_image_url
											: selectedDoor.main_image_url
									}
									style={styles.doorImage}
								/>
							</View>
						</View>
						<View style={styles.previewColumn}>
							<Text style={styles.previewLabel}>Color Sample</Text>
							<View style={styles.colorSampleContainer}>
								<Image
									src={
										selectedColor?.sampleImage ||
										(selectedColor
											? selectedDoor.color_variants[selectedColor.id]
													?.sample_image_url
											: '')
									}
									style={styles.colorSample}
								/>
							</View>
						</View>
					</View>
				</View>

				{/* Footer */}
				<View style={styles.footer}>
					<Text style={styles.footerText}>
						This document was generated on {date}. All specifications are
						subject to verification and confirmation by our technical team.
						Colors shown are representative and may vary slightly from the
						actual product.
					</Text>
				</View>
			</Page>
		</Document>
	);
};

const InquiryPanel = ({ config }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const configItems = [
		{
			label: 'Door Model',
			value: config?.selectedDoor?.name || 'Not selected',
		},
		{ label: 'Color', value: config?.selectedColor?.name || 'Not selected' },
		{
			label: 'Opening Direction',
			value:
				config?.openingDirection === 'left' ? 'Left Opening' : 'Right Opening',
		},
		{
			label: 'Glass Position',
			value: getGlassPositionDisplay(config?.glassPosition),
		},
		{
			label: 'Dimensions',
			value: `${config?.dimensions?.width || 359} px (W) x ${
				config?.dimensions?.height || 687
			} px (H)`,
		},
	];

	return (
		<div className="relative p-6 bg-white rounded-lg shadow-md flex h-full flex-col">
			<h2 className="text-2xl font-bold text-gray-800 mb-6">
				Door Configuration Summary
			</h2>

			{/* Configuration Details */}
			<div className="space-y-4 mb-16">
				{configItems.map((item, index) => (
					<div
						key={index}
						className="flex border-b border-gray-200 pb-3"
					>
						<span className="w-1/3 font-semibold text-gray-700">
							{item.label}:
						</span>
						<span className="w-2/3 text-gray-600">{item.value}</span>
					</div>
				))}
			</div>

			{/* Floating Buttons Container */}
			<div className="absolute bottom-0 right-0 flex w-full justify-around">
				{/* Inquiry Button */}
				<button
					onClick={() => setIsModalOpen(true)}
					className="flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
				>
					<svg
						className="w-5 h-5 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4-4-4z"
						/>
					</svg>
					Inquiry
				</button>

				{/* PDF Download Button */}
				<PDFDownloadLink
					document={<MyDocument config={config} />}
					fileName="door_configuration.pdf"
					className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
				>
					{({ loading, error }) => {
						if (error) {
							console.error(error);
							return <span>Error generating document</span>;
						}
						return loading ? (
							'Preparing...'
						) : (
							<>
								<svg
									className="w-5 h-5 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
								Print (PDF)
							</>
						);
					}}
				</PDFDownloadLink>
			</div>
			<InquiryModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</div>
	);
};

export default InquiryPanel;
