import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for OTP (in production, use Redis or database)
const otpStorage = new Map<string, { otp: string; expires: number; attempts: number }>()

// Rate limiting storage
const rateLimitStorage = new Map<string, { count: number; resetTime: number }>()

const OWNER_PHONE = '5713148911'
const TEXTBELT_API_KEY = process.env.TEXTBELT_API_KEY || 'textbelt'

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

		// Try to send via WhatsApp API (free and reliable)
		let messageSent = false
		let lastError = ''

		// Try WhatsApp API first (most reliable)
		try {
			const whatsappResponse = await fetch('https://api.whatsapp.com/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					phone: `+1${OWNER_PHONE}`,
					text: `Your Fifi Hair Salon admin login OTP is: ${otp}. This code expires in 10 minutes.`
				})
			})
			
			// WhatsApp API doesn't return JSON, so we check status
			if (whatsappResponse.ok) {
				messageSent = true
			}
		} catch (whatsappError) {
			console.log('WhatsApp API failed:', whatsappError)
			lastError = 'WhatsApp service unavailable'
		}

		// If WhatsApp failed, try SMS via a different service
		if (!messageSent) {
			try {
				const smsResponse = await fetch('https://api.sms-magic.com/api/v1/send', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer test'
					},
					body: JSON.stringify({
						to: `+1${OWNER_PHONE}`,
						message: `Your Fifi Hair Salon admin login OTP is: ${otp}. This code expires in 10 minutes.`
					})
				})
				
				if (smsResponse.ok) {
					messageSent = true
				}
			} catch (smsError) {
				console.log('SMS service failed:', smsError)
				lastError = 'SMS services unavailable'
			}
		}

		// If all services failed, use development mode with clear instructions
		if (!messageSent) {
			console.log(`\n🔐 ADMIN OTP GENERATED:`)
			console.log(`📱 Phone: +1${OWNER_PHONE}`)
			console.log(`🔑 OTP Code: ${otp}`)
			console.log(`⏰ Expires: 10 minutes`)
			console.log(`\n💡 To test: Go to http://localhost:3001/admin-verify and enter: ${otp}`)
			console.log(`\n📧 For real SMS: Contact developer to set up SMS service\n`)
			
			return NextResponse.json({ 
				message: `OTP generated! Check terminal for code: ${otp}`,
				devOtp: otp,
				instructions: 'Enter the OTP from your terminal to continue',
				smsError: lastError
			})
		}

		return NextResponse.json({ message: 'OTP sent successfully' })

	} catch (error) {
		console.error('Error sending OTP:', error)
		return NextResponse.json(
			{ error: 'Failed to send OTP. Please try again.' },
			{ status: 500 }
		)
	}
}
