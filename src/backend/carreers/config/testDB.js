import { db } from "./db.js";

async function testConnection() {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log("DB Connected! Test Result:", rows[0].result);
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
}

testConnection();
