// src/components/panels/DesignPanel.jsx
import React from 'react';

export function DesignPanel({
	selectedDesign,
	setSelectedDesign,
	doorDesigns,
}) {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-medium">Door Design</h3>
			<div className="grid grid-cols-2 gap-4">
				{doorDesigns.map((door) => (
					<div
						key={door.id}
						onClick={() => setSelectedDesign(door)}
						className={`p-4 rounded-lg cursor-pointer ${
							selectedDesign.id === door.id
								? 'bg-blue-50 border-blue-500'
								: 'bg-white border-gray-200'
						} border-2`}
					>
						{/* Display the door name */}
						<h4 className="font-medium">{door.name}</h4>

						{/* Display the door price */}
						<p className="text-blue-600">${door.price}</p>

						{/* Display the door image */}
						<div className="mt-2">
							<img
								src={door.images.front}
								alt={door.name}
								className="w-full h-20 object-cover rounded-md"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
