export const Door = ({ config, selected, onSelect }) => {
	const scale = config.openingDirection === 'right' ? -1 : 1;

	// Get the appropriate door image based on configuration
	const getDoorImage = () => {
		if (config.selectedDoor && config.selectedColor) {
			return config.selectedDoor.color_variants[config.selectedColor.id]
				?.door_image_url;
		} else if (config.selectedDoor) {
			return config.selectedDoor.main_image_url;
		}
		return '/src/assets/doors/default-door.jpg'; // Fallback image
	};

	return (
		<div
			className={`relative w-full h-full flex items-center justify-center transition-all duration-300 ease-in-out ${
				selected ? 'outline outline-2 outline-blue-500 bg-blue-50/50' : ''
			}`}
			style={{
				width: '100%', // Fix the width
				height: '100%', // Fix the height
				position: 'relative',
				overflow: 'hidden', // Ensure the image does not exceed the container
			}}
			onClick={() => onSelect && onSelect()}
		>
			{/* Door Image */}
			<img
				src={getDoorImage() || '/placeholder.svg'}
				alt={`${config.selectedDoor?.name || 'Door'} Preview`}
				className="absolute bottom-0 left-0 w-full h-full object-contain"
				style={{
					transform: `scaleX(${scale})`,
				}}
			/>
		</div>
	);
};
