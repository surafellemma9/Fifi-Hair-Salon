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
				bg: '#fef7f7', // baby pink background
				surface: '#ffffff',
				ink: '#2d4a3e', // deep green text
				accent: '#e8a4b8', // baby pink accent
				'accent-strong': '#d67a95', // deeper baby pink
				muted: '#7a8b85', // muted green-gray
				'pink-light': '#fdf2f8', // very light pink
				'pink-medium': '#fce7f3', // medium light pink
				'green-light': '#f0fdf4', // very light green
				'green-medium': '#dcfce7', // medium light green
				'green-accent': '#86efac', // soft green accent
				'green-dark': '#1a3a2e', // dark green for navbar
				'green-darker': '#0f241c', // darker green
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
