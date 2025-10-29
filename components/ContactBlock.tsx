"use client"

import { useState } from 'react'
import Section from './Section'

export default function ContactBlock() {
	const [sent, setSent] = useState(false)
	return (
		<Section id="contact" eyebrow="Contact" title="Visit or Get in Touch" subtitle="Your trusted salon for natural hair care and protective styles.">
			<div className="grid md:grid-cols-2 gap-6">
				<div className="rounded-2xl bg-surface p-6 ring-1 ring-black/5 shadow-soft">
					<div className="mb-6">
						<h3 className="font-serif text-xl text-ink mb-4">Business Information</h3>
						<ul className="space-y-4 text-ink/90">
							<li>
								<strong className="text-ink block mb-1">Address:</strong>
								<a 
									href="https://maps.google.com/?q=2338+Columbia+Pike,+Arlington,+VA+22204" 
									target="_blank" 
									rel="noopener noreferrer"
									className="hover:text-accent transition-colors"
								>
									2338 Columbia Pike, Arlington, VA 22204
								</a>
							</li>
							<li>
								<strong className="text-ink block mb-1">Phone:</strong>
								<a className="hover:text-accent transition-colors" href="tel:+15713921211">(571) 392-1211</a>
							</li>
							<li>
								<strong className="text-ink block mb-1">Hours:</strong>
								<div className="space-y-1 text-sm">
									<div>Monday: <span className="font-medium">9:00 AM – 8:00 PM</span></div>
									<div>Tuesday: <span className="font-medium">9:00 AM – 8:00 PM</span></div>
									<div>Wednesday: <span className="font-medium">9:00 AM – 8:00 PM</span></div>
									<div>Thursday: <span className="font-medium">9:00 AM – 8:00 PM</span></div>
									<div>Friday: <span className="font-medium">9:00 AM – 8:00 PM</span></div>
									<div>Saturday: <span className="font-medium">8:00 AM – 7:00 PM</span></div>
									<div>Sunday: <span className="font-medium text-red-600">Closed</span></div>
								</div>
							</li>
							<li>
								<strong className="text-ink block mb-1">Highlights:</strong>
								<div className="text-sm space-y-1">
									<span className="inline-block mr-3">✓ Accepts walk-ins</span>
									<span className="inline-block mr-3">✓ Good for kids</span>
									<span className="inline-block">✓ Restroom available</span>
								</div>
							</li>
						</ul>
					</div>
					<form className="mt-6 space-y-3" onSubmit={(e)=>{e.preventDefault(); setSent(true); setTimeout(()=>setSent(false), 3000)}} aria-label="Contact form">
						<input required aria-label="Your name" placeholder="Your name" className="w-full rounded-full border border-accent/30 px-4 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" />
						<input type="email" required aria-label="Your email" placeholder="Your email" className="w-full rounded-full border border-accent/30 px-4 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" />
						<textarea required aria-label="Your message" placeholder="Your message" className="w-full rounded-2xl border border-accent/30 px-4 py-3 h-28 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" />
						<button className="btn-pill btn-accent" type="submit">Send Message</button>
						{sent && <div role="status" className="text-accent mt-2">Thanks! We&rsquo;ll get back soon.</div>}
					</form>
				</div>
				<a 
					href="https://maps.google.com/?q=2338+Columbia+Pike,+Arlington,+VA+22204" 
					target="_blank" 
					rel="noopener noreferrer"
					className="rounded-2xl overflow-hidden shadow-soft ring-1 ring-black/5 aspect-[4/3] bg-gradient-to-br from-green-100 to-pink-100 flex items-center justify-center group hover:shadow-lg transition-shadow"
					aria-label="View Fifi Hair Salon location on Google Maps"
				>
					<div className="text-center p-6">
						<svg className="w-16 h-16 mx-auto mb-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						<p className="text-ink font-medium mb-2">View on Google Maps</p>
						<p className="text-sm text-muted">2338 Columbia Pike</p>
						<p className="text-sm text-muted">Arlington, VA 22204</p>
						<div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-ink group-hover:bg-accent group-hover:text-white transition-colors">
							Open Maps
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						</div>
					</div>
				</a>
			</div>
		</Section>
	)
}
