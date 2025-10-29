import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for OTP (in production, use Redis or database)
const otpStorage = new Map<string, { otp: string; expires: number; attempts: number }>()

// Rate limiting storage
const rateLimitStorage = new Map<string, { count: number; resetTime: number }>()

const OWNER_EMAIL = 'fifi.hair.salon@gmail.com' // Replace with your actual email

// Generate 5-digit OTP
function generateOTP(): string {
	return Math.floor(10000 + Math.random() * 90000).toString()
}

// Check rate limiting
function checkRateLimit(ip: string): boolean {
	const now = Date.now()
	const rateLimitKey = `rate_limit_${ip}`
	const rateLimitData = rateLimitStorage.get(rateLimitKey)
	
	if (!rateLimitData || now > rateLimitData.resetTime) {
		rateLimitStorage.set(rateLimitKey, { count: 1, resetTime: now + 5 * 60 * 1000 }) // 5 minutes
		return true
	}
	
	if (rateLimitData.count >= 3) { // Max 3 attempts per 5 minutes
		return false
	}
	
	rateLimitData.count++
	return true
}

export async function POST(request: NextRequest) {
	try {
		const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
		
		// Check rate limiting
		if (!checkRateLimit(ip)) {
			return NextResponse.json(
				{ error: 'Too many requests. Please try again in 5 minutes.' },
				{ status: 429 }
			)
		}

		// Generate OTP
		const otp = generateOTP()
		const expires = Date.now() + 10 * 60 * 1000 // 10 minutes
		const otpKey = `otp_${ip}`
		
		// Store OTP
		otpStorage.set(otpKey, { otp, expires, attempts: 0 })

		// For now, we'll use a simple approach - log the OTP and provide instructions
		console.log(`\n📧 EMAIL OTP GENERATED:`)
		console.log(`📧 Email: ${OWNER_EMAIL}`)
		console.log(`🔑 OTP Code: ${otp}`)
		console.log(`⏰ Expires: 10 minutes`)
		console.log(`\n💡 To test: Go to http://localhost:3001/admin-verify and enter: ${otp}`)
		console.log(`\n📧 In production, this would send an email to: ${OWNER_EMAIL}`)
		console.log(`📧 Email subject: "Fifi Hair Salon - Admin Login OTP"`)
		console.log(`📧 Email body: "Your admin login OTP is: ${otp}. This code expires in 10 minutes."\n`)
		
		return NextResponse.json({ 
			message: `OTP generated! Check terminal for code: ${otp}`,
			devOtp: otp,
			instructions: 'Enter the OTP from your terminal to continue',
			email: OWNER_EMAIL
		})

	} catch (error) {
		console.error('Error generating OTP:', error)
		return NextResponse.json(
			{ error: 'Failed to generate OTP. Please try again.' },
			{ status: 500 }
		)
	}
}
