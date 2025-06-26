import { roleSchema } from "../utils/validators/roleSchema";
import { insertRole, findRolesByGroupId } from "../models/roleModel";

export async function createRole(req, res) {
  const { error, value } = roleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name } = value;
  const { groupId } = req.user;

  try {
    const newRole = await insertRole(name, groupId);
    res.status(201).json(newRole);
  } catch (error) {
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ error: "Role already exists in this group." });
    }
    res.status(500).json({ error: "Failed to create role." });
  }
}

export async function getRoles(req, res) {
  const { groupId } = req.user;

  try {
    const roles = await findRolesByGroupId(groupId);
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch roles." });
  }
}
