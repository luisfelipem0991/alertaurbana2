import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password, confirmPassword } = await req.json();

    // Validar campos
    if (!name || !email || !password || !confirmPassword) {
      return Response.json({ error: "Campos obligatorios" }, { status: 400 });
    }

    // Validar contraseñas
    if (password !== confirmPassword) {
      return Response.json({ error: "Las contraseñas no coinciden" }, { status: 400 });
    }

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
    return Response.json({ error: "Error del servidor" }, { status: 500 });
  }
}