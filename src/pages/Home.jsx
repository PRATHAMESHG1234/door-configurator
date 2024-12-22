import React from 'react';
import { Button, Menu } from 'antd';
import {
	RightOutlined,
	ToolOutlined,
	SafetyCertificateOutlined,
	CustomerServiceOutlined,
	HomeOutlined,
	SettingOutlined,
	InfoCircleOutlined,
	ContactsOutlined,
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description }) => (
	<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
		<div className="text-blue-600 text-2xl mb-4">{icon}</div>
		<h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
		<p className="text-gray-600">{description}</p>
	</div>
);

const Home = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Navigation */}

			{/* Hero Section */}
			<div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
				<div className="max-w-6xl mx-auto px-4 py-16">
					<div className="text-center">
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							Design Your Perfect Door
						</h1>
						<p className="text-xl md:text-2xl mb-8 text-blue-100">
							Customize every detail of your door with our advanced 3D
							configurator
						</p>
						<Button
							type="primary"
							size="large"
							className="h-12 px-8 inline-flex items-center"
							ghost
							onClick={() => navigate('/configurator')}
						>
							Start Configuring <RightOutlined className="ml-2" />
						</Button>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className="max-w-6xl mx-auto px-4 py-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
					Why Choose Our Configurator?
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<FeatureCard
						icon={<ToolOutlined />}
						title="Easy Customization"
						description="Intuitive interface to customize every aspect of your door design with real-time preview"
					/>
					<FeatureCard
						icon={<SafetyCertificateOutlined />}
						title="Quality Guaranteed"
						description="Premium materials and professional craftsmanship for lasting durability"
					/>
					<FeatureCard
						icon={<CustomerServiceOutlined />}
						title="Expert Support"
						description="Our team is here to help you make the perfect choice for your needs"
					/>
				</div>
			</div>

			{/* CTA Section */}
			<div className="bg-gray-100 py-16">
				<div className="max-w-4xl mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4 text-gray-800">
						Ready to Create Your Dream Door?
					</h2>
					<p className="text-xl text-gray-600 mb-8">
						Start your design journey today and transform your entrance
					</p>
					<Button
						type="primary"
						size="large"
						className="h-12 px-8"
						onClick={() => navigate('/configurator')}
					>
						Begin Configuration
					</Button>
				</div>
			</div>

			{/* Footer */}
			<footer className="bg-white py-8 border-t">
				<div className="max-w-6xl mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
						<div>
							<h4 className="text-lg font-semibold mb-4">About</h4>
							<p className="text-gray-600">
								Creating perfect doors with advanced 3D configuration
								technology.
							</p>
						</div>
						<div>
							<h4 className="text-lg font-semibold mb-4">Quick Links</h4>
							<ul className="space-y-2">
								<li>
									<Link
										to="/configurator"
										className="text-gray-600 hover:text-blue-600"
									>
										Configurator
									</Link>
								</li>
								<li>
									<Link
										to="/about"
										className="text-gray-600 hover:text-blue-600"
									>
										About Us
									</Link>
								</li>
								<li>
									<Link
										to="/contact"
										className="text-gray-600 hover:text-blue-600"
									>
										Contact
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="text-lg font-semibold mb-4">Support</h4>
							<ul className="space-y-2">
								<li>
									<Link
										to="/faq"
										className="text-gray-600 hover:text-blue-600"
									>
										FAQ
									</Link>
								</li>
								<li>
									<Link
										to="/privacy"
										className="text-gray-600 hover:text-blue-600"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										to="/terms"
										className="text-gray-600 hover:text-blue-600"
									>
										Terms of Service
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="text-lg font-semibold mb-4">Contact</h4>
							<p className="text-gray-600">Email: info@doorconfig.com</p>
							<p className="text-gray-600">Phone: (555) 123-4567</p>
						</div>
					</div>
					<div className="text-center text-gray-600 pt-8 border-t">
						<p>© 2024 Door Configurator. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Home;
