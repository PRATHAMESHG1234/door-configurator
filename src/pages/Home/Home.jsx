import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';
import {
	CheckCircleOutlined,
	GlobalOutlined,
	ToolOutlined,
	TeamOutlined,
	MobileOutlined,
	DollarOutlined,
	DashboardOutlined,
	ArrowUpOutlined,
} from '@ant-design/icons';
import KonfiguratorPreview from '../../assets/images/konfigurator-preview.png';
import ProKonfigurator from '../../assets/images/pro-konfigurator.png';

const FeaturePoint = ({ text, subtext }) => (
	<div
		className="feature-point py-6 px-4"
		data-aos="fade-up"
	>
		<div className="feature-icon">
			<CheckCircleOutlined className="text-2xl" />
		</div>
		<div>
			<span className="font-medium text-lg">{text}</span>
			{subtext && <span className="text-gray-700 ml-1">{subtext}</span>}
		</div>
	</div>
);

const ProcessStep = ({ number, title, description }) => (
	<div
		className="process-step min-h-[280px]"
		data-aos="fade-up"
	>
		<div className="step-number mb-8">{number}</div>
		<h3 className="text-2xl font-semibold mb-6">{title}</h3>
		<p className="text-gray-600 leading-relaxed">{description}</p>
	</div>
);

const AdvantageCard = ({ icon, title, description }) => (
	<div
		className="advantage-card py-8 px-6"
		data-aos="fade-up"
	>
		<div className="advantage-icon text-5xl mb-6">{icon}</div>
		<h3 className="text-xl font-semibold mb-4">{title}</h3>
		<p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
			{description}
		</p>
	</div>
);

const Home = () => {
	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
			offset: 100,
		});
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className="landing-page">
			{/* Header */}
			<header className="main-header py-3 border-b border-gray-100">
				<div className="max-w-7xl mx-auto px-8 flex justify-end items-center space-x-8">
					<span className="hover:opacity-80 transition-opacity">
						E: info@door-konfigurator.com
					</span>
					<span className="hover:opacity-80 transition-opacity">
						T: +386 (0)590 48068
					</span>
					<select className="language-select">
						<option value="en">EN</option>
					</select>
				</div>
			</header>

			<main>
				{/* Hero Section */}
				<section className="hero-section py-24">
					<div className="hero-overlay"></div>
					<div className="max-w-7xl mx-auto px-8 relative z-10">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
							<div
								className="hero-content"
								data-aos="fade-right"
							>
								<h1 className="hero-title text-7xl mb-12">
									Door <span className="font-thin">Konfigurator</span>
								</h1>
								<p className="hero-description text-lg leading-relaxed mb-10 opacity-90">
									Simplify the long-term inquiry processes. The door
									Konfigurator presents customers and business partners with
									your entire offer of current products. They can customize the
									door on their own, while you save time and energy.
								</p>
								<p className="hero-tagline text-2xl mb-12">
									Open the door to new business opportunities!
								</p>
								<button className="demo-button">TRY OUR FREE DEMO</button>
							</div>
							<div
								className="hero-image-container"
								data-aos="fade-left"
							>
								<img
									src={KonfiguratorPreview}
									alt="Konfigurator Preview"
									className="hero-image rounded-lg shadow-2xl"
								/>
								<div className="hero-decoration"></div>
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="features-section py-16">
					<div className="max-w-7xl mx-auto px-8">
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
							<FeaturePoint
								text="Simplified"
								subtext="inquiry process"
							/>
							<FeaturePoint
								text="Visualization"
								subtext="of the final product before purchase"
							/>
							<FeaturePoint
								text="Always an up-to-date"
								subtext="offer"
							/>
							<FeaturePoint
								text="Reliable"
								subtext="and secure application"
							/>
						</div>
					</div>
				</section>

				{/* Process Section */}
				<section className="process-section py-24 bg-gray-50">
					<div className="max-w-7xl mx-auto px-8">
						<h2
							className="section-title text-4xl mb-8"
							data-aos="fade-up"
						>
							Streamline your{' '}
							<span className="text-highlight">sales process</span>
						</h2>
						<p
							className="section-description max-w-3xl mx-auto mb-16"
							data-aos="fade-up"
						>
							The door Konfigurator displays all possible doorway combinations
							that your business offers. The customer creates a product that is
							tailored to their needs and shortens your steps towards the final
							order.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
							<ProcessStep
								number="1"
								title="On the Web"
								description="The Konfigurator is accessible through a unique online connection."
							/>
							<ProcessStep
								number="2"
								title="Appearance customization"
								description="Choosing and combining any elements that your business offers. Every choice and change is visually presented."
							/>
							<ProcessStep
								number="3"
								title="Straightforward inquiry process"
								description="The customer sends you an inquiry for the selected product, or saves their wishes as a PDF document."
							/>
						</div>
					</div>
				</section>

				{/* Business Partners Section */}
				<section className="partners-section py-24">
					<div className="max-w-7xl mx-auto px-8">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
							<div
								className="partners-content space-y-8"
								data-aos="fade-right"
							>
								<h2 className="section-title !text-left text-5xl">
									For your{' '}
									<span className="font-normal">business partners</span>
								</h2>
								<p className="text-xl">
									Do you need a Konfigurator for your business partners only?
								</p>
								<p className="font-bold text-xl">We have a solution for you.</p>
								<p className="text-lg leading-relaxed opacity-90">
									The advanced door Konfigurator is designed for professional
									users, such as manufacturers, marketers and distributors. The
									application intuitively leads your partner through the
									ordering process; consequently, the formed orders are accurate
									and error-free.
								</p>
								<button className="learn-more-button mt-8">
									LEARN MORE ABOUT THE PRO KONFIGURATOR
								</button>
							</div>
							<div
								className="partners-image"
								data-aos="fade-left"
							>
								<img
									src={ProKonfigurator}
									alt="Pro Konfigurator"
									className="rounded-lg shadow-2xl"
								/>
							</div>
						</div>
					</div>
				</section>

				{/* Advantages Section */}
				<section className="advantages-section py-24">
					<div className="max-w-7xl mx-auto px-8">
						<h2
							className="section-title text-4xl mb-16"
							data-aos="fade-up"
						>
							More than just a{' '}
							<span className="text-highlight">digital catalog</span>
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12">
							<AdvantageCard
								icon={<ToolOutlined />}
								title="In-house development"
								description="Experienced IT professionals take care of the development and regular updates of your Konfigurator."
							/>
							<AdvantageCard
								icon={<TeamOutlined />}
								title="Building a business network"
								description="The application can be used by your end customers, or you can share it with your business partners and representatives."
							/>
							<AdvantageCard
								icon={<GlobalOutlined />}
								title="Web application"
								description="The Konfigurator is located online, therefore hardware or software installations are not required."
							/>
							<AdvantageCard
								icon={<MobileOutlined />}
								title="Support for mobile devices"
								description="The user can access the Konfigurator on any computer or mobile device."
							/>
							<AdvantageCard
								icon={<DollarOutlined />}
								title="Affordable"
								description="Each Konfigurator is developed from a common platform, making it more affordable."
							/>
							<AdvantageCard
								icon={<DashboardOutlined />}
								title="Quick updates"
								description="As the content of each Konfigurator is regularly updated, your partners and end customers are always up to date with your offer."
							/>
						</div>
						<div className="text-center mt-16">
							<button className="more-advantages-button">
								MORE ADVANTAGES
							</button>
						</div>
					</div>
				</section>

				{/* Contact Section */}
				<section className="contact-section py-20 bg-gray-50">
					<div className="max-w-7xl mx-auto px-8 text-center">
						<h2 className="section-title text-4xl mb-6">
							Are you planning something special?
						</h2>
						<p className="section-description mb-10">
							We will create a Konfigurator that will deal with your vision.
						</p>
						<button className="inquiry-button">SEND INQUIRY</button>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="main-footer border-t border-gray-200 py-12">
				<div className="max-w-7xl mx-auto px-8">
					<div className="footer-content justify-between">
						<div className="company-info text-gray-600">
							<p>Vizualis d.o.o. Ljubljanska cesta 89, SI - 8000 Novo mesto</p>
						</div>
						<nav className="footer-nav gap-8">
							{[
								'ABOUT US',
								'CONTACT',
								'FAQ',
								'INQUIRY',
								'GENERAL TERMS',
								'PRIVACY POLICY',
								'COOKIES',
							].map((item) => (
								<Link
									key={item}
									to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
									className="footer-link text-gray-600"
								>
									{item}
								</Link>
							))}
						</nav>
					</div>
				</div>
			</footer>

			<button
				onClick={scrollToTop}
				className="scroll-to-top"
			>
				<ArrowUpOutlined />
			</button>
		</div>
	);
};

export default Home;
