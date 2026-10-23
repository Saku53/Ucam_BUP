import React, { useState } from 'react';

interface Scholarship {
    id: string;
    name: string;
    type: 'Merit' | 'Need-Based' | 'Partial' | 'Full';
    amount: number;
    status: 'Active' | 'Completed' | 'Pending' | 'Rejected';
    startDate: string;
    endDate?: string;
    gpa?: number;
    cgpaRequired: number;
}

const scholarships: Scholarship[] = [
    {
        id: '1',
        name: 'BUP Merit Scholarship',
        type: 'Merit',
        amount: 50000,
        status: 'Active',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        gpa: 3.75,
        cgpaRequired: 3.50,
    },
    {
        id: '2',
        name: 'Government Education Assistance',
        type: 'Need-Based',
        amount: 35000,
        status: 'Active',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        cgpaRequired: 2.50,
    },
    {
        id: '3',
        name: 'ICT Excellence Award',
        type: 'Full',
        amount: 100000,
        status: 'Pending',
        startDate: '2025-06-01',
        cgpaRequired: 3.80,
    },
    {
        id: '4',
        name: 'Women Empowerment Fund',
        type: 'Partial',
        amount: 25000,
        status: 'Completed',
        startDate: '2024-06-01',
        endDate: '2024-12-31',
        cgpaRequired: 2.75,
    },
];

const Svg = ({ size = 16, color = 'currentColor', children }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        {children}
    </svg>
);

const AwardIcon = () => <Svg size={18}><path d="M6 9H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-2"/><rect x="6" y="5" width="12" height="8" rx="1"/></Svg>;
const CheckCircleIcon = () => <Svg size={18} color="#059669"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Svg>;
const AlertCircleIcon = () => <Svg size={18} color="#d97706"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Svg>;
const ClockIcon = () => <Svg size={18} color="#2563eb"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Svg>;
const XCircleIcon = () => <Svg size={18} color="#dc2626"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></Svg>;

function StatusBadge({ status }: { status: string }) {
    const config = {
        'Active': { bg: '#f0fdf9', text: '#059669', icon: <CheckCircleIcon /> },
        'Pending': { bg: '#eff6ff', text: '#2563eb', icon: <ClockIcon /> },
        'Completed': { bg: '#f9fafb', text: '#6b7280', icon: <CheckCircleIcon /> },
        'Rejected': { bg: '#fef2f2', text: '#dc2626', icon: <XCircleIcon /> },
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
        'Merit': { bg: '#eff6ff', text: '#2563eb' },
        'Need-Based': { bg: '#fef3c7', text: '#d97706' },
        'Partial': { bg: '#f0fdf9', text: '#059669' },
        'Full': { bg: '#f0fdf9', text: '#059669' },
    };
    const c = colors[type];
    return (
        <span style={{ background: c.bg, color: c.text, borderRadius: '6px', padding: '3px 9px', fontSize: '11px', fontWeight: '700', border: `1px solid ${c.bg}` }}>
            {type}
        </span>
    );
}

function formatCurrency(amount: number) {
    return `৳ ${amount.toLocaleString('en-BD')}`;
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function Scholarships() {
    const [selectedScholarship, setSelectedScholarship] = useState<string | null>(null);

    const selectedData = scholarships.find(s => s.id === selectedScholarship);
    const totalAmount = scholarships.filter(s => s.status === 'Active').reduce((sum, s) => sum + s.amount, 0);

    return (
        <div style={{ animation: 'fadeIn 0.4s ease', fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}`}</style>

            <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 6px 0' }}>Scholarships & Awards</h1>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>View your scholarship status and financial aid</p>
            </div>

            <div style={{
                background: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #e5e7eb',
                padding: '16px',
                marginBottom: '16px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    Total Active Scholarship
                </div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669', fontFamily: "'DM Mono', monospace" }}>
                    {formatCurrency(totalAmount)}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: selectedData ? '1fr 320px' : '1fr', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                    {scholarships.map(scholarship => (
                        <div
                            key={scholarship.id}
                            onClick={() => setSelectedScholarship(scholarship.id)}
                            style={{
                                background: '#ffffff',
                                borderRadius: '14px',
                                border: selectedScholarship === scholarship.id ? '2px solid #059669' : '1px solid #e5e7eb',
                                padding: '16px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: selectedScholarship === scholarship.id ? '0 4px 16px rgba(5,150,105,0.2)' : '0 1px 4px rgba(0,0,0,0.06)',
                            }}
                            onMouseEnter={e => {
                                if (selectedScholarship !== scholarship.id) {
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                                    (e.currentTarget as HTMLDivElement).style.borderColor = '#d1fae5';
                                }
                            }}
                            onMouseLeave={e => {
                                if (selectedScholarship !== scholarship.id) {
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
                                    (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb';
                                }
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                                <div style={{ background: '#f0fdf9', borderRadius: '10px', padding: '12px', color: '#059669' }}>
                                    <AwardIcon />
                                </div>
                            </div>

                            <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: '0 0 6px 0', textAlign: 'center', lineHeight: 1.3 }}>
                                {scholarship.name}
                            </h3>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                                <TypeBadge type={scholarship.type} />
                            </div>

                            <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '8px', marginBottom: '10px', textAlign: 'center' }}>
                                <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '2px' }}>Amount</div>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#059669', fontFamily: "'DM Mono', monospace" }}>
                                    {formatCurrency(scholarship.amount)}
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <StatusBadge status={scholarship.status} />
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
                            <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: 0 }}>Scholarship Details</h3>
                        </div>

                        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                                <div style={{ background: '#f0fdf9', borderRadius: '10px', padding: '16px', color: '#059669' }}>
                                    <AwardIcon />
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                    Name
                                </div>
                                <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>
                                    {selectedData.name}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                                    Type
                                </div>
                                <TypeBadge type={selectedData.type} />
                            </div>

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                    Amount
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#059669', fontFamily: "'DM Mono', monospace" }}>
                                    {formatCurrency(selectedData.amount)}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                                    Status
                                </div>
                                <StatusBadge status={selectedData.status} />
                            </div>

                            <div style={{ height: '1px', background: '#f3f4f6' }} />

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                    Start Date
                                </div>
                                <div style={{ fontSize: '12px', color: '#374151' }}>
                                    {formatDate(selectedData.startDate)}
                                </div>
                            </div>

                            {selectedData.endDate && (
                                <div>
                                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                        End Date
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#374151' }}>
                                        {formatDate(selectedData.endDate)}
                                    </div>
                                </div>
                            )}

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                    CGPA Required
                                </div>
                                <div style={{ fontSize: '12px', color: '#374151', fontFamily: "'DM Mono', monospace" }}>
                                    {selectedData.cgpaRequired.toFixed(2)} / 4.00
                                </div>
                            </div>

                            {selectedData.gpa && (
                                <div>
                                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                        Current CGPA
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#374151', fontFamily: "'DM Mono', monospace" }}>
                                        {selectedData.gpa.toFixed(2)} / 4.00
                                    </div>
                                </div>
                            )}

                            {selectedData.status === 'Active' && (
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
                                    View Certificate
                                </button>
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
                                    Your application is being processed.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}