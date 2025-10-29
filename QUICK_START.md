# Quick Start Guide - Production Setup

## 🎯 Goal: Migrate from SQLite to Supabase for production

This guide will take you **~10 minutes** to complete.

---

## Step 1: Create Supabase Account (5 minutes)

1. **Go to** https://supabase.com
2. **Click** "Start your project" 
3. **Sign in** with Google or GitHub
4. **Click** "New project"
5. **Fill in:**
   - Name: `fifi-hair-salon`
   - Database Password: Create a strong password (save it!)
   - Region: `East US (N. Virginia)` or closest to you
   - Pricing: `Free` (enough for 14,600+ appointments!)
6. **Wait** 2 minutes for setup

---

## Step 2: Get Your Credentials (2 minutes)

1. In your Supabase project, click **"Settings"** (gear icon)
2. Click **"API"** section
3. Copy these values:
   - **URL**: Found under "Project URL"
   - **anon/public key**: Found under "Project API keys" > "anon public"
   - **service_role key**: Found under "Project API keys" > "service_role" (keep this secret!)

---

## Step 3: Create Database Table (1 minute)

1. In Supabase dashboard, click **"SQL Editor"**
2. Click **"New query"**
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments(email);

-- Enable Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Allow all operations" ON appointments FOR ALL USING (true) WITH CHECK (true);
```

4. Click **"Run"** button
5. You should see "Success" message

---

## Step 4: Update Environment Variables (1 minute)

1. In your project, open `.env.local` (create it if it doesn't exist)
2. Add these lines:

```bash
# Use Supabase for production
USE_SUPABASE=true

# Your Supabase credentials
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Yelp (already set up)
NEXT_PUBLIC_YELP_URL=https://www.yelp.com/biz/fifi-hair-salon-arlington
```

3. **Replace** the placeholder values with your actual credentials from Step 2
4. **Save** the file

---

## Step 5: Migrate Existing Data (1 minute)

If you have existing appointments in SQLite:

```bash
# Run the migration script
node scripts/migrate-to-supabase.js
```

This will copy all your existing appointments to Supabase.

---

## Step 6: Test It! (1 minute)

1. **Restart** your development server:
   ```bash
   npm run dev
   ```

2. **Visit** http://localhost:3000

3. **Book an appointment** on your site

4. **Check** Supabase dashboard:
   - Go to "Table Editor"
   - Click "appointments" table
   - You should see your new appointment!

---

## ✅ You're Done!

Your website now uses **production-grade Supabase** instead of SQLite!

### What Changed:
- ✅ Database is now in the cloud (not local files)
- ✅ Automatic backups enabled
- ✅ Can handle 40+ appointments/day easily
- ✅ No data loss risk
- ✅ Scales infinitely

### Next Steps:
1. Test booking several appointments
2. Test the admin dashboard
3. Deploy to production (Vercel, Netlify, etc.)
4. Never worry about crashing again! 🎉

---

## Troubleshooting

### "Connection Error"
- Check your Supabase URL and keys are correct
- Make sure you copied the full keys (they're very long)

### "Table not found"
- Go back to Step 3 and run the SQL again
- Check the table exists in Supabase dashboard

### "Migration failed"
- Make sure SQLite database exists in `data/appointments.db`
- Check you have the correct environment variables set

### Still having issues?
- Check `SUPABASE_SETUP.md` for detailed instructions
- Visit Supabase docs: https://supabase.com/docs

---

**Questions?** Everything is set up to automatically use Supabase when `USE_SUPABASE=true`!
