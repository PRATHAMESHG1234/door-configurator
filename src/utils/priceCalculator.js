export const calculateTotalPrice = (config) => {
	const prices = {
		base: config.design?.basePrice || 0,
		material: config.material?.price || 0,
		handle: config.handle?.price || 0,
		glass: config.glass?.price || 0,
		pattern: config.glassPattern?.price || 0,
	};

	return Object.values(prices).reduce((total, price) => total + price, 0);
};

export const calculateDeliveryPrice = (config, distance) => {
	const baseDeliveryPrice = 50;
	const pricePerKm = 0.5;
	return baseDeliveryPrice + distance * pricePerKm;
};
