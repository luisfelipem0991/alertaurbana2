import pool from "@/lib/db";

// 🔍 OBTENER TODOS LOS USUARIOS
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY created_at DESC"
    );

    return Response.json(result.rows);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}