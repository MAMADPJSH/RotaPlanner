import pool from "../config/db.js";
import { findAdminGroupId } from "./adminModel.js";

//I will be using a transaction here because I am running two queries and if one goes wrong I want to pull out
export async function createGroup(groupName, adminId) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    //Check if admin has a group already
    const existingGroupId = await findAdminGroupId(adminId);
    console.log(existingGroupId);
    console.log("adminId:", adminId);
    if (existingGroupId) {
      throw new Error("Admin already has a group assigned.");
    }

    const groupResult = await client.query(
      "INSERT INTO groups (name) VALUES ($1) RETURNING id",
      [groupName]
    );
    console.log(groupResult);

    const groupId = groupResult.rows[0].id;
    console.log(groupId);

    const updateResult = await client.query(
      "UPDATE admins SET group_id = $1 WHERE id = $2 RETURNING *",
      [groupId, adminId]
    );
    console.log("Update result:", updateResult.rows);

    await client.query("COMMIT");
    return groupId;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
