import DatabaseManager from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'

// Initialize database manager
const db = DatabaseManager.getInstance()

export async function GET(request: NextRequest) {
	try {
		// Get appointment statistics
		const stats = db.getStats()
		
		return NextResponse.json({ 
			stats
		})

	} catch (error) {
		console.error('Error fetching statistics:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch statistics' },
			{ status: 500 }
		)
	}
}
