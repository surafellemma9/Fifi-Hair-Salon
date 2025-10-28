import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./app/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./pages/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				bg: '#f6f3f1', // almond
				surface: '#ffffff',
				ink: '#2a1f1a', // espresso
				accent: '#8a5a44', // cocoa
				'accent-strong': '#6d4030',
				muted: '#8f837c',
			},
			fontFamily: {
				serif: ['var(--font-serif)', 'Playfair Display', 'Libre Baskerville', 'serif'],
				sans: ['var(--font-sans)', 'Inter', 'Source Sans 3', 'system-ui', 'sans-serif'],
			},
			borderRadius: {
				xl: '1rem',
				'2xl': '1.25rem',
				'3xl': '1.75rem',
			},
			boxShadow: {
				soft: '0 10px 24px rgba(0,0,0,0.08)',
				softer: '0 8px 16px rgba(0,0,0,0.06)',
				card: '0 20px 40px rgba(0,0,0,0.08)',
			},
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem',
					sm: '1rem',
					md: '2rem',
					lg: '2rem',
					xl: '2.5rem',
				},
			},
		},
	},
	plugins: [],
}

export default config
