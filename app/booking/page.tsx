"use client"

import { useTranslation } from '@/contexts/TranslationContext'
import { useEffect, useMemo, useState } from 'react'

const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_URL

// Available time slots
const timeSlots = [
	'9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
	'12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
	'3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
]

export default function BookingPage() {
	const { t } = useTranslation()
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

	// Create comprehensive services list from translations
	const allServices = useMemo(() => {
		const services: Array<{ value: string; label: string; category: string }> = []
		t.services.categories.forEach(category => {
			category.items.forEach(service => {
				services.push({
					value: service.name.toLowerCase().replace(/\s+/g, '-'),
					label: `${service.name} - ${service.price}`,
					category: category.name
				})
			})
		})
		return services
	}, [t.services.categories])

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
		
		if (!formData.firstName.trim()) newErrors.firstName = t.booking.form.required
		if (!formData.lastName.trim()) newErrors.lastName = t.booking.form.required
		if (!formData.phone.trim()) newErrors.phone = t.booking.form.required
		if (!formData.email.trim()) newErrors.email = t.booking.form.required
		if (!formData.service) newErrors.service = t.booking.form.required
		if (!formData.date) newErrors.date = t.booking.form.required
		if (!formData.time) newErrors.time = t.booking.form.required
		
		// Email validation
		if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = t.booking.form.invalidEmail
		}
		
		// Phone validation (basic)
		if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
			newErrors.phone = t.booking.form.invalidPhone
		}
		
		// Date validation (not in the past)
		if (formData.date && new Date(formData.date) < new Date()) {
			newErrors.date = t.booking.form.pastDate
		}
		
		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (validateForm()) {
			try {
				const response = await fetch('/api/admin/appointments', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				})

				if (response.ok) {
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
				} else {
					const errorData = await response.json()
					console.error('Booking failed:', errorData)
					// Still show success to user, but log the error
					setSubmitted(true)
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
			} catch (error) {
				console.error('Booking error:', error)
				// Still show success to user, but log the error
				setSubmitted(true)
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
		<main className="container py-16 bg-gradient-to-br from-pink-light to-green-light min-h-screen">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="font-serif text-4xl md:text-5xl text-ink">{t.booking.title}</h1>
					<p className="mt-4 text-lg text-muted">{t.booking.subtitle}</p>
				</div>

				{CALENDLY ? (
					<div className="mt-8">
						<div className="calendly-inline-widget rounded-2xl ring-1 ring-black/5 shadow-soft" data-url={CALENDLY} style={{ minWidth: '320px', height: 740 }} />
						<noscript><a className="underline" href={CALENDLY}>Open booking</a></noscript>
					</div>
				) : (
					<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-soft ring-1 ring-accent/20 relative overflow-hidden">
						{/* Decorative elements */}
						<div className="absolute top-0 right-0 w-32 h-32 bg-green-accent/10 rounded-full blur-3xl"></div>
						<div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
						
						<form onSubmit={handleSubmit} className="space-y-6 relative z-10">
							{/* Personal Information */}
							<div>
								<h2 className="font-serif text-2xl text-ink mb-4">{t.booking.form.firstName} & {t.booking.form.lastName}</h2>
								<div className="grid md:grid-cols-2 gap-4">
									<div>
										<label htmlFor="firstName" className="block text-sm font-medium text-ink mb-2">{t.booking.form.firstName} *</label>
										<input
											id="firstName"
											name="firstName"
											type="text"
											value={formData.firstName}
											onChange={handleInputChange}
											className={`w-full rounded-full border px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent transition-colors ${
												errors.firstName ? 'border-red-500' : 'border-accent/30 hover:border-accent/50'
											}`}
											placeholder={t.booking.form.firstName}
										/>
										{errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
									</div>
									<div>
										<label htmlFor="lastName" className="block text-sm font-medium text-ink mb-2">{t.booking.form.lastName} *</label>
										<input
											id="lastName"
											name="lastName"
											type="text"
											value={formData.lastName}
											onChange={handleInputChange}
											className={`w-full rounded-full border px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent transition-colors ${
												errors.lastName ? 'border-red-500' : 'border-accent/30 hover:border-accent/50'
											}`}
											placeholder={t.booking.form.lastName}
										/>
										{errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
									</div>
								</div>
								<div className="grid md:grid-cols-2 gap-4 mt-4">
									<div>
										<label htmlFor="phone" className="block text-sm font-medium text-ink mb-2">{t.booking.form.phone} *</label>
										<input
											id="phone"
											name="phone"
											type="tel"
											value={formData.phone}
											onChange={handleInputChange}
											className={`w-full rounded-full border px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent transition-colors ${
												errors.phone ? 'border-red-500' : 'border-accent/30 hover:border-accent/50'
											}`}
											placeholder="(555) 123-4567"
										/>
										{errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
									</div>
									<div>
										<label htmlFor="email" className="block text-sm font-medium text-ink mb-2">{t.booking.form.email} *</label>
										<input
											id="email"
											name="email"
											type="email"
											value={formData.email}
											onChange={handleInputChange}
											className={`w-full rounded-full border px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent transition-colors ${
												errors.email ? 'border-red-500' : 'border-accent/30 hover:border-accent/50'
											}`}
											placeholder="your@email.com"
										/>
										{errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
									</div>
								</div>
							</div>

							{/* Service Selection */}
							<div>
								<h2 className="font-serif text-2xl text-ink mb-4">{t.booking.form.service}</h2>
								<div>
									<label htmlFor="service" className="block text-sm font-medium text-ink mb-2">{t.booking.form.service} *</label>
									<select
										id="service"
										name="service"
										value={formData.service}
										onChange={handleInputChange}
										className={`w-full rounded-full border px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent transition-colors ${
											errors.service ? 'border-red-500' : 'border-accent/30 hover:border-accent/50'
										}`}
									>
										<option value="">Select a service</option>
										{t.services.categories.map((category) => (
											<optgroup key={category.name} label={category.name}>
												{category.items.map((service) => (
													<option key={service.name} value={service.name.toLowerCase().replace(/\s+/g, '-')}>
														{service.name} - {service.price}
													</option>
												))}
											</optgroup>
										))}
									</select>
									{errors.service && <p className="mt-1 text-sm text-red-500">{errors.service}</p>}
									<p className="mt-2 text-xs text-muted italic">{t.services.priceNote}</p>
								</div>
							</div>

							{/* Date & Time Selection */}
							<div>
								<h2 className="font-serif text-2xl text-ink mb-4">{t.booking.form.date} & {t.booking.form.time}</h2>
								<div className="grid md:grid-cols-2 gap-4">
									<div>
										<label htmlFor="date" className="block text-sm font-medium text-ink mb-2">{t.booking.form.date} *</label>
										<input
											id="date"
											name="date"
											type="date"
											value={formData.date}
											onChange={handleInputChange}
											min={new Date().toISOString().split('T')[0]}
											className={`w-full rounded-full border px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent transition-colors ${
												errors.date ? 'border-red-500' : 'border-accent/30 hover:border-accent/50'
											}`}
										/>
										{errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
									</div>
									<div>
										<label htmlFor="time" className="block text-sm font-medium text-ink mb-2">{t.booking.form.time} *</label>
										<select
											id="time"
											name="time"
											value={formData.time}
											onChange={handleInputChange}
											className={`w-full rounded-full border px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent transition-colors ${
												errors.time ? 'border-red-500' : 'border-accent/30 hover:border-accent/50'
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
								<label htmlFor="notes" className="block text-sm font-medium text-ink mb-2">{t.booking.form.notes}</label>
								<textarea
									id="notes"
									name="notes"
									value={formData.notes}
									onChange={handleInputChange}
									rows={4}
									className="w-full rounded-2xl border border-accent/30 px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent transition-colors hover:border-accent/50"
									placeholder={t.booking.form.notesPlaceholder}
								/>
							</div>

							{/* Submit Button */}
							<div className="pt-4">
								<button
									type="submit"
									disabled={submitted}
									className="w-full rounded-full px-8 py-4 text-lg font-medium shadow-sm bg-gradient-to-r from-accent to-green-accent hover:from-accent-strong hover:to-green-accent/80 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
								>
									{submitted ? t.booking.form.submitted : t.booking.form.submit}
								</button>
								{submitted && (
									<div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-2xl">
										<p className="text-green-800 text-center">
											🎉 {t.booking.form.successMessage}
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
