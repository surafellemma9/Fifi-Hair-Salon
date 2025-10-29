/**
 * Migration Script: SQLite to Supabase
 * Moves all appointment data from local SQLite database to Supabase
 */

const { createClient } = require('@supabase/supabase-js')
const Database = require('better-sqlite3')
const path = require('path')

async function migrateToSupabase() {
  console.log('🚀 Starting migration from SQLite to Supabase...\n')

  // Check environment variables
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Supabase credentials not found!')
    console.log('Please set these environment variables:')
    console.log('  - SUPABASE_URL')
    console.log('  - SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY)')
    process.exit(1)
  }

  // Initialize Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey)
  console.log('✅ Connected to Supabase\n')

  // Initialize SQLite database
  const dbPath = path.join(process.cwd(), 'data', 'appointments.db')
  let db
  
  try {
    db = new Database(dbPath)
    console.log('✅ Connected to SQLite database\n')
  } catch (error) {
    console.error('❌ Error: Could not connect to SQLite database')
    console.error('Database file path:', dbPath)
    console.error('Error:', error.message)
    process.exit(1)
  }

  // Get all appointments from SQLite
  console.log('📖 Reading appointments from SQLite...')
  const appointments = db.prepare('SELECT * FROM appointments').all()
  console.log(`Found ${appointments.length} appointments to migrate\n`)

  if (appointments.length === 0) {
    console.log('✅ No appointments to migrate. You\'re all set!')
    db.close()
    process.exit(0)
  }

  // Migrate appointments to Supabase
  console.log('📤 Migrating appointments to Supabase...\n')
  
  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < appointments.length; i++) {
    const appointment = appointments[i]
    
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointment])
        .select()

      if (error) {
        // Check if it's a duplicate error
        if (error.message.includes('duplicate') || error.message.includes('unique')) {
          console.log(`⚠️  Skipping duplicate appointment #${i + 1}: ${appointment.id}`)
        } else {
          throw error
        }
      } else {
        successCount++
        console.log(`✅ Migrated appointment #${i + 1}: ${appointment.firstName} ${appointment.lastName} - ${appointment.date}`)
      }
    } catch (error) {
      errorCount++
      console.error(`❌ Error migrating appointment #${i + 1}:`, error.message)
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('📊 Migration Summary:')
  console.log(`   ✅ Successfully migrated: ${successCount} appointments`)
  console.log(`   ❌ Errors: ${errorCount} appointments`)
  console.log(`   📝 Total processed: ${appointments.length} appointments`)
  console.log('='.repeat(50))

  // Close connections
  db.close()
  console.log('\n✅ Migration completed!')

  if (successCount > 0) {
    console.log('\n🎉 Your appointments are now in Supabase!')
    console.log('💡 Update your .env.local file to set USE_SUPABASE=true')
  }

  if (errorCount > 0) {
    console.log('\n⚠️  Some appointments could not be migrated.')
    console.log('   Please review the errors above and try again if needed.')
  }
}

// Run the migration
migrateToSupabase().catch(error => {
  console.error('💥 Fatal error:', error)
  process.exit(1)
})

