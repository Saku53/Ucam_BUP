import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './src/models/User';
import Complaint from './src/models/Complaint';
import LostItem from './src/models/LostItem';
import Notification from './src/models/Notification';
import Appointment from './src/models/Appointment';

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Connected to MongoDB');

        // Clear all existing data
        await User.deleteMany({});
        await Complaint.deleteMany({});
        await LostItem.deleteMany({});
        await Notification.deleteMany({});
        await Appointment.deleteMany({});
        console.log('Cleared existing data');

        // Create student
        await User.create({
            studentId: '23549009053',
            name: 'Md. Nazmus Sakib',
            email: 'sakib.cse21@bup.edu.bd',
            password: '123456',
            department: 'Computer Science & Engineering',
            program: 'B.Sc. in CSE',
            year: '3rd Year',
            semester: '5th Semester',
            cgpa: 3.75,
            bloodGroup: 'B+',
            phone: '+880 1712-345678',
            address: 'Mirpur, Dhaka',
            guardian: 'Md. Rafiqul Islam',
            guardianPhone: '+880 1812-345678',
        });
        console.log('User created');

        // Create complaints
        await Complaint.insertMany([
            {
                studentId: '23549009053',
                referenceCode: 'COMP-001',
                category: 'Infrastructure',
                subject: 'AC not working in AB-302',
                description: 'The air conditioning in room AB-302 has been broken for 2 weeks.',
                anonymous: false,
                status: 'resolved',
            },
            {
                studentId: '23549009053',
                referenceCode: 'COMP-002',
                category: 'Faculty',
                subject: 'Class cancelled without notice',
                description: 'Professor cancelled class without any prior notification.',
                anonymous: false,
                status: 'in-review',
            },
            {
                studentId: null,
                referenceCode: 'ANON-7X2K',
                category: 'Administration',
                subject: 'Anonymous complaint submitted',
                description: 'Issue with exam hall arrangement.',
                anonymous: true,
                status: 'pending',
            },
        ]);
        console.log('Complaints created');

        // Create lost items
        await LostItem.insertMany([
            {
                reportedBy: '23549009053',
                itemName: 'Student ID Card',
                description: 'Blue BUP ID card',
                status: 'lost',
                location: 'Academic Block AB-3',
                contactPhone: '01712-345678',
                date: 'Apr 1, 2026',
            },
            {
                reportedBy: '23549009053',
                itemName: 'Scientific Calculator',
                description: 'Casio fx-991EX',
                status: 'found',
                location: 'Library 2nd Floor',
                contactPhone: '01812-111222',
                date: 'Apr 2, 2026',
            },
            {
                reportedBy: '23549009053',
                itemName: 'Water Bottle',
                description: 'Black steel bottle',
                status: 'lost',
                location: 'Cafeteria',
                contactPhone: '01911-334455',
                date: 'Apr 3, 2026',
            },
            {
                reportedBy: '23549009053',
                itemName: 'Umbrella',
                description: 'Black folding umbrella',
                status: 'found',
                location: 'Main Gate',
                contactPhone: '01712-667788',
                date: 'Apr 4, 2026',
            },
        ]);
        console.log('Lost items created');

        // Create notifications
        await Notification.insertMany([
            {
                studentId: '23549009053',
                title: 'Midterm Results Released',
                message: 'CSE-4101 result now available',
                type: 'success',
                read: false,
            },
            {
                studentId: '23549009053',
                title: 'Library Fine Due',
                message: '200 BDT outstanding fine on borrowed books',
                type: 'warning',
                read: false,
            },
            {
                studentId: '23549009053',
                title: 'Admit Card Available',
                message: 'Download admit card for final exams',
                type: 'info',
                read: false,
            },
            {
                studentId: '23549009053',
                title: 'Scholarship Deadline',
                message: 'Merit scholarship closes Apr 15',
                type: 'warning',
                read: false,
            },
        ]);
        console.log('Notifications created');

        // Create appointments
        await Appointment.insertMany([
            {
                studentId: '23549009053',
                sessionType: 'Academic',
                date: 'Mar 20, 2026',
                time: '10:00 AM',
                notes: 'Course selection guidance',
                status: 'confirmed',
            },
            {
                studentId: '23549009053',
                sessionType: 'Mental Wellness',
                date: 'Apr 10, 2026',
                time: '2:00 PM',
                notes: 'Stress management',
                status: 'pending',
            },
        ]);
        console.log('Appointments created');

        console.log('');
        console.log('✅ All data seeded successfully!');
        console.log('👤 Login with:');
        console.log('   Student ID : 23549009053');
        console.log('   Password   : 123456');

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
};

seed();