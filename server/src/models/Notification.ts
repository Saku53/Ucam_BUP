import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
    studentId: string;
    title: string;
    message: string;
    type: 'success' | 'warning' | 'info' | 'error';
    read: boolean;
    createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
    studentId: { type: String, required: true },
    title:     { type: String, required: true },
    message:   { type: String, required: true },
    type:      { type: String, enum: ['success','warning','info','error'], default: 'info' },
    read:      { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<INotification>('Notification', NotificationSchema);