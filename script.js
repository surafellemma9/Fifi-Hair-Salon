// Appointment booking functionality
document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    const successMessage = document.getElementById('successMessage');

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Handle form submission
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(appointmentForm);
        const appointment = {
            id: Date.now(), // Simple ID generation
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            date: formData.get('date'),
            time: formData.get('time'),
            notes: formData.get('notes'),
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        // Save to localStorage
        saveAppointment(appointment);

        // Show success message
        showSuccessMessage();

        // Reset form
        appointmentForm.reset();
    });

    function saveAppointment(appointment) {
        // Get existing appointments from localStorage
        let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        
        // Add new appointment
        appointments.push(appointment);
        
        // Save back to localStorage
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }

    function showSuccessMessage() {
        successMessage.style.display = 'block';
        appointmentForm.style.display = 'none';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
        
        // Hide success message and show form again after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
            appointmentForm.style.display = 'block';
        }, 5000);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to navigation items on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

// Owner portal functions
function getAppointments() {
    return JSON.parse(localStorage.getItem('appointments') || '[]');
}

function updateAppointmentStatus(id, status) {
    let appointments = getAppointments();
    const appointment = appointments.find(apt => apt.id == id);
    if (appointment) {
        appointment.status = status;
        localStorage.setItem('appointments', JSON.stringify(appointments));
        return true;
    }
    return false;
}

function deleteAppointment(id) {
    let appointments = getAppointments();
    appointments = appointments.filter(apt => apt.id != id);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    return true;
}
