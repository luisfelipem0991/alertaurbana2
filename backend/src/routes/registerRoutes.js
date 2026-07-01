import { Router } from "express";
import { register } from "../controllers/registerController.js";

const router = Router();

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
router.post("/register", register);

export default router;
