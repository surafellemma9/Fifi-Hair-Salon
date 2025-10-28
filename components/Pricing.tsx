import Section from './Section'

const groups = [
	{ title: 'Cuts', items: [
		{ name: 'Women’s Cut', price: 'from $75' },
		{ name: 'Men’s Cut', price: 'from $45' },
		{ name: 'Blowout', price: 'from $55' },
	]},
	{ title: 'Color', items: [
		{ name: 'Single Process', price: 'from $110' },
		{ name: 'Partial Highlights', price: 'from $140' },
		{ name: 'Balayage', price: 'from $220' },
	]},
	{ title: 'Treatments', items: [
		{ name: 'Deep Conditioning', price: 'from $45' },
		{ name: 'Keratin', price: 'from $300' },
	]},
]

export default function Pricing() {
	return (
		<Section id="pricing" eyebrow="Pricing" title="A Snapshot of Our Rates" subtitle="Prices vary by stylist & hair length.">
			<div className="grid md:grid-cols-3 gap-4 md:gap-6">
				{groups.map((g) => (
					<article key={g.title} className="rounded-2xl bg-surface p-6 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
						<h3 className="font-serif text-xl text-ink">{g.title}</h3>
						<ul className="mt-4 space-y-3">
							{g.items.map((it) => (
								<li key={it.name} className="flex items-center justify-between text-ink/90">
									<span>{it.name}</span>
									<span className="text-muted">{it.price}</span>
								</li>
							))}
						</ul>
					</article>
				))}
			</div>
		</Section>
	)
}
