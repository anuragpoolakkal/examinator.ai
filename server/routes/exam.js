import Exam from '../models/Exam.js';
import { Router } from 'express';
const router = Router();

router.post('/', async (req, res) => {
    try {
        const newExam = new Exam(req.body);
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
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            res.status(404).json({ error: 'Exam not found' });
            return;
        }
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