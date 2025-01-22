export function Sidebar({ activeSidebar, setActiveSidebar, items }) {
	return (
		<div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
			<div className="space-y-2">
				{items.map((item) => (
					<button
						key={item.id}
						onClick={() => setActiveSidebar(item.id)}
						className={`
                            w-full p-3 text-left rounded-lg transition-colors
                            ${
															activeSidebar === item.id
																? 'bg-blue-50 text-blue-600 font-medium'
																: 'text-gray-600 hover:bg-gray-100'
														}
                        `}
					>
						<span className="flex items-center">
							{item.icon && <item.icon className="w-5 h-5 mr-2" />}
							{item.label}
						</span>
					</button>
				))}
			</div>
		</div>
	);
}
