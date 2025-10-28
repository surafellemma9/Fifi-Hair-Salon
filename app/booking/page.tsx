"use client"

import { services } from '@/components/ServiceCard'
import type { Metadata } from 'next'
import { useEffect, useMemo, useState } from 'react'

export const metadata: Metadata = {
	title: 'Book an Appointment — Fifi Hair Salon',
	description: 'Reserve your spot for cuts, color, and treatments at Fifi Hair Salon.',
}

const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_URL

export default function BookingPage() {
	const [submitted, setSubmitted] = useState(false)
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
			<h1 className="font-serif text-3xl text-ink">Book Your Appointment</h1>
			{CALENDLY ? (
				<div className="mt-6">
					<div className="calendly-inline-widget rounded-2xl ring-1 ring-black/5 shadow-soft" data-url={CALENDLY} style={{ minWidth: '320px', height: 740 }} />
					<noscript><a className="underline" href={CALENDLY}>Open booking</a></noscript>
				</div>
			) : (
				<form className="mt-6 grid md:grid-cols-2 gap-4" onSubmit={(e)=>{e.preventDefault(); setSubmitted(true)}}>
					<input required aria-label="Full name" placeholder="Full name" className="w-full rounded-full border border-accent/30 px-4 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" />
					<input type="tel" required aria-label="Phone" placeholder="Phone" className="w-full rounded-full border border-accent/30 px-4 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" />
					<input type="email" required aria-label="Email" placeholder="Email" className="w-full rounded-full border border-accent/30 px-4 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" />
					<select aria-label="Service" required className="w-full rounded-full border border-accent/30 px-4 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
						<option value="">Select a service</option>
						{services.map((s)=> (<option key={s.slug} value={s.slug}>{s.title}</option>))}
					</select>
					<input type="date" aria-label="Preferred date" className="w-full rounded-full border border-accent/30 px-4 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" />
					<input type="time" aria-label="Preferred time" className="w-full rounded-full border border-accent/30 px-4 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" />
					<textarea aria-label="Notes" placeholder="Notes" className="md:col-span-2 w-full rounded-2xl border border-accent/30 px-4 py-3 h-28 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" />
					<button className="rounded-full px-5 py-2.5 shadow-sm bg-accent hover:bg-accent-strong text-white md:col-span-2" type="submit">Request Booking</button>
					{submitted && <div role="status" className="text-accent md:col-span-2">Thanks! We’ll confirm shortly.</div>}
				</form>
			)}
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
		</main>
	)
}
