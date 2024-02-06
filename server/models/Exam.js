import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        totalMarks: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        prompt: {
            type: String,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    },
    { timestamps: true }
);

const Exam = mongoose.model("Exam", ExamSchema);

export default Exam;