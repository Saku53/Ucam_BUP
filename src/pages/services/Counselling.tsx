import React, { useState } from 'react';

interface CounselingSession {
    id: string;
    counselor: string;
    date: string;
    time: string;
    type: 'Academic' | 'Personal' | 'Career' | 'General';
    status: 'Scheduled' | 'Completed' | 'Cancelled';
    notes?: string;
}

const sessions: CounselingSession[] = [
    {
        id: '1',
        counselor: 'Dr. Fatima Ahmed',
        date: '2025-03-15',
        time: '2:00 PM',
        type: 'Academic',
        status: 'Scheduled',
        notes: 'Discuss course selection and academic progress',
    },
    {
        id: '2',
        counselor: 'Mr. Karim Hassan',
        date: '2025-02-20',
        time: '11:00 AM',
        type: 'Career',
        status: 'Completed',
        notes: 'Career path planning and internship opportunities',
    },
    {
        id: '3',
        counselor: 'Dr. Aisha Khan',
        date: '2025-03-22',
        time: '3:30 PM',
        type: 'Personal',
        status: 'Scheduled',
        notes: 'Personal well-being and stress management',
    },
    {
        id: '4',
        counselor: 'Mr. Rajib Rahman',
        date: '2025-02-10',
        time: '10:00 AM',
        type: 'General',
        status: 'Cancelled',
    },
];

const Svg = ({ size = 16, color = 'currentColor', children }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        {children}
    </svg>
);

const CalendarIcon = () => <Svg size={18}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Svg>;
const ClockIcon = () => <Svg size={18}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Svg>;
const CheckCircleIcon = () => <Svg size={18} color="#059669"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Svg>;
const AlertCircleIcon = () => <Svg size={18} color="#d97706"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Svg>;
const UserIcon = () => <Svg size={18}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Svg>;
const PlusIcon = () => <Svg size={16}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>;
const XIcon = () => <Svg size={16}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Svg>;

function StatusBadge({ status }: { status: string }) {
    const config = {
        'Scheduled': { bg: '#f0fdf9', text: '#059669', icon: <CheckCircleIcon /> },
        'Completed': { bg: '#f0fdf9', text: '#059669', icon: <CheckCircleIcon /> },
        'Cancelled': { bg: '#fef2f2', text: '#dc2626', icon: <AlertCircleIcon /> },
    };
    const c = config[status as keyof typeof config];
    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: c.bg, color: c.text, padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', border: `1px solid ${c.bg}` }}>
            {c.icon}
            {status}
        </div>
    );
}

function TypeBadge({ type }: { type: string }) {
    const colors: Record<string, { bg: string; text: string }> = {
        'Academic': { bg: '#eff6ff', text: '#2563eb' },
        'Career': { bg: '#fef3c7', text: '#d97706' },
        'Personal': { bg: '#f0fdf9', text: '#059669' },
        'General': { bg: '#f3f4f6', text: '#374151' },
    };
    const c = colors[type];
    return (
        <span style={{ background: c.bg, color: c.text, borderRadius: '6px', padding: '3px 9px', fontSize: '11px', fontWeight: '700', border: `1px solid ${c.bg}` }}>
            {type}
        </span>
    );
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function Counselling() {
    const [showBooking, setShowBooking] = useState(false);
    const [selectedType, setSelectedType] = useState('Academic');

    const upcomingSessions = sessions.filter(s => s.status === 'Scheduled');
    const pastSessions = sessions.filter(s => s.status === 'Completed');

    return (
        <div style={{ animation: 'fadeIn 0.4s ease', fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}`}</style>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                    <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 6px 0' }}>Counselling Services</h1>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Schedule sessions with our academic and personal counselors</p>
                </div>
                <button
                    onClick={() => setShowBooking(!showBooking)}
                    style={{
                        background: '#059669',
                        color: 'white',
                        border: 'none',
                        padding: '10px 18px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s',
                        boxShadow: '0 4px 14px rgba(5,150,105,0.35)',
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = '#047857';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(5,150,105,0.45)';
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = '#059669';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(5,150,105,0.35)';
                    }}
                >
                    <PlusIcon />
                    Book Session
                </button>
            </div>

            {/* Booking Form */}
            {showBooking && (
                <div style={{
                    background: '#ffffff',
                    borderRadius: '14px',
                    border: '1px solid #e5e7eb',
                    padding: '18px 22px',
                    marginBottom: '16px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    animation: 'fadeIn 0.3s ease',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: 0 }}>Book New Session</h3>
                        <button
                            onClick={() => setShowBooking(false)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#6b7280',
                                cursor: 'pointer',
                                padding: '4px',
                            }}
                        >
                            <XIcon />
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        {['Academic', 'Career', 'Personal', 'General'].map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                style={{
                                    background: selectedType === type ? '#f0fdf9' : '#ffffff',
                                    border: `1.5px solid ${selectedType === type ? '#d1fae5' : '#e5e7eb'}`,
                                    color: selectedType === type ? '#059669' : '#6b7280',
                                    padding: '10px',
                                    borderRadius: '9px',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.18s ease',
                                    fontFamily: "'DM Sans', sans-serif",
                                }}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <input
                            type="date"
                            placeholder="Preferred Date"
                            style={{
                                border: '1.5px solid #e5e7eb',
                                borderRadius: '9px',
                                padding: '10px 13px',
                                fontSize: '13px',
                                fontFamily: "'DM Sans', sans-serif",
                                outline: 'none',
                                boxSizing: 'border-box',
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = '#6ee7b7'}
                            onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
                        />
                        <input
                            type="time"
                            placeholder="Preferred Time"
                            style={{
                                border: '1.5px solid #e5e7eb',
                                borderRadius: '9px',
                                padding: '10px 13px',
                                fontSize: '13px',
                                fontFamily: "'DM Sans', sans-serif",
                                outline: 'none',
                                boxSizing: 'border-box',
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = '#6ee7b7'}
                            onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
                        />
                    </div>

                    <textarea
                        placeholder="Additional notes or concerns..."
                        style={{
                            width: '100%',
                            marginTop: '12px',
                            border: '1.5px solid #e5e7eb',
                            borderRadius: '9px',
                            padding: '10px 13px',
                            fontSize: '13px',
                            fontFamily: "'DM Sans', sans-serif",
                            outline: 'none',
                            boxSizing: 'border-box',
                            minHeight: '80px',
                            resize: 'vertical',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = '#6ee7b7'}
                        onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
                    />

                    <button
                        style={{
                            background: '#059669',
                            color: 'white',
                            border: 'none',
                            padding: '11px 20px',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginTop: '12px',
                            width: '100%',
                            transition: 'all 0.2s',
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#047857'}
                        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#059669'}
                    >
                        Request Session
                    </button>
                </div>
            )}

            {/* Upcoming Sessions */}
            <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>Upcoming Sessions</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
                    {upcomingSessions.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '13px' }}>
                            No upcoming sessions scheduled. Book one to get started.
                        </div>
                    ) : (
                        upcomingSessions.map(session => (
                            <div key={session.id} style={{
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
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <TypeBadge type={session.type} />
                                    <StatusBadge status={session.status} />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                    <UserIcon />
                                    <div>
                                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{session.counselor}</div>
                                        <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{session.type} Counselor</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#374151' }}>
                                        <CalendarIcon />
                                        {formatDate(session.date)}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#374151' }}>
                                        <ClockIcon />
                                        {session.time}
                                    </div>
                                </div>

                                {session.notes && (
                                    <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '8px 12px', fontSize: '11px', color: '#6b7280', marginBottom: '10px', borderLeft: '2px solid #d1fae5' }}>
                                        {session.notes}
                                    </div>
                                )}

                                <button style={{
                                    background: '#f0fdf9',
                                    border: '1px solid #d1fae5',
                                    color: '#059669',
                                    padding: '7px 14px',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    width: '100%',
                                    transition: 'all 0.18s ease',
                                    fontFamily: "'DM Sans', sans-serif",
                                }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLButtonElement).style.background = '#d1fae5';
                                            (e.currentTarget as HTMLButtonElement).style.color = '#047857';
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLButtonElement).style.background = '#f0fdf9';
                                            (e.currentTarget as HTMLButtonElement).style.color = '#059669';
                                        }}
                                >
                                    View Details
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Past Sessions */}
            {pastSessions.length > 0 && (
                <div>
                    <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>Past Sessions</h2>
                    <div style={{
                        background: '#ffffff',
                        borderRadius: '14px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                        overflow: 'hidden',
                    }}>
                        {pastSessions.map((session, i) => (
                            <div key={session.id} style={{ padding: '14px 18px', borderBottom: i < pastSessions.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>{session.counselor}</div>
                                        <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>
                                            {formatDate(session.date)} at {session.time}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <TypeBadge type={session.type} />
                                        <StatusBadge status={session.status} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}