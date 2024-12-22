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
				{doorDesigns.map((design) => (
					<div
						key={design.id}
						onClick={() => setSelectedDesign(design)}
						className={`p-4 rounded-lg cursor-pointer ${
							selectedDesign.id === design.id
								? 'bg-blue-50 border-blue-500'
								: 'bg-white border-gray-200'
						} border-2`}
					>
						<h4 className="font-medium">{design.name}</h4>
						<p className="text-blue-600">${design.price}</p>
					</div>
				))}
			</div>
		</div>
	);
}
