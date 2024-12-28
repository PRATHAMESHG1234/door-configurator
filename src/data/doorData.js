// Import door images
import door13_14 from '../assets/doors/13-14.jpg';
import door15_16 from '../assets/doors/15-16.jpg';
import door17_18 from '../assets/doors/17-18.jpg';
import door19_20 from '../assets/doors/19-20.jpg';
import door21_22 from '../assets/doors/21-22.jpg';
import door23_24 from '../assets/doors/23-24.jpg';
import door25_26 from '../assets/doors/25-26.jpg';
import door27_28 from '../assets/doors/27-28.jpg';
import door29_30 from '../assets/doors/29-30.jpg';
import door33_34 from '../assets/doors/33-34.jpg';
import door35_36 from '../assets/doors/35-36.jpg';
import door101_102 from '../assets/doors/101-102.jpg';
import door103_104 from '../assets/doors/103-104.jpg';
import door105_106 from '../assets/doors/105-106.jpg';
import door107_108 from '../assets/doors/107-108.jpg';

// Door data
export const doorData = [
	{
		id: '13-14',
		name: 'Modern Line HA13',
		category: 'Modern',
		images: {
			front: door13_14,
			back: door13_14,
		},
		description:
			'Contemporary design with clean lines and minimalist aesthetics',
		features: ['Thermal Insulation', 'Sound Protection', 'Security Features'],
		price: 1500,
		priceCategory: 'Standard',
	},
	{
		id: '15-16',
		name: 'Modern Line HA15',
		category: 'Modern',
		images: {
			front: door15_16,
			back: door15_16,
		},
		description: 'Sleek modern design with premium finish',
		features: ['Weather Resistant', 'Enhanced Security', 'Modern Hardware'],
		price: 2200,
		priceCategory: 'Premium',
	},
	{
		id: '17-18',
		name: 'Modern Line HA17',
		category: 'Modern',
		images: {
			front: door17_18,
			back: door17_18,
		},
		description: 'Elegant modern design with superior insulation',
		features: ['Premium Finish', 'Sound Insulation', 'Weather Protection'],
		price: 2400,
		priceCategory: 'Premium',
	},
	{
		id: '19-20',
		name: 'Classic Line HA19',
		category: 'Classic',
		images: {
			front: door19_20,
			back: door19_20,
		},
		description: 'Traditional design with modern security features',
		features: ['Classic Style', 'Enhanced Security', 'Thermal Protection'],
		price: 1800,
		priceCategory: 'Standard',
	},
	{
		id: '21-22',
		name: 'Modern Line HA21',
		category: 'Modern',
		images: {
			front: door21_22,
			back: door21_22,
		},
		description: 'Contemporary style with advanced security',
		features: ['Smart Lock Compatible', 'Sound Protection', 'Modern Design'],
		price: 2600,
		priceCategory: 'Premium',
	},
	{
		id: '23-24',
		name: 'Designer Line HA23',
		category: 'Designer',
		images: {
			front: door23_24,
			back: door23_24,
		},
		description: 'Unique designer door with premium features',
		features: ['Custom Design', 'Premium Hardware', 'Superior Insulation'],
		price: 3200,
		priceCategory: 'Elite',
	},
	{
		id: '25-26',
		name: 'Elite Line HA25',
		category: 'Elite',
		images: {
			front: door25_26,
			back: door25_26,
		},
		description: 'Premium elite door with advanced features',
		features: ['Elite Grade', 'Maximum Security', 'Sound Insulation'],
		price: 3800,
		priceCategory: 'Elite',
	},
	{
		id: '27-28',
		name: 'Modern Elite HA27',
		category: 'Modern Elite',
		images: {
			front: door27_28,
			back: door27_28,
		},
		description: 'Modern elite design with smart features',
		features: ['Smart Features', 'Premium Grade', 'Modern Design'],
		price: 4200,
		priceCategory: 'Luxury',
	},
	{
		id: '29-30',
		name: 'Classic Elite HA29',
		category: 'Classic',
		images: {
			front: door29_30,
			back: door29_30,
		},
		description: 'Classic design with elite features',
		features: ['Classic Style', 'Premium Hardware', 'Advanced Security'],
		price: 3500,
		priceCategory: 'Elite',
	},
	{
		id: '33-34',
		name: 'Designer Elite HA33',
		category: 'Designer',
		images: {
			front: door33_34,
			back: door33_34,
		},
		description: 'Premium designer door with custom features',
		features: ['Custom Design', 'Elite Grade', 'Smart Features'],
		price: 4500,
		priceCategory: 'Luxury',
	},
	{
		id: '35-36',
		name: 'Modern Plus HA35',
		category: 'Modern',
		images: {
			front: door35_36,
			back: door35_36,
		},
		description: 'Enhanced modern design with premium features',
		features: ['Modern Style', 'Enhanced Security', 'Premium Finish'],
		price: 2800,
		priceCategory: 'Premium',
	},
	{
		id: '101-102',
		name: 'Luxury Line HA101',
		category: 'Luxury',
		images: {
			front: door101_102,
			back: door101_102,
		},
		description: 'Ultimate luxury door with premium features',
		features: ['Luxury Grade', 'Smart Features', 'Maximum Security'],
		price: 5500,
		priceCategory: 'Luxury',
	},
	{
		id: '103-104',
		name: 'Modern Luxury HA103',
		category: 'Modern Luxury',
		images: {
			front: door103_104,
			back: door103_104,
		},
		description: 'Modern luxury design with smart integration',
		features: ['Smart Home Integration', 'Premium Materials', 'Elite Security'],
		price: 5800,
		priceCategory: 'Luxury',
	},
	{
		id: '105-106',
		name: 'Elite Designer HA105',
		category: 'Designer',
		images: {
			front: door105_106,
			back: door105_106,
		},
		description: 'Elite designer door with custom features',
		features: ['Custom Design', 'Premium Grade', 'Advanced Security'],
		price: 4800,
		priceCategory: 'Luxury',
	},
	{
		id: '107-108',
		name: 'Premium Classic HA107',
		category: 'Classic',
		images: {
			front: door107_108,
			back: door107_108,
		},
		description: 'Premium classic design with modern features',
		features: ['Classic Style', 'Premium Hardware', 'Enhanced Security'],
		price: 3200,
		priceCategory: 'Elite',
	},
];

export const categories = [
	'All',
	'Modern',
	'Classic',
	'Designer',
	'Elite',
	'Modern Elite',
	'Luxury',
	'Modern Luxury',
];

export const features = [
	'Thermal Insulation',
	'Sound Protection',
	'Security Features',
	'Weather Resistant',
	'Smart Lock Compatible',
	'Premium Hardware',
	'Custom Design',
	'Smart Features',
	'Premium Grade',
	'Elite Grade',
	'Modern Design',
	'Classic Style',
];

export const priceRanges = [
	{ id: 'standard', label: 'Standard', range: [1000, 2000] },
	{ id: 'premium', label: 'Premium', range: [2000, 3000] },
	{ id: 'elite', label: 'Elite', range: [3000, 4000] },
	{ id: 'luxury', label: 'Luxury', range: [4000, 6000] },
];
