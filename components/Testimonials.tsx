"use client"

import { useEffect, useRef, useState } from 'react'
import Section from './Section'

const items = [
	{ quote: 'The best cut I have ever had. My hair finally sits right.', name: 'Amara', stars: 5 },
	{ quote: 'Color is dimensional and healthy—exactly what I wanted.', name: 'Jenna', stars: 5 },
	{ quote: 'Lovely team and calming space. Highly recommend.', name: 'Sofia', stars: 4 },
]

export default function Testimonials() {
	const [index, setIndex] = useState(0)
	const ref = useRef<HTMLDivElement | null>(null)
	const paused = useRef(false)

	useEffect(() => {
		const id = setInterval(() => {
			if (!paused.current) setIndex((i) => (i + 1) % items.length)
		}, 6000)
		return () => clearInterval(id)
	}, [])

	return (
		<Section id="testimonials" eyebrow="Testimonials" title="What Clients Say">
			<div ref={ref} onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)} className="relative rounded-2xl bg-surface p-6 ring-1 ring-black/5 shadow-soft">
				<div className="overflow-hidden">
					<div className="flex transition-transform duration-500" style={{ transform: `translateX(-${index * 100}%)` }}>
						{items.map((t, i) => (
							<figure key={i} className="shrink-0 w-full">
								<blockquote className="text-lg md:text-xl text-ink/90 leading-relaxed">“{t.quote}”</blockquote>
								<figcaption className="mt-4 flex items-center gap-3">
									<div className="flex text-accent">
										{Array.from({ length: t.stars }).map((_, s) => (<span key={s}>★</span>))}
									</div>
									<span className="text-ink font-medium">{t.name}</span>
								</figcaption>
							</figure>
						))}
					</div>
				</div>
				<div className="mt-4 flex items-center justify-between">
					<button className="btn-pill btn-outline" onClick={() => setIndex((i)=> (i-1+items.length)%items.length)} aria-label="Previous slide"><span className="sr-only">Previous</span>←</button>
					<div className="flex gap-2">
						{items.map((_, i)=> (
							<button key={i} aria-label={`Go to slide ${i+1}`} className={`h-2 w-2 rounded-full ring-1 ring-accent ${i===index?'bg-accent':'bg-transparent'}`} onClick={()=>setIndex(i)} />
						))}
					</div>
					<button className="btn-pill btn-outline" onClick={() => setIndex((i)=> (i+1)%items.length)} aria-label="Next slide">→<span className="sr-only">Next</span></button>
				</div>
			</div>
		</Section>
	)
}
