
import express from 'express';
import Course from '../models/Course.js';
const router = express.Router();

// Create a new course
router.post('/', async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            res.status(404).json({ error: 'Course not found' });
            return;
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a course by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCourse) {
            res.status(404).json({ error: 'Course not found' });
            return;
        }
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a course by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            res.status(404).json({ error: 'Course not found' });
            return;
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;