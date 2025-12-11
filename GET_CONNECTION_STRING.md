# 🔗 How to Get Your Neon Connection String

You're on the right page! Follow these exact steps:

## Steps in Neon Dashboard:

1. **Look for a section that says "Connection String" or "Connection Details"**
   - It's usually below where it shows "Role: neondb_owner"

2. **Find the dropdown or toggle** that shows different connection types:
   - Look for: **"Pooled connection"** or **"Direct connection"** 
   - Select **"Pooled connection"** (recommended)

3. **Copy the connection string** that looks like:
   ```
   postgresql://neondb_owner:YOUR_PASSWORD@ep-something-123456.region.aws.neon.tech/neondb?sslmode=require
   ```

4. **IMPORTANT:** Make sure it:
   - ✅ Starts with `postgresql://` (NOT `prisma://`)
   - ✅ Contains your actual password (Neon will show it masked, you may need to click "Show password" or "Copy")

## Visual Clue:
Look for a textbox with a **COPY button** next to it - that's your connection string!

---

Once you have it, paste it here and I'll update your `.env` file automatically!
