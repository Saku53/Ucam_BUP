import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes         from './routes/auth';
import complaintRoutes    from './routes/complaints';
import lostFoundRoutes    from './routes/lostFound';
import counselingRoutes   from './routes/counseling';
import notificationRoutes from './routes/notifications';
import adminRoutes        from './routes/admin';

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/auth',          authRoutes);
app.use('/api/complaints',    complaintRoutes);
app.use('/api/lost-found',    lostFoundRoutes);
app.use('/api/counseling',    counselingRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin',         adminRoutes);

app.get('/api/health', (_, res) => res.json({ status: 'OK', db: 'MongoDB Connected' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));