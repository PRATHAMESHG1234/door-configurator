// Scene.jsx
import React from 'react';

function SideGlassPanels({
	doorConfig,
	position,
	type,
	height,
	isTop = false,
	width,
}) {
	const panelCount = type === 'double' ? 2 : 1;
	const glassDimensions = doorConfig?.glassDimensions || {};

	const getGlassDimensions = (index) => {
		if (isTop) {
			return glassDimensions.top || {};
		}

		if (type === 'double') {
			if (position === 'left') {
				return index === 0
					? glassDimensions['2left-top']
					: glassDimensions['2left-bottom'];
			} else {
				return index === 0
					? glassDimensions['2right-top']
					: glassDimensions['2right-bottom'];
			}
		}

		return glassDimensions[position];
	};

	if (isTop) {
		const topDims = getGlassDimensions();

		return (
			<div
				className="z-50 relative overflow-hidden"
				style={{
					height: `${height}px`,
				}}
			>
				<div
					className="absolute"
					style={{
						width: topDims?.width ? `${topDims.width}` : '100%',
						height: width
							? `${width}px`
							: topDims?.height
							? `${topDims.height}`
							: '100%',
						top:
							doorConfig?.glassPosition?.includes('2left') ||
							doorConfig?.glassPosition?.includes('2right') ||
							doorConfig?.glassPosition === 'top+left+right'
								? '63%'
								: doorConfig?.glassPosition === 'top'
								? '73%'
								: '68%',
						left:
							doorConfig?.glassPosition?.includes('2left') ||
							doorConfig?.glassPosition?.includes('2right')
								? '46%'
								: '49%',
						transform: 'translate(-50%, -50%) rotate(90deg)',
						transformOrigin: 'center center',
					}}
				>
					<img
						src="/assets/glass/panel.png"
						alt="Top Glass Panel"
						className="z-40 w-full h-full object-scale-down"
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-full flex">
			{Array.from({ length: panelCount }).map((_, i) => {
				const dims = getGlassDimensions(i);
				const panelStyle = {
					width: dims?.width
						? `${dims.width}`
						: type === 'double'
						? '30%'
						: '22%',
					height: dims?.height ? `${dims.height}` : '100%',
				};

				return (
					<div
						key={i}
						className="relative"
						style={{
							height: `${height}px`,
							width: panelStyle.width,
							flex: 'none',
						}}
					>
						<div
							className="h-full"
							style={{
								width: '100%',
								height: panelStyle.height,
							}}
						>
							<img
								src="/assets/glass/panel.png"
								alt={`Glass Panel ${i + 1}`}
								className="w-full h-full object-fill"
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export function Scene({ doorConfig, onSelect, onDeselect }) {
	const BASE_WIDTH = 365;
	const BASE_HEIGHT = 687;

	const getDoorImage = () => {
		if (doorConfig.selectedDoor && doorConfig.selectedColor) {
			return doorConfig.selectedDoor.color_variants[doorConfig.selectedColor.id]
				?.door_image_url;
		} else if (doorConfig.selectedDoor) {
			return doorConfig.selectedDoor.main_image_url;
		}
		return '/assets/image.png';
	};

	const calculateDimensions = () => {
		const baseWidth = doorConfig.dimensions?.width || BASE_WIDTH;
		const doorHeight = doorConfig.dimensions?.height || BASE_HEIGHT;
		const singleGlassWidth = baseWidth * 0.3;
		const doubleGlassWidth = baseWidth * 0.6;
		const topGlassHeight = doorHeight * 0.2;

		let totalWidth = baseWidth;
		let totalHeight = doorHeight;
		let mainContentHeight = doorHeight;
		let adjustedDoorWidth = baseWidth;

		// Calculate glass panel actual widths
		const getActualGlassWidth = (type) => {
			const dims = doorConfig?.glassDimensions?.[type];
			const width = parseFloat(dims?.width || '100');
			return width / 100; // Convert percentage to decimal
		};

		// Calculate space taken by glass panels
		if (doorConfig.glassPosition?.includes('left')) {
			const baseSpace = doorConfig.glassPosition.includes('2left')
				? doubleGlassWidth
				: singleGlassWidth;
			const glassType = doorConfig.glassPosition.includes('2left')
				? '2left-top'
				: 'left';
			const actualWidthRatio = getActualGlassWidth(glassType);
			const actualSpace = baseSpace * actualWidthRatio;
			const extraSpace = baseSpace - actualSpace;
			adjustedDoorWidth += extraSpace;
			totalWidth += actualSpace;
		}

		if (doorConfig.glassPosition?.includes('right')) {
			const baseSpace = doorConfig.glassPosition.includes('2right')
				? doubleGlassWidth
				: singleGlassWidth;
			const glassType = doorConfig.glassPosition.includes('2right')
				? '2right-top'
				: 'right';
			const actualWidthRatio = getActualGlassWidth(glassType);
			const actualSpace = baseSpace * actualWidthRatio;
			const extraSpace = baseSpace - actualSpace;
			adjustedDoorWidth += extraSpace;
			totalWidth += actualSpace;
		}

		// Adjust heights for top panel
		if (doorConfig.glassPosition?.includes('top')) {
			totalHeight = doorHeight + topGlassHeight;
			mainContentHeight = doorHeight;
		}

		const widthScale = totalWidth / BASE_WIDTH;
		const heightScale = totalHeight / BASE_HEIGHT;

		return {
			totalWidth,
			totalHeight,
			mainContentHeight,
			doorWidth: adjustedDoorWidth,
			doorHeight,
			widthScale,
			heightScale,
			topGlassHeight,
		};
	};

	const dimensions = calculateDimensions();
	const topPanelExtraWidth = (() => {
		const hasLeft = doorConfig.glassPosition?.includes('left');
		const hasRight = doorConfig.glassPosition?.includes('right');
		let leftExtra = 0;
		let rightExtra = 0;

		if (hasLeft && hasRight) {
			leftExtra = 100;
			rightExtra = 100;
		} else {
			if (hasLeft) {
				leftExtra = doorConfig.glassPosition.includes('2left') ? 174 : 109;
			}
			if (hasRight) {
				rightExtra = doorConfig.glassPosition.includes('2right') ? 174 : 109;
			}
		}
		return leftExtra + rightExtra;
	})();

	return (
		<div className="table w-full h-full absolute whitespace-nowrap border-collapse top-0">
			{/* First Row */}
			<div className="table-row">
				<div
					className="table-cell relative whitespace-nowrap bg-no-repeat"
					style={{
						width: 'auto',
						tableLayout: 'auto',
						backgroundImage: "url('/assets/backgrounds/out1.png')",
						backgroundSize: '1400px',
						backgroundPosition: '100% 100%',
					}}
				/>
				<div
					className="table-cell relative whitespace-nowrap bg-repeat-x"
					style={{
						tableLayout: 'auto',
						width: `${dimensions.totalWidth}px`,
						backgroundImage: "url('/assets/backgrounds/out2.png')",
						backgroundSize: `${378 * dimensions.widthScale}px`,
						backgroundPosition: '50% 100%',
						transform: 'translate3d(-1px, 0, 0)',
					}}
				/>
				<div
					className="table-cell relative whitespace-nowrap bg-no-repeat"
					style={{
						tableLayout: 'auto',
						backgroundImage: "url('/assets/backgrounds/out3.png')",
						backgroundSize: '1399px',
						backgroundPosition: '0px 100%',
						transform: 'translate3d(-2px, 0, 0)',
					}}
				/>
			</div>

			{/* Second Row */}
			<div className="table-row">
				<div
					className="table-cell relative whitespace-nowrap bg-no-repeat"
					style={{
						tableLayout: 'auto',
						backgroundImage: "url('/assets/backgrounds/out4.png')",
						backgroundSize: '1400px',
						backgroundPosition: '100% 100%',
						transform: 'translate3d(0, -2px, 0)',
					}}
				/>

				{/* Door and glass section */}
				<div
					className="table-cell relative whitespace-nowrap"
					style={{
						tableLayout: 'auto',
						height: `${dimensions.totalHeight}px`,
						width: `${dimensions.totalWidth}px`,
						transform: 'translate3d(-1px, -1px, 0)',
					}}
				>
					<div className="h-full flex flex-col">
						{/* Top Glass Panel */}
						{doorConfig.glassPosition?.includes('top') && (
							<SideGlassPanels
								position="top"
								type="single"
								height={dimensions.topGlassHeight}
								isTop={true}
								width={dimensions.doorWidth + topPanelExtraWidth}
								doorConfig={doorConfig}
							/>
						)}
						<div className="flex flex-1">
							{/* Left Glass Panel */}
							{doorConfig.glassPosition?.includes('left') && (
								<div
									className="h-full"
									style={{
										width: doorConfig.glassPosition.includes('2left')
											? '30%'
											: '22%',
										marginRight: '0',
									}}
								>
									<SideGlassPanels
										doorConfig={doorConfig}
										position="left"
										type={
											doorConfig.glassPosition.includes('2left')
												? 'double'
												: 'single'
										}
										height={dimensions.mainContentHeight}
									/>
								</div>
							)}

							{/* Door Image */}
							<div
								className="h-full justify-center items-center cursor-pointer"
								onClick={() => onSelect?.()}
								role="button"
								tabIndex={0}
								style={{
									width: `${dimensions.doorWidth}px`,
									height: `${dimensions.mainContentHeight}px`,
									marginLeft: !doorConfig.glassPosition?.includes('left')
										? 'auto'
										: '0',
									marginRight: !doorConfig.glassPosition?.includes('right')
										? 'auto'
										: '0',
								}}
							>
								<img
									src={getDoorImage()}
									alt="Door Preview"
									className="h-full w-full transition-transform duration-300 object-fill"
									style={{
										transform:
											doorConfig.openingDirection === 'left'
												? 'none'
												: 'scaleX(-1)',
									}}
								/>
							</div>

							{/* Right Glass Panel */}
							{doorConfig.glassPosition?.includes('right') && (
								<div
									className="h-full"
									style={{
										width: doorConfig.glassPosition.includes('2right')
											? '30%'
											: '22%',
										marginLeft: '0',
									}}
								>
									<SideGlassPanels
										doorConfig={doorConfig}
										position="right"
										type={
											doorConfig.glassPosition.includes('2right')
												? 'double'
												: 'single'
										}
										height={dimensions.mainContentHeight}
									/>
								</div>
							)}
						</div>
					</div>
				</div>

				<div
					className="table-cell relative whitespace-nowrap bg-no-repeat"
					style={{
						tableLayout: 'auto',
						backgroundImage: "url('/assets/backgrounds/out6.png')",
						backgroundSize: '1399px',
						backgroundPosition: '0px 100%',
						transform: 'translate3d(-2px, -2px, 0)',
					}}
				/>
			</div>

			{/* Footer Row */}
			<div className="table-row">
				<div
					className="table-cell relative whitespace-nowrap bg-no-repeat"
					style={{
						tableLayout: 'auto',
						backgroundImage: "url('/assets/backgrounds/out7.png')",
						backgroundSize: '1400px',
						backgroundPosition: '100% 0px',
						transform: 'translate3d(0, -3px, 0)',
					}}
				/>
				<div
					className="table-cell relative whitespace-nowrap bg-repeat-x"
					style={{
						tableLayout: 'auto',
						width: `${dimensions.totalWidth}px`,
						backgroundImage: "url('/assets/backgrounds/out8.png')",
						backgroundSize: `${378 * dimensions.widthScale}px`,
						backgroundPosition: '0% 0px',
						transform: 'translate3d(-1px, -3px, 0)',
					}}
				/>
				<div
					className="table-cell relative whitespace-nowrap bg-no-repeat"
					style={{
						tableLayout: 'auto',
						backgroundImage: "url('/assets/backgrounds/out9.png')",
						backgroundSize: '1399px',
						backgroundPosition: '0px 0px',
						transform: 'translate3d(-2px, -3px, 0)',
					}}
				/>
			</div>
		</div>
	);
}

export default Scene;
