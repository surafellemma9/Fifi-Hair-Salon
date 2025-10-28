"use client"

import { useState } from 'react'
import Section from './Section'

export default function ContactBlock() {
	const [sent, setSent] = useState(false)
	return (
		<Section id="contact" eyebrow="Contact" title="Visit or Get in Touch" subtitle="Your trusted salon for natural hair care and protective styles.">
			<div className="grid md:grid-cols-2 gap-6">
				<div className="rounded-2xl bg-surface p-6 ring-1 ring-black/5 shadow-soft">
					<ul className="space-y-3 text-ink/90">
						<li><strong>Address:</strong> 123 Beauty St, Hair City</li>
						<li><strong>Phone:</strong> <a className="underline hover:no-underline" href="tel:+15551231234">(555) 123-1234</a></li>
						<li><strong>Email:</strong> <a className="underline hover:no-underline" href="mailto:hello@fifihair.com">hello@fifihair.com</a></li>
						<li><strong>Hours:</strong> Mon–Sat 9–6, Sun 10–4</li>
					</ul>
					<form className="mt-6 space-y-3" onSubmit={(e)=>{e.preventDefault(); setSent(true); setTimeout(()=>setSent(false), 3000)}} aria-label="Contact form">
						<input required aria-label="Your name" placeholder="Your name" className="w-full rounded-full border border-accent/30 px-4 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" />
						<input type="email" required aria-label="Your email" placeholder="Your email" className="w-full rounded-full border border-accent/30 px-4 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" />
						<textarea required aria-label="Your message" placeholder="Your message" className="w-full rounded-2xl border border-accent/30 px-4 py-3 h-28 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" />
						<button className="btn-pill btn-accent" type="submit">Send Message</button>
						{sent && <div role="status" className="text-accent mt-2">Thanks! We&rsquo;ll get back soon.</div>}
					</form>
				</div>
				<div className="rounded-2xl overflow-hidden shadow-soft ring-1 ring-black/5 aspect-[4/3] bg-[url('/images/map-placeholder.jpg')] bg-cover bg-center" aria-label="Map location" />
			</div>
		</Section>
	)
}
