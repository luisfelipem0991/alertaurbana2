import pool from "@/lib/db";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return Response.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return Response.json({ message: "Usuario eliminado" });
  } catch (error) {
    return Response.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}
