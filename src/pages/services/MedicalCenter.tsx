import React, { useState } from 'react';

interface MedicalRecord {
    id: string;
    visitDate: string;
    doctor: string;
    department: string;
    diagnosis: string;
    status: 'Completed' | 'Pending' | 'Follow-up';
    notes?: string;
}

const medicalRecords: MedicalRecord[] = [
    {
        id: '1',
        visitDate: '2025-02-20',
        doctor: 'Dr. Karim Hossain',
        department: 'General Medicine',
        diagnosis: 'Common Cold',
        status: 'Completed',
        notes: 'Rest, hydration, and vitamin C recommended.',
    },
    {
        id: '2',
        visitDate: '2025-01-15',
        doctor: 'Dr. Fatima Akter',
        department: 'Cardiology',
        diagnosis: 'Regular Checkup',
        status: 'Completed',
        notes: 'All vitals normal. Continue current routine.',
    },
    {
        id: '3',
        visitDate: '2025-03-10',
        doctor: 'Dr. Nasir Ahmed',
        department: 'Dentistry',
        diagnosis: 'Dental Cleaning',
        status: 'Pending',
    },
];

const departments = [
    { name: 'General Medicine', doctor: 'Dr. Karim Hossain', hours: '8:00 AM - 4:00 PM' },
    { name: 'Cardiology', doctor: 'Dr. Fatima Akter', hours: '10:00 AM - 2:00 PM' },
    { name: 'Dentistry', doctor: 'Dr. Nasir Ahmed', hours: '9:00 AM - 5:00 PM' },
    { name: 'Psychology', doctor: 'Dr. Aisha Khan', hours: '2:00 PM - 6:00 PM' },
];

const Svg = ({ size = 16, color = 'currentColor', children }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        {children}
    </svg>
);

const ActivityIcon = () => <Svg size={18}><path d="M22 12h-4l-3 9H9l-3-9H2"/></Svg>;
const CheckCircleIcon = () => <Svg size={18} color="#059669"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Svg>;
const AlertCircleIcon = () => <Svg size={18} color="#d97706"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Svg>;
const ClockIcon = () => <Svg size={18} color="#2563eb"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Svg>;
const UserIcon = () => <Svg size={18}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Svg>;
const CalendarIcon = () => <Svg size={18}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Svg>;
const PlusIcon = () => <Svg size={16}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>;

function StatusBadge({ status }: { status: string }) {
    const config = {
        'Completed': { bg: '#f0fdf9', text: '#059669', icon: <CheckCircleIcon /> },
        'Pending': { bg: '#eff6ff', text: '#2563eb', icon: <ClockIcon /> },
        'Follow-up': { bg: '#fef3c7', text: '#d97706', icon: <AlertCircleIcon /> },
    };
    const c = config[status as keyof typeof config];
    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: c.bg, color: c.text, padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', border: `1px solid ${c.bg}` }}>
            {c.icon}
            {status}
        </div>
    );
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function MedicalCenter() {
    const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'records' | 'departments'>('records');

    const selectedData = medicalRecords.find(r => r.id === selectedRecord);

    return (
        <div style={{ animation: 'fadeIn 0.4s ease', fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}`}</style>

            <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 6px 0' }}>Medical Center</h1>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>View health records and book appointments with doctors</p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', background: '#f9fafb', borderRadius: '12px', padding: '4px', marginBottom: '16px' }}>
                {[
                    { id: 'records', label: 'Medical Records' },
                    { id: 'departments', label: 'Departments' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '9px',
                            border: 'none',
                            fontSize: '13px',
                            fontWeight: '600',
                            background: activeTab === tab.id ? '#ffffff' : 'transparent',
                            color: activeTab === tab.id ? '#059669' : '#6b7280',
                            boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                            cursor: 'pointer',
                            transition: 'all 0.18s ease',
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Medical Records Tab */}
            {activeTab === 'records' && (
                <div style={{ display: 'grid', gridTemplateColumns: selectedData ? '1fr 320px' : '1fr', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                        {medicalRecords.length === 0 ? (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '13px' }}>
                                No medical records found.
                            </div>
                        ) : (
                            medicalRecords.map(record => (
                                <div
                                    key={record.id}
                                    onClick={() => setSelectedRecord(record.id)}
                                    style={{
                                        background: '#ffffff',
                                        borderRadius: '14px',
                                        border: selectedRecord === record.id ? '2px solid #059669' : '1px solid #e5e7eb',
                                        padding: '16px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        boxShadow: selectedRecord === record.id ? '0 4px 16px rgba(5,150,105,0.2)' : '0 1px 4px rgba(0,0,0,0.06)',
                                    }}
                                    onMouseEnter={e => {
                                        if (selectedRecord !== record.id) {
                                            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                                            (e.currentTarget as HTMLDivElement).style.borderColor = '#d1fae5';
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (selectedRecord !== record.id) {
                                            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
                                            (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb';
                                        }
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                                        <div style={{ background: '#f0fdf9', borderRadius: '10px', padding: '12px', color: '#059669' }}>
                                            <ActivityIcon />
                                        </div>
                                    </div>

                                    <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0', textAlign: 'center' }}>
                                        {record.diagnosis}
                                    </h3>
                                    <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 10px 0', textAlign: 'center' }}>
                                        {record.department}
                                    </p>

                                    <div style={{ background: '#f9fafb', borderRadius: '6px', padding: '6px 8px', marginBottom: '8px', fontSize: '10px', color: '#6b7280', textAlign: 'center' }}>
                                        {formatDate(record.visitDate)}
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <StatusBadge status={record.status} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {selectedData && (
                        <div style={{
                            background: '#ffffff',
                            borderRadius: '14px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                            height: 'fit-content',
                            position: 'sticky',
                            top: '16px',
                            animation: 'fadeIn 0.3s ease',
                        }}>
                            <div style={{ padding: '14px 16px', borderBottom: '1px solid #f3f4f6' }}>
                                <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: 0 }}>Visit Details</h3>
                            </div>

                            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                                    <div style={{ background: '#f0fdf9', borderRadius: '10px', padding: '16px', color: '#059669' }}>
                                        <ActivityIcon />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                        Diagnosis
                                    </div>
                                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>
                                        {selectedData.diagnosis}
                                    </div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                        Doctor
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#374151' }}>
                                        {selectedData.doctor}
                                    </div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                        Department
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#374151' }}>
                                        {selectedData.department}
                                    </div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                        Visit Date
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#374151' }}>
                                        {formatDate(selectedData.visitDate)}
                                    </div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                                        Status
                                    </div>
                                    <StatusBadge status={selectedData.status} />
                                </div>

                                {selectedData.notes && (
                                    <>
                                        <div style={{ height: '1px', background: '#f3f4f6' }} />
                                        <div>
                                            <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                                Doctor's Notes
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#374151', lineHeight: 1.5, background: '#f9fafb', borderRadius: '6px', padding: '8px 10px' }}>
                                                {selectedData.notes}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Departments Tab */}
            {activeTab === 'departments' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                    {departments.map((dept, i) => (
                        <div key={i} style={{
                            background: '#ffffff',
                            borderRadius: '14px',
                            border: '1px solid #e5e7eb',
                            padding: '16px',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                            transition: 'all 0.2s ease',
                        }}
                             onMouseEnter={e => {
                                 (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                                 (e.currentTarget as HTMLDivElement).style.borderColor = '#d1fae5';
                             }}
                             onMouseLeave={e => {
                                 (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
                                 (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb';
                             }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                                <div style={{ background: '#f0fdf9', borderRadius: '10px', padding: '12px', color: '#059669' }}>
                                    <UserIcon />
                                </div>
                            </div>

                            <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0', textAlign: 'center' }}>
                                {dept.name}
                            </h3>

                            <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '8px 10px', marginBottom: '8px' }}>
                                <div style={{ fontSize: '9px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                                    Doctor
                                </div>
                                <div style={{ fontSize: '11px', color: '#374151' }}>
                                    {dept.doctor}
                                </div>
                            </div>

                            <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '8px 10px', marginBottom: '10px' }}>
                                <div style={{ fontSize: '9px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                                    Office Hours
                                </div>
                                <div style={{ fontSize: '11px', color: '#374151' }}>
                                    {dept.hours}
                                </div>
                            </div>

                            <button
                                style={{
                                    width: '100%',
                                    background: '#059669',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    fontFamily: "'DM Sans', sans-serif",
                                }}
                                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#047857'}
                                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#059669'}
                            >
                                Book Appointment
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}