import { db } from "./carreers/config/db.js";

async function testConnection() {
  try {
    const [rows] = await db.query("SELECT * FROM jobs");
    console.log("✅ Database connected successfully!");
    console.log("Jobs found:", rows.length);
    console.log(rows);
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
  process.exit();
}

testConnection();