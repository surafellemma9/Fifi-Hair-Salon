import UnifiedDatabaseManager from '@/lib/database-manager'
import { NextRequest, NextResponse } from 'next/server'

// Initialize database manager (auto-switches between SQLite and Supabase)
const db = UnifiedDatabaseManager.getInstance()

export async function GET(request: NextRequest) {
	try {
		// Get appointment statistics
		const stats = await Promise.resolve(db.getStats())
		
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
