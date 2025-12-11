# 📸 LUMINA - Ultra-Premium Photographer Portfolio

A stunning, high-end portfolio website built with Next.js, featuring glassmorphism UI, smooth animations, and a powerful admin panel.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure database:**
   - Get a PostgreSQL connection string from [Neon.tech](https://neon.tech)
   - Create `.env` file:
     ```env
     DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
     JWT_SECRET="your-secret-key-here"
     ```

3. **Setup database:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Access the site:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Admin Login: [http://localhost:3000/auth/login](http://localhost:3000/auth/login)

## 🔐 Default Admin Credentials

After running the seed command, use these credentials to login:

- **Email:** `admin@lumina.com`
- **Password:** `123456`

> ⚠️ **Important:** Change these credentials in production!

## 📁 Project Structure

```
/src
  /app          - Next.js pages (Home, Gallery, Admin)
  /components   - Reusable UI components
  /lib          - Database & auth utilities
/prisma         - Database schema & migrations
```

## ✨ Features

- 🎨 Ultra-premium dark UI with glassmorphism
- 🎬 Smooth Framer Motion animations
- 📱 Fully responsive design
- 🔒 Secure JWT-based authentication
- 📊 Admin dashboard for content management
- 🖼️ Masonry photo gallery
- 🎥 Video showcase support
- 📝 Built-in blog CMS

## 🚀 Deployment

Deploy to Vercel:
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

---

Built with ❤️ using Next.js, Tailwind CSS, and Prisma
