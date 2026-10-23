import React, { useState } from 'react';

interface LostIdReport {
    id: string;
    reportDate: string;
    idNumber: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Processed';
    documents: {
        gdCopy?: string;
        application?: string;
    };
}

const reports: LostIdReport[] = [
    {
        id: '1',
        reportDate: '2025-02-15',
        idNumber: 'BUP-23549009053',
        status: 'Approved',
        documents: {
            gdCopy: 'GD_Copy_2025.pdf',
            application: 'Application_2025.pdf',
        },
    },
];

const Svg = ({ size = 16, color = 'currentColor', children }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        {children}
    </svg>
);

const IdCardIcon = () => <Svg size={18}><rect x="2" y="7" width="20" height="10" rx="1" ry="1"/><line x1="16" y1="13" x2="16.01" y2="13"/></Svg>;
const CheckCircleIcon = () => <Svg size={18} color="#059669"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Svg>;
const AlertCircleIcon = () => <Svg size={18} color="#d97706"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Svg>;
const ClockIcon = () => <Svg size={18} color="#2563eb"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Svg>;
const UploadIcon = () => <Svg size={16}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></Svg>;
const FileIcon = () => <Svg size={16}><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></Svg>;
const PlusIcon = () => <Svg size={16}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>;

function StatusBadge({ status }: { status: string }) {
    const config = {
        'Pending': { bg: '#eff6ff', text: '#2563eb', icon: <ClockIcon /> },
        'Approved': { bg: '#f0fdf9', text: '#059669', icon: <CheckCircleIcon /> },
        'Rejected': { bg: '#fef2f2', text: '#dc2626', icon: <AlertCircleIcon /> },
        'Processed': { bg: '#f0fdf9', text: '#059669', icon: <CheckCircleIcon /> },
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

export default function IdCardLost() {
    const [showNewReport, setShowNewReport] = useState(false);
    const [selectedReport, setSelectedReport] = useState<string | null>(null);
    const [applicationFile, setApplicationFile] = useState<File | null>(null);
    const [gdFile, setGdFile] = useState<File | null>(null);

    const selectedData = reports.find(r => r.id === selectedReport);

    return (
        <div style={{ animation: 'fadeIn 0.4s ease', fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}`}</style>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                    <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 6px 0' }}>Lost ID Card Report</h1>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Report and apply for replacement of lost ID card</p>
                </div>
                <button
                    onClick={() => setShowNewReport(!showNewReport)}
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
                    New Report
                </button>
            </div>

            {/* New Report Form */}
            {showNewReport && (
                <div style={{
                    background: '#ffffff',
                    borderRadius: '14px',
                    border: '1px solid #e5e7eb',
                    padding: '18px 22px',
                    marginBottom: '16px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    animation: 'fadeIn 0.3s ease',
                }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: '0 0 14px 0' }}>
                        File New Lost ID Card Report
                    </h3>

                    {/* Application Upload */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '11px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                            Upload Application Form
                        </label>
                        <div
                            style={{
                                border: '2px dashed #d1fae5',
                                borderRadius: '10px',
                                padding: '20px',
                                textAlign: 'center',
                                background: '#f0fdf9',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = '#6ee7b7';
                                (e.currentTarget as HTMLDivElement).style.background = '#e0fdf5';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = '#d1fae5';
                                (e.currentTarget as HTMLDivElement).style.background = '#f0fdf9';
                            }}
                            onClick={() => document.getElementById('applicationInput')?.click()}
                        >
                            <input
                                id="applicationInput"
                                type="file"
                                accept=".pdf,.doc,.docx,.jpg,.png"
                                style={{ display: 'none' }}
                                onChange={e => setApplicationFile(e.target.files?.[0] || null)}
                            />
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                                <div style={{ background: 'white', borderRadius: '8px', padding: '10px', color: '#059669' }}>
                                    <UploadIcon />
                                </div>
                            </div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#059669', marginBottom: '2px' }}>
                                {applicationFile ? applicationFile.name : 'Click to upload or drag and drop'}
                            </div>
                            <div style={{ fontSize: '10px', color: '#6b7280' }}>
                                PDF, DOC, DOCX, JPG, or PNG (Max 5MB)
                            </div>
                        </div>
                    </div>

                    {/* GD Copy Upload */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '11px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                            Upload Copy of GD (General Diary Report)
                        </label>
                        <div
                            style={{
                                border: '2px dashed #d1fae5',
                                borderRadius: '10px',
                                padding: '20px',
                                textAlign: 'center',
                                background: '#f0fdf9',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = '#6ee7b7';
                                (e.currentTarget as HTMLDivElement).style.background = '#e0fdf5';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = '#d1fae5';
                                (e.currentTarget as HTMLDivElement).style.background = '#f0fdf9';
                            }}
                            onClick={() => document.getElementById('gdInput')?.click()}
                        >
                            <input
                                id="gdInput"
                                type="file"
                                accept=".pdf,.jpg,.png"
                                style={{ display: 'none' }}
                                onChange={e => setGdFile(e.target.files?.[0] || null)}
                            />
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                                <div style={{ background: 'white', borderRadius: '8px', padding: '10px', color: '#059669' }}>
                                    <UploadIcon />
                                </div>
                            </div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#059669', marginBottom: '2px' }}>
                                {gdFile ? gdFile.name : 'Click to upload or drag and drop'}
                            </div>
                            <div style={{ fontSize: '10px', color: '#6b7280' }}>
                                PDF, JPG, or PNG (Max 5MB)
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            style={{
                                flex: 1,
                                background: '#059669',
                                color: 'white',
                                border: 'none',
                                padding: '11px',
                                borderRadius: '9px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#047857'}
                            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#059669'}
                        >
                            Submit Report
                        </button>
                        <button
                            onClick={() => {
                                setShowNewReport(false);
                                setApplicationFile(null);
                                setGdFile(null);
                            }}
                            style={{
                                flex: 1,
                                background: 'white',
                                color: '#6b7280',
                                border: '1px solid #e5e7eb',
                                padding: '11px',
                                borderRadius: '9px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.18s ease',
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLButtonElement).style.background = '#f9fafb';
                                (e.currentTarget as HTMLButtonElement).style.borderColor = '#d1d5db';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLButtonElement).style.background = 'white';
                                (e.currentTarget as HTMLButtonElement).style.borderColor = '#e5e7eb';
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Reports List */}
            <div style={{ display: 'grid', gridTemplateColumns: selectedReport ? '1fr 320px' : '1fr', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                    {reports.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '13px' }}>
                            No lost ID card reports found. File one above.
                        </div>
                    ) : (
                        reports.map(report => (
                            <div
                                key={report.id}
                                onClick={() => setSelectedReport(report.id)}
                                style={{
                                    background: '#ffffff',
                                    borderRadius: '14px',
                                    border: selectedReport === report.id ? '2px solid #059669' : '1px solid #e5e7eb',
                                    padding: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: selectedReport === report.id ? '0 4px 16px rgba(5,150,105,0.2)' : '0 1px 4px rgba(0,0,0,0.06)',
                                }}
                                onMouseEnter={e => {
                                    if (selectedReport !== report.id) {
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                                        (e.currentTarget as HTMLDivElement).style.borderColor = '#d1fae5';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (selectedReport !== report.id) {
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
                                        (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb';
                                    }
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                                    <div style={{ background: '#f0fdf9', borderRadius: '10px', padding: '12px', color: '#059669' }}>
                                        <IdCardIcon />
                                    </div>
                                </div>

                                <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0', textAlign: 'center', fontFamily: "'DM Mono', monospace" }}>
                                    {report.idNumber}
                                </h3>
                                <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 10px 0', textAlign: 'center' }}>
                                    Reported on {formatDate(report.reportDate)}
                                </p>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <StatusBadge status={report.status} />
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
                            <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: 0 }}>Report Details</h3>
                        </div>

                        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                                <div style={{ background: '#f0fdf9', borderRadius: '10px', padding: '16px', color: '#059669' }}>
                                    <IdCardIcon />
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                    ID Number
                                </div>
                                <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827', fontFamily: "'DM Mono', monospace" }}>
                                    {selectedData.idNumber}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                    Report Date
                                </div>
                                <div style={{ fontSize: '12px', color: '#374151' }}>
                                    {formatDate(selectedData.reportDate)}
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
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                                    Attached Documents
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    {selectedData.documents.application && (
                                        <a href="#" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            background: '#f9fafb',
                                            borderRadius: '6px',
                                            padding: '8px 10px',
                                            textDecoration: 'none',
                                            color: '#059669',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            transition: 'all 0.18s ease',
                                        }}
                                           onMouseEnter={e => {
                                               (e.currentTarget as HTMLAnchorElement).style.background = '#f0fdf9';
                                               (e.currentTarget as HTMLAnchorElement).style.color = '#047857';
                                           }}
                                           onMouseLeave={e => {
                                               (e.currentTarget as HTMLAnchorElement).style.background = '#f9fafb';
                                               (e.currentTarget as HTMLAnchorElement).style.color = '#059669';
                                           }}
                                        >
                                            <FileIcon />
                                            {selectedData.documents.application}
                                        </a>
                                    )}
                                    {selectedData.documents.gdCopy && (
                                        <a href="#" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            background: '#f9fafb',
                                            borderRadius: '6px',
                                            padding: '8px 10px',
                                            textDecoration: 'none',
                                            color: '#059669',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            transition: 'all 0.18s ease',
                                        }}
                                           onMouseEnter={e => {
                                               (e.currentTarget as HTMLAnchorElement).style.background = '#f0fdf9';
                                               (e.currentTarget as HTMLAnchorElement).style.color = '#047857';
                                           }}
                                           onMouseLeave={e => {
                                               (e.currentTarget as HTMLAnchorElement).style.background = '#f9fafb';
                                               (e.currentTarget as HTMLAnchorElement).style.color = '#059669';
                                           }}
                                        >
                                            <FileIcon />
                                            {selectedData.documents.gdCopy}
                                        </a>
                                    )}
                                </div>
                            </div>

                            {selectedData.status === 'Approved' && (
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
                                    Order New Card
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}