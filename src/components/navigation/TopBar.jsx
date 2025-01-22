export function TopBar({ onSave, onLoad, onExport }) {
	return (
		<div className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
			<div className="flex items-center space-x-4">
				<h1 className="text-xl font-semibold">Door Configurator</h1>
				<div className="h-6 w-px bg-gray-200" />
				<div className="space-x-2">
					<button
						onClick={onSave}
						className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
					>
						Save
					</button>
					<button
						onClick={onLoad}
						className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
					>
						Load
					</button>
					<button
						onClick={onExport}
						className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
					>
						Export
					</button>
				</div>
			</div>
			<div className="flex items-center space-x-4">
				<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
					Share
				</button>
			</div>
		</div>
	);
}
