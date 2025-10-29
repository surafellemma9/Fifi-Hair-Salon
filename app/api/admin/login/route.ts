import { NextRequest, NextResponse } from 'next/server'

// Simple password authentication (in production, use proper hashing and database)
const ADMIN_PASSWORD = 'FifiHair2024!' // Change this to your desired password
const SESSION_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

// In-memory storage for active admin sessions (in production, use Redis or database)
const activeSessions = new Map<string, { expires: number }>()

export async function POST(req: NextRequest) {
	try {
		const { password } = await req.json()

		// Check password
		if (password !== ADMIN_PASSWORD) {
			return NextResponse.json(
				{ error: 'Invalid password. Please try again.' },
				{ status: 401 }
			)
		}

		// Create a session
		const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36)
		activeSessions.set(sessionId, { expires: Date.now() + SESSION_EXPIRY })

		const response = NextResponse.json({ 
			message: 'Login successful!',
			redirect: '/admin-dashboard'
		})
		
		// Set session cookie
		response.cookies.set('admin_session', sessionId, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: SESSION_EXPIRY / 1000, // in seconds
			path: '/',
		})

		return response

	} catch (error) {
		console.error('Login error:', error)
		return NextResponse.json(
			{ error: 'Login failed. Please try again.' },
			{ status: 500 }
		)
	}
}

export async function GET(req: NextRequest) {
	const sessionId = req.cookies.get('admin_session')?.value
	
	if (!sessionId) {
		return NextResponse.json({ authenticated: false }, { status: 401 })
	}

	const session = activeSessions.get(sessionId)
	if (!session || Date.now() > session.expires) {
		activeSessions.delete(sessionId) // Clean up expired session
		return NextResponse.json({ authenticated: false }, { status: 401 })
	}

	// Refresh session expiry
	activeSessions.set(sessionId, { expires: Date.now() + SESSION_EXPIRY })
	return NextResponse.json({ authenticated: true })
}

export async function DELETE(req: NextRequest) {
	const sessionId = req.cookies.get('admin_session')?.value
	if (sessionId) {
		activeSessions.delete(sessionId)
	}
	
	const response = NextResponse.json({ message: 'Logged out successfully' })
	response.cookies.set('admin_session', '', { maxAge: 0, path: '/' }) // Clear cookie
	return response
}

