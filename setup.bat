@echo off
echo ====================================
echo LUMINA Portfolio - Database Setup
echo ====================================
echo.

echo [1/5] Stopping any running processes...
taskkill /F /IM node.exe 2>nul

echo.
echo [2/5] Generating Prisma Client...
call npx prisma generate
if errorlevel 1 (
    echo ERROR: Prisma generate failed. Check your DATABASE_URL in .env file!
    pause
    exit /b 1
)

echo.
echo [3/5] Running database migrations...
call npx prisma migrate dev --name init
if errorlevel 1 (
    echo ERROR: Migration failed. Check your DATABASE_URL!
    pause
    exit /b 1
)

echo.
echo [4/5] Seeding admin user...
call npx prisma db seed
if errorlevel 1 (
    echo WARNING: Seed failed, but continuing...
)

echo.
echo [5/5] Starting development server...
echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo Admin Login: http://localhost:3000/auth/login
echo Email: admin@lumina.com
echo Password: 123456
echo.
echo Starting server...
call npm run dev
