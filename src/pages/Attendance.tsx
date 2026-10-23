import React, { useState } from 'react';

type AttRecord = { date: string; status: 'present' | 'absent' | 'late'; topic: string; };

const courseAttendance: Record<string, { name: string; credit: number; type: string; records: AttRecord[] }> = {
    'CSE-401': {
        name: 'Data Structures',
        credit: 3.00,
        type: 'Theory',
        records: [
            { date: '2025-07-06', status: 'present', topic: 'Arrays & Complexity' },
            { date: '2025-07-08', status: 'present', topic: 'Linked Lists' },
            { date: '2025-07-13', status: 'absent', topic: 'Stacks & Queues' },
            { date: '2025-07-15', status: 'present', topic: 'Trees Intro' },
            { date: '2025-07-20', status: 'present', topic: 'Binary Search Trees' },
            { date: '2025-07-22', status: 'late', topic: 'AVL Trees' },
            { date: '2025-07-27', status: 'present', topic: 'Heaps' },
            { date: '2025-07-29', status: 'absent', topic: 'Hashing' },
            { date: '2025-08-03', status: 'present', topic: 'Graphs Intro' },
            { date: '2025-08-05', status: 'present', topic: 'BFS & DFS' },
            { date: '2025-08-10', status: 'present', topic: 'Shortest Paths' },
            { date: '2025-08-12', status: 'absent', topic: 'Minimum Spanning Tree' },
            { date: '2025-08-17', status: 'present', topic: 'Dynamic Programming' },
            { date: '2025-08-19', status: 'present', topic: 'Greedy Algorithms' },
            { date: '2025-08-24', status: 'present', topic: 'Sorting Algorithms' },
            { date: '2025-08-26', status: 'present', topic: 'Divide & Conquer' },
            { date: '2025-08-31', status: 'present', topic: 'Backtracking' },
            { date: '2025-09-02', status: 'late', topic: 'String Algorithms' },
        ],
    },
    'CSE-403': {
        name: 'Algorithm Design',
        credit: 3.00,
        type: 'Theory',
        records: [
            { date: '2025-07-07', status: 'present', topic: 'Intro to Algorithms' },
            { date: '2025-07-09', status: 'present', topic: 'Complexity Analysis' },
            { date: '2025-07-14', status: 'present', topic: 'Recurrences' },
            { date: '2025-07-16', status: 'absent', topic: 'Divide & Conquer' },
            { date: '2025-07-21', status: 'present', topic: 'Greedy Methods' },
            { date: '2025-07-23', status: 'present', topic: 'Dynamic Programming I' },
            { date: '2025-07-28', status: 'present', topic: 'Dynamic Programming II' },
            { date: '2025-07-30', status: 'present', topic: 'Graph Algorithms' },
            { date: '2025-08-04', status: 'absent', topic: 'Network Flow' },
            { date: '2025-08-06', status: 'present', topic: 'NP Completeness' },
            { date: '2025-08-11', status: 'present', topic: 'Approximation Algorithms' },
            { date: '2025-08-13', status: 'present', topic: 'Randomized Algorithms' },
            { date: '2025-08-18', status: 'late', topic: 'String Matching' },
            { date: '2025-08-20', status: 'present', topic: 'Geometric Algorithms' },
            { date: '2025-08-25', status: 'present', topic: 'Amortized Analysis' },
            { date: '2025-08-27', status: 'present', topic: 'Advanced Trees' },
        ],
    },
    'CSE-405': {
        name: 'Database Systems',
        credit: 3.00,
        type: 'Theory',
        records: [
            { date: '2025-07-06', status: 'present', topic: 'ER Diagrams' },
            { date: '2025-07-09', status: 'present', topic: 'Relational Model' },
            { date: '2025-07-13', status: 'present', topic: 'SQL Basics' },
            { date: '2025-07-16', status: 'present', topic: 'Advanced SQL' },
            { date: '2025-07-20', status: 'present', topic: 'Normalization' },
            { date: '2025-07-23', status: 'present', topic: '2NF & 3NF' },
            { date: '2025-07-27', status: 'absent', topic: 'BCNF' },
            { date: '2025-07-30', status: 'present', topic: 'Transactions' },
            { date: '2025-08-03', status: 'present', topic: 'Concurrency Control' },
            { date: '2025-08-06', status: 'present', topic: 'Recovery' },
            { date: '2025-08-10', status: 'present', topic: 'Indexing' },
            { date: '2025-08-13', status: 'present', topic: 'Query Optimization' },
            { date: '2025-08-17', status: 'present', topic: 'NoSQL Intro' },
            { date: '2025-08-20', status: 'late', topic: 'MongoDB' },
            { date: '2025-08-24', status: 'present', topic: 'Distributed Databases' },
            { date: '2025-08-27', status: 'present', topic: 'Data Warehousing' },
        ],
    },
    'CSE-407': {
        name: 'Computer Networks',
        credit: 3.00,
        type: 'Theory',
        records: [
            { date: '2025-07-07', status: 'present', topic: 'OSI Model' },
            { date: '2025-07-10', status: 'absent', topic: 'TCP/IP Stack' },
            { date: '2025-07-14', status: 'present', topic: 'Physical Layer' },
            { date: '2025-07-17', status: 'present', topic: 'Data Link Layer' },
            { date: '2025-07-21', status: 'present', topic: 'MAC Protocols' },
            { date: '2025-07-24', status: 'absent', topic: 'Network Layer' },
            { date: '2025-07-28', status: 'present', topic: 'IP Addressing' },
            { date: '2025-07-31', status: 'present', topic: 'Routing Protocols' },
            { date: '2025-08-04', status: 'present', topic: 'Transport Layer' },
            { date: '2025-08-07', status: 'late', topic: 'TCP Deep Dive' },
            { date: '2025-08-11', status: 'present', topic: 'Application Layer' },
            { date: '2025-08-14', status: 'present', topic: 'HTTP & DNS' },
            { date: '2025-08-18', status: 'absent', topic: 'Security Basics' },
            { date: '2025-08-21', status: 'present', topic: 'Wireless Networks' },
        ],
    },
    'CSE-409L': {
        name: 'Data Structures Lab',
        credit: 1.50,
        type: 'Lab',
        records: [
            { date: '2025-07-08', status: 'present', topic: 'Lab 1: Arrays Implementation' },
            { date: '2025-07-15', status: 'present', topic: 'Lab 2: Linked Lists' },
            { date: '2025-07-22', status: 'absent', topic: 'Lab 3: Stack/Queue' },
            { date: '2025-07-29', status: 'present', topic: 'Lab 4: Trees' },
            { date: '2025-08-05', status: 'present', topic: 'Lab 5: BST Operations' },
            { date: '2025-08-12', status: 'present', topic: 'Lab 6: Sorting' },
            { date: '2025-08-19', status: 'present', topic: 'Lab 7: Graph BFS/DFS' },
            { date: '2025-08-26', status: 'present', topic: 'Lab 8: Hashing' },
        ],
    },
    'CSE-411L': {
        name: 'Software Eng. Lab',
        credit: 1.50,
        type: 'Lab',
        records: [
            { date: '2025-07-09', status: 'present', topic: 'Lab 1: Git & Version Control' },
            { date: '2025-07-16', status: 'present', topic: 'Lab 2: Requirements' },
            { date: '2025-07-23', status: 'late', topic: 'Lab 3: UML Diagrams' },
            { date: '2025-07-30', status: 'present', topic: 'Lab 4: Testing Basics' },
            { date: '2025-08-06', status: 'present', topic: 'Lab 5: Unit Testing' },
            { date: '2025-08-13', status: 'absent', topic: 'Lab 6: CI/CD Pipeline' },
            { date: '2025-08-20', status: 'present', topic: 'Lab 7: Agile Sprint' },
            { date: '2025-08-27', status: 'present', topic: 'Lab 8: Final Project' },
        ],
    },
};

const STATUS_CONFIG = {
    present: { color: '#10b981', bg: '#f0fdf4', border: '#86efac', label: 'Present', icon: '✓' },
    absent:  { color: '#ef4444', bg: '#fef2f2', border: '#fca5a5', label: 'Absent',  icon: '✗' },
    late:    { color: '#f59e0b', bg: '#fffbeb', border: '#fcd34d', label: 'Late',    icon: '⏱' },
};

function AttendanceBar({ pct }: { pct: number }) {
    const color = pct >= 75 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444';
    return (
        <div style={{ background: '#f1f5f9', borderRadius: '999px', height: '6px', overflow: 'hidden', flex: 1 }}>
            <div style={{ width: `${pct}%`, background: color, height: '100%', borderRadius: '999px', transition: 'width 0.8s ease' }} />
        </div>
    );
}

export default function Attendance() {
    const [selected, setSelected] = useState('CSE-401');
    const [view, setView] = useState<'calendar' | 'list'>('calendar');

    const course = courseAttendance[selected];
    const total = course.records.length;
    const present = course.records.filter(r => r.status === 'present').length;
    const absent = course.records.filter(r => r.status === 'absent').length;
    const late = course.records.filter(r => r.status === 'late').length;
    const pct = Math.round(((present + late * 0.5) / total) * 100);
    const status75 = pct >= 75;

    // Group by week for calendar
    const byMonth: Record<string, AttRecord[]> = {};
    course.records.forEach(r => {
        const key = r.date.slice(0, 7);
        if (!byMonth[key]) byMonth[key] = [];
        byMonth[key].push(r);
    });

    const formatDate = (d: string) => {
        const dt = new Date(d);
        return { day: dt.toLocaleDateString('en-BD', { weekday: 'short' }), date: dt.getDate(), month: dt.toLocaleDateString('en-BD', { month: 'short' }), full: dt.toLocaleDateString('en-BD', { day: '2-digit', month: 'short', year: 'numeric' }) };
    };

    return (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <style>{`@keyframes fadeIn { from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}`}</style>

            {/* Page title */}
            <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Attendance Tracker</h2>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '3px 0 0 0' }}>Academic Session: Jul – Dec 2025 · ICE · Batch [009]</p>
            </div>

            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '18px' }}>
                {Object.entries(courseAttendance).map(([code, c]) => {
                    const t = c.records.length;
                    const p = c.records.filter(r => r.status === 'present').length;
                    const l = c.records.filter(r => r.status === 'late').length;
                    const pct2 = Math.round(((p + l * 0.5) / t) * 100);
                    const col = pct2 >= 75 ? '#10b981' : pct2 >= 60 ? '#f59e0b' : '#ef4444';
                    const isActive = selected === code;
                    return (
                        <button key={code} onClick={() => setSelected(code)}
                                style={{
                                    background: isActive ? 'linear-gradient(135deg, #0a1628, #1B2B4B)' : 'white',
                                    border: isActive ? '2px solid #0F7B6C' : '1px solid #e2e8f0',
                                    borderRadius: '12px', padding: '12px', cursor: 'pointer',
                                    textAlign: 'left', transition: 'all 0.2s',
                                    boxShadow: isActive ? '0 4px 16px rgba(15,123,108,0.2)' : '0 1px 4px rgba(0,0,0,0.05)',
                                }}
                        >
                            <div style={{ fontSize: '10px', fontFamily: "'DM Mono', monospace", fontWeight: '700', color: isActive ? '#4dd9c8' : '#0F7B6C', marginBottom: '4px' }}>{code}</div>
                            <div style={{ fontSize: '11px', color: isActive ? 'rgba(255,255,255,0.7)' : '#64748b', marginBottom: '8px', lineHeight: 1.3 }}>{c.name}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ height: '4px', flex: 1, background: isActive ? 'rgba(255,255,255,0.1)' : '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                                    <div style={{ width: `${pct2}%`, height: '100%', background: col, borderRadius: '999px' }} />
                                </div>
                                <span style={{ fontSize: '10px', fontWeight: '700', color: col }}>{pct2}%</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Main panel */}
            <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>

                {/* Course Header */}
                <div style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1B2B4B 60%, #0f2d28 100%)', padding: '20px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                                <span style={{ background: '#f0fdf4', color: '#0F7B6C', padding: '3px 10px', borderRadius: '6px', fontWeight: '700', fontFamily: "'DM Mono', monospace", fontSize: '12px' }}>{selected}</span>
                                <span style={{ background: course.type === 'Lab' ? '#fef3c7' : '#eff6ff', color: course.type === 'Lab' ? '#d97706' : '#2563eb', padding: '2px 8px', borderRadius: '5px', fontSize: '10px', fontWeight: '700' }}>{course.type}</span>
                                <span style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', padding: '2px 8px', borderRadius: '5px', fontSize: '10px' }}>{course.credit} Credit</span>
                            </div>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>{course.name}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            {(['calendar', 'list'] as const).map(v => (
                                <button key={v} onClick={() => setView(v)}
                                        style={{ background: view === v ? 'rgba(15,123,108,0.4)' : 'rgba(255,255,255,0.08)', border: '1px solid', borderColor: view === v ? '#0F7B6C' : 'rgba(255,255,255,0.1)', color: view === v ? '#4dd9c8' : 'rgba(255,255,255,0.5)', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s' }}>
                                    {v === 'calendar' ? '📅 Calendar' : '📋 List'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stats row */}
                    <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
                        {[
                            { label: 'Total Classes', value: total, color: 'rgba(255,255,255,0.8)' },
                            { label: 'Present', value: present, color: '#10b981' },
                            { label: 'Absent', value: absent, color: '#ef4444' },
                            { label: 'Late', value: late, color: '#f59e0b' },
                            { label: 'Attendance', value: `${pct}%`, color: pct >= 75 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444' },
                        ].map((s, i) => (
                            <div key={i}>
                                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
                                <div style={{ fontSize: '22px', fontWeight: '800', color: s.color, fontFamily: "'DM Mono', monospace", lineHeight: 1.2, marginTop: '2px' }}>{s.value}</div>
                            </div>
                        ))}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '4px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>
                                <span>75% Required</span>
                                <span style={{ color: status75 ? '#10b981' : '#ef4444', fontWeight: '700' }}>{status75 ? '✓ Safe' : '⚠ At Risk'}</span>
                            </div>
                            <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                                <div style={{ width: `${pct}%`, height: '100%', background: pct >= 75 ? 'linear-gradient(90deg,#10b981,#34d399)' : pct >= 60 ? 'linear-gradient(90deg,#f59e0b,#fbbf24)' : 'linear-gradient(90deg,#ef4444,#f87171)', borderRadius: '999px', transition: 'width 1s ease' }} />
                            </div>
                            <div style={{ height: '1px', position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '75%', top: '-12px', width: '1px', height: '20px', background: 'rgba(255,255,255,0.3)', borderLeft: '1px dashed rgba(255,255,255,0.3)' }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div style={{ padding: '20px 24px' }}>
                    {view === 'calendar' ? (
                        <div>
                            {Object.entries(byMonth).map(([month, records]) => (
                                <div key={month} style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '10px' }}>
                                        {new Date(month + '-01').toLocaleDateString('en-BD', { month: 'long', year: 'numeric' })}
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {records.map((r, i) => {
                                            const cfg = STATUS_CONFIG[r.status];
                                            const fd = formatDate(r.date);
                                            return (
                                                <div key={i}
                                                     title={`${fd.full} – ${r.topic}`}
                                                     style={{
                                                         width: '52px', height: '52px',
                                                         background: cfg.bg,
                                                         border: `1.5px solid ${cfg.border}`,
                                                         borderRadius: '10px',
                                                         display: 'flex', flexDirection: 'column',
                                                         alignItems: 'center', justifyContent: 'center',
                                                         cursor: 'default',
                                                         position: 'relative',
                                                     }}
                                                >
                                                    <div style={{ fontSize: '8px', color: cfg.color, fontWeight: '700', textTransform: 'uppercase' }}>{fd.day}</div>
                                                    <div style={{ fontSize: '16px', fontWeight: '800', color: cfg.color, lineHeight: 1 }}>{fd.date}</div>
                                                    <div style={{ fontSize: '7px', color: cfg.color }}>{fd.month}</div>
                                                    <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '14px', height: '14px', background: cfg.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: 'white', fontWeight: '900' }}>{cfg.icon}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{ width: '14px', height: '14px', background: cfg.bg, border: `1.5px solid ${cfg.border}`, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: cfg.color }}>{cfg.icon}</div>
                                        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>{cfg.label}</span>
                                    </div>
                                ))}
                                <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: 'auto' }}>Hover over a date to see topic</span>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                                <thead>
                                <tr style={{ background: '#f8fafc' }}>
                                    {['#', 'Date', 'Day', 'Status', 'Topic'].map(h => (
                                        <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '9px', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {course.records.map((r, i) => {
                                    const cfg = STATUS_CONFIG[r.status];
                                    const fd = formatDate(r.date);
                                    return (
                                        <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: r.status === 'absent' ? '#fef2f2' : 'white' }}>
                                            <td style={{ padding: '10px 14px', color: '#94a3b8', fontWeight: '600', fontSize: '11px' }}>{String(i + 1).padStart(2, '0')}</td>
                                            <td style={{ padding: '10px 14px', fontFamily: "'DM Mono', monospace", color: '#0f172a', fontWeight: '600' }}>{fd.full}</td>
                                            <td style={{ padding: '10px 14px', color: '#64748b' }}>{fd.day}</td>
                                            <td style={{ padding: '10px 14px' }}>
                          <span style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, padding: '3px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            {cfg.icon} {cfg.label}
                          </span>
                                            </td>
                                            <td style={{ padding: '10px 14px', color: '#64748b' }}>{r.topic}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Absent summary */}
                {absent > 0 && (
                    <div style={{ margin: '0 24px 20px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '14px 18px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#ef4444', marginBottom: '8px' }}>⚠️ Absent Classes ({absent})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {course.records.filter(r => r.status === 'absent').map((r, i) => {
                                const fd = formatDate(r.date);
                                return (
                                    <div key={i} style={{ background: 'white', border: '1px solid #fca5a5', borderRadius: '8px', padding: '6px 12px', fontSize: '11px' }}>
                                        <span style={{ fontWeight: '700', color: '#ef4444', fontFamily: "'DM Mono', monospace" }}>{fd.full}</span>
                                        <span style={{ color: '#94a3b8', marginLeft: '6px' }}>· {r.topic}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}