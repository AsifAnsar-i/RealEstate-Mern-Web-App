import express from "express";
import { loginController, registerController } from "../controllers/authController.js";

const router = express.Router();

router.post("/sign-up",registerController)
router.post("/sign-in",loginController)

export default router;
