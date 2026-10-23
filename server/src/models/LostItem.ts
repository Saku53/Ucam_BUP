import mongoose, { Document, Schema } from 'mongoose';

export interface ILostItem extends Document {
    reportedBy: string;
    itemName: string;
    description: string;
    status: 'lost' | 'found';
    location: string;
    contactPhone: string;
    date: string;
    createdAt: Date;
}

const LostItemSchema = new Schema<ILostItem>({
    reportedBy:   { type: String, required: true },
    itemName:     { type: String, required: true },
    description:  { type: String, default: '' },
    status:       { type: String, enum: ['lost','found'], required: true },
    location:     { type: String, required: true },
    contactPhone: { type: String, required: true },
    date:         { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<ILostItem>('LostItem', LostItemSchema);