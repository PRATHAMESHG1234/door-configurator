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
		dimensions: initialConfig.dimensions || {
			width: 359, // Default width
			height: 687, // Default height
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

	const resetConfig = useCallback(() => {
		setConfig({
			selectedDoor: doors[0] || null,
			selectedColor: null,
			openingDirection: 'left',
			glassPosition: null,
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
		updateDimensions,
		resetConfig,
	};
};
