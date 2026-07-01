import pool from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateLoginPayload } from "@/lib/validators";

export async function POST(req) {
  console.log("=== LOGIN API EJECUTADA ===");

  try {
    const body = await req.json();
    const { valid, errors } = validateLoginPayload(body);

    if (!valid) {
      return Response.json({ error: errors[0] }, { status: 400 });
    }

    const email = body.email.trim().toLowerCase();
    const { password } = body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return Response.json({ error: "Usuario no encontrado" }, { status: 400 });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return Response.json({ error: "Contraseña incorrecta" }, { status: 400 });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return Response.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}
