# Admin Authentication Setup

This document explains how to set up the admin authentication system with OTP for Fifi Hair Salon.

## Features

- **Admin Login Button**: Small, unobtrusive button at the bottom of the website
- **OTP Authentication**: 5-digit one-time passcode sent to owner's phone (571-314-8911)
- **Admin Dashboard**: View appointment counts and details
- **Security Features**: Rate limiting, session management, and attempt limits

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables (Optional)

Create a `.env.local` file in the root directory with the following variables:

```env
# Textbelt API Key (optional - works without it)
TEXTBELT_API_KEY=textbelt

# Owner's Phone Number (where OTP will be sent)
OWNER_PHONE=5713148911

# Next.js Configuration
NEXT_PUBLIC_CALENDLY_URL=your_calendly_url_here
```

### 3. SMS Service Setup

**Textbelt (Free Service - Default)**
- No signup required
- Free tier: 1 SMS per day per phone number
- Works immediately without configuration
- Secure and reliable

**Optional: Get More SMS Credits**
- Visit https://textbelt.com/purchase/ to buy credits
- Add your API key to `.env.local` for unlimited SMS
- Cost: $0.10 per SMS after free tier

### 4. Development Mode

In development mode, OTPs are logged to the console instead of being sent via SMS. Check your terminal for the OTP when testing.

## How It Works

### 1. Admin Login Flow

1. User clicks "Admin" button in footer
2. Redirected to `/admin-login` page
3. Clicks "Send OTP to Phone" button
4. OTP is generated and sent to owner's phone (571-314-8911)
5. Redirected to `/admin-verify` page
6. Enters 5-digit OTP
7. If correct, redirected to `/admin-dashboard`

### 2. Security Features

- **Rate Limiting**: Max 3 OTP requests per 5 minutes per IP
- **OTP Expiration**: OTPs expire after 10 minutes
- **Attempt Limits**: Max 3 failed attempts per OTP
- **Session Management**: Admin sessions expire after 24 hours
- **IP Tracking**: OTPs are tied to IP addresses

### 3. Admin Dashboard

The dashboard shows:
- Today's appointment count
- Total appointments
- This week's appointments
- Detailed appointment list with filtering by date
- Client information and service details

## API Endpoints

### POST `/api/admin/send-otp`
- Generates and sends OTP to owner's phone
- Includes rate limiting
- Returns success/error message

### POST `/api/admin/verify-otp`
- Verifies entered OTP
- Checks expiration and attempt limits
- Returns authentication status

### GET `/api/admin/appointments`
- Returns all appointments (admin only)
- Supports date filtering
- Returns appointment details

### POST `/api/admin/appointments`
- Creates new appointment
- Used by booking form
- Validates required fields

## File Structure

```
app/
├── admin-login/
│   └── page.tsx          # Admin login page
├── admin-verify/
│   └── page.tsx          # OTP verification page
├── admin-dashboard/
│   └── page.tsx          # Admin dashboard
└── api/admin/
    ├── send-otp/
    │   └── route.ts      # OTP generation and SMS
    ├── verify-otp/
    │   └── route.ts      # OTP verification
    └── appointments/
        └── route.ts      # Appointment management
```

## Security Considerations

1. **Environment Variables**: Store Twilio credentials securely
2. **HTTPS**: Use HTTPS in production for secure data transmission
3. **Rate Limiting**: Prevents brute force attacks
4. **Session Expiration**: Automatic logout after 24 hours
5. **IP Tracking**: OTPs are tied to specific IP addresses

## Production Deployment

1. Set up environment variables on your hosting platform
2. Ensure HTTPS is enabled
3. Configure Twilio webhook URLs if needed
4. Set up proper logging and monitoring
5. Consider using Redis for OTP storage in production

## Troubleshooting

### OTP Not Received
- Check Textbelt service status
- Verify phone number format (5713148911)
- Check free tier limit (1 SMS per day)
- Look for error logs in console
- Try again after 24 hours if free tier exceeded

### Rate Limiting Issues
- Wait 5 minutes between OTP requests
- Clear browser cache if needed
- Check IP address tracking

### Dashboard Not Loading
- Verify admin authentication
- Check session expiration
- Clear localStorage if needed

## Support

For issues or questions about the admin system, check the console logs and ensure all environment variables are properly configured.
