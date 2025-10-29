import DatabaseManager from './database'
import SupabaseDatabaseManager from './database-supabase'
import { Appointment } from './database'

// Unified database manager that switches between SQLite and Supabase
class UnifiedDatabaseManager {
  private static instance: UnifiedDatabaseManager
  private db: any
  private isSupabase: boolean

  private constructor() {
    // Check if Supabase credentials are available
    const useSupabase = process.env.USE_SUPABASE === 'true' && 
                       process.env.SUPABASE_URL && 
                       process.env.SUPABASE_ANON_KEY

    if (useSupabase) {
      console.log('📊 Using Supabase (Production database)')
      this.db = SupabaseDatabaseManager.getInstance()
      this.isSupabase = true
    } else {
      console.log('📦 Using SQLite (Development database)')
      this.db = DatabaseManager.getInstance()
      this.isSupabase = false
    }
  }

  public static getInstance(): UnifiedDatabaseManager {
    if (!UnifiedDatabaseManager.instance) {
      UnifiedDatabaseManager.instance = new UnifiedDatabaseManager()
    }
    return UnifiedDatabaseManager.instance
  }

  // Wrapper methods that handle both sync and async
  public getAppointments(filters?: { date?: string; status?: string }): Appointment[] | Promise<Appointment[]> {
    if (this.isSupabase) {
      return this.db.getAppointments(filters)
    } else {
      return this.db.getAppointments(filters)
    }
  }

  public getAppointmentById(id: string): Appointment | null | Promise<Appointment | null> {
    if (this.isSupabase) {
      return this.db.getAppointmentById(id)
    } else {
      return this.db.getAppointmentById(id)
    }
  }

  public createAppointment(data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): { success: boolean; appointment?: Appointment; errors?: string[] } | Promise<{ success: boolean; appointment?: Appointment; errors?: string[] }> {
    if (this.isSupabase) {
      return this.db.createAppointment(data)
    } else {
      return this.db.createAppointment(data)
    }
  }

  public updateAppointment(id: string, data: Partial<Omit<Appointment, 'id' | 'createdAt'>>): { success: boolean; appointment?: Appointment; errors?: string[] } | Promise<{ success: boolean; appointment?: Appointment; errors?: string[] }> {
    if (this.isSupabase) {
      return this.db.updateAppointment(id, data)
    } else {
      return this.db.updateAppointment(id, data)
    }
  }

  public updateAppointmentStatus(id: string, status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'): { success: boolean; appointment?: Appointment; errors?: string[] } | Promise<{ success: boolean; appointment?: Appointment; errors?: string[] }> {
    if (this.isSupabase) {
      return this.db.updateAppointmentStatus(id, status)
    } else {
      return this.db.updateAppointmentStatus(id, status)
    }
  }

  public deleteAppointment(id: string): { success: boolean; errors?: string[] } | Promise<{ success: boolean; errors?: string[] }> {
    if (this.isSupabase) {
      return this.db.deleteAppointment(id)
    } else {
      return this.db.deleteAppointment(id)
    }
  }

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
  } | Promise<{ 
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
    if (this.isSupabase) {
      return this.db.getStats()
    } else {
      return this.db.getStats()
    }
  }

  public close(): void {
    if (!this.isSupabase) {
      this.db.close()
    }
  }
}

export default UnifiedDatabaseManager

