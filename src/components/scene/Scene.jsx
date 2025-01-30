export function Scene({ doorConfig, onSelect, onDeselect }) {
	console.log({ doorConfig });
	const getDoorImage = () => {
		if (doorConfig.selectedDoor && doorConfig.selectedColor) {
			return doorConfig.selectedDoor.color_variants[doorConfig.selectedColor.id]
				?.door_image_url;
		} else if (doorConfig.selectedDoor) {
			return doorConfig.selectedDoor.main_image_url;
		}
		return '/assets/image.png';
	};

	// Calculate the total width based on glass position
	const calculateWidth = () => {
		const baseWidth = 359; // Base door width
		const singleGlassWidth = baseWidth * 0.3;
		const doubleGlassWidth = baseWidth * 0.6;

		if (!doorConfig.glassPosition) return baseWidth;

		switch (doorConfig.glassPosition) {
			case 'left':
			case 'right':
				return baseWidth + singleGlassWidth;
			case 'twoLeft':
			case 'twoRight':
				return baseWidth + doubleGlassWidth;
			default:
				return baseWidth;
		}
	};

	const totalWidth = calculateWidth();

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
						backgroundSize: '378px',
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
						height: '687px',
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
								width: '359px',
								height: '687px',
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
						backgroundSize: '378px',
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

function SideGlassPanels({ position, type }) {
	const panelCount = type.startsWith('two') ? 2 : 1;

	return (
		<div className="w-full h-full flex">
			{Array.from({ length: panelCount }).map((_, i) => (
				<div
					key={i}
					className="flex-1 relative"
					style={{
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
