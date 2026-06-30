import { Router } from "express";
import { getSwagger } from "../controllers/swaggerController.js";

const router = Router();

router.get("/swagger", getSwagger);

export default router;
