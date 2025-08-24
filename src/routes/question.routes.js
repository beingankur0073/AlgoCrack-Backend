
import { Router } from "express";
import {
    createQuestion,
    getAllQuestions,
    getQuestionsByTopic,
    submitQuiz
} from "../controllers/question.controller.js";
import { verfiyJWT,isAdmin } from "../middlewares/auth.middleware.js";


const router = Router();

// Routes for administrators to add questions
router.route("/add").post(verfiyJWT, isAdmin, createQuestion);


router.route("/topic/:topicName").get(verfiyJWT, getQuestionsByTopic);
router.route("/all").get(verfiyJWT, isAdmin, getAllQuestions);

// Route for users to submit quiz answers and get a score
router.route("/submit-quiz").post(verfiyJWT, submitQuiz);

export default router;