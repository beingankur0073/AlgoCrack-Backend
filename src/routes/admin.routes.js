// routes/admin.routes.js
import { Router } from 'express';
import { verfiyJWT,isAdmin } from '../middlewares/auth.middleware.js'; // Your general JWT verification

import {
    loginAdmin,
    getAllUsersForAdmin,
    getRealAllProblems
    // ... import other admin controllers
} from '../controllers/admin.controller.js'; // Import your admin controllers
import { getAllProblems } from '../controllers/problems.controller.js';

const router = Router();

// Public route for admin login
router.route("/login").post(loginAdmin);

// Routes below this line require authentication AND admin role
// Apply verfiyJWT first, then isAdmin
router.use(verfiyJWT, isAdmin); // This will apply to all routes defined after it in this router

// Admin-only routes
router.route("/users").get(getAllUsersForAdmin);
router.route("/problems").get(getRealAllProblems);
// router.route("/problems").post(createProblemAsAdmin); // Example: Add new problem
// router.route("/problems/:problemId").put(updateProblemAsAdmin).delete(deleteProblemAsAdmin); // Example: Manage problems

export default router;