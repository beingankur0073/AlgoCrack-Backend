// src/models/question.model.js
import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
    {
        questionText: {
            type: String,
            required: true,
        },
        options: {
            type: [String], // An array of strings for the multiple-choice options
            required: true,
        },
        correctAnswer: {
            type: String,
            required: true,
        },
        topic: {
            type: String, // e.g., 'Data Structures', 'Algorithms', 'DBMS', 'OS'
            required: true,
            trim: true,
        },
        difficulty: {
            type: String, // 'Easy', 'Medium', 'Hard'
            enum: ['Easy', 'Medium', 'Hard'],
            default: 'Medium',
        },
    },
    {
        timestamps: true,
    }
);

export const Question = mongoose.model("Question", questionSchema);