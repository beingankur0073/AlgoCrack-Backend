
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { Question } from "../models/question.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// @route   POST /api/v1/questions/add
// @desc    Admin creates a new question
// @access  Private (Admin)
const createQuestion = asyncHandler(async (req, res) => {
    const { questionText, options, correctAnswer, topic, difficulty } = req.body;

    if (!questionText || !options || !correctAnswer || !topic) {
        throw new ApiError(400, "All required fields must be provided.");
    }

    const question = await Question.create({
        questionText,
        options,
        correctAnswer,
        topic,
        difficulty
    });

    if (!question) {
        throw new ApiError(500, "Failed to create the question.");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, question, "Question created successfully."));
});

// @route   GET /api/v1/questions/topic/:topicName
// @desc    Get all questions for a specific topic
// @access  Private
const getQuestionsByTopic = asyncHandler(async (req, res) => {
    const { topicName } = req.params;

    const questions = await Question.find({ topic: topicName });

    if (!questions || questions.length === 0) {
        throw new ApiError(404, `No questions found for topic: ${topicName}`);
    }

    // IMPORTANT: Remove the correct answer before sending to the frontend
    const sanitizedQuestions = questions.map(q => {
        const { correctAnswer, ...rest } = q.toObject();
        return rest;
    });

    return res
        .status(200)
        .json(new ApiResponse(200, sanitizedQuestions, "Questions fetched successfully."));
});

// @route   POST /api/v1/questions/submit-quiz
// @desc    Submit a quiz and get a score
// @access  Private
const submitQuiz = asyncHandler(async (req, res) => {
    const { userAnswers } = req.body; // userAnswers is an array of { questionId, selectedAnswer }

    if (!userAnswers || !Array.isArray(userAnswers)) {
        throw new ApiError(400, "Invalid quiz submission format.");
    }

    let score = 0;
    const submittedQuestionIds = userAnswers.map(ans => ans.questionId);

    // Fetch the correct answers from the database
    const questions = await Question.find({ '_id': { $in: submittedQuestionIds } });

    if (questions.length !== submittedQuestionIds.length) {
        throw new ApiError(404, "One or more questions not found.");
    }

    // Calculate score
    for (const userAnswer of userAnswers) {
        const question = questions.find(q => q._id.toString() === userAnswer.questionId);
        if (question && question.correctAnswer === userAnswer.selectedAnswer) {
            score++;
        }
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { score, totalQuestions: questions.length }, "Quiz submitted and scored successfully."));
});


const getAllQuestions = asyncHandler(async (req, res) => {
    // We fetch all questions without any filters
    const questions = await Question.find({});

    if (!questions || questions.length === 0) {
        throw new ApiError(404, "No questions found in the database.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, questions, "All questions fetched successfully."));
});

export { 
         createQuestion,
         getQuestionsByTopic,
         submitQuiz,
         getAllQuestions 
    };