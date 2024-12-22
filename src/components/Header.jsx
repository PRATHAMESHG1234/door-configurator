import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer } from 'antd';
import {
	MenuOutlined,
	HomeOutlined,
	AppstoreOutlined,
	ToolOutlined,
	FileTextOutlined,
	SettingOutlined,
	PhoneOutlined,
	MailOutlined,
	FacebookOutlined,
	TwitterOutlined,
	InstagramOutlined,
	LinkedinOutlined,
} from '@ant-design/icons';

const NavLink = ({ to, icon, children }) => {
	const location = useLocation();
	const isActive = location.pathname === to;

	return (
		<Link
			to={to}
			className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
				isActive
					? 'text-blue-600 bg-blue-50'
					: 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
			}`}
		>
			{icon && <span className="mr-2">{icon}</span>}
			{children}
		</Link>
	);
};

export const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navItems = [
		{ to: '/', label: 'Home', icon: <HomeOutlined /> },
		{ to: '/catalog', label: 'Catalog', icon: <AppstoreOutlined /> },
		{ to: '/configurator', label: 'Configurator', icon: <ToolOutlined /> },
		{
			to: '/quote-request',
			label: 'Quote Request',
			icon: <FileTextOutlined />,
		},
	];

	return (
		<header className="bg-white shadow-sm sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link
						to="/"
						className="flex items-center space-x-2"
					>
						<SettingOutlined className="text-2xl text-blue-600" />
						<span className="text-xl font-bold text-gray-900">DoorConfig</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-4">
						{navItems.map((item) => (
							<NavLink
								key={item.to}
								to={item.to}
								icon={item.icon}
							>
								{item.label}
							</NavLink>
						))}
					</nav>

					{/* Mobile Menu Button */}
					<Button
						icon={<MenuOutlined />}
						className="md:hidden"
						onClick={() => setMobileMenuOpen(true)}
					/>

					{/* Mobile Menu Drawer */}
					<Drawer
						title="Menu"
						placement="right"
						onClose={() => setMobileMenuOpen(false)}
						open={mobileMenuOpen}
						width={280}
					>
						<div className="flex flex-col space-y-2">
							{navItems.map((item) => (
								<NavLink
									key={item.to}
									to={item.to}
									icon={item.icon}
									onClick={() => setMobileMenuOpen(false)}
								>
									{item.label}
								</NavLink>
							))}
						</div>
					</Drawer>
				</div>
			</div>
		</header>
	);
};

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer
			className="bg-gray-900 text-gray-300"
			style={{ zIndex: 10000 }}
		>
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Company Info */}
					<div>
						<h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
						<p className="text-gray-400">
							Creating perfect doors with advanced 3D configuration technology
							for your unique needs.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold text-white mb-4">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/catalog"
									className="hover:text-blue-400 transition-colors"
								>
									Door Catalog
								</Link>
							</li>
							<li>
								<Link
									to="/configurator"
									className="hover:text-blue-400 transition-colors"
								>
									Door Configurator
								</Link>
							</li>
							<li>
								<Link
									to="/quote-request"
									className="hover:text-blue-400 transition-colors"
								>
									Request Quote
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="text-lg font-semibold text-white mb-4">
							Contact Us
						</h3>
						<ul className="space-y-2">
							<li className="flex items-center">
								<PhoneOutlined className="mr-2" />
								<span>(555) 123-4567</span>
							</li>
							<li className="flex items-center">
								<MailOutlined className="mr-2" />
								<span>info@doorconfig.com</span>
							</li>
						</ul>
					</div>

					{/* Social Links */}
					<div>
						<h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
						<div className="flex space-x-4">
							<a
								href="#"
								className="hover:text-blue-400 text-xl transition-colors"
							>
								<FacebookOutlined />
							</a>
							<a
								href="#"
								className="hover:text-blue-400 text-xl transition-colors"
							>
								<TwitterOutlined />
							</a>
							<a
								href="#"
								className="hover:text-blue-400 text-xl transition-colors"
							>
								<InstagramOutlined />
							</a>
							<a
								href="#"
								className="hover:text-blue-400 text-xl transition-colors"
							>
								<LinkedinOutlined />
							</a>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-12 pt-8 border-t border-gray-800 text-center">
					<p>© {currentYear} Door Configurator. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

// You can export both components as named exports
export default { Header, Footer };
