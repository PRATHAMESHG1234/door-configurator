import { Door } from '../door/Door';

export function Scene({ doorConfig, onSelect, onDeselect }) {
	const scale = doorConfig.openingDirection === 'right' ? -1 : 1;

	const getDoorImage = () => {
		// if (doorConfig.selectedDoor && doorConfig.selectedColor) {
		// 	return doorConfig.selectedDoor.color_variants[doorConfig.selectedColor.id]
		// 		?.door_image_url;
		// } else if (doorConfig.selectedDoor) {
		// 	return doorConfig.selectedDoor.main_image_url;
		// }
		return '/assets/image.png';
	};

	return (
		<div className="flex justify-center items-center w-full h-[90%]">
			{/* Background Container */}
			<div className="w-full h-full flex justify-center items-center bg-gradient-to-b from-gray-200 to-gray-400">
				{/* Room Background Image */}
				<div
					className="w-full h-full fixed top-0 left-0 bg-cover bg-center blur-[1px]"
					style={{ backgroundImage: "url('/room-background.jpg')", zIndex: -1 }}
				/>

				{/* Door Unit Container */}
				<div className="h-[98%]">
					{/* Main Frame */}
					<div className="w-full h-full flex flex-1 justify-center items-start">
						{/* Content Row */}
						<div className="flex w-full h-[60%]">
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

							{/* Door Column */}
							<div className="h-full">
								<div
									className={`w-full h-full flex items-center ${
										['left', 'twoLeft'].includes(doorConfig.glassPosition)
											? 'justify-start'
											: ['right', 'twoRight'].includes(doorConfig.glassPosition)
											? 'justify-end'
											: 'justify-center'
									}`}
									onClick={() => onSelect?.()}
									role="button"
									tabIndex={0}
								>
									<img
										src={getDoorImage()}
										alt={`${doorConfig.selectedDoor?.name || 'Door'} Preview`}
										className="h-full transition-transform duration-300"
									/>
								</div>
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
				</div>
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
					className="flex-1 border-white/20"
					style={{
						borderLeft: position === 'left' ? '2px solid' : 'none',
						borderRight: position === 'right' ? '2px solid' : 'none',
						borderBottom: i < panelCount - 1 ? '2px solid' : 'none',
					}}
				>
					<div className="w-full h-full">
						<div className="w-full h-full">
							<img
								src="/assets/glass/image.png"
								alt={`Glass Panel ${i + 1}`}
								className="w-full h-full object-fill"
							/>
							<div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Scene;
