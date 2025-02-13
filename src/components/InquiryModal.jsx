import React, { useState } from 'react';
import { Modal } from 'antd';

const InquiryModal = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState({
		email: '',
		name: '',
		street: '',
		postcode: '',
		town: '',
		phone: '',
		message: '',
		agreement: false,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Form submitted:', formData);
		onClose();
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	return (
		<Modal
			open={isOpen}
			onCancel={onClose}
			footer={null}
			width={800}
			centered
			className="inquiry-modal"
			closeIcon={
				<svg
					className="w-6 h-6 text-white"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			}
			styles={{
				mask: {
					backdropFilter: 'blur(2px)',
				},
				header: {
					background: '#E11D48',
					padding: '16px 24px',
					borderRadius: '8px 8px 0 0',
					marginBottom: 0,
				},
				content: {
					padding: 0,
					top: 0,
				},
				body: {
					padding: 0,
					maxHeight: 'calc(100vh - 100px)',
					overflowY: 'auto',
				},
			}}
			title={<span className="text-xl font-semibold text-white">Inquiry</span>}
		>
			<form
				onSubmit={handleSubmit}
				className="p-6"
			>
				<div className="space-y-4">
					{/* Email */}
					<div>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Your E-Mail: *"
							required
							className="w-full p-3 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
						/>
					</div>

					{/* Name */}
					<div>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Name:"
							className="w-full p-3 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
						/>
					</div>

					{/* Street */}
					<div>
						<input
							type="text"
							name="street"
							value={formData.street}
							onChange={handleChange}
							placeholder="Street:"
							className="w-full p-3 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
						/>
					</div>

					{/* Postcode and Town */}
					<div className="flex gap-4">
						<input
							type="text"
							name="postcode"
							value={formData.postcode}
							onChange={handleChange}
							placeholder="Postcode *"
							required
							className="w-1/3 p-3 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
						/>
						<input
							type="text"
							name="town"
							value={formData.town}
							onChange={handleChange}
							placeholder="Town *"
							required
							className="w-2/3 p-3 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
						/>
					</div>

					{/* Phone */}
					<div>
						<input
							type="tel"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							placeholder="Phone number"
							className="w-full p-3 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
						/>
					</div>

					{/* Message */}
					<div>
						<textarea
							name="message"
							value={formData.message}
							onChange={handleChange}
							placeholder="Message"
							rows="4"
							className="w-full p-3 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
						/>
					</div>

					{/* Required Fields Notice */}
					<div className="text-sm text-gray-600">* Required fields</div>

					{/* Agreement */}
					<div className="flex items-start gap-2 mt-4">
						<input
							type="checkbox"
							name="agreement"
							checked={formData.agreement}
							onChange={handleChange}
							required
							className="mt-1"
						/>
						<label className="text-sm text-gray-700">
							By submitting your request you consent to the terms and conditions
							published on the site{' '}
							<a
								href="#"
								className="text-blue-500 hover:underline"
							>
								Data protection
							</a>
							.
						</label>
					</div>

					{/* Buttons */}
					<div className="flex gap-4 mt-6">
						<button
							type="submit"
							className="w-1/2 bg-rose-200 text-gray-700 py-3 rounded hover:bg-rose-300 transition-colors"
						>
							Send
						</button>
						<button
							type="button"
							onClick={onClose}
							className="w-1/2 bg-rose-600 text-white py-3 rounded hover:bg-rose-700 transition-colors"
						>
							Cancel
						</button>
					</div>
				</div>
			</form>
		</Modal>
	);
};

export default InquiryModal;
