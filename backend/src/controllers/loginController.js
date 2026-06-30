import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { validateLoginPayload } from "../utils/validators.js";

export async function login(req, res) {
  try {
    const { valid, errors } = validateLoginPayload(req.body);

    if (!valid) {
      return res.status(400).json({ error: errors[0] });
    }

    const email = req.body.email.trim().toLowerCase();
    const { password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error("LOGIN ERROR:");
    console.error(error);
    console.error(error.stack);

    return res.status(500).json({
        error: "Error del servidor"
    });
  }
}
