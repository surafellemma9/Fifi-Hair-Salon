"use client"

import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
	const [open, setOpen] = useState(false)
	const panelRef = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [])
	useEffect(() => {
		if (open) panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()
	}, [open])
	const links = [
		{ href: '#home', label: 'Home' },
		{ href: '#about', label: 'About' },
		{ href: '#services', label: 'Services' },
		{ href: '#gallery', label: 'Gallery' },
		{ href: '#pricing', label: 'Pricing' },
		{ href: '#testimonials', label: 'Testimonials' },
		{ href: '#contact', label: 'Contact' },
	]
	return (
		<header className="sticky top-0 z-50 bg-surface/90 backdrop-blur border-b border-black/5">
			<nav className="container flex items-center justify-between h-14">
				<a href="/" className="font-serif text-xl tracking-tight text-ink">Fifi Hair Salon</a>
				<div className="hidden md:flex items-center gap-6 text-sm text-ink/80">
					{links.map(l=> <a key={l.href} href={l.href} className="hover:text-ink">{l.label}</a>)}
					<a href="/booking" className="rounded-full px-5 py-2.5 shadow-sm bg-accent hover:bg-accent-strong text-white">Book Appointment</a>
				</div>
				<button className="md:hidden rounded-full px-3 py-2 ring-1 ring-ink/10" aria-label="Open menu" onClick={()=>setOpen(true)}>☰</button>
			</nav>
			{open && (
				<div className="md:hidden fixed inset-0 z-50" aria-modal="true" role="dialog" onClick={()=>setOpen(false)}>
					<div className="absolute inset-0 bg-black/50" />
					<div ref={panelRef} className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-surface shadow-card p-6 flex flex-col gap-4" onClick={(e)=>e.stopPropagation()}>
						<div className="flex items-center justify-between">
							<span className="font-serif text-lg">Menu</span>
							<button className="rounded-full px-3 py-2 ring-1 ring-ink/10" aria-label="Close menu" onClick={()=>setOpen(false)}>✕</button>
						</div>
						<nav className="mt-2 flex flex-col gap-3">
							{links.map(l=> <a key={l.href} href={l.href} className="py-2 text-ink/90">{l.label}</a>)}
						</nav>
						<a href="/booking" className="mt-auto rounded-full px-5 py-2.5 shadow-sm bg-accent hover:bg-accent-strong text-white">Book Appointment</a>
					</div>
				</div>
			)}
		</header>
	)
}
