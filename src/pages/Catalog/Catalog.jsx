// src/pages/Catalog.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
	SearchOutlined,
	FilterOutlined,
	SortAscendingOutlined,
	ArrowRightOutlined,
	CloseOutlined,
} from '@ant-design/icons';
import {
	doorData,
	categories,
	features,
	priceRanges,
} from '../../data/doorData';
import './Catalog.css';

const DoorCard = ({ door }) => {
	const [showBackImage, setShowBackImage] = useState(false);
	const navigate = useNavigate();

	return (
		<div
			className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
			data-aos="fade-up"
		>
			<div className="relative group">
				<img
					src={showBackImage ? door.images.back : door.images.front}
					alt={door.name}
					className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
					onMouseEnter={() => setShowBackImage(true)}
					onMouseLeave={() => setShowBackImage(false)}
				/>
				<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
					<div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
				</div>
			</div>
			<div className="p-6">
				<div className="flex justify-between items-start mb-4">
					<h3 className="text-xl font-semibold">{door.name}</h3>
					<span className="text-sm bg-[#8C285D] text-white px-3 py-1 rounded-full">
						{door.category}
					</span>
				</div>
				<p className="text-gray-600 mb-4 line-clamp-2">{door.description}</p>
				<div className="space-y-2">
					{door.features.map((feature, index) => (
						<div
							key={index}
							className="flex items-center text-sm text-gray-500"
						>
							<span className="w-1.5 h-1.5 bg-[#8C285D] rounded-full mr-2"></span>
							{feature}
						</div>
					))}
				</div>
				<div className="mt-4 pt-4 border-t flex justify-between items-center">
					<span className="text-[#8C285D] font-semibold">
						€{door.price.toLocaleString()}
					</span>
					<button className="text-[#8C285D] hover:text-[#A0436B] transition-colors">
						Learn More <ArrowRightOutlined className="ml-1" />
					</button>
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
			{/* Categories */}
			<div>
				<h4 className="font-medium mb-3">Door Type</h4>
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

			{/* Features */}
			<div>
				<h4 className="font-medium mb-3">Features</h4>
				<div className="space-y-2">
					{features.map((feature) => (
						<label
							key={feature}
							className="flex items-center cursor-pointer"
						>
							<input
								type="checkbox"
								checked={selectedFilters.features.includes(feature)}
								onChange={() => onFilterChange('features', feature)}
								className="w-4 h-4 rounded border-2 border-gray-300 
                checked:bg-[#8C285D] checked:border-[#8C285D] 
                focus:ring-2 focus:ring-[#8C285D] focus:ring-opacity-50 
                transition-colors duration-200"
							/>
							<span className="ml-2">{feature}</span>
						</label>
					))}
				</div>
			</div>

			{/* Price Ranges */}
			<div>
				<h4 className="font-medium mb-3">Price Range</h4>
				<div className="space-y-2">
					{priceRanges.map(({ id, label, range }) => (
						<label
							key={id}
							className="flex items-center cursor-pointer"
						>
							<input
								type="checkbox"
								checked={selectedFilters.priceRanges.includes(id)}
								onChange={() => onFilterChange('priceRanges', id)}
								className="w-4 h-4 rounded border-2 border-gray-300 
                checked:bg-[#8C285D] checked:border-[#8C285D] 
                focus:ring-2 focus:ring-[#8C285D] focus:ring-opacity-50 
                transition-colors duration-200"
							/>
							<span className="ml-2">
								{label} (€{range[0].toLocaleString()} - €
								{range[1].toLocaleString()})
							</span>
						</label>
					))}
				</div>
			</div>
		</div>
	</div>
);

const Catalog = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedFilters, setSelectedFilters] = useState({
		categories: [],
		features: [],
		priceRanges: [],
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
			features: [],
			priceRanges: [],
		});
	};

	const getFilteredDoors = () => {
		return doorData.filter((door) => {
			// Search term filter
			if (
				searchTerm &&
				!door.name.toLowerCase().includes(searchTerm.toLowerCase())
			) {
				return false;
			}

			// Category filter
			if (
				selectedFilters.categories.length > 0 &&
				!selectedFilters.categories.includes(door.category)
			) {
				return false;
			}

			// Features filter
			if (
				selectedFilters.features.length > 0 &&
				!selectedFilters.features.some((feature) =>
					door.features.includes(feature)
				)
			) {
				return false;
			}

			// Price range filter
			if (selectedFilters.priceRanges.length > 0) {
				const matchesPrice = selectedFilters.priceRanges.some((rangeId) => {
					const range = priceRanges.find((r) => r.id === rangeId)?.range;
					return range && door.price >= range[0] && door.price <= range[1];
				});
				if (!matchesPrice) return false;
			}

			return true;
		});
	};

	const filteredDoors = getFilteredDoors();

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
								<option value="price-asc">Price: Low to High</option>
								<option value="price-desc">Price: High to Low</option>
								<option value="name">Name</option>
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
						Can&apos;t find what you&apos;re looking for?
					</h2>
					<p
						className="text-gray-600 mb-8 max-w-2xl mx-auto"
						data-aos="fade-up"
					>
						Let us help you create the perfect door for your needs. Our team is
						ready to assist you with custom configurations.
					</p>
					<button
						className="bg-[#8C285D] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300"
						data-aos="fade-up"
					>
						Contact Our Team
					</button>
				</div>
			</section>
		</div>
	);
};

export default Catalog;
