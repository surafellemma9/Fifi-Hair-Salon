"use client"

import { useTranslation } from '@/contexts/TranslationContext'

export default function Footer() {
	const { t } = useTranslation()
	
	return (
		<footer className="mt-10">
			<div className="bg-gradient-to-r from-accent to-green-accent text-white relative overflow-hidden">
				{/* Decorative elements */}
				<div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-0 left-0 w-32 h-32 bg-green-accent/20 rounded-full blur-2xl"></div>
				
				<div className="container flex flex-col md:flex-row items-center justify-between gap-3 py-5 relative z-10">
					<p className="font-serif text-lg">{t.footer.cta}</p>
					<a href="/booking" className="btn-pill bg-white text-green-dark hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 hover:scale-105">{t.footer.ctaButton}</a>
				</div>
			</div>
		<div className="bg-gradient-to-r from-green-light to-pink-light border-t border-green-accent/20">
			<div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
				<div className="font-serif text-xl text-ink">Fifi Hair Salon</div>
				<nav className="flex gap-4 text-sm text-ink/70">
					<a href="#services" className="hover:text-green-dark transition-colors">{t.nav.services}</a>
					<a href="#gallery" className="hover:text-green-dark transition-colors">{t.nav.gallery}</a>
					<a href="#pricing" className="hover:text-green-dark transition-colors">{t.nav.pricing}</a>
					<a href="#contact" className="hover:text-green-dark transition-colors">{t.nav.contact}</a>
				</nav>
				<div className="flex items-center gap-4">
					<p className="text-xs text-ink/60">{t.footer.copyright}</p>
					<a 
						href="/admin-login" 
						className="text-xs text-ink/40 hover:text-ink/60 transition-colors px-2 py-1 rounded border border-ink/20 hover:border-ink/40"
					>
						Admin
					</a>
				</div>
			</div>
		</div>
		</footer>
	)
}
