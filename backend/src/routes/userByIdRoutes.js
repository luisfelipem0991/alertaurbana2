import { Router } from "express";
import { deleteUserById } from "../controllers/userByIdController.js";

const router = Router();

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     description: Elimina un usuario registrado en el sistema usando su identificador único.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID del usuario que se desea eliminar.
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "497c8f3f-1569-4a2a-ba65-fa9dd4fca42c"
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado
 *       404:
 *         description: No existe un usuario con el ID indicado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuario no encontrado
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
router.delete("/users/:id", deleteUserById);

export default router;
