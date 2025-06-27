import { findAdminGroupId } from "../models/adminModel.js";

export async function ensureAdminHasGroup(adminId) {
  const existingGroupId = await findAdminGroupId(adminId);
  if (!existingGroupId) {
    throw new Error("You need to create a group first");
  }
  return existingGroupId;
}
