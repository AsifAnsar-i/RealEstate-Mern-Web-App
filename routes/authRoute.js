import express from "express";
import {
    googleController,
  loginController,
  registerController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/sign-up", registerController);
router.post("/sign-in", loginController);
router.post("/google", googleController);

export default router;
