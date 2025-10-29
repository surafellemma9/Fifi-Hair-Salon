"use client"

import { useTranslation } from '@/contexts/TranslationContext'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Section from './Section'

const imgs = Array.from({ length: 12 }).map((_, i) => `/images/gallery/${String(i + 1).padStart(2, '0')}.jpg`)

export default function Gallery() {
	const { t } = useTranslation()
	const [open, setOpen] = useState(false)
	const [active, setActive] = useState(0)
	const triggerRef = useRef<HTMLButtonElement | null>(null)
	const dialogRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (!open) return
			if (e.key === 'Escape') setOpen(false)
			if (e.key === 'ArrowRight') setActive((a) => (a + 1) % imgs.length)
			if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + imgs.length) % imgs.length)
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [open])

	useEffect(() => {
		if (open) {
			const first = dialogRef.current?.querySelector<HTMLElement>('[data-focus]')
			first?.focus()
		} else {
			triggerRef.current?.focus()
		}
	}, [open])

	return (
		<Section id="gallery" eyebrow={t.gallery.eyebrow} title={t.gallery.title} subtitle={t.gallery.subtitle}>
			<div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
				{imgs.map((src, i) => (
					<div key={src} className="mb-4 break-inside-avoid">
						<button ref={i===0?triggerRef:null} onClick={() => { setActive(i); setOpen(true) }} aria-label="Open image" className="block w-full group">
							<span className="relative block aspect-[4/5] rounded-2xl overflow-hidden shadow-md ring-1 ring-accent/20 group-hover:ring-accent/40 transition-all duration-300 group-hover:shadow-lg">
								<Image src={src} alt="Black women hair styles and transformations" fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" />
								<div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							</span>
						</button>
					</div>
				))}
			</div>

			{open && (
				<div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
					<div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
						<div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card bg-black">
							<Image src={imgs[active]} alt="Black women hair styles and transformations - enlarged view" fill className="object-contain" />
						</div>
						<div className="mt-3 flex items-center justify-between">
							<button data-focus className="btn-pill btn-outline" onClick={() => setOpen(false)}>Close</button>
							<div className="flex gap-2">
								<button className="btn-pill btn-outline" aria-label="Previous" onClick={() => setActive((a)=> (a-1+imgs.length)%imgs.length)}>&larr; <span className="sr-only">Previous</span></button>
								<button className="btn-pill btn-outline" aria-label="Next" onClick={() => setActive((a)=> (a+1)%imgs.length)}><span className="sr-only">Next</span> &rarr;</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</Section>
	)
}
