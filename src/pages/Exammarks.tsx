import React, { useState } from 'react';

type ExamEntry = { name: string; total: number; obtained: number | null; date?: string; topic?: string; };

const theoryBreakdown = (
    obtained: (number | null)[],
    dates: (string | undefined)[],
    topics: (string | undefined)[]
): ExamEntry[] => [
    { name: 'Class Test 1', total: 10, obtained: obtained[0], date: dates[0], topic: topics[0] },
    { name: 'Class Test 2', total: 10, obtained: obtained[1], date: dates[1], topic: topics[1] },
    { name: 'Class Test 3', total: 10, obtained: obtained[2], date: dates[2], topic: topics[2] },
    { name: 'Class Test 4', total: 10, obtained: obtained[3], date: dates[3], topic: topics[3] },
    { name: 'Mid Term', total: 20, obtained: obtained[4], date: dates[4] },
    { name: 'Project/Assignment/Term Paper (w/ Presentation)', total: 10, obtained: obtained[5], date: dates[5] },
    { name: 'Attendance', total: 10, obtained: obtained[6] },
];

const labBreakdown = (obtained: (number | null)[]): ExamEntry[] => [
    { name: 'Quiz', total: 20, obtained: obtained[0] },
    { name: 'Home Assignment / Report', total: 10, obtained: obtained[1] },
    { name: 'Class Performance / Observation', total: 10, obtained: obtained[2] },
    { name: 'Viva', total: 10, obtained: obtained[3] },
    { name: 'Attendance', total: 10, obtained: obtained[4] },
];

interface CourseData {
    name: string;
    credit: number;
    type: 'Theory' | 'Lab';
    instructor: string;
    entries: ExamEntry[];
}

const courses: Record<string, CourseData> = {
    'CSE-401': {
        name: 'Data Structures',
        credit: 3.00,
        type: 'Theory',
        instructor: 'Dr. Rahman',
        entries: theoryBreakdown(
            [8.5, 7.0, null, null, 16.5, null, 9.0],
            ['Jul 20, 2025', 'Aug 10, 2025', undefined, undefined, 'Sep 01, 2025', undefined],
            ['Arrays, Linked Lists & Complexity', 'Stacks, Queues & Trees', undefined, undefined]
        ),
    },
    'CSE-403': {
        name: 'Algorithm Design',
        credit: 3.00,
        type: 'Theory',
        instructor: 'Dr. Islam',
        entries: theoryBreakdown(
            [9.0, 8.0, null, null, 17.0, null, 8.5],
            ['Jul 21, 2025', 'Aug 11, 2025', undefined, undefined, 'Sep 02, 2025', undefined],
            ['Complexity Analysis & Recurrences', 'Greedy & Dynamic Programming I', undefined, undefined]
        ),
    },
    'CSE-405': {
        name: 'Database Systems',
        credit: 3.00,
        type: 'Theory',
        instructor: 'Dr. Akter',
        entries: theoryBreakdown(
            [9.5, 9.0, null, null, 18.0, null, 9.5],
            ['Jul 19, 2025', 'Aug 09, 2025', undefined, undefined, 'Aug 31, 2025', undefined],
            ['ER Model, Relational Algebra & SQL', 'Normalization (1NF–BCNF)', undefined, undefined]
        ),
    },
    'CSE-407': {
        name: 'Computer Networks',
        credit: 3.00,
        type: 'Theory',
        instructor: 'Dr. Hasan',
        entries: theoryBreakdown(
            [7.5, null, null, null, null, null, 7.0],
            ['Jul 22, 2025', undefined, undefined, undefined, undefined, undefined],
            ['OSI Model, Physical & Data Link Layer', undefined, undefined, undefined]
        ),
    },
    'CSE-409L': {
        name: 'Data Structures Lab',
        credit: 1.50,
        type: 'Lab',
        instructor: 'Dr. Rahman',
        entries: labBreakdown([17.5, 8.5, 9.0, null, 9.0]),
    },
    'CSE-411L': {
        name: 'Software Eng. Lab',
        credit: 1.50,
        type: 'Lab',
        instructor: 'Dr. Hossain',
        entries: labBreakdown([16.0, 8.0, 8.5, null, 8.0]),
    },
};

function ScoreBar({ obtained, total }: { obtained: number | null; total: number }) {
    if (obtained === null) return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ flex: 1, height: '5px', background: '#f1f5f9', borderRadius: '999px' }} />
            <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: "'DM Mono', monospace", minWidth: '36px', textAlign: 'right' }}>--</span>
        </div>
    );
    const pct = (obtained / total) * 100;
    const color = pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444';
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ flex: 1, height: '5px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '999px', transition: 'width 0.8s ease' }} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: '700', color, fontFamily: "'DM Mono', monospace", minWidth: '36px', textAlign: 'right' }}>{obtained}</span>
        </div>
    );
}

export default function Exammarks() {
    const [selected, setSelected] = useState('CSE-401');
    const course = courses[selected];

    const totalPossible = course.entries.reduce((s, e) => s + e.total, 0);
    const totalObtained = course.entries.reduce((s, e) => s + (e.obtained ?? 0), 0);
    const attempted = course.entries.filter(e => e.obtained !== null);
    const attemptedTotal = attempted.reduce((s, e) => s + e.total, 0);
    const pct = attemptedTotal > 0 ? Math.round((totalObtained / attemptedTotal) * 100) : 0;

    const grade = pct >= 90 ? 'A+' : pct >= 85 ? 'A' : pct >= 80 ? 'A-' : pct >= 75 ? 'B+' : pct >= 70 ? 'B' : pct >= 65 ? 'B-' : pct >= 60 ? 'C+' : 'C';
    const gradeColor = pct >= 80 ? '#10b981' : pct >= 65 ? '#f59e0b' : '#ef4444';
    const allCourses = Object.entries(courses);
    const isTheory = course.type === 'Theory';

    return (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}`}</style>

            <div style={{ marginBottom: '18px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Exam Marks</h2>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '3px 0 0 0' }}>Academic Session: Jul – Dec 2025 · ICE · Batch [009]</p>
            </div>

            {/* Student info strip */}
            <div style={{ background: 'linear-gradient(135deg, #0a1628, #1B2B4B)', borderRadius: '12px', padding: '14px 20px', marginBottom: '16px', display: 'flex', gap: '32px', alignItems: 'center' }}>
                {[
                    { label: 'Student ID', value: '23549009053', mono: true },
                    { label: 'Student Name', value: 'MD. NAZMUS SAKIB SIAM' },
                    { label: 'Session', value: 'Jul – Dec 2025' },
                    { label: 'Batch', value: '[009] Jan – Jun 2023' },
                    { label: 'Program', value: 'ICE' },
                ].map((f, i) => (
                    <div key={i}>
                        <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{f.label}</div>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: (f as any).mono ? '#4dd9c8' : 'white', fontFamily: (f as any).mono ? "'DM Mono', monospace" : 'inherit', marginTop: '2px' }}>{f.value}</div>
                    </div>
                ))}
            </div>

            {/* Course selector cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '18px' }}>
                {allCourses.map(([code, c]) => {
                    const got = c.entries.reduce((s, e) => s + (e.obtained ?? 0), 0);
                    const att = c.entries.filter(e => e.obtained !== null);
                    const attTot = att.reduce((s, e) => s + e.total, 0);
                    const p = attTot > 0 ? Math.round((got / attTot) * 100) : 0;
                    const col = p >= 80 ? '#10b981' : p >= 65 ? '#f59e0b' : '#ef4444';
                    const grd = p >= 90 ? 'A+' : p >= 85 ? 'A' : p >= 80 ? 'A-' : p >= 75 ? 'B+' : p >= 70 ? 'B' : p >= 65 ? 'B-' : p >= 60 ? 'C+' : att.length > 0 ? 'C' : '--';
                    const isAct = selected === code;
                    return (
                        <button key={code} onClick={() => setSelected(code)}
                                style={{ background: isAct ? 'linear-gradient(135deg, #0a1628, #1B2B4B)' : 'white', border: isAct ? '2px solid #0F7B6C' : '1px solid #e2e8f0', borderRadius: '12px', padding: '12px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', boxShadow: isAct ? '0 4px 16px rgba(15,123,108,0.2)' : '0 1px 4px rgba(0,0,0,0.05)', fontFamily: "'DM Sans', sans-serif" }}>
                            <div style={{ fontSize: '10px', fontFamily: "'DM Mono', monospace", fontWeight: '700', color: isAct ? '#4dd9c8' : '#0F7B6C', marginBottom: '3px' }}>{code}</div>
                            <div style={{ fontSize: '10px', color: isAct ? 'rgba(255,255,255,0.6)' : '#64748b', marginBottom: '8px', lineHeight: 1.3 }}>{c.name}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '20px', fontWeight: '800', color: col, fontFamily: "'DM Mono', monospace" }}>{grd}</span>
                                <span style={{ fontSize: '10px', color: col, fontWeight: '700' }}>{att.length > 0 ? `${got}/${attTot}` : '—'}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Detailed panel */}
            <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>

                {/* Course header */}
                <div style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1B2B4B 60%, #0f2d28 100%)', padding: '20px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                                <span style={{ background: '#f0fdf4', color: '#0F7B6C', padding: '3px 10px', borderRadius: '6px', fontWeight: '700', fontFamily: "'DM Mono', monospace", fontSize: '12px' }}>{selected}</span>
                                <span style={{ background: isTheory ? '#eff6ff' : '#fef3c7', color: isTheory ? '#2563eb' : '#d97706', padding: '2px 8px', borderRadius: '5px', fontSize: '10px', fontWeight: '700' }}>{course.type}</span>
                                <span style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', padding: '2px 8px', borderRadius: '5px', fontSize: '10px' }}>{course.credit.toFixed(2)} Credit</span>
                            </div>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>{course.name}</div>
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '3px' }}>{course.instructor}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Current Score</div>
                            <div style={{ fontSize: '42px', fontWeight: '900', color: gradeColor, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{grade}</div>
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '4px', fontFamily: "'DM Mono', monospace" }}>
                                {totalObtained.toFixed(1)} / {totalPossible} pts · {pct}%
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.08)', height: '8px', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${(totalObtained / totalPossible) * 100}%`, height: '100%', background: `linear-gradient(90deg, ${gradeColor}, ${gradeColor}aa)`, borderRadius: '999px', transition: 'width 1s ease' }} />
                    </div>
                </div>

                {/* Breakdown table */}
                <div style={{ padding: '20px 24px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                        {isTheory ? 'In-Course Examination Breakdown (Theory)' : 'Laboratory Examination Breakdown'}
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr style={{ background: '#f8fafc' }}>
                            <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '9px', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>#</th>
                            <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '9px', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>Exam Name</th>
                            {isTheory && <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '9px', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>Topic / Syllabus</th>}
                            <th style={{ padding: '10px 16px', textAlign: 'right', fontSize: '9px', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>Max Mark</th>
                            <th style={{ padding: '10px 16px', textAlign: 'right', fontSize: '9px', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>Obtained</th>
                            <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '9px', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', width: '180px' }}>Score</th>
                            {isTheory && <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '9px', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>Date Held</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {course.entries.map((e, i) => {
                            const pct2 = e.obtained !== null ? Math.round((e.obtained / e.total) * 100) : null;
                            const col2 = pct2 === null ? '#94a3b8' : pct2 >= 80 ? '#10b981' : pct2 >= 60 ? '#f59e0b' : '#ef4444';
                            const isMid = e.name === 'Mid Term';
                            const isCTRow = e.name.startsWith('Class Test');
                            return (
                                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: isMid ? '#fffff8' : 'white' }}>
                                    <td style={{ padding: '13px 16px', color: '#94a3b8', fontWeight: '600', fontSize: '11px' }}>{String(i + 1).padStart(2, '0')}</td>
                                    <td style={{ padding: '13px 16px' }}>
                                        <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '13px' }}>{e.name}</div>
                                        {isMid && <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Mid-Semester Examination</div>}
                                    </td>
                                    {isTheory && (
                                        <td style={{ padding: '13px 16px' }}>
                                            {isCTRow && e.topic ? (
                                                <span style={{ display: 'inline-block', background: '#f0fdf9', border: '1px solid #d1fae5', color: '#0F7B6C', fontSize: '10px', fontWeight: '500', padding: '3px 9px', borderRadius: '6px', lineHeight: 1.5 }}>
                            📖 {e.topic}
                          </span>
                                            ) : isCTRow ? (
                                                <span style={{ fontSize: '10px', color: '#cbd5e1', fontStyle: 'italic' }}>— Not conducted yet</span>
                                            ) : (
                                                <span style={{ color: '#e2e8f0', fontSize: '11px' }}>—</span>
                                            )}
                                        </td>
                                    )}
                                    <td style={{ padding: '13px 16px', textAlign: 'right', fontFamily: "'DM Mono', monospace", fontWeight: '700', color: '#64748b', fontSize: '13px' }}>{e.total.toFixed(2)}</td>
                                    <td style={{ padding: '13px 16px', textAlign: 'right', fontFamily: "'DM Mono', monospace", fontWeight: '800', color: col2, fontSize: '14px' }}>
                                        {e.obtained !== null ? e.obtained.toFixed(2) : <span style={{ color: '#cbd5e1', fontSize: '12px' }}>-- Not Yet</span>}
                                    </td>
                                    <td style={{ padding: '13px 16px', width: '180px' }}>
                                        <ScoreBar obtained={e.obtained} total={e.total} />
                                    </td>
                                    {isTheory && (
                                        <td style={{ padding: '13px 16px', fontSize: '11px', color: e.date ? '#64748b' : '#cbd5e1', fontFamily: "'DM Mono', monospace" }}>
                                            {e.date ?? '— Pending'}
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                        </tbody>
                        <tfoot>
                        <tr style={{ background: 'linear-gradient(90deg, #f0fdf9, #f8fafc)', borderTop: '2px solid #d1fae5' }}>
                            <td colSpan={isTheory ? 3 : 2} style={{ padding: '14px 16px', fontWeight: '800', color: '#0f172a', fontSize: '13px' }}>Total (In-Course)</td>
                            <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: '800', color: '#0f172a', fontFamily: "'DM Mono', monospace" }}>{totalPossible.toFixed(2)}</td>
                            <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: '900', color: gradeColor, fontFamily: "'DM Mono', monospace", fontSize: '16px' }}>{totalObtained.toFixed(2)}</td>
                            <td style={{ padding: '14px 16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                                        <div style={{ width: `${(totalObtained / totalPossible) * 100}%`, height: '100%', background: gradeColor, borderRadius: '999px' }} />
                                    </div>
                                    <span style={{ fontWeight: '800', color: gradeColor, fontFamily: "'DM Mono', monospace", fontSize: '13px' }}>{pct}%</span>
                                </div>
                            </td>
                            {isTheory && <td />}
                        </tr>
                        </tfoot>
                    </table>

                    {/* Final exam note */}
                    <div style={{ marginTop: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '20px' }}>📝</span>
                        <div>
                            <div style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>Final Examination</div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                                Final exam results will be published after completion of the examination period.
                                {isTheory ? ' Final exam carries 30 marks (out of total 100).' : ' Lab final practical carries 40 marks.'}
                            </div>
                        </div>
                        <span style={{ marginLeft: 'auto', background: '#fef3c7', color: '#d97706', padding: '4px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: '700', whiteSpace: 'nowrap' }}>Pending</span>
                    </div>
                </div>
            </div>
        </div>
    );
}