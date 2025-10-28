export default function Footer() {
	return (
		<footer className="mt-10">
			<div className="bg-accent text-white">
				<div className="container flex flex-col md:flex-row items-center justify-between gap-3 py-5">
					<p className="font-serif text-lg">Ready for a refresh?</p>
					<a href="/booking" className="btn-pill bg-white text-accent hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Book Your Appointment</a>
				</div>
			</div>
			<div className="bg-surface border-t border-black/5">
				<div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="font-serif text-xl text-ink">Fifi Hair Salon</div>
					<nav className="flex gap-4 text-sm text-ink/70">
						<a href="#services">Services</a>
						<a href="#gallery">Gallery</a>
						<a href="#pricing">Pricing</a>
						<a href="#contact">Contact</a>
					</nav>
					<p className="text-xs text-ink/60">© {new Date().getFullYear()} Fifi Hair Salon. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}
