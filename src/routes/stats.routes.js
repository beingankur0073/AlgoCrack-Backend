// src/routes/stats.routes.js
import { Router } from 'express';
import { getPlatformStats } from '../controllers/stats.controller.js'; // We will create this controller function next
import { verfiyJWT, isAdmin } from '../middlewares/auth.middleware.js'; // Ensure these are correctly imported

const router = Router();

// This route will be accessible only to authenticated administrators
router.route("/").get(verfiyJWT, isAdmin, getPlatformStats);

export default router;