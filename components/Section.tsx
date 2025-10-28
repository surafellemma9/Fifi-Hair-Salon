import clsx from 'clsx'

type Props = {
	id?: string
	className?: string
	children: React.ReactNode
	title?: string
	eyebrow?: string
	subtitle?: string
}

export default function Section({ id, className, children, title, eyebrow, subtitle }: Props) {
	const headingId = id ? `${id}-heading` : undefined
	return (
		<section id={id} aria-labelledby={headingId} className={clsx('py-20 md:py-24', className)}>
			<div className="container max-w-7xl">
				{(eyebrow || title || subtitle) && (
					<header className="mb-8 md:mb-10">
						{eyebrow && (
							<p className="tracking-wide text-xs font-semibold uppercase text-muted">{eyebrow}</p>
						)}
						{title && (
							<h2 id={headingId} className="mt-2 font-serif text-3xl md:text-4xl text-ink">
								{title}
							</h2>
						)}
						{subtitle && (
							<p className="mt-3 text-ink/80 max-w-prose">{subtitle}</p>
						)}
					</header>
				)}
				{children}
			</div>
		</section>
	)
}
