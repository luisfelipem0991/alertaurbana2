import pool from "@/lib/db";
import bcrypt from "bcrypt";
import { validateRegisterPayload } from "@/lib/validators";

export async function POST(req) {
  try {
    const body = await req.json();
    const { valid, errors } = validateRegisterPayload(body);

    if (!valid) {
      return Response.json({ error: errors[0] }, { status: 400 });
    }

    const name = body.name.trim();
    const email = body.email.trim().toLowerCase();
    const { password } = body;

    // Verificar si ya existe
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return Response.json({ error: "El usuario ya existe" }, { status: 400 });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar usuario
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    return Response.json({ message: "Usuario creado correctamente" });
  } catch (error) {
    // 🔎 LOG DEL ERROR REAL (antes esto no existía, por eso no veías nada)
    console.error("REGISTER ERROR:");
    console.error(error);
    console.error(error?.stack);

    return Response.json({ error: "Error del servidor" }, { status: 500 });
  }
}