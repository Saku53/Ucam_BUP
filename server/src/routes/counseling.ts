import express, { Request, Response } from 'express';
import Appointment from '../models/Appointment';

const router = express.Router();

// GET /api/counseling/:studentId
router.get('/:studentId', async (req: Request, res: Response) => {
    try {
        const appointments = await Appointment.find({ studentId: req.params.studentId }).sort({ createdAt: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/counseling
router.post('/', async (req: Request, res: Response) => {
    try {
        const { studentId, sessionType, date, time, notes } = req.body;
        const appointment = await Appointment.create({ studentId, sessionType, date, time, notes });
        res.status(201).json(appointment);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;