import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
	SearchOutlined,
	FilterOutlined,
	ArrowRightOutlined,
	CloseOutlined,
} from '@ant-design/icons';
import { useDoorConfiguration } from '../../hooks/useDoorConfiguration';

// Assuming you'll define these categories based on your data
const categories = ['L Series', 'M Series', 'Z Series'];
const priceRanges = [
	{ id: 'budget', label: 'Budget', range: [0, 1000] },
	{ id: 'mid', label: 'Mid-Range', range: [1001, 2000] },
	{ id: 'premium', label: 'Premium', range: [2001, 5000] },
];

const DoorCard = ({ door }) => {
	const [hoveredColor, setHoveredColor] = useState(null);

	// Get the first color variant image URL or main image as fallback
	const mainImageUrl = door.main_image_url;
	const firstColorVariant = door.color_variants[door.available_colors[0]];
	const textureImageUrl = firstColorVariant?.image_url || mainImageUrl;

	return (
		<div
			className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
			data-aos="fade-up"
		>
			<div className="relative group">
				<img
					src={hoveredColor ? textureImageUrl : mainImageUrl}
					alt={door.name}
					className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
					onMouseEnter={() => setHoveredColor(true)}
					onMouseLeave={() => setHoveredColor(false)}
				/>
				<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
					<div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
				</div>
			</div>
			<div className="p-6">
				<div className="flex justify-between items-start mb-4">
					<h3 className="text-xl font-semibold">{door.name}</h3>
					<span className="text-sm bg-[#8C285D] text-white px-3 py-1 rounded-full">
						{door.name.charAt(0)} Series
					</span>
				</div>
				<p className="text-gray-600 mb-4 line-clamp-2">{door.description}</p>
				<div className="space-y-2">
					<div className="flex flex-wrap gap-2">
						{door.available_colors.slice(0, 5).map((colorCode) => (
							<span
								key={colorCode}
								className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded"
							>
								{colorCode}
							</span>
						))}
						{door.available_colors.length > 5 && (
							<span className="text-sm text-gray-500">
								+{door.available_colors.length - 5} more
							</span>
						)}
					</div>
				</div>
				<div className="mt-4 pt-4 border-t flex justify-between items-center">
					<Link
						to={`/configurator/${door.id}`}
						className="text-[#8C285D] hover:text-[#A0436B] transition-colors"
					>
						Configure <ArrowRightOutlined className="ml-1" />
					</Link>
				</div>
			</div>
		</div>
	);
};

const FilterSection = ({
	selectedFilters,
	onFilterChange,
	onFilterClear,
	className,
}) => (
	<div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
		<div className="flex justify-between items-center mb-6">
			<h3 className="text-lg font-semibold flex items-center">
				<FilterOutlined className="mr-2" /> Filters
			</h3>
			{Object.values(selectedFilters).some((arr) => arr.length > 0) && (
				<button
					onClick={onFilterClear}
					className="text-sm text-gray-500 hover:text-[#8C285D] transition-colors"
				>
					Clear All
				</button>
			)}
		</div>

		<div className="space-y-8">
			{/* Series Filter */}
			<div>
				<h4 className="font-medium mb-3">Door Series</h4>
				<div className="space-y-2">
					{categories.map((category) => (
						<label
							key={category}
							className="flex items-center cursor-pointer"
						>
							<input
								type="checkbox"
								checked={selectedFilters.categories.includes(category)}
								onChange={() => onFilterChange('categories', category)}
								className="w-4 h-4 rounded border-2 border-gray-300 
                  checked:bg-[#8C285D] checked:border-[#8C285D] 
                  focus:ring-2 focus:ring-[#8C285D] focus:ring-opacity-50 
                  transition-colors duration-200"
							/>
							<span className="ml-2 text-gray-700">{category}</span>
						</label>
					))}
				</div>
			</div>
		</div>
	</div>
);

const Catalog = () => {
	const { doors, loading, error } = useDoorConfiguration();
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedFilters, setSelectedFilters] = useState({
		categories: [],
	});
	const [sortOrder, setSortOrder] = useState('featured');
	const [showMobileFilters, setShowMobileFilters] = useState(false);

	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
			offset: 100,
		});
	}, []);

	const handleFilterChange = (filterType, value) => {
		setSelectedFilters((prev) => ({
			...prev,
			[filterType]: prev[filterType].includes(value)
				? prev[filterType].filter((item) => item !== value)
				: [...prev[filterType], value],
		}));
	};

	const clearFilters = () => {
		setSelectedFilters({
			categories: [],
		});
	};

	const getFilteredDoors = () => {
		if (loading || error) return [];

		return doors.filter((door) => {
			// Search term filter
			if (
				searchTerm &&
				!door.name.toLowerCase().includes(searchTerm.toLowerCase())
			) {
				return false;
			}

			// Category filter
			if (selectedFilters.categories.length > 0) {
				const doorSeries = `${door.name.charAt(0)} Series`;
				if (!selectedFilters.categories.includes(doorSeries)) {
					return false;
				}
			}

			return true;
		});
	};

	const filteredDoors = getFilteredDoors();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C285D] mx-auto mb-4"></div>
					<p className="text-gray-600">Loading doors...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center text-red-600">
					<p>{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="mt-4 bg-[#8C285D] text-white px-4 py-2 rounded"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="bg-[#8C285D] text-white py-20">
				<div className="max-w-7xl mx-auto px-8">
					<div
						className="max-w-3xl"
						data-aos="fade-right"
					>
						<h1 className="text-5xl font-light mb-6">Door Catalog</h1>
						<p className="text-xl opacity-90">
							Explore our collection of premium doors. Each design combines
							aesthetics with functionality to meet your specific needs.
						</p>
					</div>
				</div>
			</section>

			{/* Search and Filter Bar */}
			<div className="sticky top-0 bg-white border-b z-40 py-4 shadow-sm">
				<div className="max-w-7xl mx-auto px-8">
					<div className="flex items-center justify-between">
						<div className="flex items-center flex-1 max-w-md">
							<div className="relative w-full">
								<input
									type="text"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									placeholder="Search doors..."
									className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#8C285D] focus:ring-1 focus:ring-[#8C285D] outline-none"
								/>
								<SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<select
								value={sortOrder}
								onChange={(e) => setSortOrder(e.target.value)}
								className="border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-[#8C285D]"
							>
								<option value="featured">Featured</option>
								<option value="name-asc">Name: A to Z</option>
								<option value="name-desc">Name: Z to A</option>
							</select>
							<button
								onClick={() => setShowMobileFilters(true)}
								className="md:hidden bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
							>
								<FilterOutlined />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-8 py-12">
				<div className="flex gap-8">
					{/* Desktop Filters */}
					<FilterSection
						className="w-64 hidden md:block sticky top-24 h-fit"
						selectedFilters={selectedFilters}
						onFilterChange={handleFilterChange}
						onFilterClear={clearFilters}
					/>

					{/* Mobile Filters */}
					{showMobileFilters && (
						<div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
							<div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
								<div className="flex justify-between items-center mb-6">
									<h3 className="text-lg font-semibold">Filters</h3>
									<button
										onClick={() => setShowMobileFilters(false)}
										className="text-gray-500 hover:text-gray-700"
									>
										<CloseOutlined />
									</button>
								</div>
								<FilterSection
									selectedFilters={selectedFilters}
									onFilterChange={handleFilterChange}
									onFilterClear={clearFilters}
								/>
							</div>
						</div>
					)}

					{/* Door Grid */}
					<div className="flex-1">
						{filteredDoors.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								{filteredDoors.map((door) => (
									<DoorCard
										key={door.id}
										door={door}
									/>
								))}
							</div>
						) : (
							<div className="text-center py-12">
								<p className="text-gray-500">
									No doors found matching your criteria.
								</p>
							</div>
						)}
					</div>
				</div>
			</main>

			{/* Call to Action */}
			<section className="bg-gray-50 border-t py-20">
				<div className="max-w-7xl mx-auto px-8 text-center">
					<h2
						className="text-3xl font-semibold mb-6"
						data-aos="fade-up"
					>
						Can't find what you're looking for?
					</h2>
					<p
						className="text-gray-600 mb-8 max-w-2xl mx-auto"
						data-aos="fade-up"
					>
						Let us help you create the perfect door for your needs. Our team is
						ready to assist you with custom configurations.
					</p>
					<Link
						to="/contact"
						className="inline-block bg-[#8C285D] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300"
						data-aos="fade-up"
					>
						Contact Our Team
					</Link>
				</div>
			</section>
		</div>
	);
};

export default Catalog;
