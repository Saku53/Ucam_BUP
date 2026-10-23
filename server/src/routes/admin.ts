import { Router, Response } from 'express';
import User from '../models/User';
import { protect, adminOnly, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/admin/users
router.get('/users', protect, adminOnly, async (_req, res: Response): Promise<void> => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// PUT /api/admin/users/:id  ← this is what your admin panel must call
router.put('/users/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const allowed = ['name', 'email', 'department', 'year', 'semester', 'bloodGroup', 'phone', 'cgpa', 'role'];
        const updates: Record<string, any> = {};
        allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) { res.status(404).json({ success: false, message: 'User not found' }); return; }
        res.json({ success: true, user });
    } catch (err: any) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'User deleted' });
    } catch {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;