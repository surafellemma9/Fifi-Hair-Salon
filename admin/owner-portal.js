// Owner Portal JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the portal
    loadAppointments();
    updateStatistics();
    setupEventListeners();
    initializeCharts();
});

// Event listeners setup
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', filterAppointments);

    // Status filter
    const statusFilter = document.getElementById('statusFilter');
    statusFilter.addEventListener('change', filterAppointments);

    // Refresh button
    const refreshBtn = document.getElementById('refreshBtn');
    refreshBtn.addEventListener('click', function() {
        loadAppointments();
        updateStatistics();
        updateCharts();
    });

    // Modal close functionality
    const modal = document.getElementById('appointmentModal');
    const confirmModal = document.getElementById('confirmModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
        if (event.target === confirmModal) {
            confirmModal.style.display = 'none';
        }
    });

    // Confirmation modal buttons
    document.getElementById('confirmBtn').addEventListener('click', function() {
        const action = this.dataset.action;
        const appointmentId = this.dataset.appointmentId;
        
        if (action === 'confirm') {
            updateAppointmentStatus(appointmentId, 'confirmed');
        } else if (action === 'cancel') {
            updateAppointmentStatus(appointmentId, 'cancelled');
        } else if (action === 'delete') {
            deleteAppointment(appointmentId);
        }
        
        confirmModal.style.display = 'none';
        loadAppointments();
        updateStatistics();
        updateCharts();
    });

    document.getElementById('cancelBtn').addEventListener('click', function() {
        confirmModal.style.display = 'none';
    });
}

// Load and display appointments
function loadAppointments() {
    const appointments = getAppointments();
    const tbody = document.getElementById('appointmentsTableBody');
    const noAppointments = document.getElementById('noAppointments');
    
    if (appointments.length === 0) {
        tbody.innerHTML = '';
        noAppointments.style.display = 'block';
        return;
    }
    
    noAppointments.style.display = 'none';
    
    // Sort appointments by date (newest first)
    appointments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    tbody.innerHTML = appointments.map(appointment => `
        <tr>
            <td>
                <strong>${appointment.name}</strong>
            </td>
            <td>
                <div>${appointment.email}</div>
                <div style="color: #666; font-size: 0.9rem;">${appointment.phone}</div>
            </td>
            <td>
                <span style="text-transform: capitalize;">${appointment.service}</span>
            </td>
            <td>
                <div>${formatDate(appointment.date)}</div>
                <div style="color: #666; font-size: 0.9rem;">${formatTime(appointment.time)}</div>
            </td>
            <td>
                <span class="status-badge status-${appointment.status}">${appointment.status}</span>
            </td>
            <td>
                <div style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;">
                    ${appointment.notes || 'No notes'}
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="viewAppointment(${appointment.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    ${appointment.status === 'pending' ? `
                        <button class="btn btn-success" onclick="confirmAction('confirm', ${appointment.id})">
                            <i class="fas fa-check"></i> Confirm
                        </button>
                        <button class="btn btn-danger" onclick="confirmAction('cancel', ${appointment.id})">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                    ` : ''}
                    <button class="btn btn-danger" onclick="confirmAction('delete', ${appointment.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Filter appointments based on search and status
function filterAppointments() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const appointments = getAppointments();
    
    let filteredAppointments = appointments.filter(appointment => {
        const matchesSearch = appointment.name.toLowerCase().includes(searchTerm) ||
                            appointment.email.toLowerCase().includes(searchTerm) ||
                            appointment.phone.includes(searchTerm) ||
                            appointment.service.toLowerCase().includes(searchTerm);
        
        const matchesStatus = !statusFilter || appointment.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
    
    // Update the display
    const tbody = document.getElementById('appointmentsTableBody');
    const noAppointments = document.getElementById('noAppointments');
    
    if (filteredAppointments.length === 0) {
        tbody.innerHTML = '';
        noAppointments.style.display = 'block';
        return;
    }
    
    noAppointments.style.display = 'none';
    
    // Sort filtered appointments by date (newest first)
    filteredAppointments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    tbody.innerHTML = filteredAppointments.map(appointment => `
        <tr>
            <td>
                <strong>${appointment.name}</strong>
            </td>
            <td>
                <div>${appointment.email}</div>
                <div style="color: #666; font-size: 0.9rem;">${appointment.phone}</div>
            </td>
            <td>
                <span style="text-transform: capitalize;">${appointment.service}</span>
            </td>
            <td>
                <div>${formatDate(appointment.date)}</div>
                <div style="color: #666; font-size: 0.9rem;">${formatTime(appointment.time)}</div>
            </td>
            <td>
                <span class="status-badge status-${appointment.status}">${appointment.status}</span>
            </td>
            <td>
                <div style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;">
                    ${appointment.notes || 'No notes'}
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="viewAppointment(${appointment.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    ${appointment.status === 'pending' ? `
                        <button class="btn btn-success" onclick="confirmAction('confirm', ${appointment.id})">
                            <i class="fas fa-check"></i> Confirm
                        </button>
                        <button class="btn btn-danger" onclick="confirmAction('cancel', ${appointment.id})">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                    ` : ''}
                    <button class="btn btn-danger" onclick="confirmAction('delete', ${appointment.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// View appointment details
function viewAppointment(id) {
    const appointments = getAppointments();
    const appointment = appointments.find(apt => apt.id == id);
    
    if (!appointment) return;
    
    const modal = document.getElementById('appointmentModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <div style="line-height: 1.8;">
            <h3 style="color: #667eea; margin-bottom: 1rem;">Appointment Details</h3>
            <p><strong>Name:</strong> ${appointment.name}</p>
            <p><strong>Email:</strong> ${appointment.email}</p>
            <p><strong>Phone:</strong> ${appointment.phone}</p>
            <p><strong>Service:</strong> ${appointment.service}</p>
            <p><strong>Date:</strong> ${formatDate(appointment.date)}</p>
            <p><strong>Time:</strong> ${formatTime(appointment.time)}</p>
            <p><strong>Status:</strong> <span class="status-badge status-${appointment.status}">${appointment.status}</span></p>
            <p><strong>Notes:</strong> ${appointment.notes || 'No additional notes'}</p>
            <p><strong>Booked on:</strong> ${formatDateTime(appointment.createdAt)}</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Confirm action modal
function confirmAction(action, appointmentId) {
    const confirmModal = document.getElementById('confirmModal');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmBtn = document.getElementById('confirmBtn');
    
    let message = '';
    let buttonText = '';
    let buttonClass = '';
    
    switch(action) {
        case 'confirm':
            message = 'Are you sure you want to confirm this appointment?';
            buttonText = 'Confirm Appointment';
            buttonClass = 'btn-success';
            break;
        case 'cancel':
            message = 'Are you sure you want to cancel this appointment?';
            buttonText = 'Cancel Appointment';
            buttonClass = 'btn-danger';
            break;
        case 'delete':
            message = 'Are you sure you want to delete this appointment? This action cannot be undone.';
            buttonText = 'Delete Appointment';
            buttonClass = 'btn-danger';
            break;
    }
    
    confirmMessage.textContent = message;
    confirmBtn.textContent = buttonText;
    confirmBtn.className = `btn ${buttonClass}`;
    confirmBtn.dataset.action = action;
    confirmBtn.dataset.appointmentId = appointmentId;
    
    confirmModal.style.display = 'block';
}

// Update statistics
function updateStatistics() {
    const appointments = getAppointments();
    
    const total = appointments.length;
    const pending = appointments.filter(apt => apt.status === 'pending').length;
    const confirmed = appointments.filter(apt => apt.status === 'confirmed').length;
    const cancelled = appointments.filter(apt => apt.status === 'cancelled').length;
    
    document.getElementById('totalAppointments').textContent = total;
    document.getElementById('pendingAppointments').textContent = pending;
    document.getElementById('confirmedAppointments').textContent = confirmed;
    document.getElementById('cancelledAppointments').textContent = cancelled;
}

// Initialize charts
function initializeCharts() {
    updateCharts();
}

// Update charts
function updateCharts() {
    const appointments = getAppointments();
    
    // Service chart
    const serviceData = {};
    appointments.forEach(apt => {
        serviceData[apt.service] = (serviceData[apt.service] || 0) + 1;
    });
    
    const serviceCtx = document.getElementById('serviceChart').getContext('2d');
    new Chart(serviceCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(serviceData),
            datasets: [{
                data: Object.values(serviceData),
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#f093fb',
                    '#f5576c',
                    '#4facfe'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
    // Status chart
    const statusData = {
        'pending': appointments.filter(apt => apt.status === 'pending').length,
        'confirmed': appointments.filter(apt => apt.status === 'confirmed').length,
        'cancelled': appointments.filter(apt => apt.status === 'cancelled').length
    };
    
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    new Chart(statusCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(statusData).map(status => status.charAt(0).toUpperCase() + status.slice(1)),
            datasets: [{
                label: 'Appointments',
                data: Object.values(statusData),
                backgroundColor: [
                    '#ffc107',
                    '#28a745',
                    '#dc3545'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}
