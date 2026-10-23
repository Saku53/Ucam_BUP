import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'bup_ucam_secret_2025';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// ── MIDDLEWARE: Verify JWT ────────────────────────────────────────────────────
const authMiddleware = (req: any, res: Response, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// ── REGISTER ──────────────────────────────────────────────────────────────────
// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
    try {
        const {
            studentId, name, email, password,
            department, program, year, semester,
            cgpa, bloodGroup, phone, address,
            guardian, guardianPhone,
        } = req.body;

        if (!studentId || !name || !email || !password) {
            return res.status(400).json({ error: 'Student ID, name, email and password are required.' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters.' });
        }

        const existsId    = await User.findOne({ studentId: studentId.trim() });
        const existsEmail = await User.findOne({ email: email.toLowerCase().trim() });

        if (existsId)    return res.status(400).json({ error: 'Student ID is already registered.' });
        if (existsEmail) return res.status(400).json({ error: 'Email is already registered.' });

        const user = await User.create({
            studentId:    studentId.trim(),
            name:         name.trim(),
            email:        email.toLowerCase().trim(),
            password,                          // pre-save hook hashes it
            department:   department   || 'CSE',
            program:      program      || 'B.Sc. in CSE',
            year:         year         || '1st Year',
            semester:     semester     || '1st Semester',
            cgpa:         cgpa         || 0,
            bloodGroup:   bloodGroup   || '',
            phone:        phone        || '',
            address:      address      || '',
            guardian:     guardian     || '',
            guardianPhone:guardianPhone|| '',
            role: 'student',
        });

        const token = jwt.sign(
            { id: user._id, studentId: user.studentId, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            token,
            user: {
                _id:          user._id,
                studentId:    user.studentId,
                name:         user.name,
                email:        user.email,
                department:   user.department,
                program:      user.program,
                year:         user.year,
                semester:     user.semester,
                cgpa:         user.cgpa,
                bloodGroup:   user.bloodGroup,
                phone:        user.phone,
                address:      user.address,
                guardian:     user.guardian,
                guardianPhone:user.guardianPhone,
                profileImage: user.profileImage,
                role:         user.role,
            },
        });
    } catch (err: any) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Server error during registration.' });
    }
});

// ── LOGIN ─────────────────────────────────────────────────────────────────────
// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { studentId, password } = req.body;

        if (!studentId || !password) {
            return res.status(400).json({ error: 'Student ID and password are required.' });
        }

        // Admin — not stored in DB
        if (studentId.trim() === 'admin') {
            if (password !== ADMIN_PASSWORD) {
                return res.status(401).json({ error: 'Invalid admin credentials.' });
            }
            const token = jwt.sign(
                { id: 'admin', studentId: 'admin', role: 'admin' },
                JWT_SECRET,
                { expiresIn: '1d' }
            );
            return res.json({
                token,
                user: {
                    studentId: 'admin',
                    name: 'Administrator',
                    role: 'admin',
                },
            });
        }

        // Student
        const user = await User.findOne({ studentId: studentId.trim() });
        if (!user) {
            return res.status(404).json({ error: 'Student ID not found.' });
        }

        const match = await user.comparePassword(password);
        if (!match) {
            return res.status(401).json({ error: 'Incorrect password.' });
        }

        const token = jwt.sign(
            { id: user._id, studentId: user.studentId, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                _id:          user._id,
                studentId:    user.studentId,
                name:         user.name,
                email:        user.email,
                department:   user.department,
                program:      user.program,
                year:         user.year,
                semester:     user.semester,
                cgpa:         user.cgpa,
                bloodGroup:   user.bloodGroup,
                phone:        user.phone,
                address:      user.address,
                guardian:     user.guardian,
                guardianPhone:user.guardianPhone,
                profileImage: user.profileImage,
                role:         user.role,
            },
        });
    } catch (err: any) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error during login.' });
    }
});

// ── UPDATE PROFILE ────────────────────────────────────────────────────────────
// PATCH /api/auth/profile
router.patch('/profile', authMiddleware, async (req: any, res: Response) => {
    try {
        const { phone, bloodGroup, address, guardian, guardianPhone, profileImage } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Update only provided fields
        if (phone !== undefined)         user.phone = phone;
        if (bloodGroup !== undefined)    user.bloodGroup = bloodGroup;
        if (address !== undefined)       user.address = address;
        if (guardian !== undefined)      user.guardian = guardian;
        if (guardianPhone !== undefined) user.guardianPhone = guardianPhone;
        if (profileImage !== undefined)  user.profileImage = profileImage;

        await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                _id:          user._id,
                studentId:    user.studentId,
                name:         user.name,
                email:        user.email,
                department:   user.department,
                program:      user.program,
                year:         user.year,
                semester:     user.semester,
                cgpa:         user.cgpa,
                bloodGroup:   user.bloodGroup,
                phone:        user.phone,
                address:      user.address,
                guardian:     user.guardian,
                guardianPhone:user.guardianPhone,
                profileImage: user.profileImage,
                role:         user.role,
            },
        });
    } catch (err: any) {
        console.error('Profile update error:', err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// ── CHANGE PASSWORD ───────────────────────────────────────────────────────────
// PATCH /api/auth/password
router.patch('/password', authMiddleware, async (req: any, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current and new password are required' });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ error: 'New password must be at least 8 characters' });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Verify current password
        const match = await user.comparePassword(currentPassword);
        if (!match) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        // Update password (pre-save hook will hash it)
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (err: any) {
        console.error('Password change error:', err);
        res.status(500).json({ error: 'Failed to update password' });
    }
});

// ── SEED (dev only) ───────────────────────────────────────────────────────────
// POST /api/auth/seed
router.post('/seed', async (req: Request, res: Response) => {
    try {
        const exists = await User.findOne({ studentId: '23549009053' });
        if (exists) return res.json({ message: 'Already seeded' });

        await User.create({
            studentId:    '23549009053',
            name:         'Md. Nazmus Sakib',
            email:        'sakib.cse21@bup.edu.bd',
            password:     '123456',           // hashed by pre-save hook
            department:   'Information and Engineering',
            program:      'B.Sc. in ICE',
            year:         '3rd Year',
            semester:     '5th Semester',
            cgpa:         3.75,
            bloodGroup:   'B+',
            phone:        '+880 1712-345678',
            address:      'Mirpur, Dhaka',
            guardian:     'Nurul Alam',
            guardianPhone:'+880 1812-345678',
            role:         'student',
        });

        res.json({ message: 'Demo student created — password: 123456' });
    } catch (err) {
        res.status(500).json({ error: 'Seed error' });
    }
});

export default router;