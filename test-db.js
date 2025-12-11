require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

if (!process.env.DATABASE_URL) {
    console.error("❌ Error: DATABASE_URL is not set in .env file");
    process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function checkConnection() {
    try {
        console.log("Testing connection to Neon DB...");
        const result = await sql`SELECT version()`;
        const { version } = result[0];
        console.log("✅ Connection Successful!");
        console.log("DB Version:", version);
    } catch (error) {
        console.error("❌ Connection Failed:", error);
    }
}

checkConnection();
