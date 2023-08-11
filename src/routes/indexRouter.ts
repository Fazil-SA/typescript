// indexRouter.ts
import express from "express";
import controllers from "../controllers/index"

const router = express.Router();

// Define your routes here
router.get("/generate", controllers.openAIExports.generate)

export default router;
