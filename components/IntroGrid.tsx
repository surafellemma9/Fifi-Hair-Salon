"use client"

import { useTranslation } from '@/contexts/TranslationContext'
import Image from 'next/image'

export default function IntroGrid() {
	const { t } = useTranslation()
	return (
		<section className="py-20 md:py-24 bg-gradient-to-br from-pink-light to-green-light relative overflow-hidden" aria-labelledby="philo">
			{/* Green decorative elements */}
			<div className="absolute top-20 left-10 w-20 h-20 bg-green-accent/30 rounded-full blur-2xl"></div>
			<div className="absolute bottom-10 right-20 w-16 h-16 bg-green-medium/40 rounded-full blur-xl"></div>
			<div className="absolute top-1/2 left-1/3 w-12 h-12 bg-green-accent/25 rounded-full blur-lg"></div>
			
			<div className="container max-w-7xl grid md:grid-cols-4 gap-4 md:gap-6 items-stretch relative z-10">
				{[
					{src: 'salon-professional.jpg', alt: 'Professional hair salon with stylist working on client\'s hair, showcasing expert care and natural beauty'},
					{src: 'intro-silk-press.jpg', alt: 'Black woman with sleek straightened hair being styled with precision'},
					{src: 'intro-afro.jpg', alt: 'Black woman with voluminous natural afro being styled with round brush'}
				].map((img, i) => (
					<div key={i} className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(232,164,184,0.15)] break-inside-avoid group hover:shadow-[0_12px_32px_rgba(232,164,184,0.25)] transition-all duration-300">
						<Image src={img.src === 'salon-professional.jpg' ? `/images/${img.src}` : `/images/intro/${img.src}`} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-300" priority={i===0} />
						<div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</div>
				))}
				<div className="rounded-2xl bg-white/80 backdrop-blur-sm p-6 md:p-8 shadow-[0_8px_24px_rgba(232,164,184,0.15)] grid border border-accent/20">
					<header className="mb-3">
						<p className="tracking-wide text-xs font-semibold uppercase text-muted">{t.intro.philosophy}</p>
						<h2 id="philo" className="font-serif text-3xl md:text-4xl tracking-[-0.01em] text-ink">{t.intro.title}</h2>
					</header>
					<p className="text-[17px] md:text-[18px] leading-8 text-ink/80">
						{t.intro.description}
					</p>
					<a href="/booking" className="mt-5 self-start btn-pill btn-green transition-all duration-300 hover:shadow-lg hover:scale-105">{t.intro.reserveButton}</a>
				</div>
			</div>
		</section>
	)
}
