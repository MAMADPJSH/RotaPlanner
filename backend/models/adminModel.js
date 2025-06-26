import pool from "../config/db.js";

export async function createAdmin({ full_name, email, hashedPassword }) {
  const query =
    "INSERT INTO admins (full_name, email, password) VALUES ($1, $2, $3) RETURNING id";
  const result = await pool.query(query, [full_name, email, hashedPassword]);

  return result.rows[0];
}

export async function findAdminByEmail(email) {
  const query = "SELECT * FROM admins WHERE email = $1";
  const result = await pool.query(query, [email]);
  return result.rows[0];
}
