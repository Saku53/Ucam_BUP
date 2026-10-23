import React, { useState, useEffect, useRef } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Course {
    code: string;
    name: string;
    cr: number;
    inst: string;
    att: number;
    progress: number;
    grade: string;
    color: string;
}

interface SchedItem {
    day: string;
    code: string;
    name: string;
    time: string;
    room: string;
    inst: string;
    icon: string;
}

interface HomeProps {
    schedData: SchedItem[];
    lmsCourses: Course[];
    setActivePage?: (id: string) => void;
    user?: {
        name: string;
        studentId: string;
        department: string;
        year: number;
        semester: number;
        cgpa: number;
    } | null;
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        let start = 0;
        const step = target / 40;
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setVal(target); clearInterval(timer); }
            else setVal(Math.floor(start));
        }, 20);
        return () => clearInterval(timer);
    }, [target]);
    return <>{val}{suffix}</>;
}

// ─── Mini Sparkline ──────────────────────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const w = 80; const h = 32;
    const pts = data.map((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((v - min) / (max - min || 1)) * h;
        return `${x},${y}`;
    }).join(' ');
    const last = pts.split(' ').pop()?.split(',');
    return (
        <svg width={w} height={h} style={{ overflow: 'visible' }}>
            <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {last && <circle cx={last[0]} cy={last[1]} r="3" fill={color} />}
        </svg>
    );
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const CalIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
);

const ClockIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
);

const IdIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="16" y2="10"/><line x1="12" y1="14" x2="16" y2="14"/>
    </svg>
);

const BooksIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
);

const LmsIcon = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
);

const FireIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
);

const PinIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17z"/>
    </svg>
);

const BellIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
);

const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
    </svg>
);

const WarnIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export const Home: React.FC<HomeProps> = ({ schedData, lmsCourses, setActivePage, user }) => {
    const [time, setTime] = useState(new Date());
    const [greeting, setGreeting] = useState('');
    const [activeTab, setActiveTab] = useState<'today' | 'week'>('today');

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        const h = new Date().getHours();
        setGreeting(h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening');
        return () => clearInterval(timer);
    }, []);

    // ── Derive display values from real user ─────────────────────────────────
    const displayName = user?.name?.split(' ')[0] ?? 'Student';
    const displayFirst = user?.name?.split(' ')[0] ?? 'Student';
    const cgpa = user?.cgpa ?? 0;
    const department = user?.department ?? 'CSE';
    const yearLabel = user?.year ? `${user.year}${user.year === 1 ? 'st' : user.year === 2 ? 'nd' : user.year === 3 ? 'rd' : 'th'} Year` : '';
    const studentId = user?.studentId ?? '';

    const courseColors = ['#0F7B6C', '#1B2B4B', '#f97316', '#8b5cf6', '#3b82f6', '#ec4899'];
    const attHistory = [78, 82, 80, 85, 83, 86, 88, 86];

    const quickStats = [
        { label: 'Attendance', value: 86, suffix: '%', trend: '+2%', up: true, spark: attHistory, color: '#059669', bg: '#f0fdf9' },
        { label: 'Courses', value: lmsCourses.length, suffix: '', trend: 'Active', up: true, spark: [3,4,4,5,5,5,5,5], color: '#1B2B4B', bg: '#f8fafc' },
        { label: 'Pending Bills', value: 2, suffix: '', trend: '৳4,800', up: false, spark: [5,4,3,4,3,2,2,2], color: '#d97706', bg: '#fffbeb' },
        { label: 'Library Books', value: 3, suffix: '', trend: 'Due 5d', up: null, spark: [1,2,3,3,2,3,3,3], color: '#8b5cf6', bg: '#faf5ff' },
    ];

    const upcomingDeadlines = [
        { title: 'CSE-401 Assignment 3', due: 'Apr 5', urgent: true, type: 'Assignment' },
        { title: 'Software Project Demo', due: 'Apr 8', urgent: true, type: 'Presentation' },
        { title: 'Database Systems Quiz', due: 'Apr 12', urgent: false, type: 'Quiz' },
        { title: 'Algorithm Design Lab', due: 'Apr 15', urgent: false, type: 'Lab' },
    ];

    const todayClasses = schedData.filter(s => s.day === 'Sunday').slice(0, 3);

    const gradeMap: Record<string, { gp: number; color: string }> = {
        'A+': { gp: 4.00, color: '#059669' }, 'A': { gp: 3.75, color: '#10b981' },
        'A-': { gp: 3.50, color: '#84cc16' }, 'B+': { gp: 3.25, color: '#eab308' },
        'B': { gp: 3.00, color: '#f97316' },
    };

    // Quick access icons mapping
    const QIcons: Record<string, JSX.Element> = {
        cgpa: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
        attendance: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
        marks: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
        transport: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
        library: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
        bills: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    };

    return (
        <div style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", color: '#0f172a', maxWidth: '1200px', margin: '0 auto' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
                @keyframes hp-fade { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
                @keyframes hp-shimmer { 0%,100%{opacity:0.6} 50%{opacity:1} }
                .hp-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
                .hp-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important; }
                .hp-tab { transition: all 0.2s ease; }
                .hp-row:hover { background: #f9fafb !important; }
                .hp-quick:hover { background: #f0fdf9 !important; border-color: #6ee7b7 !important; color: #059669 !important; }
                .hp-quick:hover svg { stroke: #059669 !important; }
                .hp-pill:hover { background: #f9fafb !important; }
            `}</style>

            {/* ── HERO BANNER ──────────────────────────────────────────────────── */}
            <div style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1B2B4B 45%, #0f3d30 100%)', borderRadius: '18px', padding: '28px 32px', marginBottom: '20px', position: 'relative', overflow: 'hidden', animation: 'hp-fade 0.5s ease both', boxShadow: '0 16px 48px rgba(5,150,105,0.18)' }}>
                <div style={{ position:'absolute', top:'-40px', right:'-40px', width:'260px', height:'260px', borderRadius:'50%', background:'rgba(5,150,105,0.1)', pointerEvents:'none' }} />
                <div style={{ position:'absolute', bottom:'-50px', left:'35%', width:'180px', height:'180px', borderRadius:'50%', background:'rgba(255,255,255,0.03)', pointerEvents:'none' }} />

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', position:'relative', zIndex:1 }}>
                    <div>
                        <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', marginBottom:'14px', fontSize:'11px', fontWeight:600, letterSpacing:'2px', color:'#6ee7b7', textTransform:'uppercase', background:'rgba(5,150,105,0.15)', padding:'4px 12px', borderRadius:'20px', border:'1px solid rgba(5,150,105,0.3)' }}>
                            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#059669', display:'inline-block', animation:'hp-shimmer 2s infinite' }} />
                            {greeting} · Spring 2025
                        </div>

                        <h1 style={{ fontSize:'26px', fontWeight:700, color:'white', margin:'0 0 6px 0', letterSpacing:'-0.3px', lineHeight:1.2 }}>
                            Welcome back, <span style={{ color:'#6ee7b7' }}>{displayFirst}</span>
                        </h1>
                        <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.5)', margin:'0 0 20px 0' }}>
                            {yearLabel} · {department} · Mirpur Cantonment, Dhaka
                        </p>

                        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                            <span style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.8)', padding:'5px 13px', borderRadius:'8px', fontSize:'12px', fontWeight:500, display:'flex', alignItems:'center', gap:'6px' }}>
                                <IdIcon /> {studentId || 'BUP-ID'}
                            </span>
                            <span style={{ background:'rgba(5,150,105,0.2)', border:'1px solid rgba(5,150,105,0.35)', color:'#6ee7b7', padding:'5px 13px', borderRadius:'8px', fontSize:'12px', fontWeight:600, display:'flex', alignItems:'center', gap:'6px' }}>
                                <CalIcon /> {time.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' })}
                            </span>
                            <span style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.65)', padding:'5px 13px', borderRadius:'8px', fontSize:'12px', fontFamily:"'DM Mono', monospace", display:'flex', alignItems:'center', gap:'6px' }}>
                                <ClockIcon /> {time.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' })}
                            </span>
                        </div>
                    </div>

                    {/* CGPA Ring */}
                    <div style={{ textAlign:'center', flexShrink:0 }}>
                        <div style={{ position:'relative', width:'104px', height:'104px', margin:'0 auto 8px' }}>
                            <svg width="104" height="104" style={{ transform:'rotate(-90deg)' }}>
                                <circle cx="52" cy="52" r="44" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
                                <circle cx="52" cy="52" r="44" fill="none" stroke="url(#cgpaG)" strokeWidth="7"
                                        strokeDasharray={`${(cgpa / 4) * 276} 276`} strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="cgpaG" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#059669" />
                                        <stop offset="100%" stopColor="#6ee7b7" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                                <span style={{ fontSize:'24px', fontWeight:700, color:'white', lineHeight:1, fontFamily:"'DM Mono', monospace" }}>{cgpa.toFixed(2)}</span>
                                <span style={{ fontSize:'9px', color:'rgba(255,255,255,0.45)', fontWeight:600, letterSpacing:'1px', textTransform:'uppercase', marginTop:'2px' }}>CGPA</span>
                            </div>
                        </div>
                        <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.35)' }}>out of 4.00</div>
                        <div style={{ marginTop:'6px', background:'rgba(5,150,105,0.25)', border:'1px solid rgba(5,150,105,0.4)', borderRadius:'6px', padding:'3px 10px', fontSize:'11px', color:'#6ee7b7', fontWeight:600 }}>
                            ↑ 0.12 this sem
                        </div>
                    </div>
                </div>
            </div>

            {/* ── QUICK STATS ───────────────────────────────────────────────────── */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'20px', animation:'hp-fade 0.5s 0.08s ease both' }}>
                {quickStats.map((s, i) => (
                    <div key={i} className="hp-card" style={{ background:'white', borderRadius:'14px', padding:'16px 18px', border:'1px solid #e5e7eb', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', cursor:'pointer', position:'relative', overflow:'hidden' }}>
                        <div style={{ position:'absolute', top:0, right:0, width:'50px', height:'50px', borderRadius:'0 14px 0 50px', background:`${s.color}10` }} />
                        <div style={{ fontSize:'11px', fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:'10px' }}>{s.label}</div>
                        <div style={{ fontSize:'26px', fontWeight:700, color:s.color, lineHeight:1, fontFamily:"'DM Mono', monospace", marginBottom:'10px' }}>
                            <AnimatedNumber target={s.value} suffix={s.suffix} />
                        </div>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                            <span style={{ fontSize:'10px', fontWeight:700, color: s.up === true ? '#059669' : s.up === false ? '#dc2626' : '#8b5cf6', background: s.up === true ? '#f0fdf9' : s.up === false ? '#fef2f2' : '#faf5ff', border: `1px solid ${s.up === true ? '#d1fae5' : s.up === false ? '#fecaca' : '#ede9fe'}`, padding:'2px 7px', borderRadius:'6px' }}>
                                {s.up === true ? '↑' : s.up === false ? '↓' : '·'} {s.trend}
                            </span>
                            <Sparkline data={s.spark} color={s.color} />
                        </div>
                    </div>
                ))}
            </div>

            {/* ── MAIN GRID ─────────────────────────────────────────────────────── */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:'18px', animation:'hp-fade 0.5s 0.16s ease both' }}>

                {/* LEFT */}
                <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>

                    {/* Courses Table */}
                    <div style={{ background:'white', borderRadius:'14px', border:'1px solid #e5e7eb', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', overflow:'hidden' }}>
                        <div style={{ padding:'16px 20px', borderBottom:'1px solid #f3f4f6', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                                <div style={{ width:'30px', height:'30px', background:'#f0fdf9', border:'1px solid #d1fae5', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#059669' }}>
                                    <BooksIcon />
                                </div>
                                <div>
                                    <div style={{ fontSize:'13.5px', fontWeight:700, color:'#111827' }}>Enrolled Courses</div>
                                    <div style={{ fontSize:'11px', color:'#9ca3af' }}>Spring 2025 · {lmsCourses.length} courses</div>
                                </div>
                            </div>
                            <button onClick={() => setActivePage?.('lms')} style={{ fontSize:'11px', fontWeight:600, color:'#059669', background:'#f0fdf9', border:'1px solid #d1fae5', padding:'5px 12px', borderRadius:'8px', cursor:'pointer', fontFamily:"'DM Sans', sans-serif", display:'flex', alignItems:'center', gap:'5px' }}>
                                View LMS <LmsIcon />
                            </button>
                        </div>
                        <table style={{ width:'100%', borderCollapse:'collapse' }}>
                            <thead>
                            <tr style={{ background:'#f9fafb' }}>
                                {['Course', 'Instructor', 'Attendance', 'Progress', 'Grade'].map(h => (
                                    <th key={h} style={{ textAlign:'left', padding:'9px 18px', fontSize:'10px', fontWeight:700, color:'#9ca3af', letterSpacing:'1px', textTransform:'uppercase', borderBottom:'1px solid #f3f4f6' }}>{h}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {lmsCourses.map((c, i) => {
                                const gInfo = gradeMap[c.grade] || { gp: 0, color: '#6b7280' };
                                const attColor = c.att >= 85 ? '#059669' : c.att >= 75 ? '#d97706' : '#dc2626';
                                return (
                                    <tr key={i} className="hp-row" style={{ borderBottom: i < lmsCourses.length - 1 ? '1px solid #f3f4f6' : 'none', transition:'background 0.15s' }}>
                                        <td style={{ padding:'13px 18px' }}>
                                            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                                                <div style={{ width:'3px', height:'32px', borderRadius:'2px', background: courseColors[i % courseColors.length], flexShrink:0 }} />
                                                <div>
                                                    <div style={{ fontSize:'13px', fontWeight:600, color:'#111827' }}>{c.name}</div>
                                                    <div style={{ fontSize:'10px', color:'#9ca3af', fontFamily:"'DM Mono', monospace" }}>{c.code}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding:'13px 18px', fontSize:'12px', color:'#6b7280' }}>{c.inst}</td>
                                        <td style={{ padding:'13px 18px' }}>
                                            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                                                <div style={{ width:'44px', height:'4px', background:'#e5e7eb', borderRadius:'2px', overflow:'hidden' }}>
                                                    <div style={{ width:`${c.att}%`, height:'100%', background:attColor, borderRadius:'2px', transition:'width 0.6s ease' }} />
                                                </div>
                                                <span style={{ fontSize:'11px', fontWeight:700, color:attColor }}>{c.att}%</span>
                                            </div>
                                        </td>
                                        <td style={{ padding:'13px 18px' }}>
                                            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                                                <div style={{ width:'64px', height:'4px', background:'#e5e7eb', borderRadius:'2px', overflow:'hidden' }}>
                                                    <div style={{ width:`${c.progress}%`, height:'100%', background:'#059669', borderRadius:'2px', transition:'width 0.6s ease' }} />
                                                </div>
                                                <span style={{ fontSize:'11px', color:'#9ca3af' }}>{c.progress}%</span>
                                            </div>
                                        </td>
                                        <td style={{ padding:'13px 18px' }}>
                                                <span style={{ background:`${gInfo.color}15`, color:gInfo.color, padding:'3px 9px', borderRadius:'6px', fontSize:'11px', fontWeight:700, fontFamily:"'DM Mono', monospace" }}>
                                                    {c.grade} <span style={{ opacity:0.65, fontSize:'10px' }}>({gInfo.gp.toFixed(2)})</span>
                                                </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>

                    {/* Today's Schedule */}
                    <div style={{ background:'white', borderRadius:'14px', border:'1px solid #e5e7eb', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', overflow:'hidden' }}>
                        <div style={{ padding:'16px 20px', borderBottom:'1px solid #f3f4f6', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                                <div style={{ width:'30px', height:'30px', background:'#f0fdf9', border:'1px solid #d1fae5', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#059669' }}>
                                    <CalIcon />
                                </div>
                                <div>
                                    <div style={{ fontSize:'13.5px', fontWeight:700, color:'#111827' }}>Today's Classes</div>
                                    <div style={{ fontSize:'11px', color:'#9ca3af' }}>Sunday · {todayClasses.length} classes scheduled</div>
                                </div>
                            </div>
                            <div style={{ display:'flex', gap:'4px', background:'#f3f4f6', borderRadius:'8px', padding:'3px' }}>
                                {(['today', 'week'] as const).map(tab => (
                                    <button key={tab} className="hp-tab" onClick={() => setActiveTab(tab)}
                                            style={{ fontSize:'11px', fontWeight:600, padding:'5px 12px', borderRadius:'6px', border:'none', cursor:'pointer', background: activeTab === tab ? 'white' : 'transparent', color: activeTab === tab ? '#059669' : '#6b7280', fontFamily:"'DM Sans', sans-serif", boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.08)' : 'none', textTransform:'capitalize' }}>
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div style={{ padding:'10px 20px 16px' }}>
                            {(activeTab === 'today' ? todayClasses : schedData).map((s, i, arr) => {
                                const isNow = i === 0;
                                return (
                                    <div key={i} style={{ display:'flex', gap:'14px', alignItems:'flex-start', padding:'12px 0', borderBottom: i < arr.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                                        <div style={{ textAlign:'center', minWidth:'46px' }}>
                                            <div style={{ fontSize:'10px', fontWeight:700, color: isNow ? '#059669' : '#9ca3af', background: isNow ? '#f0fdf9' : '#f9fafb', padding:'3px 5px', borderRadius:'5px', fontFamily:"'DM Mono', monospace" }}>{s.time.split('–')[0]}</div>
                                        </div>
                                        <div style={{ width:'3px', alignSelf:'stretch', borderRadius:'2px', background: isNow ? '#059669' : '#e5e7eb', flexShrink:0, marginTop:'4px' }} />
                                        <div style={{ flex:1 }}>
                                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                                                <div>
                                                    <div style={{ fontSize:'13px', fontWeight:600, color:'#111827', display:'flex', alignItems:'center', gap:'6px' }}>
                                                        {isNow && <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#059669', display:'inline-block', animation:'hp-shimmer 1.5s infinite' }} />}
                                                        {s.name}
                                                    </div>
                                                    <div style={{ fontSize:'11px', color:'#9ca3af', marginTop:'2px' }}>{s.inst} · {s.room}</div>
                                                </div>
                                                <span style={{ fontSize:'10px', fontWeight:700, color:'#374151', background:'#f3f4f6', padding:'2px 8px', borderRadius:'5px', fontFamily:"'DM Mono', monospace", flexShrink:0 }}>{s.code}</span>
                                            </div>
                                            {isNow && (
                                                <div style={{ marginTop:'8px', background:'#f0fdf9', border:'1px solid #d1fae5', borderRadius:'8px', padding:'5px 10px', fontSize:'11px', color:'#059669', fontWeight:600, display:'flex', alignItems:'center', gap:'5px' }}>
                                                    <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#059669', display:'inline-block', animation:'hp-shimmer 1.5s infinite' }} />
                                                    In Progress · {s.time}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>

                    {/* Quick Access */}
                    <div style={{ background:'white', borderRadius:'14px', border:'1px solid #e5e7eb', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', padding:'16px' }}>
                        <div style={{ fontSize:'13px', fontWeight:700, color:'#111827', marginBottom:'12px', display:'flex', alignItems:'center', gap:'7px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                            Quick Access
                        </div>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'7px' }}>
                            {[
                                { label:'CGPA Calc', id:'cgpa', color:'#059669' },
                                { label:'Attendance', id:'attendance', color:'#1B2B4B' },
                                { label:'Exam Marks', id:'marks', color:'#d97706' },
                                { label:'Transport', id:'transport', color:'#8b5cf6' },
                                { label:'Library', id:'library', color:'#2563eb' },
                                { label:'Bills', id:'bills', color:'#dc2626' },
                            ].map((q, i) => (
                                <button key={i} className="hp-quick" onClick={() => setActivePage?.(q.id)}
                                        style={{ background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:'10px', padding:'11px 8px', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', transition:'all 0.15s', fontFamily:"'DM Sans', sans-serif" }}>
                                    <span style={{ color: q.color }}>{QIcons[q.id]}</span>
                                    <span style={{ fontSize:'10px', fontWeight:600, color:'#4b5563', textAlign:'center' }}>{q.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Deadlines */}
                    <div style={{ background:'white', borderRadius:'14px', border:'1px solid #e5e7eb', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', overflow:'hidden' }}>
                        <div style={{ padding:'14px 16px', borderBottom:'1px solid #f3f4f6', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                            <div style={{ fontSize:'13px', fontWeight:700, color:'#111827', display:'flex', alignItems:'center', gap:'7px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                Deadlines
                            </div>
                            <span style={{ fontSize:'10px', fontWeight:700, background:'#fef2f2', color:'#dc2626', padding:'2px 8px', borderRadius:'6px', border:'1px solid #fecaca' }}>
                                {upcomingDeadlines.filter(d => d.urgent).length} Urgent
                            </span>
                        </div>
                        <div style={{ padding:'8px 12px' }}>
                            {upcomingDeadlines.map((d, i) => (
                                <div key={i} className="hp-pill" style={{ display:'flex', alignItems:'center', gap:'10px', padding:'9px 8px', borderRadius:'10px', marginBottom: i < upcomingDeadlines.length - 1 ? '3px' : 0, cursor:'default', background: d.urgent ? '#fffbeb' : 'transparent', transition:'background 0.15s' }}>
                                    <div style={{ width:'32px', height:'32px', borderRadius:'8px', background: d.urgent ? '#fde68a' : '#f3f4f6', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                                        {d.urgent ? <FireIcon /> : <PinIcon />}
                                    </div>
                                    <div style={{ flex:1, minWidth:0 }}>
                                        <div style={{ fontSize:'12px', fontWeight:600, color:'#111827', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{d.title}</div>
                                        <div style={{ fontSize:'10px', color:'#9ca3af', marginTop:'1px' }}>{d.type}</div>
                                    </div>
                                    <div style={{ fontSize:'10px', fontWeight:700, color: d.urgent ? '#dc2626' : '#6b7280', background: d.urgent ? '#fef2f2' : '#f3f4f6', border: `1px solid ${d.urgent ? '#fecaca' : '#e5e7eb'}`, padding:'2px 7px', borderRadius:'5px', fontFamily:"'DM Mono', monospace", flexShrink:0 }}>{d.due}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Academic Summary */}
                    <div style={{ background:'linear-gradient(135deg, #0a1628 0%, #0f3d30 100%)', borderRadius:'14px', padding:'16px', color:'white', boxShadow:'0 6px 20px rgba(5,150,105,0.15)', position:'relative', overflow:'hidden' }}>
                        <div style={{ position:'absolute', top:'-20px', right:'-20px', width:'90px', height:'90px', borderRadius:'50%', background:'rgba(255,255,255,0.04)', pointerEvents:'none' }} />
                        <div style={{ fontSize:'10px', fontWeight:700, color:'rgba(255,255,255,0.45)', letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:'12px' }}>Academic Summary</div>
                        {[
                            { label:'Current CGPA', value: cgpa.toFixed(2), suffix:'/4.00' },
                            { label:'Credit Hours', value:'108', suffix:' cr' },
                            { label:'Semester Rank', value:'#12', suffix:'/180' },
                        ].map((r, i) => (
                            <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                                <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.55)' }}>{r.label}</span>
                                <span style={{ fontSize:'15px', fontWeight:700, color:'white', fontFamily:"'DM Mono', monospace" }}>
                                    {r.value}<span style={{ fontSize:'10px', color:'rgba(255,255,255,0.4)', fontWeight:400 }}>{r.suffix}</span>
                                </span>
                            </div>
                        ))}
                        <div style={{ marginTop:'12px', background:'rgba(255,255,255,0.08)', borderRadius:'9px', padding:'9px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                            <span style={{ fontSize:'11px', fontWeight:600, color:'rgba(255,255,255,0.7)', display:'flex', alignItems:'center', gap:'6px' }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                Goal: 3.85
                            </span>
                            <span style={{ fontSize:'11px', background:'rgba(255,255,255,0.12)', padding:'3px 8px', borderRadius:'6px', fontWeight:700, color:'#6ee7b7' }}>+0.10 needed</span>
                        </div>
                    </div>

                    {/* Alerts */}
                    <div style={{ background:'white', borderRadius:'14px', border:'1px solid #e5e7eb', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', padding:'14px 16px' }}>
                        <div style={{ fontSize:'13px', fontWeight:700, color:'#111827', marginBottom:'10px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                            <span style={{ display:'flex', alignItems:'center', gap:'7px', color:'#111827' }}>
                                <BellIcon /> Recent Alerts
                            </span>
                            <span style={{ background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', fontSize:'10px', fontWeight:700, padding:'2px 7px', borderRadius:'6px' }}>4 new</span>
                        </div>
                        {[
                            { icon:<CheckIcon />, text:'Midterm results released', sub:'CSE-401', bg:'#f0fdf9', tc:'#15803d' },
                            { icon:<WarnIcon />, text:'Library fine due', sub:'৳200 outstanding', bg:'#fffbeb', tc:'#c2410c' },
                        ].map((n, i) => (
                            <div key={i} style={{ display:'flex', gap:'10px', alignItems:'center', padding:'8px 10px', borderRadius:'8px', background:n.bg, marginBottom: i === 0 ? '6px' : 0, border:`1px solid ${i === 0 ? '#d1fae5' : '#fde68a'}` }}>
                                <span style={{ display:'flex', flexShrink:0 }}>{n.icon}</span>
                                <div style={{ flex:1 }}>
                                    <div style={{ fontSize:'12px', fontWeight:600, color:n.tc }}>{n.text}</div>
                                    <div style={{ fontSize:'10px', color:'#9ca3af' }}>{n.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;