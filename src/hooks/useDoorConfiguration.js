import { useState, useCallback, useEffect } from 'react';
import { doorStyles } from '../config/doorStyles';
import { materialPresets } from '../config/materialPresets';
import { handleStyles } from '../config/handleStyles';
import { validateDoorConfig } from '../utils/validationUtils';
import { calculateTotalPrice } from '../utils/priceCalculator';
import { glassPatterns, glassStyles } from '../config/glassStyles';
import { getDefaultDirection } from '../config/doorConstructionConfig';

export const useDoorConfiguration = (initialConfig = {}) => {
	const [config, setConfig] = useState({
		design: initialConfig.design || doorStyles[0],
		material: initialConfig.material || materialPresets[0],
		handle: initialConfig.handle || handleStyles[0],
		glass: initialConfig.glass || glassStyles[0],
		glassPattern: initialConfig.glassPattern || glassPatterns[0],
		openingDirection: initialConfig.openingDirection || getDefaultDirection(),
		customizations: initialConfig.customizations || {},
		// Add all available options to the config
		availableDesigns: doorStyles,
		availableMaterials: materialPresets,
		availableHandles: handleStyles,
		availableGlassStyles: glassStyles,
		availableGlassPatterns: glassPatterns,
	});

	const [errors, setErrors] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	// Validate configuration whenever it changes
	useEffect(() => {
		const { isValid, errors } = validateDoorConfig(config);
		setErrors(errors);

		// Calculate new total price
		const price = calculateTotalPrice(config);
		setTotalPrice(price);
	}, [config]);

	const updateConfig = useCallback((key, value) => {
		setConfig((prev) => ({
			...prev,
			[key]: value,
		}));
	}, []);

	const resetConfig = useCallback(() => {
		setConfig({
			design: doorStyles[0],
			material: materialPresets[0],
			handle: handleStyles[0],
			glass: glassStyles[0],
			glassPattern: glassPatterns[0],
			customizations: {},
			// Maintain the available options during reset
			availableDesigns: doorStyles,
			availableMaterials: materialPresets,
			availableHandles: handleStyles,
			availableGlassStyles: glassStyles,
			availableGlassPatterns: glassPatterns,
		});
	}, []);

	return {
		config,
		errors,
		totalPrice,
		updateConfig,
		resetConfig,
		// Convenience methods for specific updates
		updateDesign: (design) => updateConfig('design', design),
		updateMaterial: (material) => updateConfig('material', material),
		updateHandle: (handle) => updateConfig('handle', handle),
		updateGlass: (glass) => updateConfig('glass', glass),
		updateGlassPattern: (pattern) => updateConfig('glassPattern', pattern),
		updateCustomizations: (customizations) =>
			updateConfig('customizations', customizations),
		updateOpeningDirection: (direction) =>
			updateConfig('openingDirection', direction),
	};
};
