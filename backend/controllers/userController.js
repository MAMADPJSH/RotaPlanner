import * as userModel from "../models/userModel.js";

export async function getUsers(req, res) {
  const users = await userModel.getAllUsers();
  res.json(users);
}
