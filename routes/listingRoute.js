import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { listingController } from "../controllers/listingController.js";

const router = express.Router();

router.post("/create", requireSignIn, listingController);

export default router;
