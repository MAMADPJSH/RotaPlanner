import { groupSchema } from "../utils/validators/groupSchema.js";
import { createGroup } from "../models/groupModel.js";

export async function createGroupHandler(req, res) {
  const { error, value } = groupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { group_name } = value;
  const adminId = req.user.adminId;

  try {
    const groupId = await createGroup(group_name, adminId);
    res
      .status(201)
      .json({ groupId, message: "Group created and linked to admin." });
  } catch (error) {
    res.status(500).json({ error: "Error creating group." });
  }
}
