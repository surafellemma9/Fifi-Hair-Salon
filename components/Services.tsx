import Section from './Section'
import ServiceCard, { services } from './ServiceCard'

export default function Services() {
	return (
		<Section id="services" eyebrow="Services" title="Tailored Haircare, Designed for You" subtitle="Explore our most-loved services crafted to enhance your unique features.">
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
				{services.map((s) => (
					<ServiceCard key={s.slug} item={s} />
				))}
			</div>
		</Section>
	)
}
