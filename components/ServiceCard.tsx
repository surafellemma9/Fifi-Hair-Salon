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
	{ slug: 'cut', title: 'Precision Cut', description: 'Tailored cuts for your face shape and lifestyle.', startingAt: '$45', icon: '/images/services/cut.jpg' },
	{ slug: 'color', title: 'Signature Color', description: 'Gloss, single process, or dimensional color.', startingAt: '$85', icon: '/images/services/color.jpg' },
	{ slug: 'balayage', title: 'Balayage', description: 'Hand-painted highlights with soft grow-out.', startingAt: '$150', icon: '/images/services/color.jpg' },
	{ slug: 'treatment', title: 'Deep Treatment', description: 'Repair and nourish for lasting shine.', startingAt: '$65', icon: '/images/services/treatment.jpg' },
	{ slug: 'style', title: 'Blowout & Style', description: 'Smooth, bounce, and photo-ready finish.', startingAt: '$55', icon: '/images/services/cut.jpg' },
	{ slug: 'updo', title: 'Event Styling', description: 'Chic updos and special occasion looks.', startingAt: '$95', icon: '/images/services/style.jpg' },
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
