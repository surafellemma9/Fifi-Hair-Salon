import ContactBlock from '@/components/ContactBlock'
import Footer from '@/components/Footer'
import Gallery from '@/components/Gallery'
import Hero from '@/components/Hero'
import IntroGrid from '@/components/IntroGrid'
import Navbar from '@/components/Navbar'
import Pricing from '@/components/Pricing'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'

export default function Page() {
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
				<IntroGrid />
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
