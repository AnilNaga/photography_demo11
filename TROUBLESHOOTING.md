# 🔧 Database Setup Troubleshooting

## Issue: 500 Error on Login

If you're getting a **500 Internal Server Error** when trying to log in, it means the database is not properly configured.

## ✅ Solution: Fix Your Database Connection

### Step 1: Get the Correct Connection String

1. Go to [Neon.tech](https://neon.tech) and sign in
2. Navigate to your project dashboard
3. Find the **"Connection Details"** or **"Connection String"** section
4. **IMPORTANT:** Copy the **Direct/Pooled PostgreSQL connection string**, NOT the Prisma Accelerate URL
   - ✅ Correct format: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`
   - ❌ Wrong format: `prisma+postgres://...` or `prisma://...`

### Step 2: Update Your .env File

Open `D:\Photografer_Proj1\.env` and replace the DATABASE_URL line:

```env
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@YOUR_HOST.neon.tech/YOUR_DB?sslmode=require"
```

Example of a real connection string:
```env
DATABASE_URL="postgresql://myuser:mypass123@ep-cool-wind-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

### Step 3: Verify Connection

```bash
node test-db.js
```

You should see: `✅ Connection Successful!`

### Step 4: Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (creates tables)
npx prisma migrate dev --name init

# Seed admin user
npx prisma db seed
```

### Step 5: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

Now try logging in again with:
- Email: `admin@lumina.com`
- Password: `123456`

## 🆘 Still Having Issues?

Run this diagnostic command:
```bash
node test-db.js
```

And share the error message for further help!
