export const validateDoorConfig = (config) => {
	const errors = [];

	if (!config.design) {
		errors.push('Door design is required');
	}

	if (!config.material) {
		errors.push('Material selection is required');
	}

	if (config.glass && !config.design.allowedGlass.includes(config.glass.id)) {
		errors.push('Selected glass style is not compatible with this door design');
	}

	if (
		config.handle &&
		!config.design.allowedHandles.includes(config.handle.id)
	) {
		errors.push('Selected handle is not compatible with this door design');
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
};
