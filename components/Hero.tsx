"use client"

import { useTranslation } from '@/contexts/TranslationContext'
import Image from 'next/image'

export default function Hero() {
	const { t } = useTranslation()
	return (
		<section id="home" aria-labelledby="hero-title" className="py-24 md:py-28 bg-gradient-to-br from-pink-light via-bg to-green-light relative overflow-hidden">
			{/* Decorative elements */}
			<div className="absolute top-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
			<div className="absolute bottom-20 left-10 w-24 h-24 bg-green-accent/20 rounded-full blur-2xl"></div>
			<div className="absolute top-1/2 right-1/4 w-16 h-16 bg-accent/15 rounded-full blur-xl"></div>
			
			<div className="container max-w-7xl grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
				<div>
					<h1 id="hero-title" className="font-serif text-5xl md:text-6xl leading-tight tracking-[-0.02em] text-ink">
						{t.hero.title.split('\n').map((line, i) => (
							<span key={i}>
								{line}
								{i === 0 && <br />}
							</span>
						))}
					</h1>
					<p className="mt-4 text-[17px] md:text-[18px] leading-8 text-muted max-w-prose">
						{t.hero.subtitle}
					</p>
					<div className="mt-6 flex flex-col sm:flex-row gap-3">
						<a href="/booking" className="btn-pill btn-accent transition-all duration-300 hover:shadow-lg hover:scale-105">{t.hero.bookButton}</a>
						<a href="#services" className="btn-pill btn-green-outline transition-all duration-300 hover:shadow-md">{t.hero.viewServicesButton}</a>
					</div>
				</div>
				<div className="relative">
					<div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-green-accent/20 rounded-3xl blur-xl"></div>
					<Image src="/images/salon-professional.jpg" alt="Professional hair salon with stylist working on client's hair, showcasing expert care and natural beauty" width={960} height={1200} priority className="aspect-[4/5] rounded-3xl object-cover shadow-lg relative z-10" />
				</div>
			</div>
		</section>
	)
}
