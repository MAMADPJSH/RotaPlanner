import pool from "../config/db";

export async function insertRole(name, groupId) {
  const query =
    "INSERT INTO roles (group_id, name) VALUES ($1, $2) RETURNING *";
  const result = await pool.query(query, [groupId, name]);
  return result.rows[0];
}

export async function findRolesByGroupId(groupId) {
  const query =
    "SELECT id, name FROM roles WHERE group_id = $1 ORDER BY name ASC";
  const result = await pool.query(query, [groupId]);
  return result.rows;
}
