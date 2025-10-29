"use client"

import { useTranslation } from '@/contexts/TranslationContext'
import { useEffect, useRef, useState } from 'react'
import TranslateButton from './TranslateButton'

export default function Navbar() {
	const [open, setOpen] = useState(false)
	const panelRef = useRef<HTMLDivElement | null>(null)
	const { t } = useTranslation()
	useEffect(() => {
		function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [])
	useEffect(() => {
		if (open) panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()
	}, [open])
	const links = [
		{ href: '#home', label: t.nav.home },
		{ href: '#about', label: t.nav.about },
		{ href: '#services', label: t.nav.services },
		{ href: '#gallery', label: t.nav.gallery },
		{ href: '#pricing', label: t.nav.pricing },
		{ href: '#testimonials', label: t.nav.testimonials },
		{ href: '#contact', label: t.nav.contact },
	]
	return (
		<header className="sticky top-0 z-50 bg-green-dark/95 backdrop-blur border-b border-green-darker/20 shadow-lg">
			<nav className="container flex items-center justify-between h-14">
				<a href="/" className="font-serif text-xl tracking-tight text-white hover:text-pink-light transition-colors">Fifi Hair Salon</a>
				<div className="hidden md:flex items-center gap-4 text-sm text-white/90">
					{links.map(l=> <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>)}
					<TranslateButton />
					<a href="/booking" className="rounded-full px-5 py-2.5 shadow-sm bg-accent hover:bg-accent-strong text-white">{t.nav.bookAppointment}</a>
				</div>
				<button className="md:hidden rounded-full px-3 py-2 ring-1 ring-white/20 text-white hover:bg-white/10 transition-colors" aria-label="Open menu" onClick={()=>setOpen(true)}>☰</button>
			</nav>
			{open && (
				<div className="md:hidden fixed inset-0 z-50" aria-modal="true" role="dialog" onClick={()=>setOpen(false)}>
					<div className="absolute inset-0 bg-black/50" />
					<div ref={panelRef} className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-green-dark shadow-card p-6 flex flex-col gap-4 border-l border-green-darker/30" onClick={(e)=>e.stopPropagation()}>
						<div className="flex items-center justify-between">
							<span className="font-serif text-lg text-white">Menu</span>
							<button className="rounded-full px-3 py-2 ring-1 ring-white/20 text-white hover:bg-white/10 transition-colors" aria-label="Close menu" onClick={()=>setOpen(false)}>✕</button>
						</div>
						<nav className="mt-2 flex flex-col gap-3">
							{links.map(l=> <a key={l.href} href={l.href} className="py-2 text-white/90 hover:text-white transition-colors">{l.label}</a>)}
						</nav>
						<div className="mt-auto flex flex-col gap-3">
							<TranslateButton />
							<a href="/booking" className="rounded-full px-5 py-2.5 shadow-sm bg-accent hover:bg-accent-strong text-white">{t.nav.bookAppointment}</a>
						</div>
					</div>
				</div>
			)}
		</header>
	)
}
