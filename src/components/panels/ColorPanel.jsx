// src/components/panels/ColorPanel.jsx

import { ColorPicker, Slider } from 'antd';

export function ColorPanel({ selectedColor, setSelectedColor, colorPresets }) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-medium">Color & Material</h3>
			<div className="grid grid-cols-3 gap-4">
				{colorPresets.map((color) => (
					<div
						key={color.id}
						onClick={() => setSelectedColor(color)}
						className="text-center"
					>
						<div
							className={`w-12 h-12 rounded-full mx-auto border-2 ${
								selectedColor.id === color.id
									? 'border-blue-500'
									: 'border-gray-200'
							}`}
							style={{ backgroundColor: color.hex }}
						/>
						<span className="text-sm mt-1">{color.name}</span>
					</div>
				))}
			</div>
			<div>
				<label className="block text-sm font-medium mb-2">Custom Color</label>
				<ColorPicker
					value={selectedColor.hex}
					onChange={(color) =>
						setSelectedColor((prev) => ({ ...prev, hex: color.toHexString() }))
					}
					className="w-full"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium mb-2">Metalness</label>
				<Slider
					value={selectedColor.metalness}
					onChange={(value) =>
						setSelectedColor((prev) => ({ ...prev, metalness: value }))
					}
					min={0}
					max={1}
					step={0.1}
				/>
			</div>
			<div>
				<label className="block text-sm font-medium mb-2">Roughness</label>
				<Slider
					value={selectedColor.roughness}
					onChange={(value) =>
						setSelectedColor((prev) => ({ ...prev, roughness: value }))
					}
					min={0}
					max={1}
					step={0.1}
				/>
			</div>
		</div>
	);
}
