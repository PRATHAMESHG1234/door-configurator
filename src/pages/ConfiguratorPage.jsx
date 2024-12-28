// src/components/DoorConfigurator.jsx
import { useState } from 'react';
import { doorData } from '../data/doorData';
import { colorPresets } from '../data/colorPresets';
import { handleStyles } from '../data/handleStyles';
import { Sidebar } from '../components/navigation/Sidebar';
import { Scene } from '../components/3d/Scene';
import { DesignPanel } from '../components/panels/DesignPanel';
import { ColorPanel } from '../components/panels/ColorPanel';
import { HandlePanel } from '../components/panels/HandlePanel';

function DoorConfigurator() {
	const [selectedDoor, setSelectedDoor] = useState(doorData[0]);
	const [selectedColor, setSelectedColor] = useState(colorPresets[0]);
	const [handleStyle, setHandleStyle] = useState(handleStyles[0]);
	const [activeSidebar, setActiveSidebar] = useState('design');

	const totalPrice = () => {
		return selectedDoor.price + handleStyle.price;
	};

	return (
		<div className="h-screen flex">
			<Sidebar
				activeSidebar={activeSidebar}
				setActiveSidebar={setActiveSidebar}
			/>

			<div className="flex-1 flex">
				{/* 3D Viewer Section */}
				<div className="flex-1 relative">
					<div
						className="absolute inset-0 bg-white"
						style={{
							backgroundImage: `radial-gradient(circle at 1px 1px, rgb(226, 232, 240) 1px, transparent 0)`,
							backgroundSize: '24px 24px',
						}}
					/>
					<div className="absolute inset-0">
						<Scene
							door={selectedDoor} // Pass the selected door data
							color={selectedColor}
							handleStyle={handleStyle}
						/>
					</div>
				</div>

				{/* Right Configuration Panel */}
				<div className="w-80 bg-white border-l border-gray-200 flex flex-col">
					{/* Scrollable Content Area */}
					<div className="flex-1 overflow-y-auto">
						<div className="p-6">
							{activeSidebar === 'design' && (
								<DesignPanel
									selectedDesign={selectedDoor}
									setSelectedDesign={setSelectedDoor}
									doorDesigns={doorData} // Use doorData here
								/>
							)}
							{activeSidebar === 'color' && (
								<ColorPanel
									selectedColor={selectedColor}
									setSelectedColor={setSelectedColor}
									colorPresets={colorPresets}
								/>
							)}
							{activeSidebar === 'handle' && (
								<HandlePanel
									handleStyle={handleStyle}
									setHandleStyle={setHandleStyle}
									handleStyles={handleStyles}
								/>
							)}
						</div>
					</div>

					{/* Fixed Footer */}
					<div className="flex-shrink-0 border-t border-gray-200 bg-white p-6">
						<div className="flex justify-between items-center mb-4">
							<span className="font-medium">Total Price:</span>
							<span className="text-xl font-bold text-blue-600">
								${totalPrice()}
							</span>
						</div>
						<button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
							Proceed to Checkout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DoorConfigurator;
