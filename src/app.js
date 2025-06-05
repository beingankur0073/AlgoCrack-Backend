import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config({
    path: './.env'
});

const app = express();

// --- Middleware Setup ---
app.use(cors({
    origin: process.env.CORS_ORIGIN, // e.g., http://localhost:3000
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));
app.use(cookieParser());

// --- Routes Import ---
import userRouter from './routes/user.routes.js';
import submissionRouter from './routes/submission.routes.js';
import problemRouter from './routes/problem.routes.js'; // ✅ import problem routes

// --- Routes Declaration ---
app.use("/api/v1/users", userRouter);
app.use("/api/v1/submissions", submissionRouter);
app.use("/api/v1/problems", problemRouter); // ✅ use problem routes

export { app };
