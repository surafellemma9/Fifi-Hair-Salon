"use client"

import { useTranslation } from '@/contexts/TranslationContext'
import Section from './Section'

export default function Services() {
	const { t } = useTranslation()

	return (
		<Section id="services" eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle}>
			<div className="relative">
				{/* Green decorative elements */}
				<div className="absolute -top-10 -right-10 w-32 h-32 bg-green-accent/20 rounded-full blur-3xl"></div>
				<div className="absolute -bottom-10 -left-10 w-24 h-24 bg-green-medium/30 rounded-full blur-2xl"></div>
				<div className="absolute top-1/2 right-1/4 w-16 h-16 bg-green-accent/15 rounded-full blur-xl"></div>
				
				{/* Price Note */}
				<div className="text-center mb-8 relative z-10">
					<p className="text-sm text-muted italic bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 inline-block border border-accent/20">
						{t.services.priceNote}
					</p>
				</div>
				
				<div className="space-y-12 relative z-10">
					{t.services.categories.map((category, categoryIndex) => (
						<div key={category.name} className="space-y-6">
							<div className="text-center">
								<h3 className="font-serif text-2xl md:text-3xl text-ink mb-2">{category.name}</h3>
								<div className="w-24 h-1 bg-gradient-to-r from-accent to-green-accent mx-auto rounded-full"></div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{category.items.map((service, serviceIndex) => (
									<div 
										key={service.name} 
										className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft ring-1 ring-accent/10 hover:shadow-lg hover:ring-accent/20 transition-all duration-300 group"
									>
										<h4 className="font-serif text-lg text-ink mb-2 group-hover:text-green-dark transition-colors">
											{service.name}
										</h4>
										<p className="text-sm text-ink/80 mb-3">
											{service.description}
										</p>
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium text-green-dark">
												{service.price}
											</span>
											<a 
												href="/booking" 
												className="text-xs px-3 py-1.5 rounded-full bg-green-accent/10 text-green-dark hover:bg-green-accent/20 transition-colors"
											>
												Book Now
											</a>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</Section>
	)
}
