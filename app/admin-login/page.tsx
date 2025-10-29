"use client"

import { useTranslation } from '@/contexts/TranslationContext'
import { useState } from 'react'

export default function AdminLoginPage() {
	const { t } = useTranslation()
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState('')
	const [error, setError] = useState('')

	const handleSendOTP = async () => {
		setIsLoading(true)
		setError('')
		setMessage('')

		try {
			const response = await fetch('/api/admin/send-email-otp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			const data = await response.json()

			if (response.ok) {
				setMessage(`OTP generated! Check terminal for code: ${data.devOtp}`)
				// Redirect to OTP verification page after 3 seconds
				setTimeout(() => {
					window.location.href = '/admin-verify'
				}, 3000)
			} else {
				setError(data.error || 'Failed to generate OTP. Please try again.')
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
						<p className="text-muted">Enter your credentials to access the admin dashboard</p>
					</div>

					{message && (
						<div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl">
							<p className="text-green-800 text-center font-medium">{message}</p>
							{message.includes('Check terminal') && (
								<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
									<p className="text-blue-800 text-sm text-center">
										💡 <strong>Development Mode:</strong> Check your terminal/console for the OTP code
									</p>
								</div>
							)}
						</div>
					)}

					{error && (
						<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
							<p className="text-red-800 text-center">{error}</p>
						</div>
					)}

					<div className="space-y-6">
						<div className="text-center">
							<p className="text-sm text-muted mb-4">
								Click the button below to generate a 5-digit OTP for admin access.
							</p>
							<button
								onClick={handleSendOTP}
								disabled={isLoading}
								className="w-full rounded-full px-8 py-4 text-lg font-medium shadow-sm bg-gradient-to-r from-accent to-green-accent hover:from-accent-strong hover:to-green-accent/80 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
							>
								{isLoading ? 'Generating OTP...' : 'Generate OTP Code'}
							</button>
						</div>

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
			</div>
		</main>
	)
}
