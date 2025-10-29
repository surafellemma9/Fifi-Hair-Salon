"use client"

import { useTranslation } from '@/contexts/TranslationContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLoginPage() {
	const { t } = useTranslation()
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState('')
	const [error, setError] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError('')
		setMessage('')

		try {
			const response = await fetch('/api/admin/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ password }),
			})

			const data = await response.json()

			if (response.ok) {
				setMessage('Login successful! Redirecting to dashboard...')
				// Redirect to admin dashboard after 1 second
				setTimeout(() => {
					router.push('/admin-dashboard')
				}, 1000)
			} else {
				setError(data.error || 'Login failed. Please try again.')
			}
		} catch (err) {
			setError('Network error. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<main className="min-h-screen bg-gradient-to-br from-pink-light to-green-light flex items-center justify-center p-4">
			<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-soft ring-1 ring-accent/20 max-w-md w-full relative overflow-hidden">
				{/* Decorative elements */}
				<div className="absolute top-0 right-0 w-32 h-32 bg-green-accent/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
				
				<div className="relative z-10">
					<div className="text-center mb-8">
						<h1 className="font-serif text-3xl text-ink mb-2">Admin Access</h1>
						<p className="text-muted">Enter your password to access the admin dashboard</p>
					</div>

					{message && (
						<div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl">
							<p className="text-green-800 text-center font-medium">{message}</p>
						</div>
					)}

					{error && (
						<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
							<p className="text-red-800 text-center">{error}</p>
						</div>
					)}

					<form onSubmit={handleLogin} className="space-y-6">
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-ink mb-2">
								Admin Password
							</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full rounded-full border border-accent/30 px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent transition-colors hover:border-accent/50"
								placeholder="Enter admin password"
								required
							/>
						</div>

						<button
							type="submit"
							disabled={isLoading || !password}
							className="w-full rounded-full px-8 py-4 text-lg font-medium shadow-sm bg-gradient-to-r from-accent to-green-accent hover:from-accent-strong hover:to-green-accent/80 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
						>
							{isLoading ? 'Signing In...' : 'Sign In to Admin'}
						</button>
					</form>

					<div className="text-center">
						<a 
							href="/" 
							className="text-sm text-muted hover:text-ink transition-colors"
						>
							← Back to Home
						</a>
					</div>
				</div>
			</div>
		</main>
	)
}
