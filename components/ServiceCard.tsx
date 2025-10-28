import Image from 'next/image'
import Link from 'next/link'

export type Service = {
	slug: string
	title: string
	description: string
	startingAt: string
	icon?: string
}

export const services: Service[] = [
	{ slug: 'cut', title: 'Natural Hair Cuts', description: 'Precision cuts for natural textures, protective styles, and face-framing layers.', startingAt: '$55', icon: '/images/services/cut.jpg' },
	{ slug: 'color', title: 'Hair Coloring', description: 'Vibrant colors, highlights, and color corrections for all hair textures.', startingAt: '$95', icon: '/images/services/color.jpg' },
	{ slug: 'braids', title: 'Protective Braids', description: 'Box braids, cornrows, twists, and knotless braids for healthy hair growth.', startingAt: '$120', icon: '/images/services/braids.jpg' },
	{ slug: 'treatment', title: 'Deep Conditioning', description: 'Intensive treatments for moisture, strength, and curl definition.', startingAt: '$75', icon: '/images/services/treatment.jpg' },
	{ slug: 'style', title: 'Blowout & Silk Press', description: 'Smooth, silky press with heat protection and lasting results.', startingAt: '$65', icon: '/images/services/style.jpg' },
	{ slug: 'updo', title: 'Special Occasion', description: 'Elegant updos, wedding styles, and event-ready looks.', startingAt: '$110', icon: '/images/services/updo.jpg' },
	{ slug: 'weave', title: 'Hair Extensions', description: 'Sew-in, tape-in, and clip-in extensions for length and volume.', startingAt: '$180', icon: '/images/services/weave.jpg' },
	{ slug: 'loc', title: 'Loc Maintenance', description: 'Loc retwists, palm rolling, and maintenance for healthy locs.', startingAt: '$85', icon: '/images/services/locs.jpg' },
]

export default function ServiceCard({ item }: { item: Service }) {
	return (
		<article className="rounded-2xl bg-surface shadow-soft ring-1 ring-black/5 flex flex-col overflow-hidden">
			{item.icon && (
				<div className="relative aspect-[4/3]">
					<Image src={item.icon} alt="" fill className="object-cover" />
				</div>
			)}
			<div className="p-5 flex-1 flex flex-col">
				<h3 className="font-serif text-xl text-ink">{item.title}</h3>
				<p className="mt-2 text-sm text-ink/80 flex-1">{item.description}</p>
				<p className="mt-3 text-sm text-muted">From {item.startingAt}</p>
				<Link href="/booking" className="mt-4 self-start btn-pill btn-outline text-sm">Book</Link>
			</div>
		</article>
	)
}
