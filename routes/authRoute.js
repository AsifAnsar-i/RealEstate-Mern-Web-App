import express from "express";
import { registerController } from "../controllers/authController.js";

const router = express.Router();

router.post("/sign-up",registerController)

export default router;
