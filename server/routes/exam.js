import Course from '../models/Course.js';
import Exam from '../models/Exam.js';
import { Router } from 'express';
import OpenAI from 'openai';
import { examAIPrompt } from '../utils/utils.js';
const router = Router();

router.post('/', async (req, res) => {
    try {
        const course = await Course.findById(req.body.courseId);

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "system",
                    content: examAIPrompt,
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: `course_name: ${course.name}, course_code: ${course.code}` },
                        { type: "text", text: "syllabus:" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": course.syllabus,
                            },
                        },
                        { type: "text", text: "textbook:" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": course.textBook,
                            },
                        },
                        { type: "text", text: "previous year question paper:" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": course.prevYearQns,
                            },
                        },
                        { type: "text", text: "course outcomes:" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": course.courseOutcome,
                            },
                        },
                        { type: "text", text: `Exam details:` },
                        { type: "text", text: `exam_name: ${req.body.name}, total_marks: ${req.body.totalMarks}, duration: ${req.body.duration}${req.body.prompt ? `, prompt: ${req.body.prompt}` : ""}` },
                    ],
                },
            ],
            "max_tokens": 1000,
        });

        console.log(completion.choices[0].message)

        const resp = completion.choices[0].message.content;

        const respData = JSON.parse(resp.split("```json")[1].split("```")[0]);

        console.log(respData);

        const newExam = new Exam({
            name: req.body.name,
            totalMarks: req.body.totalMarks,
            duration: req.body.duration,
            prompt: req.body.prompt,
            questionPaper: respData.question_paper,
            answerKey: respData.answer_key,
            courseId: req.body.courseId,
        });
        const savedExam = await newExam.save();
        res.status(201).json(savedExam);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// all exams by courseId 
router.post('/byCourseId', async (req, res) => {
    try {
        const exams = await Exam.find({
            courseId
                : req.body.courseId
        });
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all exams
router.get('/', async (req, res) => {
    try {
        const exams = await Exam.find();
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific exam by ID
router.get('/:id', async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id).lean();
        if (!exam) {
            res.status(404).json({ error: 'Exam not found' });
            return;
        }

        const course = await Course.findById(exam.courseId).lean();
        exam.course = course;

        res.status(200).json(exam);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an exam by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedExam) {
            res.status(404).json({ error: 'Exam not found' });
            return;
        }
        res.status(200).json(updatedExam);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete an exam by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedExam = await Exam.findByIdAndDelete(req.params.id);
        if (!deletedExam) {
            res.status(404).json({ error: 'Exam not found' });
            return;
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;