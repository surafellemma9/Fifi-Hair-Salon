import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const base = 'https://fifi-salon.example'
	const routes = ['/', '/booking']
	return routes.map((p) => ({ url: `${base}${p}`, lastModified: new Date(), changeFrequency: 'weekly', priority: p === '/' ? 1 : 0.8 }))
}
