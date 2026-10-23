import express, { Request, Response } from 'express';
import LostItem from '../models/LostItem';

const router = express.Router();

// GET /api/lost-found  — get all items
router.get('/', async (req: Request, res: Response) => {
    try {
        const items = await LostItem.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/lost-found  — report new item
router.post('/', async (req: Request, res: Response) => {
    try {
        const { reportedBy, itemName, description, status, location, contactPhone, date } = req.body;
        const item = await LostItem.create({ reportedBy, itemName, description, status, location, contactPhone, date });
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;