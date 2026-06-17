import pool from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Buscar usuario
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return Response.json({ error: "Usuario no encontrado" }, { status: 400 });
    }

    const user = result.rows[0];

    // Validar contraseña
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return Response.json({ error: "Contraseña incorrecta" }, { status: 400 });
    }

    // Crear token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secreto_super_seguro",
      { expiresIn: "1h" }
    );

    return Response.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    return Response.json({ error: "Error del servidor" }, { status: 500 });
  }
}