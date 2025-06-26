import pool from "../config/db.js";

//I will be using a transaction here because I am running two queries and if one goes wrong I want to pull out
export async function createGroup(groupName, adminId) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const groupResult = await client.query(
      "INSERT INTO groups (name) VALUES ($1) RETURNING id",
      [groupName]
    );

    const groupId = groupResult.rows[0].id;

    await client.query("UPDATE admins SET group_id = $1 WHERE id = $2", [
      groupId,
      adminId,
    ]);

    await client.query("COMMIT");
    return groupId;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
