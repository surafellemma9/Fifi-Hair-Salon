import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Appointment } from './database'

// Service price mapping (same as SQLite version)
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

// Supabase Database Manager
class SupabaseDatabaseManager {
  private supabase: SupabaseClient
  private static instance: SupabaseDatabaseManager

  private constructor() {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and Key must be set in environment variables')
    }

    this.supabase = createClient(supabaseUrl, supabaseKey)
  }

  public static getInstance(): SupabaseDatabaseManager {
    if (!SupabaseDatabaseManager.instance) {
      SupabaseDatabaseManager.instance = new SupabaseDatabaseManager()
    }
    return SupabaseDatabaseManager.instance
  }

  private getServicePrice(serviceName: string): number {
    const normalizedService = serviceName.toLowerCase().replace(/\s+/g, '-')
    return SERVICE_PRICES[normalizedService] || 0
  }

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

  // Get all appointments with optional filtering
  public async getAppointments(filters?: { date?: string; status?: string }): Promise<Appointment[]> {
    try {
      let query = this.supabase.from('appointments').select('*')

      if (filters?.date) {
        query = query.eq('date', filters.date)
      }

      if (filters?.status) {
        query = query.eq('status', filters.status)
      }

      const { data, error } = await query.order('date', { ascending: true }).order('time', { ascending: true })

      if (error) throw error

      return (data as Appointment[]) || []
    } catch (error) {
      console.error('Error fetching appointments:', error)
      return []
    }
  }

  // Get appointment by ID
  public async getAppointmentById(id: string): Promise<Appointment | null> {
    try {
      const { data, error } = await this.supabase
        .from('appointments')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      return data as Appointment
    } catch (error) {
      console.error('Error fetching appointment:', error)
      return null
    }
  }

  // Create new appointment
  public async createAppointment(data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; appointment?: Appointment; errors?: string[] }> {
    const validation = this.validateAppointment(data)
    if (!validation.isValid) {
      return { success: false, errors: validation.errors }
    }

    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    const now = new Date().toISOString()

    const appointmentData = {
      id,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      service: data.service.trim(),
      servicePrice: data.servicePrice || this.getServicePrice(data.service),
      date: data.date,
      time: data.time,
      phone: data.phone.trim(),
      email: data.email.trim(),
      notes: data.notes?.trim() || null,
      status: data.status || 'scheduled',
      createdAt: now,
      updatedAt: now
    }

    try {
      const { data: result, error } = await this.supabase
        .from('appointments')
        .insert([appointmentData])
        .select()
        .single()

      if (error) throw error

      return { success: true, appointment: result as Appointment }
    } catch (error) {
      console.error('Error creating appointment:', error)
      return { success: false, errors: ['Failed to create appointment'] }
    }
  }

  // Update appointment
  public async updateAppointment(id: string, data: Partial<Omit<Appointment, 'id' | 'createdAt'>>): Promise<{ success: boolean; appointment?: Appointment; errors?: string[] }> {
    const validation = this.validateAppointment(data)
    if (!validation.isValid) {
      return { success: false, errors: validation.errors }
    }

    const updateData: any = {
      ...data,
      updatedAt: new Date().toISOString()
    }

    // Sanitize string fields
    if (data.firstName) updateData.firstName = data.firstName.trim()
    if (data.lastName) updateData.lastName = data.lastName.trim()
    if (data.service) updateData.service = data.service.trim()
    if (data.phone) updateData.phone = data.phone.trim()
    if (data.email) updateData.email = data.email.trim()
    if (data.notes) updateData.notes = data.notes.trim()

    try {
      const { data: result, error } = await this.supabase
        .from('appointments')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      if (!result) {
        return { success: false, errors: ['Appointment not found'] }
      }

      return { success: true, appointment: result as Appointment }
    } catch (error) {
      console.error('Error updating appointment:', error)
      return { success: false, errors: ['Failed to update appointment'] }
    }
  }

  // Update appointment status only
  public async updateAppointmentStatus(id: string, status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'): Promise<{ success: boolean; appointment?: Appointment; errors?: string[] }> {
    try {
      const { data: result, error } = await this.supabase
        .from('appointments')
        .update({ status, updatedAt: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      if (!result) {
        return { success: false, errors: ['Appointment not found'] }
      }

      return { success: true, appointment: result as Appointment }
    } catch (error) {
      console.error('Error updating appointment status:', error)
      return { success: false, errors: ['Failed to update appointment status'] }
    }
  }

  // Delete appointment
  public async deleteAppointment(id: string): Promise<{ success: boolean; errors?: string[] }> {
    try {
      const { error } = await this.supabase
        .from('appointments')
        .delete()
        .eq('id', id)

      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error('Error deleting appointment:', error)
      return { success: false, errors: ['Failed to delete appointment'] }
    }
  }

  // Get appointment statistics
  public async getStats(): Promise<{ 
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
  }> {
    try {
      const today = new Date().toISOString().split('T')[0]
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

      // Get all appointments
      const { data: allAppointments, error: allError } = await this.supabase
        .from('appointments')
        .select('*')

      if (allError) throw allError

      // Calculate stats
      const total = allAppointments?.length || 0
      const todayCount = allAppointments?.filter(a => a.date === today).length || 0
      const thisWeekCount = allAppointments?.filter(a => a.date >= weekAgo).length || 0

      const byStatus = allAppointments?.reduce((acc, apt) => {
        acc[apt.status] = (acc[apt.status] || 0) + 1
        return acc
      }, {} as Record<string, number>) || {}

      const completedAppointments = allAppointments?.filter(a => a.status === 'completed') || []
      const scheduledAppointments = allAppointments?.filter(a => a.status === 'scheduled') || []

      const totalRevenue = completedAppointments.reduce((sum, apt) => sum + (apt.servicePrice || 0), 0)
      const todayRevenue = completedAppointments.filter(a => a.date === today).reduce((sum, apt) => sum + (apt.servicePrice || 0), 0)
      const thisWeekRevenue = completedAppointments.filter(a => a.date >= weekAgo).reduce((sum, apt) => sum + (apt.servicePrice || 0), 0)

      const pendingRevenue = scheduledAppointments.reduce((sum, apt) => sum + (apt.servicePrice || 0), 0)
      const todayPendingRevenue = scheduledAppointments.filter(a => a.date === today).reduce((sum, apt) => sum + (apt.servicePrice || 0), 0)
      const thisWeekPendingRevenue = scheduledAppointments.filter(a => a.date >= weekAgo).reduce((sum, apt) => sum + (apt.servicePrice || 0), 0)

      return {
        total,
        today: todayCount,
        thisWeek: thisWeekCount,
        byStatus,
        totalRevenue,
        todayRevenue,
        thisWeekRevenue,
        pendingRevenue,
        todayPendingRevenue,
        thisWeekPendingRevenue
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      return {
        total: 0,
        today: 0,
        thisWeek: 0,
        byStatus: {},
        totalRevenue: 0,
        todayRevenue: 0,
        thisWeekRevenue: 0,
        pendingRevenue: 0,
        todayPendingRevenue: 0,
        thisWeekPendingRevenue: 0
      }
    }
  }
}

export default SupabaseDatabaseManager

