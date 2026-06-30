import { Router } from "express";
import { deleteUserById } from "../controllers/userByIdController.js";

const router = Router();

router.delete("/users/:id", deleteUserById);

export default router;
