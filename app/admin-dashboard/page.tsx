"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Appointment {
	id: string
	firstName: string
	lastName: string
	service: string
	date: string
	time: string
	phone: string
	email: string
	notes?: string
	createdAt: string
}

export default function AdminDashboard() {
	const router = useRouter()
	const [appointments, setAppointments] = useState<Appointment[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState('')
	const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

	useEffect(() => {
		// Check if admin is authenticated
		const isAuthenticated = localStorage.getItem('admin_authenticated')
		const loginTime = localStorage.getItem('admin_login_time')
		
		if (!isAuthenticated || !loginTime) {
			router.push('/admin-login')
			return
		}

		// Check if session is expired (24 hours)
		const now = Date.now()
		const sessionTime = parseInt(loginTime)
		if (now - sessionTime > 24 * 60 * 60 * 1000) {
			localStorage.removeItem('admin_authenticated')
			localStorage.removeItem('admin_login_time')
			router.push('/admin-login')
			return
		}

		fetchAppointments()
	}, [router])

	const fetchAppointments = async () => {
		try {
			const response = await fetch('/api/admin/appointments')
			const data = await response.json()

			if (response.ok) {
				setAppointments(data.appointments || [])
			} else {
				setError(data.error || 'Failed to fetch appointments')
			}
		} catch (err) {
			setError('Network error. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('admin_authenticated')
		localStorage.removeItem('admin_login_time')
		router.push('/admin-login')
	}

	const getTodaysAppointments = () => {
		const today = new Date().toISOString().split('T')[0]
		return appointments.filter(apt => apt.date === today)
	}

	const getAppointmentsByDate = (date: string) => {
		return appointments.filter(apt => apt.date === date)
	}

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	const todaysAppointments = getTodaysAppointments()
	const selectedDateAppointments = getAppointmentsByDate(selectedDate)

	if (isLoading) {
		return (
			<main className="min-h-screen bg-gradient-to-br from-pink-light to-green-light flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
					<p className="text-muted">Loading dashboard...</p>
				</div>
			</main>
		)
	}

	return (
		<main className="min-h-screen bg-gradient-to-br from-pink-light to-green-light p-4">
			<div className="container max-w-6xl mx-auto">
				{/* Header */}
				<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft ring-1 ring-accent/20 mb-6 relative overflow-hidden">
					<div className="absolute top-0 right-0 w-32 h-32 bg-green-accent/10 rounded-full blur-3xl"></div>
					<div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
					
					<div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="font-serif text-3xl text-ink mb-2">Admin Dashboard</h1>
							<p className="text-muted">Manage your salon appointments</p>
						</div>
						<button
							onClick={handleLogout}
							className="px-4 py-2 rounded-full border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
						>
							Logout
						</button>
					</div>
				</div>

				{error && (
					<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
						<p className="text-red-800 text-center">{error}</p>
					</div>
				)}

				{/* Stats Cards */}
				<div className="grid md:grid-cols-3 gap-6 mb-8">
					<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft ring-1 ring-accent/20">
						<h3 className="font-serif text-xl text-ink mb-2">Today's Appointments</h3>
						<p className="text-3xl font-bold text-accent">{todaysAppointments.length}</p>
						<p className="text-sm text-muted">{formatDate(new Date().toISOString().split('T')[0])}</p>
					</div>
					<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft ring-1 ring-accent/20">
						<h3 className="font-serif text-xl text-ink mb-2">Total Appointments</h3>
						<p className="text-3xl font-bold text-green-accent">{appointments.length}</p>
						<p className="text-sm text-muted">All time</p>
					</div>
					<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft ring-1 ring-accent/20">
						<h3 className="font-serif text-xl text-ink mb-2">This Week</h3>
						<p className="text-3xl font-bold text-green-dark">
							{appointments.filter(apt => {
								const aptDate = new Date(apt.date)
								const now = new Date()
								const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
								return aptDate >= weekAgo && aptDate <= now
							}).length}
						</p>
						<p className="text-sm text-muted">Last 7 days</p>
					</div>
				</div>

				{/* Date Filter */}
				<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft ring-1 ring-accent/20 mb-6">
					<h3 className="font-serif text-xl text-ink mb-4">Filter by Date</h3>
					<input
						type="date"
						value={selectedDate}
						onChange={(e) => setSelectedDate(e.target.value)}
						className="rounded-full border border-accent/30 px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
					/>
				</div>

				{/* Appointments List */}
				<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft ring-1 ring-accent/20">
					<h3 className="font-serif text-xl text-ink mb-4">
						Appointments for {formatDate(selectedDate)}
					</h3>
					
					{selectedDateAppointments.length === 0 ? (
						<p className="text-muted text-center py-8">No appointments scheduled for this date.</p>
					) : (
						<div className="space-y-4">
							{selectedDateAppointments.map((appointment) => (
								<div key={appointment.id} className="border border-accent/20 rounded-2xl p-4 hover:shadow-md transition-shadow">
									<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
										<div className="flex-1">
											<h4 className="font-serif text-lg text-ink">
												{appointment.firstName} {appointment.lastName}
											</h4>
											<p className="text-muted">{appointment.service}</p>
											<p className="text-sm text-muted">
												{appointment.time} • {appointment.phone} • {appointment.email}
											</p>
											{appointment.notes && (
												<p className="text-sm text-muted mt-2 italic">
													Notes: {appointment.notes}
												</p>
											)}
										</div>
										<div className="text-right">
											<p className="text-sm text-muted">
												Booked: {new Date(appointment.createdAt).toLocaleDateString()}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</main>
	)
}
