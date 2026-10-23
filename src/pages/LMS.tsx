import React, { useState } from 'react';

const G = {
    bg: '#f9fafb', surface: '#ffffff', border: '#e5e7eb', shadow: '0 1px 4px rgba(0,0,0,0.06)',
    accent: '#059669', accentHover: '#047857', accentLight: '#f0fdf9', accentBorder: '#d1fae5', accentMid: '#6ee7b7',
    textPrimary: '#111827', textSecondary: '#374151', textMuted: '#6b7280', textPlaceholder: '#9ca3af',
    divider: '#f3f4f6', danger: '#dc2626', dangerBg: '#fef2f2', dangerBorder: '#fecaca',
    warning: '#d97706', warningBg: '#fffbeb', warningBorder: '#fde68a',
    info: '#2563eb', infoBg: '#eff6ff', infoBorder: '#bfdbfe',
};

const badge = (type: 'success'|'warning'|'danger'|'info', text: string) => {
    const map = {
        success: { bg: G.accentLight, c: G.accent,   b: G.accentBorder },
        warning: { bg: G.warningBg,   c: G.warning,  b: G.warningBorder },
        danger:  { bg: G.dangerBg,    c: G.danger,   b: G.dangerBorder },
        info:    { bg: G.infoBg,      c: G.info,     b: G.infoBorder },
    }[type];
    return (
        <span style={{ background: map.bg, color: map.c, border: `1px solid ${map.b}`, borderRadius: '6px', fontSize: '11px', fontWeight: 700, padding: '3px 9px' }}>
            {text}
        </span>
    );
};

const ProgressBar = ({ value, type = 'success' }: { value: number; type?: 'success'|'warning'|'danger' }) => {
    const fill = type === 'danger' ? G.danger : type === 'warning' ? G.warning : G.accent;
    return (
        <div style={{ height: '4px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden', width: '100%' }}>
            <div style={{ width: `${value}%`, height: '100%', background: fill, borderRadius: '4px', transition: 'width 0.6s ease' }} />
        </div>
    );
};

const Svg = ({ children, size = 16, color = 'currentColor' }: { children: React.ReactNode; size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'block' }}>
        {children}
    </svg>
);

const SummaryIcons = {
    courses: (
        <Svg size={18} color={G.accent}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </Svg>
    ),
    attendance: (
        <Svg size={18} color={G.accent}>
            <polyline points="20 6 9 17 4 12" />
        </Svg>
    ),
    credits: (
        <Svg size={18} color={G.accent}>
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </Svg>
    ),
    gpa: (
        <Svg size={18} color={G.accent}>
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
        </Svg>
    ),
};

const FileIcon = ({ type }: { type: string }) => {
    const colors: Record<string, { bg: string; c: string }> = {
        PDF: { bg: G.dangerBg,  c: G.danger },
        DOC: { bg: G.infoBg,   c: G.info },
        PPT: { bg: G.warningBg, c: G.warning },
    };
    const s = colors[type] || { bg: '#f3f4f6', c: G.textMuted };

    const paths: Record<string, React.ReactNode> = {
        PDF: (
            <Svg size={16} color={s.c}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </Svg>
        ),
        DOC: (
            <Svg size={16} color={s.c}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </Svg>
        ),
        PPT: (
            <Svg size={16} color={s.c}>
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </Svg>
        ),
    };

    return (
        <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {paths[type] || (
                <Svg size={16} color={s.c}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                </Svg>
            )}
        </div>
    );
};

const DownloadIcon = () => (
    <Svg size={13} color="currentColor">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </Svg>
);

const summaryCards = [
    { label: 'Enrolled Courses', value: '5',     sub: 'Spring 2025',        icon: SummaryIcons.courses },
    { label: 'Avg Attendance',   value: '84.2%', sub: '+2% vs last sem',    icon: SummaryIcons.attendance },
    { label: 'Credit Hours',     value: '15 cr', sub: 'This semester',      icon: SummaryIcons.credits },
    { label: 'Current GPA',      value: '3.75',  sub: 'Semester estimate',  icon: SummaryIcons.gpa },
];

export default function LMS() {
    const [tab, setTab] = useState<'courses'|'materials'|'grades'>('courses');

    const courses = [
        { code: 'CSE-401', name: 'Data Structures',   cr: 3, inst: 'Dr. A.K.M. Rahman', att: 88, progress: 65, grade: 'A+', gp: 4.00 },
        { code: 'CSE-403', name: 'Algorithm Design',  cr: 3, inst: 'Dr. Md. Islam',      att: 82, progress: 60, grade: 'A',  gp: 3.75 },
        { code: 'CSE-405', name: 'Database Systems',  cr: 3, inst: 'Dr. Fatema Akter',   att: 91, progress: 70, grade: 'A+', gp: 4.00 },
        { code: 'CSE-407', name: 'Operating Systems', cr: 3, inst: 'Dr. Karim',          att: 76, progress: 50, grade: 'B+', gp: 3.25 },
        { code: 'CSE-409', name: 'Computer Networks', cr: 3, inst: 'Dr. Hossain',        att: 84, progress: 55, grade: 'A-', gp: 3.50 },
    ];

    const materials = [
        { course: 'CSE-401', title: 'Lecture 8: AVL Trees',                    type: 'PDF', size: '2.4 MB', date: 'Apr 1' },
        { course: 'CSE-403', title: 'Assignment 3 – Dynamic Programming',       type: 'DOC', size: '0.8 MB', date: 'Apr 2' },
        { course: 'CSE-405', title: 'Lab 5: SQL Joins Practice',                type: 'PDF', size: '1.2 MB', date: 'Apr 3' },
        { course: 'CSE-407', title: 'Lecture 10: Process Scheduling',           type: 'PPT', size: '3.1 MB', date: 'Mar 30' },
        { course: 'CSE-409', title: 'TCP/IP Reference Sheet',                   type: 'PDF', size: '0.5 MB', date: 'Mar 28' },
    ];

    const attType  = (v: number): 'success'|'warning'|'danger' => v >= 85 ? 'success' : v >= 75 ? 'warning' : 'danger';
    const gradeType = (g: string): 'success'|'warning'|'info'  => ['A+','A','A-'].includes(g) ? 'success' : g === 'B+' ? 'warning' : 'info';

    return (
        <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: G.textPrimary, animation: 'lms-fade 0.3s ease both' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
                @keyframes lms-fade { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
                .lms-row:hover { background: #f9fafb !important; }
                .lms-tab { transition: all 0.18s ease; cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; }
                .lms-dl:hover { background: ${G.accentLight} !important; border-color: ${G.accentBorder} !important; color: ${G.accent} !important; }
                .lms-dl:hover svg { stroke: ${G.accent} !important; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-thumb { background: #d1fae5; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #6ee7b7; }
            `}</style>

            {/* Page header */}
            <div style={{ marginBottom: '22px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: 700, color: G.textPrimary, margin: 0 }}>Learning Management System</h1>
                <p style={{ fontSize: '13px', color: G.textMuted, marginTop: '4px' }}>Spring 2025 · 5 enrolled courses · 15 credit hours</p>
            </div>

            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '22px' }}>
                {summaryCards.map((s, i) => (
                    <div key={i} style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: '14px', padding: '16px 18px', boxShadow: G.shadow }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: G.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>{s.label}</div>
                            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: G.accentLight, border: `1px solid ${G.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {s.icon}
                            </div>
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: G.textPrimary, fontFamily: "'DM Mono', monospace", marginBottom: '2px' }}>{s.value}</div>
                        <div style={{ fontSize: '11px', color: G.textMuted }}>{s.sub}</div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', background: '#f3f4f6', borderRadius: '10px', padding: '4px', marginBottom: '18px', width: 'fit-content' }}>
                {(['courses','materials','grades'] as const).map(t => (
                    <button
                        key={t}
                        className="lms-tab"
                        onClick={() => setTab(t)}
                        style={{ padding: '8px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: tab === t ? 600 : 400, background: tab === t ? G.surface : 'transparent', color: tab === t ? G.accent : G.textMuted, boxShadow: tab === t ? G.shadow : 'none', textTransform: 'capitalize' }}
                    >
                        {t === 'courses' ? 'My Courses' : t === 'materials' ? 'Materials' : 'Grades'}
                    </button>
                ))}
            </div>

            {/* COURSES TAB */}
            {tab === 'courses' && (
                <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: '14px', boxShadow: G.shadow, overflow: 'hidden' }}>
                    <div style={{ padding: '18px 22px', borderBottom: `1px solid ${G.divider}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: G.textPrimary }}>Enrolled Courses</div>
                            <div style={{ fontSize: '12px', color: G.textMuted, marginTop: '2px' }}>Spring 2025 · 5 courses</div>
                        </div>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr style={{ background: '#f9fafb', borderBottom: `1px solid ${G.divider}` }}>
                            {['Course','Instructor','Attendance','Progress','Grade','Credits'].map(h => (
                                <th key={h} style={{ textAlign: 'left', padding: '10px 20px', fontSize: '10px', fontWeight: 700, color: G.textPlaceholder, textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {courses.map((c, i) => (
                            <tr key={i} className="lms-row" style={{ borderBottom: i < courses.length - 1 ? `1px solid ${G.divider}` : 'none', transition: 'background 0.15s' }}>
                                <td style={{ padding: '13px 20px' }}>
                                    <div style={{ fontSize: '13px', fontWeight: 500, color: G.textPrimary }}>{c.name}</div>
                                    <span style={{ background: G.accentLight, color: G.accent, border: `1px solid ${G.accentBorder}`, borderRadius: '6px', fontSize: '11px', fontWeight: 700, padding: '2px 8px', fontFamily: "'DM Mono', monospace", display: 'inline-block', marginTop: '3px' }}>{c.code}</span>
                                </td>
                                <td style={{ padding: '13px 20px', fontSize: '13px', color: G.textSecondary }}>{c.inst}</td>
                                <td style={{ padding: '13px 20px', minWidth: '110px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ flex: 1 }}><ProgressBar value={c.att} type={attType(c.att)} /></div>
                                        {badge(attType(c.att), `${c.att}%`)}
                                    </div>
                                </td>
                                <td style={{ padding: '13px 20px', minWidth: '130px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ flex: 1 }}><ProgressBar value={c.progress} /></div>
                                        <span style={{ fontSize: '11px', color: G.textMuted, fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>{c.progress}%</span>
                                    </div>
                                </td>
                                <td style={{ padding: '13px 20px' }}>{badge(gradeType(c.grade), c.grade)}</td>
                                <td style={{ padding: '13px 20px', fontSize: '13px', color: G.textMuted, fontFamily: "'DM Mono', monospace" }}>{c.cr} cr</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* MATERIALS TAB */}
            {tab === 'materials' && (
                <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: '14px', boxShadow: G.shadow, overflow: 'hidden' }}>
                    <div style={{ padding: '18px 22px', borderBottom: `1px solid ${G.divider}` }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: G.textPrimary }}>Course Materials</div>
                        <div style={{ fontSize: '12px', color: G.textMuted, marginTop: '2px' }}>{materials.length} files available</div>
                    </div>
                    {materials.map((m, i) => (
                        <div
                            key={i}
                            className="lms-row"
                            style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 22px', borderBottom: i < materials.length - 1 ? `1px solid ${G.divider}` : 'none', transition: 'background 0.15s' }}
                        >
                            <FileIcon type={m.type} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '13px', fontWeight: 500, color: G.textPrimary }}>{m.title}</div>
                                <div style={{ fontSize: '11px', color: G.textMuted, marginTop: '2px', fontFamily: "'DM Mono', monospace" }}>{m.course} · {m.size}</div>
                            </div>
                            <span style={{ fontSize: '12px', color: G.textMuted, fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>{m.date}</span>
                            <button
                                className="lms-dl"
                                style={{ background: G.surface, border: `1px solid ${G.border}`, color: G.textSecondary, padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", flexShrink: 0, transition: 'all 0.18s', display: 'flex', alignItems: 'center', gap: '6px' }}
                            >
                                <DownloadIcon />
                                Download
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* GRADES TAB */}
            {tab === 'grades' && (
                <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: '14px', boxShadow: G.shadow, overflow: 'hidden' }}>
                    <div style={{ padding: '18px 22px', borderBottom: `1px solid ${G.divider}` }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: G.textPrimary }}>Grade Summary</div>
                        <div style={{ fontSize: '12px', color: G.textMuted, marginTop: '2px' }}>Spring 2025 final grades</div>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr style={{ background: '#f9fafb', borderBottom: `1px solid ${G.divider}` }}>
                            {['Course','Credits','Attendance','Grade','Grade Point'].map(h => (
                                <th key={h} style={{ textAlign: 'left', padding: '10px 20px', fontSize: '10px', fontWeight: 700, color: G.textPlaceholder, textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {courses.map((c, i) => (
                            <tr key={i} className="lms-row" style={{ borderBottom: i < courses.length - 1 ? `1px solid ${G.divider}` : 'none', transition: 'background 0.15s' }}>
                                <td style={{ padding: '13px 20px' }}>
                                    <div style={{ fontSize: '13px', fontWeight: 500, color: G.textPrimary }}>{c.name}</div>
                                    <span style={{ background: G.accentLight, color: G.accent, border: `1px solid ${G.accentBorder}`, borderRadius: '6px', fontSize: '11px', fontWeight: 700, padding: '2px 8px', fontFamily: "'DM Mono', monospace", display: 'inline-block', marginTop: '3px' }}>{c.code}</span>
                                </td>
                                <td style={{ padding: '13px 20px', fontSize: '13px', color: G.textMuted, fontFamily: "'DM Mono', monospace" }}>{c.cr}</td>
                                <td style={{ padding: '13px 20px' }}>{badge(attType(c.att), `${c.att}%`)}</td>
                                <td style={{ padding: '13px 20px' }}>{badge(gradeType(c.grade), c.grade)}</td>
                                <td style={{ padding: '13px 20px', fontSize: '14px', fontWeight: 700, color: G.accent, fontFamily: "'DM Mono', monospace" }}>{c.gp.toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div style={{ padding: '16px 22px', background: G.accentLight, borderTop: `1px solid ${G.accentBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: G.accent }}>Semester GPA (Spring 2025)</span>
                        <span style={{ fontSize: '20px', fontWeight: 700, color: G.accent, fontFamily: "'DM Mono', monospace" }}>
                            3.75 <span style={{ fontSize: '12px', color: G.textMuted, fontWeight: 400 }}>/ 4.00</span>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}