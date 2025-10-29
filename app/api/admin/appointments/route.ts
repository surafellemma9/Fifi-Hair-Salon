import DatabaseManager from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'

// Initialize database manager
const db = DatabaseManager.getInstance()

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const date = searchParams.get('date')
		const status = searchParams.get('status')
		
		// Get appointments with optional filtering
		const filters: { date?: string; status?: string } = {}
		if (date) filters.date = date
		if (status) filters.status = status
		
		const appointments = db.getAppointments(filters)
		
		return NextResponse.json({ 
			appointments,
			total: appointments.length
		})

	} catch (error) {
		console.error('Error fetching appointments:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch appointments' },
			{ status: 500 }
		)
	}
}

export async function POST(request: NextRequest) {
	try {
		const appointmentData = await request.json()
		
		// Validate required fields
		const requiredFields = ['firstName', 'lastName', 'service', 'date', 'time', 'phone', 'email']
		for (const field of requiredFields) {
			if (!appointmentData[field]) {
				return NextResponse.json(
					{ error: `Missing required field: ${field}` },
					{ status: 400 }
				)
			}
		}
		
		// Set default status if not provided
		if (!appointmentData.status) {
			appointmentData.status = 'scheduled'
		}
		
		// Create new appointment using database
		const result = db.createAppointment(appointmentData)
		
		if (!result.success) {
			return NextResponse.json(
				{ error: result.errors?.join(', ') || 'Failed to create appointment' },
				{ status: 400 }
			)
		}
		
		return NextResponse.json({ 
			appointment: result.appointment,
			message: 'Appointment created successfully'
		}, { status: 201 })

	} catch (error) {
		console.error('Error creating appointment:', error)
		return NextResponse.json(
			{ error: 'Failed to create appointment' },
			{ status: 500 }
		)
	}
}

export async function PUT(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const id = searchParams.get('id')
		
		if (!id) {
			return NextResponse.json(
				{ error: 'Appointment ID is required' },
				{ status: 400 }
			)
		}
		
		const updateData = await request.json()
		
		// Update appointment using database
		const result = db.updateAppointment(id, updateData)
		
		if (!result.success) {
			return NextResponse.json(
				{ error: result.errors?.join(', ') || 'Failed to update appointment' },
				{ status: 400 }
			)
		}
		
		return NextResponse.json({ 
			appointment: result.appointment,
			message: 'Appointment updated successfully'
		})

	} catch (error) {
		console.error('Error updating appointment:', error)
		return NextResponse.json(
			{ error: 'Failed to update appointment' },
			{ status: 500 }
		)
	}
}

export async function PATCH(request: NextRequest) {
	try {
		const { id, status } = await request.json()

		if (!id || !status) {
			return NextResponse.json(
				{ error: 'Appointment ID and status are required' },
				{ status: 400 }
			)
		}

		const validStatuses = ['scheduled', 'completed', 'cancelled', 'no-show']
		if (!validStatuses.includes(status)) {
			return NextResponse.json(
				{ error: 'Invalid status. Must be one of: scheduled, completed, cancelled, no-show' },
				{ status: 400 }
			)
		}

		// Update appointment status using database
		const result = db.updateAppointmentStatus(id, status)

		if (!result.success) {
			return NextResponse.json(
				{ error: result.errors?.join(', ') || 'Failed to update appointment status' },
				{ status: 400 }
			)
		}

		return NextResponse.json({
			appointment: result.appointment,
			message: 'Appointment status updated successfully'
		})

	} catch (error) {
		console.error('Error updating appointment status:', error)
		return NextResponse.json(
			{ error: 'Failed to update appointment status' },
			{ status: 500 }
		)
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const id = searchParams.get('id')
		
		if (!id) {
			return NextResponse.json(
				{ error: 'Appointment ID is required' },
				{ status: 400 }
			)
		}
		
		// Delete appointment using database
		const result = db.deleteAppointment(id)
		
		if (!result.success) {
			return NextResponse.json(
				{ error: result.errors?.join(', ') || 'Failed to delete appointment' },
				{ status: 400 }
			)
		}
		
		return NextResponse.json({ 
			message: 'Appointment deleted successfully'
		})

	} catch (error) {
		console.error('Error deleting appointment:', error)
		return NextResponse.json(
			{ error: 'Failed to delete appointment' },
			{ status: 500 }
		)
	}
}