import bcrypt from "bcrypt";
import { createAdmin, findAdminByEmail } from "../models/adminModel.js";
import { generateToken } from "../utils/tokenUtils.js";
import {
  registerSchema,
  loginSchema,
} from "../utils/validators/adminSchema.js";

export async function register(req, res) {
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { full_name, email, password } = value;

  try {
    const existingAdmin = await findAdminByEmail(email);
    if (existingAdmin) {
      return res.status(409).json({ error: "Email is already in use." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { adminId } = await createAdmin({ full_name, email, hashedPassword });
    const token = generateToken({ adminId, role: "admin" });
    res.status(201).json({ token: token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function login(req, res) {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = value;

  try {
    const admin = findAdminByEmail(email);
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const token = generateToken({ adminId: admin.id, role: "admin" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
