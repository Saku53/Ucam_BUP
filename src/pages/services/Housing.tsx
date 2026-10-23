import React, { useState } from 'react';

interface Housing {
    id: string;
    hallName: string;
    room: string;
    floor: string;
    capacity: number;
    occupants: number;
    status: 'Allocated' | 'Pending' | 'Not Allocated';
    checkInDate?: string;
    checkOutDate?: string;
}

const housings: Housing[] = [
    {
        id: '1',
        hallName: 'Bangabandhu Hall',
        room: '302-A',
        floor: '3rd Floor',
        capacity: 2,
        occupants: 2,
        status: 'Allocated',
        checkInDate: '2025-01-10',
    },
    {
        id: '2',
        hallName: 'Sheikh Kamal Hall',
        room: 'Waiting List',
        floor: '--',
        capacity: 0,
        occupants: 0,
        status: 'Pending',
    },
    {
        id: '3',
        hallName: 'Sher-e-Bangla Hall',
        room: '--',
        floor: '--',
        capacity: 0,
        occupants: 0,
        status: 'Not Allocated',
    },
];

const Svg = ({ size = 16, color = 'currentColor', children }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        {children}
    </svg>
);

const HomeIcon = () => <Svg size={18}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Svg>;
const CheckCircleIcon = () => <Svg size={18} color="#059669"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Svg>;
const AlertCircleIcon = () => <Svg size={18} color="#d97706"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Svg>;
const ClockIcon = () => <Svg size={18} color="#2563eb"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Svg>;
const UsersIcon = () => <Svg size={18}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Svg>;
const FileIcon = () => <Svg size={16}><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></Svg>;

function StatusBadge({ status }: { status: string }) {
    const config = {
        'Allocated': { bg: '#f0fdf9', text: '#059669', icon: <CheckCircleIcon /> },
        'Pending': { bg: '#eff6ff', text: '#2563eb', icon: <ClockIcon /> },
        'Not Allocated': { bg: '#fef2f2', text: '#dc2626', icon: <AlertCircleIcon /> },
    };
    const c = config[status as keyof typeof config];
    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: c.bg, color: c.text, padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', border: `1px solid ${c.bg}` }}>
            {c.icon}
            {status}
        </div>
    );
}

export default function Housing() {
    const [selectedHousing, setSelectedHousing] = useState<string | null>(null);

    const selectedData = housings.find(h => h.id === selectedHousing);

    return (
        <div style={{ animation: 'fadeIn 0.4s ease', fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}`}</style>

            <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 6px 0' }}>Residential Housing</h1>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>View hall allocation and accommodation details</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: selectedData ? '1fr 320px' : '1fr', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                    {housings.map(housing => (
                        <div
                            key={housing.id}
                            onClick={() => setSelectedHousing(housing.id)}
                            style={{
                                background: '#ffffff',
                                borderRadius: '14px',
                                border: selectedHousing === housing.id ? '2px solid #059669' : '1px solid #e5e7eb',
                                padding: '16px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: selectedHousing === housing.id ? '0 4px 16px rgba(5,150,105,0.2)' : '0 1px 4px rgba(0,0,0,0.06)',
                            }}
                            onMouseEnter={e => {
                                if (selectedHousing !== housing.id) {
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                                    (e.currentTarget as HTMLDivElement).style.borderColor = '#d1fae5';
                                }
                            }}
                            onMouseLeave={e => {
                                if (selectedHousing !== housing.id) {
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
                                    (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb';
                                }
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                                <div style={{ background: '#f0fdf9', borderRadius: '10px', padding: '12px', color: '#059669' }}>
                                    <HomeIcon />
                                </div>
                            </div>

                            <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0', textAlign: 'center' }}>
                                {housing.hallName}
                            </h3>
                            <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 10px 0', textAlign: 'center' }}>
                                {housing.room}
                            </p>

                            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                                <div style={{ flex: 1, fontSize: '10px', color: '#9ca3af', background: '#f9fafb', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
                                    <div style={{ fontWeight: '700', color: '#111827' }}>{housing.floor}</div>
                                    Floor
                                </div>
                                <div style={{ flex: 1, fontSize: '10px', color: '#9ca3af', background: '#f9fafb', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
                                    <div style={{ fontWeight: '700', color: '#111827' }}>{housing.occupants}/{housing.capacity}</div>
                                    Occupants
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <StatusBadge status={housing.status} />
                            </div>
                        </div>
                    ))}
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
                            <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: 0 }}>Hall Details</h3>
                        </div>

                        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                                <div style={{ background: '#f0fdf9', borderRadius: '10px', padding: '16px', color: '#059669' }}>
                                    <HomeIcon />
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                    Hall Name
                                </div>
                                <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>
                                    {selectedData.hallName}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                    Room Number
                                </div>
                                <div style={{ fontSize: '12px', color: '#374151', fontFamily: "'DM Mono', monospace" }}>
                                    {selectedData.room}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                    Floor
                                </div>
                                <div style={{ fontSize: '12px', color: '#374151' }}>
                                    {selectedData.floor}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                                    Status
                                </div>
                                <StatusBadge status={selectedData.status} />
                            </div>

                            {selectedData.status === 'Allocated' && (
                                <>
                                    <div style={{ height: '1px', background: '#f3f4f6' }} />
                                    <div>
                                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                            Check-In Date
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#374151' }}>
                                            {selectedData.checkInDate && new Date(selectedData.checkInDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>

                                    <button
                                        style={{
                                            background: '#059669',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px',
                                            borderRadius: '9px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            width: '100%',
                                            marginTop: '4px',
                                            transition: 'all 0.2s',
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}
                                        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#047857'}
                                        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#059669'}
                                    >
                                        View Contract
                                    </button>
                                </>
                            )}

                            {selectedData.status === 'Pending' && (
                                <div style={{
                                    background: '#eff6ff',
                                    border: '1px solid #bfdbfe',
                                    borderRadius: '8px',
                                    padding: '8px 10px',
                                    fontSize: '11px',
                                    color: '#2563eb',
                                }}>
                                    Your application is under review. Check back soon.
                                </div>
                            )}

                            {selectedData.status === 'Not Allocated' && (
                                <button
                                    style={{
                                        background: '#059669',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px',
                                        borderRadius: '9px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        width: '100%',
                                        transition: 'all 0.2s',
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}
                                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#047857'}
                                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#059669'}
                                >
                                    Apply for Housing
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}