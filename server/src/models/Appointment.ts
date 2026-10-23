import mongoose, { Document, Schema } from 'mongoose';

export interface IAppointment extends Document {
    studentId: string;
    sessionType: 'Academic' | 'Mental Wellness' | 'Group Sessions';
    date: string;
    time: string;
    notes: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>({
    studentId:   { type: String, required: true },
    sessionType: { type: String, enum: ['Academic','Mental Wellness','Group Sessions'], required: true },
    date:        { type: String, required: true },
    time:        { type: String, required: true },
    notes:       { type: String, default: '' },
    status:      { type: String, enum: ['pending','confirmed','cancelled'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);