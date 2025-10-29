import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for appointments (in production, use a database)
let appointments: Array<{
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
}> = []

// Sample data for demonstration
if (appointments.length === 0) {
	const today = new Date().toISOString().split('T')[0]
	const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
	const dayAfter = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
	
	appointments = [
		{
			id: '1',
			firstName: 'Sarah',
			lastName: 'Johnson',
			service: 'Box Braids',
			date: today,
			time: '10:00 AM',
			phone: '(555) 123-4567',
			email: 'sarah.j@email.com',
			notes: 'Medium length, natural hair',
			createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
		},
		{
			id: '2',
			firstName: 'Maria',
			lastName: 'Rodriguez',
			service: 'Hair Straightening',
			date: today,
			time: '2:00 PM',
			phone: '(555) 234-5678',
			email: 'maria.r@email.com',
			createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
		},
		{
			id: '3',
			firstName: 'Aisha',
			lastName: 'Williams',
			service: 'Cornrows',
			date: today,
			time: '4:30 PM',
			phone: '(555) 345-6789',
			email: 'aisha.w@email.com',
			notes: 'Want intricate pattern',
			createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
		},
		{
			id: '4',
			firstName: 'Jennifer',
			lastName: 'Brown',
			service: 'Weave Sewing',
			date: tomorrow,
			time: '9:00 AM',
			phone: '(555) 456-7890',
			email: 'jennifer.b@email.com',
			createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
		},
		{
			id: '5',
			firstName: 'Keisha',
			lastName: 'Davis',
			service: 'Dreadlocks',
			date: tomorrow,
			time: '1:00 PM',
			phone: '(555) 567-8901',
			email: 'keisha.d@email.com',
			notes: 'First time getting dreadlocks',
			createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
		},
		{
			id: '6',
			firstName: 'Lisa',
			lastName: 'Garcia',
			service: 'Wash & Set',
			date: dayAfter,
			time: '11:00 AM',
			phone: '(555) 678-9012',
			email: 'lisa.g@email.com',
			createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
		}
	]
}

export async function GET(request: NextRequest) {
	try {
		// In a real application, you would:
		// 1. Verify admin authentication
		// 2. Query the database for appointments
		// 3. Apply any filters or pagination
		
		const { searchParams } = new URL(request.url)
		const date = searchParams.get('date')
		
		let filteredAppointments = appointments
		
		if (date) {
			filteredAppointments = appointments.filter(apt => apt.date === date)
		}
		
		// Sort by date and time
		filteredAppointments.sort((a, b) => {
			const dateCompare = a.date.localeCompare(b.date)
			if (dateCompare !== 0) return dateCompare
			return a.time.localeCompare(b.time)
		})
		
		return NextResponse.json({ 
			appointments: filteredAppointments,
			total: filteredAppointments.length
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
		
		// Create new appointment
		const newAppointment = {
			id: (appointments.length + 1).toString(),
			...appointmentData,
			createdAt: new Date().toISOString()
		}
		
		appointments.push(newAppointment)
		
		return NextResponse.json({ 
			appointment: newAppointment,
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
