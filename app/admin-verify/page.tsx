"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminVerifyPage() {
	const router = useRouter()
	const [otp, setOtp] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const handleVerifyOTP = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError('')

		if (otp.length !== 5) {
			setError('Please enter a 5-digit OTP')
			setIsLoading(false)
			return
		}

		try {
			const response = await fetch('/api/admin/verify-otp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ otp }),
			})

			const data = await response.json()

			if (response.ok) {
				// Store admin session
				localStorage.setItem('admin_authenticated', 'true')
				localStorage.setItem('admin_login_time', Date.now().toString())
				router.push('/admin-dashboard')
			} else {
				setError(data.error || 'Invalid OTP. Please try again.')
			}
		} catch (err) {
			setError('Network error. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	const handleResendOTP = async () => {
		setIsLoading(true)
		setError('')

		try {
			const response = await fetch('/api/admin/send-otp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			const data = await response.json()

			if (response.ok) {
				setError('')
				alert('New OTP sent to your phone!')
			} else {
				setError(data.error || 'Failed to resend OTP. Please try again.')
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
						<h1 className="font-serif text-3xl text-ink mb-2">Verify OTP</h1>
						<p className="text-muted">Enter the 5-digit code sent to your phone</p>
					</div>

					{error && (
						<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
							<p className="text-red-800 text-center">{error}</p>
						</div>
					)}

					<form onSubmit={handleVerifyOTP} className="space-y-6">
						<div>
							<label htmlFor="otp" className="block text-sm font-medium text-ink mb-2">
								Enter OTP
							</label>
							<input
								id="otp"
								type="text"
								value={otp}
								onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 5))}
								placeholder="12345"
								className="w-full rounded-full border border-accent/30 px-4 py-3 text-center text-2xl font-mono focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent transition-colors hover:border-accent/50"
								maxLength={5}
								required
							/>
						</div>

						<button
							type="submit"
							disabled={isLoading || otp.length !== 5}
							className="w-full rounded-full px-8 py-4 text-lg font-medium shadow-sm bg-gradient-to-r from-accent to-green-accent hover:from-accent-strong hover:to-green-accent/80 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
						>
							{isLoading ? 'Verifying...' : 'Verify OTP'}
						</button>

						<div className="text-center space-y-2">
							<button
								type="button"
								onClick={handleResendOTP}
								disabled={isLoading}
								className="text-sm text-muted hover:text-ink transition-colors disabled:opacity-50"
							>
								Resend OTP
							</button>
							<div>
								<a 
									href="/admin-login" 
									className="text-sm text-muted hover:text-ink transition-colors"
								>
									← Back to Login
								</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</main>
	)
}
