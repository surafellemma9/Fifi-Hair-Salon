"use client"

import ContactBlock from '@/components/ContactBlock'
import Footer from '@/components/Footer'
import Gallery from '@/components/Gallery'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Pricing from '@/components/Pricing'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import { useEffect } from 'react'

export default function Page() {
	// Ensure page loads at top unless there's a hash
	useEffect(() => {
		if (!window.location.hash) {
			window.scrollTo(0, 0)
		}
	}, [])
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BeautySalon",
		name: "Fifi Hair Salon",
		url: "https://fifi-salon.example",
		telephone: "+1-555-123-1234",
		address: {
			"@type": "PostalAddress",
			streetAddress: "123 Beauty St",
			addressLocality: "Hair City",
			postalCode: "00000",
			addressCountry: "US"
		},
		sameAs: ["https://instagram.com/your-salon", "https://facebook.com/your-salon"]
	}
	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<Services />
				<Gallery />
				<Pricing />
				<Testimonials />
				<ContactBlock />
			</main>
			<Footer />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
		</>
	)
}
