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
import problemRouter from './routes/problem.routes.js'; 
import adminRouter from './routes/admin.routes.js'; 
import statsRouter from './routes/stats.routes.js'; 
import questionRouter from './routes/question.routes.js'; 

// --- Routes Declaration ---
app.use("/api/v1/users", userRouter);
app.use("/api/v1/submissions", submissionRouter);
app.use("/api/v1/problems", problemRouter); 
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/stats", statsRouter);
app.use("/api/v1/question",questionRouter);

export { app };
