# Fifi Hair Salon Website

A modern, responsive website for Fifi Hair Salon with appointment booking functionality and an owner portal for managing appointments.

## Features

### Customer Website (`index.html`)
- **Modern Design**: Beautiful, responsive layout with gradient backgrounds and smooth animations
- **Service Information**: Showcase of salon services including haircuts, coloring, treatments, and styling
- **Appointment Booking**: Easy-to-use form for customers to book appointments
- **Contact Information**: Salon location, phone, email, and hours
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### Owner Portal (`owner-portal.html`)
- **Dashboard Overview**: Statistics showing total, pending, confirmed, and cancelled appointments
- **Appointment Management**: View, confirm, cancel, or delete appointments
- **Search & Filter**: Find appointments by name, email, phone, or service type
- **Status Management**: Change appointment status (pending, confirmed, cancelled)
- **Visual Charts**: Pie chart for services and bar chart for appointment status
- **Real-time Updates**: All changes are saved and displayed immediately

## How to Use

### For Customers
1. Open `index.html` in your web browser
2. Browse the services and salon information
3. Click "Book Now" or scroll to the booking section
4. Fill out the appointment form with your details
5. Select your preferred service, date, and time
6. Submit the form - you'll see a confirmation message

### For Salon Owner
1. Open `owner-portal.html` in your web browser
2. View the dashboard for appointment statistics
3. Use the appointments table to manage bookings:
   - **View**: Click "View" to see full appointment details
   - **Confirm**: Click "Confirm" to approve pending appointments
   - **Cancel**: Click "Cancel" to cancel appointments
   - **Delete**: Click "Delete" to remove appointments permanently
4. Use search and filter options to find specific appointments
5. View charts for service and status analytics

## Technical Details

- **Storage**: All appointment data is stored in the browser's localStorage
- **No Backend Required**: The website works entirely in the browser
- **Responsive**: Built with CSS Grid and Flexbox for perfect mobile experience
- **Modern JavaScript**: Uses ES6+ features and modern DOM manipulation
- **Charts**: Interactive charts powered by Chart.js library

## File Structure

```
Fifi Hair Salon/
├── index.html              # Main customer website
├── owner-portal.html       # Owner management portal
├── styles.css             # Main stylesheet
├── owner-styles.css       # Owner portal specific styles
├── script.js              # Main website JavaScript
├── owner-portal.js        # Owner portal JavaScript
└── README.md              # This file
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Getting Started

1. Download all files to a folder
2. Open `index.html` in your web browser
3. Start booking appointments and managing them through the owner portal!

## Notes

- Appointment data is stored locally in your browser
- To share data between devices, you would need to implement a backend database
- The website is ready to use immediately - no installation required
