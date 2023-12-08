import express from "express";
import {
  deleteController,
    googleController,
  listingsController,
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
router.delete("/delete/:id",requireSignIn,deleteController)
router.get("/listings/:id",requireSignIn,listingsController)

export default router;
