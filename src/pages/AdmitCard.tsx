import React, { useState } from 'react';

const BUP_LOGO = 'https://afd.gov.bd/sites/default/files/inline-images/BUP%20Logo_0.png';

const courses = [
    { code: 'CSE-401', name: 'Data Structures', credit: 3.00, type: 'Theory', room: '302-AC', slot: 'A' },
    { code: 'CSE-403', name: 'Algorithm Design', credit: 3.00, type: 'Theory', room: '201-AC', slot: 'B' },
    { code: 'CSE-405', name: 'Database Systems', credit: 3.00, type: 'Theory', room: '205-AC', slot: 'C' },
    { code: 'CSE-407', name: 'Computer Networks', credit: 3.00, type: 'Theory', room: '301-AC', slot: 'D' },
    { code: 'CSE-409L', name: 'Data Structures Lab', credit: 1.50, type: 'Lab', room: 'Lab-101', slot: 'E' },
    { code: 'CSE-411L', name: 'Software Eng. Lab', credit: 1.50, type: 'Lab', room: 'Lab-104', slot: 'F' },
];

export default function AdmitCard() {
    const [printing, setPrinting] = useState(false);

    const handlePrint = () => {
        setPrinting(true);
        setTimeout(() => { window.print(); setPrinting(false); }, 300);
    };

    return (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px);} to { opacity:1; transform:translateY(0);} }
        @keyframes shimmer { 0%,100% { opacity:0.7; } 50% { opacity:1; } }
        @media print {
          .no-print { display: none !important; }
          .print-card { box-shadow: none !important; border: 1px solid #ccc !important; }
        }
      `}</style>

            {/* Header controls */}
            <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Admit Card</h2>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '3px 0 0 0' }}>Final Examination · Jul – Dec 2025</p>
                </div>
                <button
                    onClick={handlePrint}
                    style={{
                        background: 'linear-gradient(135deg, #0F7B6C, #12A090)',
                        color: 'white', border: 'none',
                        padding: '10px 20px', borderRadius: '10px',
                        fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        boxShadow: '0 4px 12px rgba(15,123,108,0.3)',
                        transition: 'all 0.2s',
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                >
                    🖨️ {printing ? 'Preparing...' : 'Print / Download'}
                </button>
            </div>

            {/* Admit Card */}
            <div className="print-card" style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
            }}>

                {/* Card Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #0a1628 0%, #1B2B4B 60%, #0f2d28 100%)',
                    padding: '24px 28px',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(15,123,108,0.08)' }} />
                    <div style={{ position: 'absolute', bottom: '-30px', left: '30%', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px', position: 'relative' }}>
                        <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(18,160,144,0.5)', flexShrink: 0 }}>
                            <img src={BUP_LOGO} alt="BUP" style={{ width: '52px', height: '52px', objectFit: 'contain' }} onError={(e: any) => { e.target.style.display='none'; e.target.parentElement.innerHTML='<span style="font-size:28px">🎓</span>'; }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '17px', fontWeight: '700', color: 'white', lineHeight: 1.3 }}>Bangladesh University of Professionals</div>
                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Mirpur Cantonment, Dhaka-1216, Bangladesh</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ background: 'rgba(15,123,108,0.3)', border: '1px solid rgba(15,123,108,0.5)', borderRadius: '8px', padding: '6px 14px' }}>
                                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Document</div>
                                <div style={{ fontSize: '13px', fontWeight: '700', color: '#4dd9c8' }}>ADMIT CARD</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '32px', position: 'relative' }}>
                        {[
                            { label: 'Examination', value: 'Final Examination' },
                            { label: 'Session', value: 'Jul – Dec 2025' },
                            { label: 'Program', value: 'ICE' },
                            { label: 'Batch', value: '[009] Jan – Jun 2023' },
                        ].map((f, i) => (
                            <div key={i}>
                                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>{f.label}</div>
                                <div style={{ fontSize: '13px', fontWeight: '600', color: 'white', marginTop: '2px' }}>{f.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Student Info Strip */}
                <div style={{ background: '#f0fdf9', borderBottom: '1px solid #d1fae5', padding: '16px 28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '10px', border: '2px solid #0F7B6C', overflow: 'hidden', flexShrink: 0, background: '#e2e8f0' }}>
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sakib" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Student" />
                    </div>
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                        {[
                            { label: 'Student Name', value: 'MD. NAZMUS SAKIB SIAM' },
                            { label: 'Student ID', value: '23549009053' },
                            { label: 'Academic Session', value: 'Jul – Dec 2025' },
                            { label: 'Hall / Hostel', value: 'N/A' },
                        ].map((f, i) => (
                            <div key={i}>
                                <div style={{ fontSize: '9px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '600' }}>{f.label}</div>
                                <div style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a', marginTop: '2px', fontFamily: i === 1 ? "'DM Mono', monospace" : 'inherit' }}>{f.value}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ flexShrink: 0, textAlign: 'center' }}>
                        <div style={{
                            width: '70px', height: '70px',
                            background: 'repeating-linear-gradient(0deg, #0F7B6C 0px, #0F7B6C 3px, white 3px, white 6px)',
                            borderRadius: '4px',
                            border: '2px solid #0F7B6C',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <div style={{ background: 'white', padding: '3px', borderRadius: '2px' }}>
                                <div style={{ width: '20px', height: '20px', background: '#0F7B6C', borderRadius: '2px' }} />
                            </div>
                        </div>
                        <div style={{ fontSize: '9px', color: '#94a3b8', marginTop: '4px' }}>23549009053</div>
                    </div>
                </div>

                {/* Courses Table */}
                <div style={{ padding: '20px 28px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                        Registered Courses — Final Examination
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                        <thead>
                        <tr style={{ background: 'linear-gradient(90deg, #0a1628, #1B2B4B)' }}>
                            {['#', 'Course Code', 'Course Name', 'Credit', 'Type', 'Exam Room', 'Slot', 'Eligible'].map(h => (
                                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'rgba(255,255,255,0.7)', fontSize: '9px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {courses.map((c, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? 'white' : '#fafbfc' }}>
                                <td style={{ padding: '12px 14px', color: '#94a3b8', fontWeight: '600' }}>{String(i + 1).padStart(2, '0')}</td>
                                <td style={{ padding: '12px 14px' }}>
                                    <span style={{ background: '#f0fdf4', color: '#0F7B6C', padding: '3px 9px', borderRadius: '6px', fontWeight: '700', fontFamily: "'DM Mono', monospace", fontSize: '11px' }}>{c.code}</span>
                                </td>
                                <td style={{ padding: '12px 14px', fontWeight: '600', color: '#0f172a' }}>{c.name}</td>
                                <td style={{ padding: '12px 14px', color: '#64748b', fontFamily: "'DM Mono', monospace", fontWeight: '600' }}>{c.credit.toFixed(2)}</td>
                                <td style={{ padding: '12px 14px' }}>
                                    <span style={{ background: c.type === 'Lab' ? '#fef3c7' : '#eff6ff', color: c.type === 'Lab' ? '#d97706' : '#2563eb', padding: '2px 8px', borderRadius: '5px', fontSize: '10px', fontWeight: '700' }}>{c.type}</span>
                                </td>
                                <td style={{ padding: '12px 14px', color: '#64748b', fontFamily: "'DM Mono', monospace" }}>{c.room}</td>
                                <td style={{ padding: '12px 14px' }}>
                                    <span style={{ background: '#1B2B4B', color: '#4dd9c8', padding: '2px 10px', borderRadius: '5px', fontSize: '11px', fontWeight: '700', fontFamily: "'DM Mono', monospace" }}>{c.slot}</span>
                                </td>
                                <td style={{ padding: '12px 14px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }} />
                      <span style={{ color: '#10b981', fontWeight: '700', fontSize: '11px' }}>YES</span>
                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer rules */}
                <div style={{ padding: '16px 28px', background: '#fafbfc', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>📋 Instructions</div>
                            {[
                                'Carry this admit card to all exam halls.',
                                'Arrive at least 15 minutes before exam.',
                                'Mobile phones strictly prohibited.',
                                'Valid student ID required alongside admit card.',
                            ].map((r, i) => (
                                <div key={i} style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px', display: 'flex', gap: '6px' }}>
                                    <span style={{ color: '#0F7B6C', fontWeight: '700' }}>{i + 1}.</span> {r}
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {['Controller of Examinations', 'Head of Department'].map((sig, i) => (
                                <div key={i} style={{ textAlign: 'center' }}>
                                    <div style={{ borderTop: '1.5px solid #0F7B6C', paddingTop: '8px', marginTop: '32px' }}>
                                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#0f172a' }}>{sig}</div>
                                        <div style={{ fontSize: '9px', color: '#94a3b8' }}>BUP, Dhaka</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '10px', color: '#94a3b8' }}>Generated: {new Date().toLocaleDateString('en-BD', { day: '2-digit', month: 'short', year: 'numeric' })} · UCAM Portal v2.0</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: "'DM Mono', monospace" }}>REF: BUP/ICE/009/2025/AC-{Math.random().toString(36).slice(2,8).toUpperCase()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}