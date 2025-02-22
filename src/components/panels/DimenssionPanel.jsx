import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { RotateCcw } from 'lucide-react';

// Convert pixels to meters (assuming 1 pixel = 0.26mm)
const pxToM = (px) => ((px * 0.26) / 1000).toFixed(2);
const mToPx = (m) => Math.round((m * 1000) / 0.26);

const DIMENSIONS = {
	width: {
		min: 300, // ~78cm
		max: 500, // ~130cm
		default: 359, // ~93cm
	},
	height: {
		min: 600, // ~156cm
		max: 800, // ~208cm
		default: 687, // ~179cm
	},
};

// Helper function to get formatted panel name
const getPanelDisplayName = (panel) => {
	switch (panel) {
		case '2left-top':
			return 'Left Outer Panel';
		case '2left-bottom':
			return 'Left Inner Panel';
		case '2right-top':
			return 'Right Inner Panel';
		case '2right-bottom':
			return 'Right Outer Panel';
		case 'left':
			return 'Left Panel';
		case 'right':
			return 'Right Panel';
		default:
			return (
				panel.charAt(0).toUpperCase() +
				panel.slice(1).replace('-', ' ') +
				' Panel'
			);
	}
};

export function DimensionsPanel({
	dimensions,
	onDimensionsChange,
	selectedPosition,
	glassDimensions = {},
	updateGlassDimensions,
}) {
	const [localDimensions, setLocalDimensions] = useState({
		width: dimensions?.width || DIMENSIONS.width.default,
		height: dimensions?.height || DIMENSIONS.height.default,
	});

	useEffect(() => {
		setLocalDimensions({
			width: dimensions?.width || DIMENSIONS.width.default,
			height: dimensions?.height || DIMENSIONS.height.default,
		});
	}, [dimensions]);

	const handleSliderChange = (type, value) => {
		const newDimensions = {
			...localDimensions,
			[type]: value[0],
		};
		setLocalDimensions(newDimensions);
		onDimensionsChange(newDimensions);
	};

	const handleInputChange = (type, value) => {
		// Convert meter input to pixels
		const pxValue = mToPx(parseFloat(value)) || 0;
		if (pxValue >= DIMENSIONS[type].min && pxValue <= DIMENSIONS[type].max) {
			const newDimensions = {
				...localDimensions,
				[type]: pxValue,
			};
			setLocalDimensions(newDimensions);
			onDimensionsChange(newDimensions);
		}
	};

	const handleReset = () => {
		const defaultDimensions = {
			width: DIMENSIONS.width.default,
			height: DIMENSIONS.height.default,
		};
		setLocalDimensions(defaultDimensions);
		onDimensionsChange(defaultDimensions);
	};

	const getActivePanels = () => {
		if (!selectedPosition || selectedPosition === 'none') return [];

		const panels = [];
		if (selectedPosition.includes('2left')) {
			panels.push('2left-top', '2left-bottom');
		} else if (selectedPosition.includes('left')) {
			panels.push('left');
		}
		if (selectedPosition.includes('2right')) {
			panels.push('2right-top', '2right-bottom');
		} else if (selectedPosition.includes('right')) {
			panels.push('right');
		}
		return panels;
	};

	const handleGlassDimensionChange = (panel, dimension, value) => {
		const newValue = typeof value === 'number' ? `${value}%` : value;
		updateGlassDimensions(panel, { [dimension]: newValue });
	};

	const renderDimensionControl = (type) => (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium capitalize">{type}</span>
				<span className="text-xs text-muted-foreground">
					{pxToM(DIMENSIONS[type].min)}-{pxToM(DIMENSIONS[type].max)}m
				</span>
			</div>
			<div className="flex gap-3 items-center">
				<div className="flex-1 bg-muted rounded-md px-2 py-3">
					<Slider
						value={[localDimensions[type]]}
						min={DIMENSIONS[type].min}
						max={DIMENSIONS[type].max}
						step={1}
						onValueChange={(value) => handleSliderChange(type, value)}
						className="flex-1"
					/>
				</div>
				<div className="w-24">
					<Input
						type="number"
						value={pxToM(localDimensions[type])}
						onChange={(e) => handleInputChange(type, e.target.value)}
						min={pxToM(DIMENSIONS[type].min)}
						max={pxToM(DIMENSIONS[type].max)}
						step={0.01}
						className="w-full"
					/>
				</div>
			</div>
		</div>
	);

	const renderGlassDimensionControls = (panel) => {
		const dimensions = glassDimensions[panel] || {};
		const parseValue = (value) => parseInt(value) || 0;

		return (
			<div className="space-y-4">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">Width</span>
						<span className="text-xs text-muted-foreground">%</span>
					</div>
					<div className="flex gap-3 items-center">
						<div className="flex-1 bg-muted rounded-md px-2 py-3">
							<Slider
								value={[parseValue(dimensions.width)]}
								min={0}
								max={100}
								step={1}
								onValueChange={(value) =>
									handleGlassDimensionChange(panel, 'width', value[0])
								}
								className="flex-1"
							/>
						</div>
						<Input
							type="number"
							value={parseValue(dimensions.width)}
							onChange={(e) =>
								handleGlassDimensionChange(panel, 'width', e.target.value)
							}
							min={0}
							max={100}
							className="w-16"
						/>
					</div>
				</div>
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">Height</span>
						<span className="text-xs text-muted-foreground">%</span>
					</div>
					<div className="flex gap-3 items-center">
						<div className="flex-1 bg-muted rounded-md px-2 py-3">
							<Slider
								value={[parseValue(dimensions.height)]}
								min={0}
								max={100}
								step={1}
								onValueChange={(value) =>
									handleGlassDimensionChange(panel, 'height', value[0])
								}
								className="flex-1"
							/>
						</div>
						<Input
							type="number"
							value={parseValue(dimensions.height)}
							onChange={(e) =>
								handleGlassDimensionChange(panel, 'height', e.target.value)
							}
							min={0}
							max={100}
							className="w-16"
						/>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="space-y-4 p-10">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Door Dimensions</h3>
				<Button
					variant="outline"
					size="sm"
					onClick={handleReset}
				>
					<RotateCcw className="h-3 w-3 mr-2" />
					Reset
				</Button>
			</div>

			<Card className="shadow-none border-none">
				<CardContent className="p-0 space-y-4">
					{renderDimensionControl('width')}
					{renderDimensionControl('height')}
				</CardContent>
			</Card>

			{selectedPosition &&
				selectedPosition !== 'none' &&
				getActivePanels().length > 0 && (
					<>
						<Separator className="my-4" />
						<div className="space-y-4">
							<h3 className="font-semibold">Glass Panel Dimensions</h3>
							<Accordion
								type="single"
								collapsible
								className="w-full"
							>
								{getActivePanels().map((panel) => (
									<AccordionItem
										key={panel}
										value={panel}
									>
										<AccordionTrigger className="text-sm py-2">
											{getPanelDisplayName(panel)}
										</AccordionTrigger>
										<AccordionContent className="pt-2">
											{renderGlassDimensionControls(panel)}
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					</>
				)}
		</div>
	);
}

export default DimensionsPanel;
