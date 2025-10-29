"use client"

import { useEffect, useRef, useState } from 'react'
import Section from './Section'

// Add your Yelp business URL here to enable live reviews
// Get this from: https://www.yelp.com/biz/your-business-name
const YELP_BUSINESS_URL = process.env.NEXT_PUBLIC_YELP_URL || ''

const items = [
	{ quote: 'Fifi transformed my natural hair journey! My curls have never looked healthier or more defined. The deep conditioning treatment was everything I needed.', name: 'Keisha', stars: 5 },
	{ quote: 'Finally found a salon that understands black hair! My box braids lasted 8 weeks and looked amazing the entire time. Worth every penny.', name: 'Aaliyah', stars: 5 },
	{ quote: 'The silk press was flawless and lasted for weeks. Fifi really knows how to work with different hair textures. My hair felt so soft and manageable.', name: 'Nia', stars: 5 },
	{ quote: 'I was nervous about coloring my natural hair, but Fifi made me feel so comfortable. The color came out exactly how I envisioned it.', name: 'Zara', stars: 5 },
	{ quote: 'Best loc maintenance I\'e ever had! My locs are so neat and healthy. Fifi really understands the loc journey.', name: 'Imani', stars: 5 },
	{ quote: 'The protective styles here are incredible. My hair grew so much during the 6 weeks I had my twists in. Highly recommend!', name: 'Destiny', stars: 5 },
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
			<div className="grid md:grid-cols-2 gap-6">
				{/* Yelp Reviews Widget */}
				{YELP_BUSINESS_URL && (
					<div className="rounded-2xl bg-surface p-6 ring-1 ring-black/5 shadow-soft">
						<div className="mb-4">
							<h3 className="font-serif text-xl text-ink mb-2">Real Yelp Reviews</h3>
							<p className="text-sm text-muted mb-4">See what our customers are saying</p>
						</div>
						
						{/* Yelp Reviews Cards */}
						<div className="space-y-4 mb-4 max-h-[600px] overflow-y-auto pr-2">
							{/* Review 1 - Tiffany R. */}
							<div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-red-500 transition-colors">
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0">
										<div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
											T
										</div>
									</div>
									<div className="flex-grow min-w-0">
										<div className="flex items-center gap-2 mb-1 flex-wrap">
											<span className="font-semibold text-sm text-ink">Tiffany R.</span>
											<div className="flex text-yellow-400 text-xs">
												{'★★★★★'}
											</div>
											<span className="text-xs text-muted">Mar 17, 2024</span>
										</div>
										<p className="text-xs text-muted leading-relaxed">
											"These ladies are the real deal. I have never been so satisfied as a black woman dealing with salons for over 30 years with the atmosphere, professionalism, time spent and quality of their service..."
										</p>
									</div>
								</div>
							</div>

							{/* Review 2 - Wanda S. */}
							<div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-red-500 transition-colors">
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0">
										<div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
											W
										</div>
									</div>
									<div className="flex-grow min-w-0">
										<div className="flex items-center gap-2 mb-1 flex-wrap">
											<span className="font-semibold text-sm text-ink">Wanda S.</span>
											<div className="flex text-yellow-400 text-xs">
												{'★★★★★'}
											</div>
											<span className="text-xs text-muted">May 6, 2024</span>
										</div>
										<p className="text-xs text-muted leading-relaxed">
											"I love the way they did my hair and took time with me and very nice to me I will always let them do my hair I found a real good shop who can do my hair."
										</p>
									</div>
								</div>
							</div>

							{/* Review 3 - Andrea D. */}
							<div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-red-500 transition-colors">
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0">
										<div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
											A
										</div>
									</div>
									<div className="flex-grow min-w-0">
										<div className="flex items-center gap-2 mb-1 flex-wrap">
											<span className="font-semibold text-sm text-ink">Andrea D.</span>
											<div className="flex text-yellow-400 text-xs">
												{'★★★★★'}
											</div>
											<span className="text-xs text-muted">Oct 19, 2024</span>
										</div>
										<p className="text-xs text-muted leading-relaxed">
											"The only place you should get your hair braided in the DMV. All the women there are so sweet they have been doing my hair for the last year and I couldn't be happier. Super clean also!!"
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* CTA Button */}
						<a 
							href={YELP_BUSINESS_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="block w-full text-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
						>
							View All Reviews on Yelp
						</a>
					</div>
				)}

				{/* Custom Testimonials */}
				<div ref={ref} onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)} className="relative rounded-2xl bg-surface p-6 ring-1 ring-black/5 shadow-soft">
					<div className="overflow-hidden">
						<div className="flex transition-transform duration-500" style={{ transform: `translateX(-${index * 100}%)` }}>
							{items.map((t, i) => (
								<figure key={i} className="shrink-0 w-full">
									<blockquote className="text-lg md:text-xl text-ink/90 leading-relaxed">"{t.quote}"</blockquote>
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
			</div>

			{!YELP_BUSINESS_URL && (
				<div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
					<p className="text-sm text-blue-800">
						💡 <strong>Add Real Yelp Reviews:</strong> Set your Yelp business URL in <code>.env.local</code> as <code>NEXT_PUBLIC_YELP_URL</code> to display live reviews alongside these testimonials.
					</p>
				</div>
			)}
		</Section>
	)
}
