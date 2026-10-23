import React, { useState } from 'react';

interface Bill {
    id: string;
    type: string;
    description: string;
    amount: number;
    dueDate: string;
    status: 'Pending' | 'Paid' | 'Overdue';
    issueDate: string;
    reference: string;
}

const bills: Bill[] = [
    {
        id: '1',
        type: 'Tuition Fee',
        description: 'Spring Semester 2025 Tuition',
        amount: 95000,
        dueDate: '2025-03-15',
        status: 'Paid',
        issueDate: '2025-01-10',
        reference: 'TF-2025-001',
    },
    {
        id: '2',
        type: 'Library Fine',
        description: 'Overdue book return penalty',
        amount: 500,
        dueDate: '2025-02-28',
        status: 'Overdue',
        issueDate: '2025-02-01',
        reference: 'LF-2025-042',
    },
    {
        id: '3',
        type: 'Hall Fee',
        description: 'Residential Hall Charges',
        amount: 8000,
        dueDate: '2025-06-30',
        status: 'Pending',
        issueDate: '2025-01-15',
        reference: 'HF-2025-089',
    },
    {
        id: '4',
        type: 'Activity Fee',
        description: 'Student Club & Activity Registration',
        amount: 2000,
        dueDate: '2025-02-28',
        status: 'Paid',
        issueDate: '2025-01-20',
        reference: 'AF-2025-156',
    },
    {
        id: '5',
        type: 'Exam Fee',
        description: 'Mid-Semester Examination Fee',
        amount: 3000,
        dueDate: '2025-03-01',
        status: 'Pending',
        issueDate: '2025-02-10',
        reference: 'EF-2025-203',
    },
];

const Svg = ({ size = 16, color = 'currentColor', children }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        {children}
    </svg>
);

const CreditCardIcon = () => <Svg size={18}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></Svg>;
const CheckCircleIcon = () => <Svg size={18} color="#059669"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Svg>;
const AlertCircleIcon = () => <Svg size={18} color="#d97706"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Svg>;
const ClockIcon = () => <Svg size={18} color="#2563eb"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Svg>;
const DownloadIcon = () => <Svg size={16}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Svg>;
const FilterIcon = () => <Svg size={16}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Svg>;

function StatusBadge({ status }: { status: string }) {
    const config = {
        'Paid': { bg: '#f0fdf9', text: '#059669', icon: <CheckCircleIcon /> },
        'Pending': { bg: '#eff6ff', text: '#2563eb', icon: <ClockIcon /> },
        'Overdue': { bg: '#fef2f2', text: '#dc2626', icon: <AlertCircleIcon /> },
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

function formatCurrency(amount: number) {
    return `৳ ${amount.toLocaleString('en-BD')}`;
}

export default function BillsPayments() {
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [sortBy, setSortBy] = useState('dueDate');

    const filtered = filterStatus === 'All' ? bills : bills.filter(b => b.status === filterStatus);

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'dueDate') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        if (sortBy === 'amount') return b.amount - a.amount;
        return 0;
    });

    const totalAmount = filtered.reduce((sum, b) => sum + b.amount, 0);
    const paidAmount = filtered.filter(b => b.status === 'Paid').reduce((sum, b) => sum + b.amount, 0);
    const pendingAmount = filtered.filter(b => b.status === 'Pending' || b.status === 'Overdue').reduce((sum, b) => sum + b.amount, 0);

    return (
        <div style={{ animation: 'fadeIn 0.4s ease', fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}`}</style>

            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 6px 0' }}>Bills & Payments</h1>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>View and manage your semester fees and charges</p>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                {[
                    { label: 'Total Amount Due', value: formatCurrency(totalAmount), color: '#374151' },
                    { label: 'Paid', value: formatCurrency(paidAmount), color: '#059669' },
                    { label: 'Pending', value: formatCurrency(pendingAmount), color: '#2563eb' },
                ].map((s, i) => (
                    <div key={i} style={{
                        background: '#ffffff',
                        borderRadius: '14px',
                        border: '1px solid #e5e7eb',
                        padding: '16px',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    }}>
                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                            {s.label}
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: s.color, fontFamily: "'DM Mono', monospace" }}>
                            {s.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters & Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Svg size={16} color="#6b7280"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Svg>
                    {['All', 'Pending', 'Paid', 'Overdue'].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            style={{
                                background: filterStatus === s ? '#f0fdf9' : '#ffffff',
                                border: `1px solid ${filterStatus === s ? '#d1fae5' : '#e5e7eb'}`,
                                color: filterStatus === s ? '#059669' : '#6b7280',
                                padding: '6px 14px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.18s ease',
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                            onMouseEnter={e => {
                                if (filterStatus !== s) {
                                    (e.currentTarget as HTMLButtonElement).style.background = '#f9fafb';
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#d1d5db';
                                }
                            }}
                            onMouseLeave={e => {
                                if (filterStatus !== s) {
                                    (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#e5e7eb';
                                }
                            }}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    style={{
                        background: '#ffffff',
                        border: '1.5px solid #e5e7eb',
                        borderRadius: '9px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        color: '#374151',
                        cursor: 'pointer',
                        outline: 'none',
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                >
                    <option value="dueDate">Sort by Due Date</option>
                    <option value="amount">Sort by Amount</option>
                </select>
            </div>

            {/* Bills Table */}
            <div style={{
                background: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                overflow: 'hidden',
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                        <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: '10px', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Reference</th>
                        <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: '10px', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Bill Type</th>
                        <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: '10px', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Amount</th>
                        <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: '10px', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Due Date</th>
                        <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: '10px', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Status</th>
                        <th style={{ padding: '10px 20px', textAlign: 'center', fontSize: '10px', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sorted.map((bill, i) => (
                        <tr key={bill.id} style={{ borderBottom: '1px solid #f9fafb', transition: 'background 0.2s ease' }}
                            onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#f9fafb'}
                            onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = '#ffffff'}
                        >
                            <td style={{ padding: '13px 20px' }}>
                                    <span style={{ background: '#f0fdf9', color: '#059669', borderRadius: '6px', padding: '3px 9px', fontSize: '11px', fontWeight: '700', fontFamily: "'DM Mono', monospace", border: '1px solid #d1fae5' }}>
                                        {bill.reference}
                                    </span>
                            </td>
                            <td style={{ padding: '13px 20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <CreditCardIcon />
                                    <div>
                                        <div style={{ fontSize: '13px', fontWeight: '500', color: '#111827' }}>{bill.type}</div>
                                        <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{bill.description}</div>
                                    </div>
                                </div>
                            </td>
                            <td style={{ padding: '13px 20px', fontFamily: "'DM Mono', monospace", fontWeight: '700', color: '#111827', fontSize: '13px' }}>
                                {formatCurrency(bill.amount)}
                            </td>
                            <td style={{ padding: '13px 20px', fontSize: '12px', color: '#374151' }}>
                                {formatDate(bill.dueDate)}
                            </td>
                            <td style={{ padding: '13px 20px' }}>
                                <StatusBadge status={bill.status} />
                            </td>
                            <td style={{ padding: '13px 20px', textAlign: 'center' }}>
                                <button
                                    style={{
                                        background: '#f0fdf9',
                                        border: '1px solid #d1fae5',
                                        color: '#059669',
                                        padding: '5px 12px',
                                        borderRadius: '6px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
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
                                    <DownloadIcon />
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Payment Info Box */}
            <div style={{
                marginTop: '16px',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '14px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
            }}>
                <Svg size={20} color="#2563eb"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4v.01"/></Svg>
                <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>Payment Instructions</div>
                    <div style={{ fontSize: '11px', color: '#374151', marginTop: '2px' }}>
                        Make payments through the BUP payment portal or visit the Finance Office at Building A, 2nd Floor.
                        Contact +880 1XXX-XXXXXX for payment issues.
                    </div>
                </div>
            </div>
        </div>
    );
}