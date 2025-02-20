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
			top: {
				width: '80', // percentage
				height: '80', // percentage
			},
			left: {
				width: '30%',
				height: '80',
			},
			right: {
				width: '30%',
				height: '80',
			},
			'2left-top': {
				width: '30%',
				height: '40',
			},
			'2left-bottom': {
				width: '30%',
				height: '40',
			},
			'2right-top': {
				width: '30%',
				height: '40',
			},
			'2right-bottom': {
				width: '30%',
				height: '40',
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
