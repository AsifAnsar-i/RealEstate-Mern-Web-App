import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { listingController } from "../controllers/listingController.js";

const router = express.Router();

router.post("/listing", requireSignIn, listingController);

export default router;
