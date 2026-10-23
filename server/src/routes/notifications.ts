import express, { Request, Response } from 'express';
import Notification from '../models/Notification';

const router = express.Router();

// GET /api/notifications/:studentId
router.get('/:studentId', async (req: Request, res: Response) => {
    try {
        const notifs = await Notification.find({ studentId: req.params.studentId }).sort({ createdAt: -1 }).limit(10);
        res.json(notifs);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PATCH /api/notifications/:id/read
router.patch('/:id/read', async (req: Request, res: Response) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { read: true });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;