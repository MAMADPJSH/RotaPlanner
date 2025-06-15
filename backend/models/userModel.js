import db from "../config/db.js";

export async function getAllUsers() {
  const res = await db.query("SELECT * FROM users");
  return res.rows;
}
