import express from "express";
import joi from "joi";
import OpenAI from "openai";
import { aiPrompt } from "../utils/utils.js";
import Valuation from "../models/Valuation.js";
import Exam from "../models/Exam.js";

const router = express.Router();

router.get("/", async (req, res) => {
    var exams = await Exam.find().lean();

    for (const exam of exams) {
        exam.valuations = await Valuation.find({ examId: exam._id }).countDocuments();
    }

    res.send(valuators.reverse());
});

router.post("/valuate", async (req, res) => {
    const schema = joi.object({
        examId: joi.string().required(),
        answerSheet: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const exam = await Exam.findById(data.examId);

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });


        const completion = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "system",
                    content: aiPrompt,
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Question Paper:" },
                        { type: "text", text: JSON.stringify(exam.questionPaper) },
                    ],
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Answer Keys:" },
                        { type: "text", text: JSON.stringify(exam.answerKey) },
                    ],
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Answer Sheet:" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": data.answerSheet,
                            },
                        },
                    ]
                }
            ],
            "max_tokens": 1000,
        });

        const resp = completion.choices[0].message.content;

        const respData = JSON.parse(resp.split("```json")[1].split("```")[0]);

        const newValuation = new Valuation({
            examId: data.examId,
            data: respData,
            answerSheet: data.answerSheet,
        });

        await newValuation.save();

        return res.send(respData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

router.post("/valuations", async (req, res) => {
    const schema = joi.object({
        examId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const valuations = await Valuation.find({ examId: data.examId }).lean();

        for (const valuation of valuations) {
            valuation.questionPaper = (await Exam.findById(valuation.valuatorId)).questionPaper;
            valuation.answerKey = (await Exam.findById(valuation.valuatorId)).answerKey;
        }

        return res.send(valuations.reverse());
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/total-marks", async (req, res) => {
    const schema = joi.object({
        valuationId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const valuation = await Valuation.findById(data.valuationId);
        var totalScore = 0;
        var maxScore = 0;

        for (const answer of valuation.data.answers) {
            totalScore += answer.score[0];
            maxScore += answer.score[1];
        }

        return res.send({
            examName: (await Exam.findById(valuation.valuatorId)).name,
            totalScore: totalScore.toString(),
            maxScore: maxScore.toString(),
        });
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/marksheet", async (req, res) => {
    const schema = joi.object({
        examId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const valuations = await Valuation.find({ examId: data.examId }).lean();

        var marksheet = [];

        for (const valuation of valuations) {
            const answers = valuation.data.answers;
            var totalScore = 0;

            for (const answer of answers) {
                totalScore += answer.score[0];
            }

            marksheet.push({
                name: valuation.data.student_name,
                rollNo: valuation.data.roll_no,
                marks: totalScore,
                isChecked: true
            });
        }

        //sort by marks
        marksheet.sort((a, b) => b.marks - a.marks);

        return res.send(marksheet);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

export default router;