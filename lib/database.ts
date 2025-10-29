import Database from 'better-sqlite3'
import { join } from 'path'

// Database interface
export interface Appointment {
  id: string
  firstName: string
  lastName: string
  service: string
  servicePrice: number
  date: string
  time: string
  phone: string
  email: string
  notes?: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
  createdAt: string
  updatedAt: string
}

// Service price mapping
const SERVICE_PRICES: Record<string, number> = {
  'box-braids': 120,
  'cornrows': 80,
  'senegalese-twist': 150,
  'goddess-braids': 180,
  'dreadlocks': 200,
  'hair-straightening': 100,
  'weave-sewing': 250,
  'wash-set': 60,
  'silk-press': 80,
  'afro-styling': 70,
  'updo': 90,
  'color-treatment': 150,
  'hair-cut': 50,
  'trim': 25,
  'deep-conditioning': 40,
  'blowout': 45,
  'braid-removal': 30,
  'hair-consultation': 25
}

// Database utility class with security measures
class DatabaseManager {
  private db: Database.Database
  private static instance: DatabaseManager

  private constructor() {
    // Create database in a secure location
    const dbPath = join(process.cwd(), 'data', 'appointments.db')
    
    // Ensure data directory exists
    const fs = require('fs')
    const dataDir = join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Initialize database with security settings
    this.db = new Database(dbPath, {
      verbose: process.env.NODE_ENV === 'development' ? console.log : undefined
    })

    // Enable WAL mode for better concurrency
    this.db.pragma('journal_mode = WAL')
    
    // Enable foreign keys
    this.db.pragma('foreign_keys = ON')
    
    // Set secure settings
    this.db.pragma('secure_delete = ON')
    
    this.initializeTables()
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager()
    }
    return DatabaseManager.instance
  }

  private initializeTables(): void {
    // Create appointments table with proper constraints and security
    const createAppointmentsTable = `
      CREATE TABLE IF NOT EXISTS appointments (
        id TEXT PRIMARY KEY,
        firstName TEXT NOT NULL CHECK(length(firstName) > 0 AND length(firstName) <= 50),
        lastName TEXT NOT NULL CHECK(length(lastName) > 0 AND length(lastName) <= 50),
        service TEXT NOT NULL CHECK(length(service) > 0 AND length(service) <= 100),
        servicePrice REAL NOT NULL CHECK(servicePrice >= 0),
        date TEXT NOT NULL CHECK(date GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
        time TEXT NOT NULL CHECK(time GLOB '[0-9]*:[0-9][0-9] [AP]M'),
        phone TEXT NOT NULL CHECK(length(phone) >= 10 AND length(phone) <= 20),
        email TEXT NOT NULL CHECK(email LIKE '%@%' AND length(email) <= 100),
        notes TEXT CHECK(length(notes) <= 500),
        status TEXT NOT NULL DEFAULT 'scheduled' CHECK(status IN ('scheduled', 'completed', 'cancelled', 'no-show')),
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `

    // Create index for better query performance
    const createIndexes = `
      CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
      CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
      CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments(email);
    `

    // Create trigger to automatically update updatedAt
    const createTrigger = `
      CREATE TRIGGER IF NOT EXISTS update_appointments_updated_at
      AFTER UPDATE ON appointments
      BEGIN
        UPDATE appointments SET updatedAt = datetime('now') WHERE id = NEW.id;
      END
    `

    this.db.exec(createAppointmentsTable)
    this.db.exec(createIndexes)
    this.db.exec(createTrigger)

    // Check if servicePrice column exists, if not add it
    try {
      this.db.prepare('SELECT servicePrice FROM appointments LIMIT 1').get()
    } catch (error) {
      // Column doesn't exist, add it
      this.db.exec('ALTER TABLE appointments ADD COLUMN servicePrice REAL DEFAULT 0')
      console.log('Added servicePrice column to existing database')
    }

    // Database is ready - no sample data needed
  }


  // Get service price from service name
  private getServicePrice(serviceName: string): number {
    const normalizedService = serviceName.toLowerCase().replace(/\s+/g, '-')
    return SERVICE_PRICES[normalizedService] || 0
  }

  // Input validation and sanitization
  private validateAppointment(data: Partial<Appointment>): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (data.firstName && (data.firstName.length === 0 || data.firstName.length > 50)) {
      errors.push('First name must be between 1 and 50 characters')
    }

    if (data.lastName && (data.lastName.length === 0 || data.lastName.length > 50)) {
      errors.push('Last name must be between 1 and 50 characters')
    }

    if (data.service && (data.service.length === 0 || data.service.length > 100)) {
      errors.push('Service must be between 1 and 100 characters')
    }

    if (data.servicePrice !== undefined && (data.servicePrice < 0 || data.servicePrice > 10000)) {
      errors.push('Service price must be between $0 and $10,000')
    }

    if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
      errors.push('Date must be in YYYY-MM-DD format')
    }

    if (data.time && !/^\d{1,2}:\d{2} [AP]M$/.test(data.time)) {
      errors.push('Time must be in H:MM AM/PM or HH:MM AM/PM format')
    }

    if (data.phone && (data.phone.length < 10 || data.phone.length > 20)) {
      errors.push('Phone must be between 10 and 20 characters')
    }

    if (data.email && (!data.email.includes('@') || data.email.length > 100)) {
      errors.push('Email must be valid and under 100 characters')
    }

    if (data.notes && data.notes.length > 500) {
      errors.push('Notes must be under 500 characters')
    }

    if (data.status && !['scheduled', 'completed', 'cancelled', 'no-show'].includes(data.status)) {
      errors.push('Status must be one of: scheduled, completed, cancelled, no-show')
    }

    return { isValid: errors.length === 0, errors }
  }

  // Sanitize input to prevent injection attacks
  private sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/['"]/g, '') // Remove quotes that could break SQL
      .trim()
  }

  // Get all appointments with optional filtering
  public getAppointments(filters?: { date?: string; status?: string }): Appointment[] {
    let query = 'SELECT * FROM appointments'
    const params: any[] = []
    const conditions: string[] = []

    if (filters?.date) {
      conditions.push('date = ?')
      params.push(filters.date)
    }

    if (filters?.status) {
      conditions.push('status = ?')
      params.push(filters.status)
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    query += ' ORDER BY date ASC, time ASC'

    const stmt = this.db.prepare(query)
    return stmt.all(...params) as Appointment[]
  }

  // Get appointment by ID
  public getAppointmentById(id: string): Appointment | null {
    const stmt = this.db.prepare('SELECT * FROM appointments WHERE id = ?')
    return stmt.get(id) as Appointment | null
  }

  // Create new appointment
  public createAppointment(data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): { success: boolean; appointment?: Appointment; errors?: string[] } {
    const validation = this.validateAppointment(data)
    if (!validation.isValid) {
      return { success: false, errors: validation.errors }
    }

    // Sanitize inputs and set service price
    const sanitizedData = {
      ...data,
      firstName: this.sanitizeInput(data.firstName),
      lastName: this.sanitizeInput(data.lastName),
      service: this.sanitizeInput(data.service),
      servicePrice: data.servicePrice || this.getServicePrice(data.service),
      phone: this.sanitizeInput(data.phone),
      email: this.sanitizeInput(data.email),
      notes: data.notes ? this.sanitizeInput(data.notes) : null
    }

    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    const now = new Date().toISOString()

    try {
      const stmt = this.db.prepare(`
        INSERT INTO appointments (id, firstName, lastName, service, servicePrice, date, time, phone, email, notes, status, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)

      stmt.run(
        id,
        sanitizedData.firstName,
        sanitizedData.lastName,
        sanitizedData.service,
        sanitizedData.servicePrice,
        sanitizedData.date,
        sanitizedData.time,
        sanitizedData.phone,
        sanitizedData.email,
        sanitizedData.notes,
        sanitizedData.status,
        now,
        now
      )

      const appointment = this.getAppointmentById(id)
      return { success: true, appointment: appointment! }
    } catch (error) {
      console.error('Database error:', error)
      return { success: false, errors: ['Failed to create appointment'] }
    }
  }

  // Update appointment
  public updateAppointment(id: string, data: Partial<Omit<Appointment, 'id' | 'createdAt'>>): { success: boolean; appointment?: Appointment; errors?: string[] } {
    const validation = this.validateAppointment(data)
    if (!validation.isValid) {
      return { success: false, errors: validation.errors }
    }

    // Check if appointment exists
    const existing = this.getAppointmentById(id)
    if (!existing) {
      return { success: false, errors: ['Appointment not found'] }
    }

    // Sanitize inputs
    const sanitizedData = { ...data }
    if (data.firstName) sanitizedData.firstName = this.sanitizeInput(data.firstName)
    if (data.lastName) sanitizedData.lastName = this.sanitizeInput(data.lastName)
    if (data.service) sanitizedData.service = this.sanitizeInput(data.service)
    if (data.phone) sanitizedData.phone = this.sanitizeInput(data.phone)
    if (data.email) sanitizedData.email = this.sanitizeInput(data.email)
    if (data.notes) sanitizedData.notes = this.sanitizeInput(data.notes)

    try {
      const fields = Object.keys(sanitizedData).map(key => `${key} = ?`).join(', ')
      const values = Object.values(sanitizedData)
      
      const stmt = this.db.prepare(`UPDATE appointments SET ${fields} WHERE id = ?`)
      stmt.run(...values, id)

      const appointment = this.getAppointmentById(id)
      return { success: true, appointment: appointment! }
    } catch (error) {
      console.error('Database error:', error)
      return { success: false, errors: ['Failed to update appointment'] }
    }
  }

  // Update appointment status only
  public updateAppointmentStatus(id: string, status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'): { success: boolean; appointment?: Appointment; errors?: string[] } {
    try {
      const stmt = this.db.prepare(`
        UPDATE appointments 
        SET status = ?, updatedAt = datetime('now')
        WHERE id = ?
      `)

      const result = stmt.run(status, id)
      
      if (result.changes === 0) {
        return { success: false, errors: ['Appointment not found'] }
      }

      const appointment = this.getAppointmentById(id)
      return { success: true, appointment: appointment! }
    } catch (error) {
      console.error('Database error:', error)
      return { success: false, errors: ['Failed to update appointment status'] }
    }
  }

  // Delete appointment
  public deleteAppointment(id: string): { success: boolean; errors?: string[] } {
    try {
      const stmt = this.db.prepare('DELETE FROM appointments WHERE id = ?')
      const result = stmt.run(id)
      
      if (result.changes === 0) {
        return { success: false, errors: ['Appointment not found'] }
      }

      return { success: true }
    } catch (error) {
      console.error('Database error:', error)
      return { success: false, errors: ['Failed to delete appointment'] }
    }
  }

  // Get appointment statistics
  public getStats(): { 
    total: number; 
    today: number; 
    thisWeek: number; 
    byStatus: Record<string, number>;
    totalRevenue: number;
    todayRevenue: number;
    thisWeekRevenue: number;
    pendingRevenue: number;
    todayPendingRevenue: number;
    thisWeekPendingRevenue: number;
  } {
    const total = this.db.prepare('SELECT COUNT(*) as count FROM appointments').get() as { count: number }
    
    const today = new Date().toISOString().split('T')[0]
    const todayCount = this.db.prepare('SELECT COUNT(*) as count FROM appointments WHERE date = ?').get(today) as { count: number }
    
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const thisWeekCount = this.db.prepare('SELECT COUNT(*) as count FROM appointments WHERE date >= ?').get(weekAgo) as { count: number }
    
    const byStatus = this.db.prepare('SELECT status, COUNT(*) as count FROM appointments GROUP BY status').all() as Array<{ status: string; count: number }>
    const statusCounts = byStatus.reduce((acc, row) => {
      acc[row.status] = row.count
      return acc
    }, {} as Record<string, number>)

    // Completed revenue calculations
    const totalRevenue = this.db.prepare('SELECT SUM(servicePrice) as revenue FROM appointments WHERE status = ?').get('completed') as { revenue: number | null }
    const todayRevenue = this.db.prepare('SELECT SUM(servicePrice) as revenue FROM appointments WHERE date = ? AND status = ?').get(today, 'completed') as { revenue: number | null }
    const thisWeekRevenue = this.db.prepare('SELECT SUM(servicePrice) as revenue FROM appointments WHERE date >= ? AND status = ?').get(weekAgo, 'completed') as { revenue: number | null }

    // Pending revenue calculations (scheduled appointments)
    const pendingRevenue = this.db.prepare('SELECT SUM(servicePrice) as revenue FROM appointments WHERE status = ?').get('scheduled') as { revenue: number | null }
    const todayPendingRevenue = this.db.prepare('SELECT SUM(servicePrice) as revenue FROM appointments WHERE date = ? AND status = ?').get(today, 'scheduled') as { revenue: number | null }
    const thisWeekPendingRevenue = this.db.prepare('SELECT SUM(servicePrice) as revenue FROM appointments WHERE date >= ? AND status = ?').get(weekAgo, 'scheduled') as { revenue: number | null }

    return {
      total: total.count,
      today: todayCount.count,
      thisWeek: thisWeekCount.count,
      byStatus: statusCounts,
      totalRevenue: totalRevenue.revenue || 0,
      todayRevenue: todayRevenue.revenue || 0,
      thisWeekRevenue: thisWeekRevenue.revenue || 0,
      pendingRevenue: pendingRevenue.revenue || 0,
      todayPendingRevenue: todayPendingRevenue.revenue || 0,
      thisWeekPendingRevenue: thisWeekPendingRevenue.revenue || 0
    }
  }

  // Close database connection
  public close(): void {
    this.db.close()
  }
}

export default DatabaseManager
