import { useState, useCallback, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const useDoorConfiguration = (initialConfig = {}) => {
	const [doors, setDoors] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [config, setConfig] = useState({
		selectedDoor: initialConfig.selectedDoor || null,
		selectedColor: initialConfig.selectedColor || null,
		openingDirection: initialConfig.openingDirection || 'left',
		glassPosition: initialConfig.glassPosition || null,
		glassDimensions: initialConfig.glassDimensions || {
			// Single top panel
			top: {
				width: '100%', // Full width for top panel
				height: '20%', // Matches your current calculation
				top: '0%',
				left: '0%',
			},

			// Single left panel
			left: {
				width: '22%', // Matches your current CSS width
				height: '100%', // Full height for side panels
				top: '0%',
				left: '0%',
			},

			// Single right panel
			right: {
				width: '22%', // Matches your current CSS width
				height: '100%', // Full height for side panels
				top: '0%',
				right: '0%',
			},

			// Double left panels
			'2left-top': {
				width: '30%', // Matches your current CSS width for double panels
				height: '48%', // Roughly half height for double panels
				top: '0%',
				left: '0%',
			},
			'2left-bottom': {
				width: '30%', // Matches your current CSS width for double panels
				height: '48%', // Roughly half height for double panels
				top: '52%', // Positioned below top panel with small gap
				left: '0%',
			},

			// Double right panels
			'2right-top': {
				width: '30%', // Matches your current CSS width for double panels
				height: '48%', // Roughly half height for double panels
				top: '0%',
				right: '0%',
			},
			'2right-bottom': {
				width: '30%', // Matches your current CSS width for double panels
				height: '48%', // Roughly half height for double panels
				top: '52%', // Positioned below top panel with small gap
				right: '0%',
			},
		},
		dimensions: initialConfig.dimensions || {
			width: 359,
			height: 687,
		},
	});

	// Fetch doors data from Firestore
	useEffect(() => {
		const fetchDoors = async () => {
			try {
				setLoading(true);
				const doorsCollection = collection(db, 'doors');
				const doorSnapshot = await getDocs(doorsCollection);
				const doorsList = doorSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				setDoors(doorsList);

				if (!config.selectedDoor && doorsList.length > 0) {
					setConfig((prev) => ({
						...prev,
						selectedDoor: doorsList[0],
					}));
				}
			} catch (err) {
				console.error('Error fetching doors:', err);
				setError('Failed to load doors data');
			} finally {
				setLoading(false);
			}
		};

		fetchDoors();
	}, []);

	const updateConfig = useCallback((key, value) => {
		setConfig((prev) => ({
			...prev,
			[key]: value,
		}));
	}, []);

	const updateDimensions = useCallback((dimensions) => {
		setConfig((prev) => ({
			...prev,
			dimensions: {
				...prev.dimensions,
				...dimensions,
			},
		}));
	}, []);

	const updateGlassDimensions = useCallback((position, dimensions) => {
		setConfig((prev) => ({
			...prev,
			glassDimensions: {
				...prev.glassDimensions,
				[position]: {
					...prev.glassDimensions[position],
					...dimensions,
				},
			},
		}));
	}, []);

	const resetConfig = useCallback(() => {
		setConfig({
			selectedDoor: doors[0] || null,
			selectedColor: null,
			openingDirection: 'left',
			glassPosition: null,
			glassDimensions: {
				top: { width: '80%', height: '20%', top: '8%', left: '10%' },
				left: { width: '35%', height: '40%', top: '30%', left: '10%' },
				right: { width: '35%', height: '40%', top: '30%', right: '10%' },
				'2left-top': { width: '35%', height: '30%', top: '20%', left: '10%' },
				'2left-bottom': {
					width: '35%',
					height: '30%',
					top: '50%',
					left: '10%',
				},
				'2right-top': { width: '35%', height: '30%', top: '20%', right: '10%' },
				'2right-bottom': {
					width: '35%',
					height: '30%',
					top: '50%',
					right: '10%',
				},
			},
			dimensions: {
				width: 359,
				height: 687,
			},
		});
	}, [doors]);

	return {
		config,
		doors,
		loading,
		error,
		updateDoor: (door) => updateConfig('selectedDoor', door),
		updateColor: (color) => updateConfig('selectedColor', color),
		updateOpeningDirection: (direction) =>
			updateConfig('openingDirection', direction),
		updateGlassPosition: (position) => updateConfig('glassPosition', position),
		updateGlassDimensions,
		updateDimensions,
		resetConfig,
	};
};
