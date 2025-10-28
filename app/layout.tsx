import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', weight: ['600','700','800'], display: 'swap' })
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
	title: 'Fifi Hair Salon — Modern Haircare in Style',
	description: 'Professional haircuts, bespoke coloring, and nourishing treatments — tailored to your unique beauty and style.',
	themeColor: '#8a5a44',
	openGraph: {
		title: 'Fifi Hair Salon',
		description: 'Professional haircuts, bespoke coloring, and nourishing treatments — tailored to your unique beauty and style.',
		type: 'website',
		url: 'https://fifi-salon.example',
		images: [{ url: '/images/hero/portrait.jpg', width: 960, height: 1200, alt: 'Fifi Hair Salon' }],
	},
	metadataBase: new URL('https://fifi-salon.example'),
	icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${serif.variable} ${sans.variable}`}>
			<body className="min-h-dvh bg-bg text-ink antialiased">
				{children}
			</body>
		</html>
	)
}
