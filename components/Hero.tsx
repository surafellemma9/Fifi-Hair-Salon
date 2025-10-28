import Image from 'next/image'

export default function Hero() {
	return (
		<section id="home" aria-labelledby="hero-title" className="py-24 md:py-28 bg-bg">
			<div className="container max-w-7xl grid md:grid-cols-2 gap-8 md:gap-12 items-center">
				<div>
					<h1 id="hero-title" className="font-serif text-5xl md:text-6xl leading-tight tracking-[-0.02em] text-ink">
						Embrace Your Natural Beauty,
						<br />Celebrate Your Crown
					</h1>
					<p className="mt-4 text-[17px] md:text-[18px] leading-8 text-muted max-w-prose">
						Expert care for natural hair, protective styles, and all textures. Where your hair journey begins with confidence and authenticity.
					</p>
					<div className="mt-6 flex flex-col sm:flex-row gap-3">
						<a href="#booking" className="rounded-full px-5 py-2.5 shadow-sm bg-accent hover:bg-accent-strong text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Book Your Appointment</a>
						<a href="#services" className="rounded-full px-5 py-2.5 ring-1 ring-accent text-accent hover:bg-accent/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">View Services</a>
					</div>
				</div>
				<div className="relative">
					<Image src="/images/hero/portrait.jpg" alt="Salon client" width={960} height={1200} priority className="aspect-[4/5] rounded-3xl object-cover shadow-lg" />
				</div>
			</div>
		</section>
	)
}
