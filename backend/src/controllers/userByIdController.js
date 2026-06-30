import pool from "../config/db.js";

export async function deleteUserById(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.json({ message: "Usuario eliminado" });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
}
