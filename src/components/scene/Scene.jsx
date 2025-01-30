export function Scene({ doorConfig, onSelect, onDeselect }) {
	// Default dimensions
	const BASE_WIDTH = 359;
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

	// Get dimensions from config or use defaults
	const getDoorDimensions = () => {
		const width = doorConfig.dimensions.width || BASE_WIDTH;
		const height = doorConfig.dimensions.height || BASE_HEIGHT;

		// Calculate scaling factors
		const widthScale = width / BASE_WIDTH;
		const heightScale = height / BASE_HEIGHT;

		return {
			width,
			height,
			widthScale,
			heightScale,
		};
	};

	// Calculate the total width based on glass position and door width
	const calculateWidth = () => {
		const { width: doorWidth } = getDoorDimensions();
		const singleGlassWidth = doorWidth * 0.3;
		const doubleGlassWidth = doorWidth * 0.6;

		if (!doorConfig.glassPosition) return doorWidth;

		switch (doorConfig.glassPosition) {
			case 'left':
			case 'right':
				return doorWidth + singleGlassWidth;
			case 'twoLeft':
			case 'twoRight':
				return doorWidth + doubleGlassWidth;
			default:
				return doorWidth;
		}
	};

	const totalWidth = calculateWidth();
	const {
		width: doorWidth,
		height: doorHeight,
		widthScale,
		heightScale,
	} = getDoorDimensions();

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
						width: `${totalWidth}px`,
						backgroundImage: "url('/assets/backgrounds/out2.png')",
						backgroundSize: `${378 * widthScale}px`,
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
						height: `${doorHeight}px`,
						width: `${totalWidth}px`,
						transform: 'translate3d(-1px, -1px, 0)',
					}}
				>
					<div className="h-full flex">
						{/* Left Glass Panel */}
						{['left', 'twoLeft'].includes(doorConfig.glassPosition) && (
							<div
								className="h-full flex"
								style={{
									width: doorConfig.glassPosition.startsWith('two')
										? '30%'
										: '20%',
								}}
							>
								<SideGlassPanels
									position="left"
									type={doorConfig.glassPosition}
									height={doorHeight}
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
								width: `${doorWidth}px`,
								height: `${doorHeight}px`,
							}}
						>
							<img
								src={getDoorImage()}
								alt="Door Preview"
								className="h-full transition-transform duration-300"
								style={{
									transform:
										doorConfig.openingDirection === 'left'
											? 'none'
											: 'scaleX(-1)',
								}}
							/>
						</div>

						{/* Right Glass Panel */}
						{['right', 'twoRight'].includes(doorConfig.glassPosition) && (
							<div
								className="h-full flex"
								style={{
									width: doorConfig.glassPosition.startsWith('two')
										? '30%'
										: '20%',
								}}
							>
								<SideGlassPanels
									position="right"
									type={doorConfig.glassPosition}
									height={doorHeight}
								/>
							</div>
						)}
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
						width: `${totalWidth}px`,
						backgroundImage: "url('/assets/backgrounds/out8.png')",
						backgroundSize: `${378 * widthScale}px`,
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

function SideGlassPanels({ position, type, height }) {
	const panelCount = type.startsWith('two') ? 2 : 1;

	return (
		<div className="w-full h-full flex">
			{Array.from({ length: panelCount }).map((_, i) => (
				<div
					key={i}
					className="flex-1 relative"
					style={{
						height: `${height}px`,
						borderLeft:
							position === 'left' ? '2px solid rgba(255,255,255,0.2)' : 'none',
						borderRight:
							position === 'right' ? '2px solid rgba(255,255,255,0.2)' : 'none',
						borderBottom:
							i < panelCount - 1 ? '2px solid rgba(255,255,255,0.2)' : 'none',
					}}
				>
					<div className="w-full h-full">
						<img
							src="/assets/glass/panel.png"
							alt={`Glass Panel ${i + 1}`}
							className="w-full h-full object-fill"
						/>
					</div>
				</div>
			))}
		</div>
	);
}

export default Scene;
