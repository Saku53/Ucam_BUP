import mongoose, { Document, Schema } from 'mongoose';

export interface IComplaint extends Document {
    studentId: string | null;
    referenceCode: string;
    category: string;
    subject: string;
    description: string;
    anonymous: boolean;
    status: 'pending' | 'in-review' | 'resolved';
    createdAt: Date;
}

const ComplaintSchema = new Schema<IComplaint>({
    studentId:     { type: String, default: null },
    referenceCode: { type: String, required: true, unique: true },
    category:      { type: String, required: true },
    subject:       { type: String, required: true },
    description:   { type: String, required: true },
    anonymous:     { type: Boolean, default: false },
    status:        { type: String, enum: ['pending','in-review','resolved'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model<IComplaint>('Complaint', ComplaintSchema);