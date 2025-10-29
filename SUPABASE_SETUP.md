# Supabase Setup Guide for Fifi Hair Salon

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project" (use Google/GitHub to sign in)
3. Click "New project"
4. Fill in:
   - **Organization**: Create new or use existing
   - **Name**: fifi-hair-salon
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your business (e.g., US East)
   - **Pricing Plan**: Free tier is fine to start

5. Click "Create new project"
6. Wait 2 minutes for setup to complete

## Step 2: Get Your Connection Details

Once your project is created:

1. Click "Settings" (gear icon) in left sidebar
2. Click "Database" section
3. Scroll to "Connection string"
4. Copy the "URI" connection string
5. Save these details:
   - URL: `https://xxxxx.supabase.co`
   - Anon/Public Key: `eyJhbGc...` (found in Settings > API)
   - Service Role Key: `eyJhbGc...` (found in Settings > API)

## Step 3: Create the Database Table

1. Go to "SQL Editor" in left sidebar
2. Click "New query"
3. Copy and paste this SQL:

```sql
-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  service TEXT NOT NULL,
  "servicePrice" REAL NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled',
  "createdAt" TEXT NOT NULL DEFAULT (NOW()::text),
  "updatedAt" TEXT NOT NULL DEFAULT (NOW()::text)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments(email);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this later)
CREATE POLICY "Allow all operations" ON appointments FOR ALL USING (true) WITH CHECK (true);
```

4. Click "Run" button
5. Verify the table was created in "Table Editor"

## Step 4: Set Environment Variables

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.xxxxx.supabase.co:5432/postgres
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...[YOUR_ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...[YOUR_SERVICE_ROLE_KEY]

# Use Supabase in production
USE_SUPABASE=true
```

**Important**: Replace the placeholders with your actual values!

## Step 5: Test the Connection

Run these commands:

```bash
npm install @supabase/supabase-js
npm run dev
```

Then test booking an appointment on your local site.

## Step 6: Migrate Existing Data

If you have existing appointments in SQLite, use the migration script:

```bash
node scripts/migrate-to-supabase.js
```

## Troubleshooting

### Connection Issues
- Verify your password is correct
- Check that your IP is allowed (Supabase free tier allows all IPs by default)
- Ensure you're using the correct database URL

### Permission Issues
- Make sure Row Level Security policies are set correctly
- Verify you're using the correct API key (anon key for client, service role for admin)

### Data Issues
- Check that all columns exist in Supabase
- Verify data types match between SQLite and PostgreSQL

## Next Steps

1. ✅ Test booking a few appointments
2. ✅ Verify data appears in Supabase dashboard
3. ✅ Test admin dashboard to view appointments
4. ✅ Run load test (simulate 40 concurrent bookings)

## Support

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Your Database Manager: Check lib/database.ts for implementation

---
**Created for**: Fifi Hair Salon
**Purpose**: Professional-grade appointment management
**Capacity**: Handles 14,600+ appointments/year with ease
