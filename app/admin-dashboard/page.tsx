"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Appointment {
	id: string
	firstName: string
	lastName: string
	service: string
	servicePrice: number
	date: string
	time: string
	phone: string
	email: string
	notes?: string
	status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
	createdAt: string
	updatedAt: string
}

interface Stats {
	total: number
	today: number
	thisWeek: number
	byStatus: Record<string, number>
	totalRevenue: number
	todayRevenue: number
	thisWeekRevenue: number
	pendingRevenue: number
	todayPendingRevenue: number
	thisWeekPendingRevenue: number
}

export default function AdminDashboard() {
	const router = useRouter()
	const [appointments, setAppointments] = useState<Appointment[]>([])
	const [stats, setStats] = useState<Stats | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState('')
	const [selectedDate, setSelectedDate] = useState('')
	const [selectedStatus, setSelectedStatus] = useState<string>('all')

	useEffect(() => {
		fetchAppointments()
		fetchStats()
	}, [])

	useEffect(() => {
		fetchAppointments()
	}, [selectedDate, selectedStatus])

	// Auto-refresh every 30 seconds to show new appointments
	useEffect(() => {
		const interval = setInterval(() => {
			fetchAppointments()
			fetchStats()
		}, 30000) // 30 seconds

		return () => clearInterval(interval)
	}, [selectedDate, selectedStatus])

	const fetchAppointments = async () => {
		try {
			const params = new URLSearchParams()
			if (selectedDate) params.append('date', selectedDate)
			if (selectedStatus !== 'all') params.append('status', selectedStatus)
			
			const response = await fetch(`/api/admin/appointments?${params.toString()}`)
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

	const fetchStats = async () => {
		try {
			const response = await fetch('/api/admin/stats')
			const data = await response.json()

			if (response.ok) {
				setStats(data.stats)
			}
		} catch (err) {
			console.error('Failed to fetch stats:', err)
		}
	}

	const handleLogout = () => {
		router.push('/')
	}

	const updateAppointmentStatus = async (id: string, status: 'scheduled' | 'completed' | 'cancelled' | 'no-show') => {
		try {
			const response = await fetch('/api/admin/appointments', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id, status }),
			})

			if (response.ok) {
				// Refresh appointments and stats
				fetchAppointments()
				fetchStats()
			} else {
				const error = await response.json()
				setError(error.error || 'Failed to update appointment status')
			}
		} catch (err) {
			setError('Network error. Please try again.')
		}
	}


	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}


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
						<div className="flex gap-3">
							<button
								onClick={() => {
									fetchAppointments()
									fetchStats()
								}}
								className="px-4 py-2 rounded-full border border-green-accent/30 text-green-accent hover:bg-green-accent/10 transition-colors"
							>
								🔄 Refresh
							</button>
							<button
								onClick={handleLogout}
								className="px-4 py-2 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors"
							>
								Back to Home
							</button>
						</div>
					</div>
				</div>

				{error && (
					<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
						<p className="text-red-800 text-center">{error}</p>
					</div>
				)}

				{/* Stats Cards */}
				<div className="grid md:grid-cols-4 gap-6 mb-8">
					<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft ring-1 ring-accent/20">
						<h3 className="font-serif text-xl text-ink mb-2">Today's Appointments</h3>
						<p className="text-3xl font-bold text-accent">{stats?.today || 0}</p>
						<p className="text-sm text-muted">{formatDate(new Date().toISOString().split('T')[0])}</p>
					</div>
					<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft ring-1 ring-accent/20">
						<h3 className="font-serif text-xl text-ink mb-2">Completed Revenue</h3>
						<p className="text-3xl font-bold text-green-accent">${(stats?.totalRevenue || 0).toLocaleString()}</p>
						<p className="text-sm text-muted">From completed services</p>
					</div>
					<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft ring-1 ring-accent/20">
						<h3 className="font-serif text-xl text-ink mb-2">Pending Revenue</h3>
						<p className="text-3xl font-bold text-orange-500">${(stats?.pendingRevenue || 0).toLocaleString()}</p>
						<p className="text-sm text-muted">From scheduled appointments</p>
					</div>
					<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft ring-1 ring-accent/20">
						<h3 className="font-serif text-xl text-ink mb-2">This Week's Revenue</h3>
						<p className="text-3xl font-bold text-green-dark">${(stats?.thisWeekRevenue || 0).toLocaleString()}</p>
						<p className="text-sm text-muted">Completed this week</p>
					</div>
				</div>

				{/* Filters */}
				<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft ring-1 ring-accent/20 mb-6">
					<h3 className="font-serif text-xl text-ink mb-4">Filters</h3>
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="flex-1">
							<label className="block text-sm font-medium text-ink mb-2">Date</label>
							<div className="flex gap-2">
								<input
									type="date"
									value={selectedDate}
									onChange={(e) => setSelectedDate(e.target.value)}
									className="flex-1 rounded-full border border-accent/30 px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
								/>
								<button
									type="button"
									onClick={() => setSelectedDate('')}
									className="px-4 py-2 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors whitespace-nowrap"
								>
									Show All
								</button>
							</div>
						</div>
						<div className="flex-1">
							<label className="block text-sm font-medium text-ink mb-2">Status</label>
							<select
								value={selectedStatus}
								onChange={(e) => setSelectedStatus(e.target.value)}
								className="w-full rounded-full border border-accent/30 px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
							>
								<option value="all">All Statuses</option>
								<option value="scheduled">Scheduled</option>
								<option value="completed">Completed</option>
								<option value="cancelled">Cancelled</option>
								<option value="no-show">No Show</option>
							</select>
						</div>
					</div>
				</div>

				{/* Appointments List */}
				<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft ring-1 ring-accent/20">
					<h3 className="font-serif text-xl text-ink mb-4">
						Appointments {selectedStatus !== 'all' ? `(${selectedStatus})` : ''} {selectedDate ? `for ${formatDate(selectedDate)}` : '(All dates)'}
					</h3>
					
					{appointments.length === 0 ? (
						<p className="text-muted text-center py-8">No appointments found with the current filters.</p>
					) : (
						<div className="space-y-4">
							{appointments.map((appointment) => (
								<div key={appointment.id} className="border border-accent/20 rounded-2xl p-4 hover:shadow-md transition-shadow">
									<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-2">
												<h4 className="font-serif text-lg text-ink">
													{appointment.firstName} {appointment.lastName}
												</h4>
												<span className={`px-3 py-1 rounded-full text-xs font-medium ${
													appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
													appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
													appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
													'bg-gray-100 text-gray-800'
												}`}>
													{appointment.status.replace('-', ' ').toUpperCase()}
												</span>
											</div>
											<p className="text-muted">{appointment.service} • ${appointment.servicePrice}</p>
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
												<p className="text-xs text-muted">
													Updated: {new Date(appointment.updatedAt).toLocaleDateString()}
												</p>
												<div className="mt-3 flex flex-wrap gap-2">
													{appointment.status !== 'completed' && (
														<button
															onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
															className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors"
														>
															✓ Mark Complete
														</button>
													)}
													{appointment.status !== 'scheduled' && (
														<button
															onClick={() => updateAppointmentStatus(appointment.id, 'scheduled')}
															className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
														>
															↩ Mark Pending
														</button>
													)}
													{appointment.status !== 'cancelled' && (
														<button
															onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
															className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors"
														>
															✕ Cancel
														</button>
													)}
													{appointment.status !== 'no-show' && (
														<button
															onClick={() => updateAppointmentStatus(appointment.id, 'no-show')}
															className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
														>
															👻 No Show
														</button>
													)}
												</div>
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
