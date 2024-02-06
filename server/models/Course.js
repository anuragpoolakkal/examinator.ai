import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
    {
        syllabus: {
            type: String,
            required: true,
        },
        prevYearQns: {
            type: String,
        },
        courseOutcome: {
            type: String,
            required: true,
        },
        textBook: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;