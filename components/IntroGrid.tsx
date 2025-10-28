import Image from 'next/image'

export default function IntroGrid() {
	return (
		<section className="py-20 md:py-24 bg-surface" aria-labelledby="philo">
			<div className="container max-w-7xl grid md:grid-cols-4 gap-4 md:gap-6 items-stretch">
				{[
					{src: 'intro-braids.jpg', alt: 'Black woman with beautiful cornrows being styled by professional stylist'},
					{src: 'intro-silk-press.jpg', alt: 'Black woman with sleek straightened hair being styled with precision'},
					{src: 'intro-afro.jpg', alt: 'Black woman with voluminous natural afro being styled with round brush'}
				].map((img, i) => (
					<div key={i} className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)] break-inside-avoid">
						<Image src={`/images/intro/${img.src}`} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" priority={i===0} />
					</div>
				))}
				<div className="rounded-2xl bg-bg p-6 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)] grid">
					<header className="mb-3">
						<p className="tracking-wide text-xs font-semibold uppercase text-muted">Our Philosophy</p>
						<h2 id="philo" className="font-serif text-3xl md:text-4xl tracking-[-0.01em] text-ink">Celebrating Natural Beauty</h2>
					</header>
					<p className="text-[17px] md:text-[18px] leading-8 text-ink/80">
						At Fifi Hair Salon, we celebrate the beauty and diversity of black hair. Our expert stylists understand the unique needs of natural hair, protective styles, and all textures. We're here to empower your hair journey with knowledge, care, and authentic beauty.
					</p>
					<a href="#booking" className="mt-5 self-start rounded-full px-5 py-2.5 ring-1 ring-accent text-accent hover:bg-accent/5">Reserve Your Spot</a>
				</div>
			</div>
		</section>
	)
}
