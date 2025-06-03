import dotenv from 'dotenv'; // Import dotenv
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


// Load environment variables from .env file
dotenv.config({
    path: './.env' // Ensure the path to your .env file is correct
});

const app = express();

// --- Middleware Setup ---
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Use the CORS_ORIGIN from your .env
    credentials: true,
}));

app.use(express.json({ limit: "16kb" })); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true, limit: '16kb' })); // To parse URL-encoded request bodies
app.use(express.static("public")); // To serve static files (e.g., uploaded avatars)
app.use(cookieParser()); // To parse cookies

// --- Routes Import ---
import userRouter from './routes/user.routes.js'; // Your existing user routes
import router from './routes/submission.routes.js'; // <--- NEW: Import submission routes

// --- Routes Declaration ---
app.use("/api/v1/users", userRouter);
app.use("/api/v1/submissions",router); // <--- NEW: Use submission routes



// Export the app instance (useful for testing or if another file needs to import it)
export { app };