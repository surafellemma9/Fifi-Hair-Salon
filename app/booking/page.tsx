"use client"

import { services } from '@/components/ServiceCard'
import { useEffect, useMemo, useState } from 'react'

const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_URL

// Available time slots
const timeSlots = [
	'9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
	'12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
	'3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
]

export default function BookingPage() {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		service: '',
		date: '',
		time: '',
		notes: ''
	})
	const [submitted, setSubmitted] = useState(false)
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [calendlyReady, setCalendlyReady] = useState(false)

	useEffect(() => {
		if (!CALENDLY) return
		const s = document.createElement('script')
		s.src = 'https://assets.calendly.com/assets/external/widget.js'
		s.async = true
		s.onload = () => setCalendlyReady(true)
		document.body.appendChild(s)
		return () => { s.remove() }
	}, [])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors(prev => ({ ...prev, [name]: '' }))
		}
	}

	const validateForm = () => {
		const newErrors: Record<string, string> = {}
		
		if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
		if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
		if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
		if (!formData.email.trim()) newErrors.email = 'Email is required'
		if (!formData.service) newErrors.service = 'Please select a service'
		if (!formData.date) newErrors.date = 'Please select a date'
		if (!formData.time) newErrors.time = 'Please select a time'
		
		// Email validation
		if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email address'
		}
		
		// Phone validation (basic)
		if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
			newErrors.phone = 'Please enter a valid phone number'
		}
		
		// Date validation (not in the past)
		if (formData.date && new Date(formData.date) < new Date()) {
			newErrors.date = 'Please select a future date'
		}
		
		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (validateForm()) {
			// Here you would typically send the data to your backend
			console.log('Booking submitted:', formData)
			setSubmitted(true)
			// Reset form after 3 seconds
			setTimeout(() => {
				setSubmitted(false)
				setFormData({
					firstName: '',
					lastName: '',
					phone: '',
					email: '',
					service: '',
					date: '',
					time: '',
					notes: ''
				})
			}, 3000)
		}
	}

	const jsonLd = useMemo(() => ({
		"@context": "https://schema.org",
		"@type": "BeautySalon",
		name: "Fifi Hair Salon",
		address: {
			"@type": "PostalAddress",
			streetAddress: "123 Beauty St",
			addressLocality: "Hair City",
			postalCode: "00000",
			addressCountry: "US"
		},
		telephone: "+1-555-123-1234",
		url: "https://fifi-salon.example",
		sameAs: ["https://instagram.com/your-salon", "https://facebook.com/your-salon"]
	}), [])

	return (
		<main className="container py-16">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="font-serif text-4xl md:text-5xl text-ink">Book Your Hair Journey</h1>
					<p className="mt-4 text-lg text-muted">Ready to embrace your natural beauty? Let's create something amazing together.</p>
				</div>

				{CALENDLY ? (
					<div className="mt-8">
						<div className="calendly-inline-widget rounded-2xl ring-1 ring-black/5 shadow-soft" data-url={CALENDLY} style={{ minWidth: '320px', height: 740 }} />
						<noscript><a className="underline" href={CALENDLY}>Open booking</a></noscript>
					</div>
				) : (
					<div className="bg-surface rounded-2xl p-8 shadow-soft ring-1 ring-black/5">
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Personal Information */}
							<div>
								<h2 className="font-serif text-2xl text-ink mb-4">Personal Information</h2>
								<div className="grid md:grid-cols-2 gap-4">
									<div>
										<label htmlFor="firstName" className="block text-sm font-medium text-ink mb-2">First Name *</label>
										<input
											id="firstName"
											name="firstName"
											type="text"
											value={formData.firstName}
											onChange={handleInputChange}
											className={`w-full rounded-full border px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
												errors.firstName ? 'border-red-500' : 'border-accent/30'
											}`}
											placeholder="Enter your first name"
										/>
										{errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
									</div>
									<div>
										<label htmlFor="lastName" className="block text-sm font-medium text-ink mb-2">Last Name *</label>
										<input
											id="lastName"
											name="lastName"
											type="text"
											value={formData.lastName}
											onChange={handleInputChange}
											className={`w-full rounded-full border px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
												errors.lastName ? 'border-red-500' : 'border-accent/30'
											}`}
											placeholder="Enter your last name"
										/>
										{errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
									</div>
								</div>
								<div className="grid md:grid-cols-2 gap-4 mt-4">
									<div>
										<label htmlFor="phone" className="block text-sm font-medium text-ink mb-2">Phone Number *</label>
										<input
											id="phone"
											name="phone"
											type="tel"
											value={formData.phone}
											onChange={handleInputChange}
											className={`w-full rounded-full border px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
												errors.phone ? 'border-red-500' : 'border-accent/30'
											}`}
											placeholder="(555) 123-4567"
										/>
										{errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
									</div>
									<div>
										<label htmlFor="email" className="block text-sm font-medium text-ink mb-2">Email Address *</label>
										<input
											id="email"
											name="email"
											type="email"
											value={formData.email}
											onChange={handleInputChange}
											className={`w-full rounded-full border px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
												errors.email ? 'border-red-500' : 'border-accent/30'
											}`}
											placeholder="your@email.com"
										/>
										{errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
									</div>
								</div>
							</div>

							{/* Service Selection */}
							<div>
								<h2 className="font-serif text-2xl text-ink mb-4">Service Selection</h2>
								<div>
									<label htmlFor="service" className="block text-sm font-medium text-ink mb-2">Choose Your Service *</label>
									<select
										id="service"
										name="service"
										value={formData.service}
										onChange={handleInputChange}
										className={`w-full rounded-full border px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
											errors.service ? 'border-red-500' : 'border-accent/30'
										}`}
									>
										<option value="">Select a service</option>
										{services.map((service) => (
											<option key={service.slug} value={service.slug}>
												{service.title} - {service.startingAt}
											</option>
										))}
									</select>
									{errors.service && <p className="mt-1 text-sm text-red-500">{errors.service}</p>}
								</div>
							</div>

							{/* Date & Time Selection */}
							<div>
								<h2 className="font-serif text-2xl text-ink mb-4">Preferred Date & Time</h2>
								<div className="grid md:grid-cols-2 gap-4">
									<div>
										<label htmlFor="date" className="block text-sm font-medium text-ink mb-2">Select Date *</label>
										<input
											id="date"
											name="date"
											type="date"
											value={formData.date}
											onChange={handleInputChange}
											min={new Date().toISOString().split('T')[0]}
											className={`w-full rounded-full border px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
												errors.date ? 'border-red-500' : 'border-accent/30'
											}`}
										/>
										{errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
									</div>
									<div>
										<label htmlFor="time" className="block text-sm font-medium text-ink mb-2">Select Time *</label>
										<select
											id="time"
											name="time"
											value={formData.time}
											onChange={handleInputChange}
											className={`w-full rounded-full border px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
												errors.time ? 'border-red-500' : 'border-accent/30'
											}`}
										>
											<option value="">Choose a time</option>
											{timeSlots.map((time) => (
												<option key={time} value={time}>
													{time}
												</option>
											))}
										</select>
										{errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
									</div>
								</div>
							</div>

							{/* Additional Notes */}
							<div>
								<label htmlFor="notes" className="block text-sm font-medium text-ink mb-2">Additional Notes</label>
								<textarea
									id="notes"
									name="notes"
									value={formData.notes}
									onChange={handleInputChange}
									rows={4}
									className="w-full rounded-2xl border border-accent/30 px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
									placeholder="Tell us about your hair goals, any specific requests, or questions you have..."
								/>
							</div>

							{/* Submit Button */}
							<div className="pt-4">
								<button
									type="submit"
									disabled={submitted}
									className="w-full rounded-full px-8 py-4 text-lg font-medium shadow-sm bg-accent hover:bg-accent-strong text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{submitted ? 'Booking Submitted!' : 'Book Your Appointment'}
								</button>
								{submitted && (
									<div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-2xl">
										<p className="text-green-800 text-center">
											🎉 Thank you! We've received your booking request and will confirm your appointment within 24 hours.
										</p>
									</div>
								)}
							</div>
						</form>
					</div>
				)}
			</div>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
		</main>
	)
}
