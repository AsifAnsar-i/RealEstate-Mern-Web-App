import express from "express";
import {
    googleController,
  loginController,
  registerController,
  updateController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/sign-up", registerController);
router.post("/sign-in", loginController);
router.post("/google", googleController);
router.post("/update/:id",requireSignIn,updateController)

export default router;
