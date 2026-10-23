import express, { Request, Response } from 'express';
import Complaint from '../models/Complaint';

const router = express.Router();

// Generate random reference code
const genRef = () => 'COMP-' + Math.random().toString(36).substring(2,8).toUpperCase();
const genAnon = () => 'ANON-' + Math.random().toString(36).substring(2,7).toUpperCase();

// GET /api/complaints/:studentId
router.get('/:studentId', async (req: Request, res: Response) => {
    try {
        const complaints = await Complaint.find({ studentId: req.params.studentId }).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/complaints
router.post('/', async (req: Request, res: Response) => {
    try {
        const { studentId, category, subject, description, anonymous } = req.body;
        const referenceCode = anonymous ? genAnon() : genRef();
        const complaint = await Complaint.create({
            studentId: anonymous ? null : studentId,
            referenceCode,
            category,
            subject,
            description,
            anonymous: !!anonymous,
        });
        res.status(201).json({ ...complaint.toObject(), referenceCode });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;