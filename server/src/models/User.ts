import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    studentId:    string;
    name:         string;
    email:        string;
    password:     string;
    department:   string;
    program:      string;
    year:         string;
    semester:     string;
    cgpa:         number;
    bloodGroup:   string;
    phone:        string;
    address:      string;
    guardian:     string;
    guardianPhone:string;
    profileImage: string;
    role:         'student' | 'admin';
    createdAt:    Date;
    comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    studentId:     { type: String, required: true, unique: true, trim: true },
    name:          { type: String, required: true, trim: true },
    email:         { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:      { type: String, required: true, minlength: 6 },
    department:    { type: String, default: '' },
    program:       { type: String, default: '' },
    year:          { type: String, default: '' },
    semester:      { type: String, default: '' },
    cgpa:          { type: Number, default: 0 },
    bloodGroup:    { type: String, default: '' },
    phone:         { type: String, default: '' },
    address:       { type: String, default: '' },
    guardian:      { type: String, default: '' },
    guardianPhone: { type: String, default: '' },
    profileImage:  { type: String, default: '' },
    role:          { type: String, enum: ['student', 'admin'], default: 'student' },
}, { timestamps: true });

// Hash password before save
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare method
UserSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
    return bcrypt.compare(candidate, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);