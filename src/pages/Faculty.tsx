import React, { useState } from 'react';

interface Faculty {
    id: string;
    name: string;
    title: string;
    department: string;
    email: string;
    phone: string;
    office: string;
    specialization: string;
    courses: string[];
    image: string;
    availability: 'Available' | 'In Meeting' | 'On Leave';
}

const faculties: Faculty[] = [
    {
        id: '1',
        name: 'Dr. A.K.M. Rezaul Hossain',
        title: 'Professor',
        department: 'Computer Science & Engineering',
        email: 'rezaul@bup.edu.bd',
        phone: '+880 1712-345678',
        office: 'CSE Building, Room 302',
        specialization: 'Artificial Intelligence & Machine Learning',
        courses: ['CSE-401: Data Structures', 'CSE-501: AI Fundamentals'],
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dr.Rezaul',
        availability: 'Available',
    },
    {
        id: '2',
        name: 'Dr. Md. Faruk Hossain',
        title: 'Associate Professor',
        department: 'Computer Science & Engineering',
        email: 'faruk@bup.edu.bd',
        phone: '+880 1712-345679',
        office: 'CSE Building, Room 304',
        specialization: 'Database Systems & Web Technology',
        courses: ['CSE-405: Database Systems', 'CSE-501L: Web Dev Lab'],
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dr.Faruk',
        availability: 'In Meeting',
    },
    {
        id: '3',
        name: 'Dr. Nasrin Akhter',
        title: 'Assistant Professor',
        department: 'Computer Science & Engineering',
        email: 'nasrin@bup.edu.bd',
        phone: '+880 1712-345680',
        office: 'CSE Building, Room 306',
        specialization: 'Software Engineering & Testing',
        courses: ['CSE-403: Algorithm Design', 'CSE-501: Software Eng.'],
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dr.Nasrin',
        availability: 'Available',
    },
    {
        id: '4',
        name: 'Prof. Md. Enamul Haque',
        title: 'Professor',
        department: 'Computer Science & Engineering',
        email: 'enamul@bup.edu.bd',
        phone: '+880 1712-345681',
        office: 'CSE Building, Room 308',
        specialization: 'Computer Networks & Security',
        courses: ['CSE-407: Computer Networks', 'CSE-509: Cybersecurity'],
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Prof.Enamul',
        availability: 'On Leave',
    },
    {
        id: '5',
        name: 'Dr. Tahsin Rahman',
        title: 'Lecturer',
        department: 'Computer Science & Engineering',
        email: 'tahsin@bup.edu.bd',
        phone: '+880 1712-345682',
        office: 'CSE Building, Room 310',
        specialization: 'Graphics & Visualization',
        courses: ['CSE-501: Graphics Programming'],
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dr.Tahsin',
        availability: 'Available',
    },
];

const Svg = ({ size = 16, color = 'currentColor', children }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        {children}
    </svg>
);

const MailIcon = () => <Svg size={16}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></Svg>;
const PhoneIcon = () => <Svg size={16}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Svg>;
const MapPinIcon = () => <Svg size={16}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></Svg>;
const BookIcon = () => <Svg size={16}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></Svg>;
const CheckCircleIcon = () => <Svg size={16} color="#10b981"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Svg>;
const AlertCircleIcon = () => <Svg size={16} color="#f59e0b"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Svg>;
const MinusCircleIcon = () => <Svg size={16} color="#ef4444"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></Svg>;

function AvailabilityBadge({ availability }: { availability: string }) {
    const config = {
        'Available': { icon: <CheckCircleIcon />, bg: '#f0fdf4', text: '#0F7B6C' },
        'In Meeting': { icon: <AlertCircleIcon />, bg: '#fef3c7', text: '#d97706' },
        'On Leave': { icon: <MinusCircleIcon />, bg: '#fee2e2', text: '#ef4444' },
    };
    const c = config[availability as keyof typeof config];
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: c.bg, color: c.text, padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', width: 'fit-content' }}>
            {c.icon}
            {availability}
        </div>
    );
}

export default function Faculty() {
    const [selected, setSelected] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = faculties.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedFaculty = selected ? faculties.find(f => f.id === selected) : null;

    return (
        <div style={{ animation: 'fadeIn 0.4s ease', fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}`}</style>

            <div style={{ marginBottom: '18px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Faculty Directory</h1>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '3px 0 0 0' }}>Connect with your instructors and academic advisors</p>
            </div>

            {/* Search */}
            <div style={{ marginBottom: '16px', position: 'relative' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '11px', pointerEvents: 'none' }}>
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                    type="text"
                    placeholder="Search by name, department, or specialization..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        paddingLeft: '42px',
                        paddingRight: '16px',
                        paddingTop: '11px',
                        paddingBottom: '11px',
                        border: '1.5px solid #e2e8f0',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontFamily: "'DM Sans', sans-serif",
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = '#0F7B6C'}
                    onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: selectedFaculty ? '1fr 380px' : '1fr', gap: '16px' }}>

                {/* Faculty List */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                    {filtered.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '14px' }}>
                            No faculty found matching your search.
                        </div>
                    ) : (
                        filtered.map(f => (
                            <div
                                key={f.id}
                                onClick={() => setSelected(f.id)}
                                style={{
                                    background: 'white',
                                    borderRadius: '14px',
                                    border: selected === f.id ? '2px solid #0F7B6C' : '1px solid #e2e8f0',
                                    padding: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: selected === f.id ? '0 4px 16px rgba(15,123,108,0.2)' : '0 1px 4px rgba(0,0,0,0.04)',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = selected === f.id ? '0 4px 16px rgba(15,123,108,0.2)' : '0 1px 4px rgba(0,0,0,0.04)'; }}
                            >
                                {/* Avatar */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                                    <img src={f.image} alt={f.name} style={{ width: '56px', height: '56px', borderRadius: '12px' }} />
                                </div>

                                {/* Info */}
                                <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', margin: '0 0 3px 0', textAlign: 'center' }}>{f.name}</h3>
                                <p style={{ fontSize: '11px', color: '#0F7B6C', fontWeight: '600', margin: '0 0 8px 0', textAlign: 'center' }}>{f.title}</p>

                                {/* Department */}
                                <div style={{ fontSize: '10px', color: '#64748b', background: '#f8fafc', borderRadius: '6px', padding: '4px 8px', marginBottom: '8px', textAlign: 'center' }}>
                                    {f.department}
                                </div>

                                {/* Availability */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                                    <AvailabilityBadge availability={f.availability} />
                                </div>

                                {/* Courses */}
                                <div style={{ fontSize: '9px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>Teaches</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {f.courses.slice(0, 2).map((c, i) => (
                                        <div key={i} style={{ fontSize: '10px', color: '#64748b', background: '#f0fdf9', border: '1px solid #d1fae5', borderRadius: '5px', padding: '4px 8px' }}>
                                            📚 {c}
                                        </div>
                                    ))}
                                    {f.courses.length > 2 && (
                                        <div style={{ fontSize: '9px', color: '#94a3b8', fontStyle: 'italic', padding: '4px 8px' }}>
                                            +{f.courses.length - 2} more course{f.courses.length - 2 > 1 ? 's' : ''}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Detail Panel */}
                {selectedFaculty && (
                    <div style={{
                        background: 'linear-gradient(135deg, #0a1628 0%, #1B2B4B 60%, #0f2d28 100%)',
                        borderRadius: '14px',
                        padding: '20px',
                        height: 'fit-content',
                        position: 'sticky',
                        top: '16px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        animation: 'fadeIn 0.3s ease',
                    }}>
                        {/* Avatar & Name */}
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                            <img src={selectedFaculty.image} alt={selectedFaculty.name} style={{ width: '72px', height: '72px', borderRadius: '14px', marginBottom: '12px', border: '2px solid rgba(18,160,144,0.5)' }} />
                            <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'white', margin: '0 0 4px 0' }}>{selectedFaculty.name}</h2>
                            <p style={{ fontSize: '12px', color: '#12A090', fontWeight: '600', margin: 0 }}>{selectedFaculty.title}</p>
                        </div>

                        {/* Availability */}
                        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px', marginBottom: '14px', textAlign: 'center' }}>
                            <AvailabilityBadge availability={selectedFaculty.availability} />
                        </div>

                        {/* Contact Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                <Svg size={16} color="#12A090"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></Svg>
                                <div>
                                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Email</div>
                                    <a href={`mailto:${selectedFaculty.email}`} style={{ fontSize: '11px', color: '#12A090', textDecoration: 'none', wordBreak: 'break-all' }}>
                                        {selectedFaculty.email}
                                    </a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                <Svg size={16} color="#12A090"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Svg>
                                <div>
                                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Phone</div>
                                    <a href={`tel:${selectedFaculty.phone}`} style={{ fontSize: '11px', color: '#12A090', textDecoration: 'none' }}>
                                        {selectedFaculty.phone}
                                    </a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                <Svg size={16} color="#12A090"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></Svg>
                                <div>
                                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Office</div>
                                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>{selectedFaculty.office}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '14px' }} />

                        {/* Specialization */}
                        <div>
                            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>Specialization</div>
                            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.5 }}>🎓 {selectedFaculty.specialization}</p>
                        </div>

                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '14px 0' }} />

                        {/* All Courses */}
                        <div>
                            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>All Courses</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {selectedFaculty.courses.map((c, i) => (
                                    <div key={i} style={{ fontSize: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(18,160,144,0.3)', borderRadius: '6px', padding: '6px 10px', color: 'rgba(255,255,255,0.8)' }}>
                                        📚 {c}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={() => setSelected(null)} style={{ width: '100%', marginTop: '14px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', padding: '10px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif" }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)'; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'; }}>
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}