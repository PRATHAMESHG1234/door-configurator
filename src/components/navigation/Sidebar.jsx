import React from 'react';

export function Sidebar({ activeSidebar, setActiveSidebar }) {
	return (
		<div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
			<div className="space-y-2">
				<button
					onClick={() => setActiveSidebar('design')}
					className={`w-full p-2 text-left rounded ${
						activeSidebar === 'design'
							? 'bg-blue-50 text-blue-600'
							: 'hover:bg-gray-100'
					}`}
				>
					Design
				</button>
				<button
					onClick={() => setActiveSidebar('color')}
					className={`w-full p-2 text-left rounded ${
						activeSidebar === 'color'
							? 'bg-blue-50 text-blue-600'
							: 'hover:bg-gray-100'
					}`}
				>
					Color & Material
				</button>
				<button
					onClick={() => setActiveSidebar('handle')}
					className={`w-full p-2 text-left rounded ${
						activeSidebar === 'handle'
							? 'bg-blue-50 text-blue-600'
							: 'hover:bg-gray-100'
					}`}
				>
					Handle
				</button>
			</div>
		</div>
	);
}
