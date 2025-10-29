import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for OTP (in production, use Redis or database)
const otpStorage = new Map<string, { otp: string; expires: number; attempts: number }>()

export async function POST(request: NextRequest) {
	try {
		const { otp } = await request.json()
		const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
		const otpKey = `otp_${ip}`
		
		// Get stored OTP data
		const otpData = otpStorage.get(otpKey)
		
		if (!otpData) {
			return NextResponse.json(
				{ error: 'No OTP found. Please request a new one.' },
				{ status: 400 }
			)
		}

		// Check if OTP has expired
		if (Date.now() > otpData.expires) {
			otpStorage.delete(otpKey)
			return NextResponse.json(
				{ error: 'OTP has expired. Please request a new one.' },
				{ status: 400 }
			)
		}

		// Check attempt limit
		if (otpData.attempts >= 3) {
			otpStorage.delete(otpKey)
			return NextResponse.json(
				{ error: 'Too many failed attempts. Please request a new OTP.' },
				{ status: 400 }
			)
		}

		// Verify OTP
		if (otp !== otpData.otp) {
			otpData.attempts++
			otpStorage.set(otpKey, otpData)
			
			return NextResponse.json(
				{ error: 'Invalid OTP. Please try again.' },
				{ status: 400 }
			)
		}

		// OTP is valid, clean up and return success
		otpStorage.delete(otpKey)
		
		return NextResponse.json({ 
			message: 'OTP verified successfully',
			authenticated: true
		})

	} catch (error) {
		console.error('Error verifying OTP:', error)
		return NextResponse.json(
			{ error: 'Failed to verify OTP. Please try again.' },
			{ status: 500 }
		)
	}
}
