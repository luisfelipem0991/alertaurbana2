import pool from "@/lib/db";
import bcrypt from "bcrypt";

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea una cuenta de usuario en el sistema Alerta Urbana.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       description: Datos necesarios para crear una cuenta.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@email.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Usuario creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos, incompletos o usuario existente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   examples:
 *                     camposObligatorios:
 *                       value: Campos obligatorios
 *                     passwordsNoCoinciden:
 *                       value: Las contraseñas no coinciden
 *                     usuarioExiste:
 *                       value: El usuario ya existe
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error del servidor
 */
export async function POST(req) {
  try {
    const { name, email, password, confirmPassword } = await req.json();

    // Validar campos
    if (!name || !email || !password || !confirmPassword) {
      return Response.json({ error: "Campos obligatorios" }, { status: 400 });
    }

    // Validar contraseñas
    if (password !== confirmPassword) {
      return Response.json(
        { error: "Las contraseñas no coinciden" },
        { status: 400 }
      );
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