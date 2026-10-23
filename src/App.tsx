import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import CGPACalculator from './pages/services/CGPACalculator';
import Transport from './pages/services/Transport';
import AdmitCard from "./pages/AdmitCard";
import Attendance from "./pages/Attendance";
import Exammarks from "./pages/Exammarks";
import Profile from "./pages/services/Profile";
import LMS from "./pages/LMS";
import LostFound from "./pages/services/LostAndFound";
import AdminPanel from './pages/AdminPanel';
import ComplaintBox from "./pages/services/ComplaintBox";
import api from './api/client';
import Faculty from "./pages/Faculty";
import BillsPayments from "./pages/services/BillsPayments";
import Counselling from "./pages/services/Counselling";
import Library from "./pages/services/Library";
import Housing from "./pages/services/Housing";
import Scholarships from "./pages/services/Scholarships";
import IdCardLost from "./pages/services/IdCardLost";
import MedicalCenter from "./pages/services/MedicalCenter";
const BUP_LOGO = 'https://afd.gov.bd/sites/default/files/inline-images/BUP%20Logo_0.png';
const BUP_BG = 'https://bup.edu.bd/public/upload/slider/20260210_1770710774750.jpg';

const Icons = {
    home:       'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
    profile:    'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    lms:        'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
    attendance: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
    marks:      'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    faculty:    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
    bills:      'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    admitcard:  'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
    lost:       'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
    complaints: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01',
    counseling: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
    schedule:   'M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01',
    events:     'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3',
    cgpa:       'M18 20V10 M12 20V4 M6 20v-6',
    library:    'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
    scholar:    'M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5',
    transport:  'M8 6v6 M15 6v6 M2 12h19.6 M18 18h2a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2 M8 18h8 M6 18v2 M18 18v2',
    idcard:     'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 3v4 M8 3v4 M8 13h.01 M8 17h8',
    medcenter:  'M22 12h-4l-3 9L9 3l-3 9H2',
    housing:    'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
    services:   'M12 20h9 M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z',
    feedback:   'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
    logout:     'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9',
    bell:       'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0',
    student:    'M12 2l9 7-9 7-9-7 9-7z M4 13l8 6 8-6 M4 17l8 6 8-6',
    admin:      'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
};

const NavIcon = ({ name, size = 15 }: { name: keyof typeof Icons; size?: number }) => {
    const d = Icons[name];
    if (!d) return null;
    const paths = d.split(' M ').map((p, i) => i === 0 ? p : 'M ' + p);
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            {paths.map((p, i) => <path key={i} d={p} />)}
        </svg>
    );
};

// ── LOGIN PAGE ─────────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin }: { onLogin: (user: any) => void }) => {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [role, setRole] = useState<'student' | 'admin'>('student');
    const [studentId, setStudentId] = useState('');
    const [password,  setPassword]  = useState('');
    const [reg, setReg] = useState({
        studentId: '', name: '', email: '', password: '', confirmPassword: '',
        department: 'Computer Science & Engineering',
        program: 'B.Sc. in CSE', year: '1st Year', semester: '1st Semester',
        phone: '', bloodGroup: '',
    });
    const [error,   setError]   = useState('');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [idFocus, setIdFocus] = useState(false);
    const [pwFocus, setPwFocus] = useState(false);

    useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', {
                studentId: studentId.trim(),
                password,
            });
            localStorage.setItem('ucam_token', data.token);
            onLogin(data.user);
        } catch (err: any) {
            setError(err?.response?.data?.message || err?.response?.data?.error || 'Invalid Student ID or password.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (reg.password !== reg.confirmPassword) { setError('Passwords do not match.'); return; }
        if (reg.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
        setLoading(true);
        try {
            const { data } = await api.post('/auth/register', {
                studentId:  reg.studentId.trim(),
                name:       reg.name.trim(),
                email:      reg.email.trim(),
                password:   reg.password,
                department: reg.department,
                program:    reg.program,
                year:       reg.year,
                semester:   reg.semester,
                phone:      reg.phone,
                bloodGroup: reg.bloodGroup,
            });
            localStorage.setItem('ucam_token', data.token);
            onLogin(data.user);
        } catch (err: any) {
            setError(err?.response?.data?.message || err?.response?.data?.error || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = (focused: boolean) => ({
        width: '100%', padding: '11px 14px',
        border: `1.5px solid ${focused ? '#059669' : '#e5e7eb'}`,
        borderRadius: '10px', fontSize: '13px',
        fontFamily: "'DM Sans', sans-serif", color: '#111827',
        outline: 'none', background: focused ? '#f0fdf9' : '#f9fafb',
        transition: 'all 0.2s', boxSizing: 'border-box' as const,
    });

    const labelStyle = {
        display: 'block', fontSize: '10.5px', fontWeight: 700,
        color: '#374151', marginBottom: '6px',
        textTransform: 'uppercase' as const, letterSpacing: '1px',
    };

    return (
        <div style={{ minHeight: '100vh', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
                * { margin: 0; padding: 0; box-sizing: border-box; }
                @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes spin   { to { transform: rotate(360deg); } }
                .reg-inp:focus { border-color: #059669 !important; background: #f0fdf9 !important; }
                .login-pill { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); border-radius: 100px; padding: 6px 14px; font-size: 12.5px; color: rgba(255,255,255,0.82); white-space: nowrap; display: flex; align-items: center; gap: 7px; }
                @media (max-width: 820px) { .login-left { display: none !important; } .login-grid { grid-template-columns: 1fr !important; justify-items: center; } }
                .role-btn-active { background: white !important; color: #059669 !important; box-shadow: 0 1px 4px rgba(0,0,0,0.08) !important; }
                .role-btn { flex: 1; padding: 9px; border-radius: 8px; border: none; font-size: 13px; background: transparent; color: #6b7280; cursor: pointer; font-family: 'DM Sans',sans-serif; transition: all 0.18s; display: flex; align-items: center; justify-content: center; gap: 7px; }
            `}</style>

            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${BUP_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(5,60,45,0.93) 0%, rgba(10,80,60,0.88) 50%, rgba(8,40,30,0.92) 100%)' }} />
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <circle cx="8%"  cy="20%" r="220" fill="rgba(255,255,255,0.02)" />
                <circle cx="90%" cy="12%" r="280" fill="rgba(255,255,255,0.015)" />
                <circle cx="75%" cy="85%" r="200" fill="rgba(0,180,130,0.05)" />
            </svg>

            <div className="login-grid" style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: '1fr 420px', gap: '64px', width: '100%', maxWidth: '1020px', padding: '40px 24px', alignItems: 'center', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.55s ease, transform 0.55s ease' }}>

                {/* Left branding */}
                <div className="login-left" style={{ color: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                        <div style={{ width: '68px', height: '68px', background: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', flexShrink: 0 }}>
                            <img src={BUP_LOGO} alt="BUP" style={{ width: '56px', height: '56px', objectFit: 'contain' }} onError={(e: any) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span style="font-size:30px">🎓</span>'; }} />
                        </div>
                        <div>
                            <div style={{ fontSize: '18px', fontWeight: 700, lineHeight: 1.25 }}>Bangladesh University</div>
                            <div style={{ fontSize: '18px', fontWeight: 700, lineHeight: 1.25 }}>of Professionals</div>
                            <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.5)', marginTop: '3px', fontStyle: 'italic' }}>Excellence Through Knowledge</div>
                        </div>
                    </div>
                    <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '4px 12px', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: '22px' }}>
                        UCAM Student Portal
                    </div>
                    <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '42px', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.5px', margin: '0 0 16px 0' }}>
                        Your Campus,<br /><span style={{ color: '#5BDDBE', fontStyle: 'italic' }}>All in One Place.</span>
                    </h1>
                    <p style={{ fontSize: '14.5px', lineHeight: 1.8, color: 'rgba(255,255,255,0.58)', maxWidth: '370px', margin: '0 0 32px 0' }}>
                        Access classes, schedule, library, complaints, counseling, transport and more — from a single portal built for BUP students.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {[
                            { label: 'LMS & Courses',   icon: 'lms'        },
                            { label: 'Class Schedule',  icon: 'schedule'   },
                            { label: 'Scholarships',    icon: 'scholar'    },
                            { label: 'Transport',       icon: 'transport'  },
                            { label: 'Complaints',      icon: 'complaints' },
                            { label: 'Lost & Found',    icon: 'lost'       },
                        ].map(f => (
                            <span key={f.label} className="login-pill">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    {Icons[f.icon as keyof typeof Icons]?.split(' M ').map((p, i) => (
                                        <path key={i} d={i === 0 ? p : 'M ' + p} />
                                    ))}
                                </svg>
                                {f.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right card */}
                <div style={{ background: 'white', borderRadius: '20px', boxShadow: '0 32px 80px rgba(0,0,0,0.25)', padding: mode === 'register' ? '32px 36px' : '40px 36px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f0fdf9', border: '1px solid #d1fae5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                            <img src={BUP_LOGO} alt="BUP" style={{ width: '38px', height: '38px', objectFit: 'contain' }} onError={(e: any) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span style="font-size:20px">🎓</span>'; }} />
                        </div>
                        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '21px', fontWeight: 400, color: '#0a2e1e', margin: '0 0 4px' }}>
                            {mode === 'login' ? 'Sign in to UCAM' : 'Create Account'}
                        </h2>
                        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                            {mode === 'login' ? 'Use your BUP student credentials' : 'Register with your BUP student details'}
                        </p>
                    </div>

                    {mode === 'login' && (
                        <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: '10px', padding: '4px', gap: '4px', marginBottom: '20px' }}>
                            <button type="button" className={`role-btn${role === 'student' ? ' role-btn-active' : ''}`}
                                    onClick={() => { setRole('student'); setError(''); setStudentId(''); setPassword(''); }}
                                    style={{ fontWeight: role === 'student' ? 600 : 400 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    {Icons.student.split(' M ').map((p, i) => <path key={i} d={i === 0 ? p : 'M ' + p} />)}
                                </svg>
                                Student
                            </button>
                            <button type="button" className={`role-btn${role === 'admin' ? ' role-btn-active' : ''}`}
                                    onClick={() => { setRole('admin'); setError(''); setStudentId(''); setPassword(''); }}
                                    style={{ fontWeight: role === 'admin' ? 600 : 400 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    {Icons.admin.split(' M ').map((p, i) => <path key={i} d={i === 0 ? p : 'M ' + p} />)}
                                </svg>
                                Admin
                            </button>
                        </div>
                    )}

                    {error && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', fontSize: '12.5px', color: '#dc2626', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            {error}
                        </div>
                    )}

                    {mode === 'login' && (
                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div>
                                <label style={labelStyle}>{role === 'admin' ? 'Admin Username' : 'Student ID'}</label>
                                <input type="text" value={studentId} onChange={e => setStudentId(e.target.value)} required
                                       placeholder={role === 'admin' ? 'admin' : 'e.g. 23549009053'}
                                       onFocus={() => setIdFocus(true)} onBlur={() => setIdFocus(false)}
                                       style={{ ...inputStyle(idFocus), fontFamily: "'DM Mono', monospace" }} />
                            </div>
                            <div>
                                <label style={labelStyle}>Password</label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                                       placeholder="Enter your password"
                                       onFocus={() => setPwFocus(true)} onBlur={() => setPwFocus(false)}
                                       style={inputStyle(pwFocus)} />
                            </div>
                            <div style={{ textAlign: 'right', marginTop: '-4px' }}>
                                <a href="#" style={{ fontSize: '12px', color: '#059669', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</a>
                            </div>
                            <button type="submit" disabled={loading}
                                    style={{ width: '100%', padding: '13px', background: loading ? '#9ca3af' : '#059669', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14.5px', fontWeight: 600, fontFamily: "'DM Sans',sans-serif", cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: loading ? 'none' : '0 4px 14px rgba(5,150,105,0.35)' }}
                                    onMouseEnter={e => { if (!loading) (e.currentTarget as any).style.background = '#047857'; }}
                                    onMouseLeave={e => { if (!loading) (e.currentTarget as any).style.background = '#059669'; }}>
                                {loading ? (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                                        Signing in...
                                    </span>
                                ) : 'Sign In →'}
                            </button>
                            {role === 'student' && (
                                <p style={{ textAlign: 'center', fontSize: '12.5px', color: '#6b7280', margin: 0 }}>
                                    New student?{' '}
                                    <button type="button" onClick={() => { setMode('register'); setError(''); }}
                                            style={{ background: 'none', border: 'none', color: '#059669', fontWeight: 600, cursor: 'pointer', fontSize: '12.5px', fontFamily: "'DM Sans',sans-serif" }}>
                                        Create an account
                                    </button>
                                </p>
                            )}
                        </form>
                    )}

                    {mode === 'register' && (
                        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                {[
                                    { label: 'Student ID *',  key: 'studentId',  placeholder: '23549009054', mono: true },
                                    { label: 'Full Name *',   key: 'name',       placeholder: 'Your full name' },
                                    { label: 'Email *',       key: 'email',      placeholder: 'you@bup.edu.bd' },
                                    { label: 'Phone',         key: 'phone',      placeholder: '01XXXXXXXXX' },
                                    { label: 'Blood Group',   key: 'bloodGroup', placeholder: 'A+' },
                                ].map(f => (
                                    <div key={f.key}>
                                        <label style={labelStyle}>{f.label}</label>
                                        <input className="reg-inp" type="text" placeholder={f.placeholder}
                                               value={(reg as any)[f.key]}
                                               onChange={e => setReg({ ...reg, [f.key]: e.target.value })}
                                               style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: '9px', fontSize: '13px', fontFamily: f.mono ? "'DM Mono',monospace" : "'DM Sans',sans-serif", background: '#f9fafb', color: '#111827', outline: 'none', transition: 'all 0.18s', boxSizing: 'border-box' as const }} />
                                    </div>
                                ))}
                                <div>
                                    <label style={labelStyle}>Department</label>
                                    <select value={reg.department} onChange={e => setReg({ ...reg, department: e.target.value })}
                                            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: '9px', fontSize: '13px', fontFamily: "'DM Sans',sans-serif", background: '#f9fafb', color: '#111827', outline: 'none' }}>
                                        {['Computer Science & Engineering','Electrical & Electronic Engineering','Business Administration','Social Science','Security Studies','Nursing'].map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle}>Year</label>
                                    <select value={reg.year} onChange={e => setReg({ ...reg, year: e.target.value })}
                                            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: '9px', fontSize: '13px', fontFamily: "'DM Sans',sans-serif", background: '#f9fafb', color: '#111827', outline: 'none' }}>
                                        {['1st Year','2nd Year','3rd Year','4th Year'].map(y => <option key={y}>{y}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle}>Semester</label>
                                    <select value={reg.semester} onChange={e => setReg({ ...reg, semester: e.target.value })}
                                            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: '9px', fontSize: '13px', fontFamily: "'DM Sans',sans-serif", background: '#f9fafb', color: '#111827', outline: 'none' }}>
                                        {['1st Semester','2nd Semester','3rd Semester','4th Semester','5th Semester','6th Semester','7th Semester','8th Semester'].map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <div>
                                    <label style={labelStyle}>Password *</label>
                                    <input className="reg-inp" type="password" placeholder="Min 6 characters"
                                           value={reg.password} onChange={e => setReg({ ...reg, password: e.target.value })}
                                           style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: '9px', fontSize: '13px', fontFamily: "'DM Sans',sans-serif", background: '#f9fafb', outline: 'none', transition: 'all 0.18s', boxSizing: 'border-box' as const }} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Confirm Password *</label>
                                    <input className="reg-inp" type="password" placeholder="Repeat password"
                                           value={reg.confirmPassword} onChange={e => setReg({ ...reg, confirmPassword: e.target.value })}
                                           style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: '9px', fontSize: '13px', fontFamily: "'DM Sans',sans-serif", background: '#f9fafb', outline: 'none', transition: 'all 0.18s', boxSizing: 'border-box' as const }} />
                                </div>
                            </div>
                            <button type="submit" disabled={loading}
                                    style={{ width: '100%', padding: '13px', background: loading ? '#9ca3af' : '#059669', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, fontFamily: "'DM Sans',sans-serif", cursor: loading ? 'not-allowed' : 'pointer', boxShadow: loading ? 'none' : '0 4px 14px rgba(5,150,105,0.35)', transition: 'all 0.2s', marginTop: '4px' }}>
                                {loading ? (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                                        Creating account...
                                    </span>
                                ) : 'Create Account →'}
                            </button>
                            <p style={{ textAlign: 'center', fontSize: '12.5px', color: '#6b7280', margin: 0 }}>
                                Already have an account?{' '}
                                <button type="button" onClick={() => { setMode('login'); setError(''); }}
                                        style={{ background: 'none', border: 'none', color: '#059669', fontWeight: 600, cursor: 'pointer', fontSize: '12.5px', fontFamily: "'DM Sans',sans-serif" }}>
                                    Sign in
                                </button>
                            </p>
                        </form>
                    )}

                    <p style={{ textAlign: 'center', fontSize: '11px', color: '#9ca3af', marginTop: '20px', marginBottom: 0, lineHeight: 1.7 }}>
                        Mirpur Cantonment, Dhaka-1216 · © 2026 BUP
                    </p>
                </div>
            </div>
        </div>
    );
};

// ── MAIN APP ───────────────────────────────────────────────────────────────────
const App = () => {
    const [isLoggedIn,   setIsLoggedIn]   = useState(false);
    const [currentUser,  setCurrentUser]  = useState<any>(null);
    const [activePage,   setActivePage]   = useState('home');
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [servicesOpen,      setServicesOpen]       = useState(true);

    // ── Rehydrate session on refresh ──────────────────────────────────────────
    useEffect(() => {
        const token = localStorage.getItem('ucam_token');
        if (!token) return;
        api.get('/auth/me')
            .then(({ data }) => {
                setCurrentUser(data.user);
                setIsLoggedIn(true);
            })
            .catch(() => {
                localStorage.removeItem('ucam_token');
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('ucam_token');
        setCurrentUser(null);
        setIsLoggedIn(false);
        setActivePage('home');
    };

    const handleUpdateUser = (updatedUser: any) => {
        setCurrentUser(updatedUser);
        localStorage.setItem('ucam_user', JSON.stringify(updatedUser));
    };

    if (!isLoggedIn) return (
        <LoginPage onLogin={(user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
        }} />
    );

    // ── ADMIN SHELL ────────────────────────────────────────────────────────────
    if (currentUser?.role === 'admin') return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`}</style>

            <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '36px', height: '36px', background: '#f0fdf9', border: '1px solid #d1fae5', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={BUP_LOGO} alt="BUP" style={{ width: '28px', height: '28px', objectFit: 'contain' }} onError={(e: any) => { e.target.style.display='none'; e.target.parentElement.innerHTML='<span style="font-size:16px">🎓</span>'; }} />
                    </div>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>BUP UCAM</div>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: '#0F7B6C', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Admin Panel</div>
                    </div>
                    <div style={{ width: '1px', height: '28px', background: '#e2e8f0', margin: '0 4px' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '20px', padding: '4px 12px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0F7B6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {Icons.admin.split(' M ').map((p, i) => <path key={i} d={i === 0 ? p : 'M ' + p} />)}
                        </svg>
                        <span style={{ fontSize: '11.5px', color: '#0F7B6C', fontWeight: 600 }}>{currentUser?.name || 'Administrator'}</span>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '8px 16px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: 'all 0.18s' }}
                    onMouseEnter={(e: any) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.borderColor = '#fca5a5'; }}
                    onMouseLeave={(e: any) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.borderColor = '#fecaca'; }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {Icons.logout.split(' M ').map((p, i) => <path key={i} d={i === 0 ? p : 'M ' + p} />)}
                    </svg>
                    Sign Out
                </button>
            </div>

            <div style={{ padding: '32px' }}>
                <AdminPanel />
            </div>
        </div>
    );

    // ── STUDENT PORTAL ─────────────────────────────────────────────────────────
    const notifs = [
        { id: 1, title: 'Midterm results released', msg: 'CSE-401 result now available', type: 'success' },
        { id: 2, title: 'Library fine due', msg: '200 BDT outstanding fine', type: 'warning' },
        { id: 3, title: 'Admit card available', msg: 'Download for final exams', type: 'info' },
        { id: 4, title: 'Scholarship deadline', msg: 'Merit scholarship closes Apr 15', type: 'info' },
    ];

    const schedData = [
        { day: 'Sunday', code: 'CSE-401', name: 'Data Structures', time: '8:00–9:30', room: '302 AC', inst: 'Dr. Rahman' },
        { day: 'Sunday', code: 'CSE-403', name: 'Algorithm Design', time: '10:00–11:30', room: '201 AC', inst: 'Dr. Islam' },
        { day: 'Sunday', code: 'CSE-411', name: 'Software Eng.', time: '1:30–3:00', room: 'Lab 104', inst: 'Dr. Hossain' },
    ];

    const events = [
        { title: 'CSE-401 Assignment 3 due', date: 'Apr 5, 2025', desc: 'Submit via LMS portal' },
        { title: 'Software project midpoint review', date: 'Apr 8, 2025', desc: 'Demo to Dr. Hossain' },
    ];

    const lmsCourses = [
        { code: 'CSE-401', name: 'Data Structures', cr: 3, inst: 'Dr. Rahman', att: 88, progress: 65, grade: 'A+' },
        { code: 'CSE-403', name: 'Algorithm Design', cr: 3, inst: 'Dr. Islam', att: 82, progress: 60, grade: 'A' },
        { code: 'CSE-405', name: 'Database Systems', cr: 3, inst: 'Dr. Akter', att: 91, progress: 70, grade: 'A+' },
    ];

    const navItems: { id: string; label: string; icon: keyof typeof Icons }[] = [
        { id: 'home',       label: 'Home',             icon: 'home' },
        { id: 'profile',    label: 'Profile',          icon: 'profile' },
        { id: 'lms',        label: 'LMS',              icon: 'lms' },
        { id: 'attendance', label: 'Attendance',       icon: 'attendance' },
        { id: 'marks',      label: 'Exam Marks',       icon: 'marks' },
        { id: 'faculty',    label: 'Faculty',          icon: 'faculty' },
        { id: 'bills',      label: 'Bills & Payments', icon: 'bills' },
        { id: 'admitcard',  label: 'Admit Card',       icon: 'admitcard' },
    ];

    const serviceItems: { id: string; label: string; icon: keyof typeof Icons }[] = [
        { id: 'lost',       label: 'Lost & Found',       icon: 'lost' },
        { id: 'complaints', label: 'Complaint Box',      icon: 'complaints' },
        { id: 'counseling', label: 'Counseling',         icon: 'counseling' },
        { id: 'schedule',   label: 'Class Schedule',     icon: 'schedule' },
        { id: 'events',     label: 'Events & Deadlines', icon: 'events' },
        { id: 'cgpa',       label: 'CGPA Calculator',    icon: 'cgpa' },
        { id: 'library',    label: 'Library',            icon: 'library' },
        { id: 'scholar',    label: 'Scholarships',       icon: 'scholar' },
        { id: 'transport',  label: 'Transport',          icon: 'transport' },
        { id: 'idcard',     label: 'ID Card Lost',       icon: 'idcard' },
        { id: 'medcenter',  label: 'Medical Center',     icon: 'medcenter' },
        { id: 'housing',    label: 'Housing',            icon: 'housing' },
    ];

    const notifColors: Record<string, string> = { success: '#059669', warning: '#d97706', info: '#2563eb', error: '#dc2626' };
    const notifBg:     Record<string, string> = { success: '#f0fdf4', warning: '#fffbeb', info: '#eff6ff', error: '#fef2f2' };
    const notifBorder: Record<string, string> = { success: '#bbf7d0', warning: '#fde68a', info: '#bfdbfe', error: '#fecaca' };

    const renderPage = () => {
        switch (activePage) {
            case 'housing':       return <Housing />;
            case 'scholarships':  return <Scholarships />;
            case 'idcard':        return <IdCardLost />;
            case 'medical':       return <MedicalCenter />;
            case 'bills':       return <BillsPayments />;
            case 'counselling': return <Counselling />;
            case 'library':     return <Library />;
            case 'faculty':   return <Faculty />;
            case 'home':       return <Home schedData={schedData} lmsCourses={lmsCourses} setActivePage={setActivePage} user={currentUser} />;
            case 'profile':    return <Profile user={currentUser} onUserUpdate={handleUpdateUser} />;
            case 'lms':        return <LMS />;
            case 'admitcard':  return <AdmitCard />;
            case 'attendance': return <Attendance />;
            case 'marks':      return <Exammarks />;
            case 'lost':       return <LostFound />;
            case 'complaints': return <ComplaintBox />;
            case 'cgpa':       return <CGPACalculator />;
            case 'transport':  return <Transport />;
            case 'schedule':   return <SchedulePage schedData={schedData} />;
            case 'events':     return <EventsPage events={events} />;
            case 'counseling': return <CounselingPage />;
            default: return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px', color: '#9ca3af', textAlign: 'center' }}>
                    <div style={{ width: '56px', height: '56px', background: '#f0fdf9', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid #d1fae5' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Coming Soon</div>
                    <div style={{ fontSize: '13px', color: '#9ca3af' }}>This section is under development</div>
                </div>
            );
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", background: '#f5f7f5' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
                * { margin: 0; padding: 0; box-sizing: border-box; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #d1fae5; border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: #6ee7b7; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
                .nav-btn { transition: all 0.18s ease !important; }
                .nav-btn:hover { background: #f0fdf9 !important; color: #059669 !important; }
                .nav-btn:hover svg { stroke: #059669 !important; }
                .notif-item:hover { opacity: 0.88; }
                .topbar-action:hover { background: #f0fdf9 !important; border-color: #6ee7b7 !important; }
            `}</style>

            {/* ── SIDEBAR ── */}
            <div style={{ width: '252px', background: 'white', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e5e7eb', overflowY: 'auto', flexShrink: 0, boxShadow: '2px 0 12px rgba(0,0,0,0.04)' }}>
                <div style={{ padding: '18px 16px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', overflow: 'hidden', border: '1.5px solid #d1fae5', boxShadow: '0 2px 8px rgba(5,150,105,0.12)', flexShrink: 0, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={BUP_LOGO} alt="BUP Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e: any) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span style="font-size:20px">🎓</span>'; }} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0a2e1e', letterSpacing: '-0.2px' }}>BUP</div>
                        <div style={{ fontSize: '9px', color: '#059669', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase' }}>UCAM Portal</div>
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '10px 8px' }}>
                    <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#9ca3af', letterSpacing: '1.2px', textTransform: 'uppercase', padding: '4px 10px 8px', marginTop: '4px' }}>Main</div>

                    {navItems.map(item => (
                        <button key={item.id} className="nav-btn" onClick={() => setActivePage(item.id)}
                                style={{ width: '100%', background: activePage === item.id ? '#f0fdf9' : 'transparent', border: 'none', color: activePage === item.id ? '#059669' : '#4b5563', padding: '9px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: activePage === item.id ? 600 : 400, borderRadius: '8px', textAlign: 'left', marginBottom: '1px', position: 'relative' }}>
                            {activePage === item.id && (
                                <span style={{ position: 'absolute', left: 0, top: '6px', bottom: '6px', width: '3px', background: '#059669', borderRadius: '0 3px 3px 0' }} />
                            )}
                            <span style={{ color: activePage === item.id ? '#059669' : '#6b7280', display: 'flex' }}>
                                <NavIcon name={item.icon} size={15} />
                            </span>
                            <span>{item.label}</span>
                        </button>
                    ))}

                    <div style={{ height: '1px', background: '#f3f4f6', margin: '10px 4px' }} />
                    <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#9ca3af', letterSpacing: '1.2px', textTransform: 'uppercase', padding: '4px 10px 8px' }}>Services</div>

                    <button className="nav-btn" onClick={() => setServicesOpen(!servicesOpen)}
                            style={{ width: '100%', background: 'transparent', border: 'none', color: '#4b5563', padding: '9px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 500, borderRadius: '8px', textAlign: 'left', marginBottom: '1px' }}>
                        <span style={{ color: '#6b7280', display: 'flex' }}><NavIcon name="services" size={15} /></span>
                        <span style={{ flex: 1 }}>All Services</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.25s', transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>

                    {servicesOpen && (
                        <div style={{ paddingLeft: '4px', animation: 'fadeIn 0.2s ease' }}>
                            {serviceItems.map(item => (
                                <button key={item.id} className="nav-btn" onClick={() => setActivePage(item.id)}
                                        style={{ width: '100%', background: activePage === item.id ? '#f0fdf9' : 'transparent', border: 'none', color: activePage === item.id ? '#059669' : '#6b7280', padding: '8px 10px 8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '9px', fontSize: '12.5px', fontWeight: activePage === item.id ? 600 : 400, borderRadius: '8px', textAlign: 'left', marginBottom: '1px' }}>
                                    <span style={{ color: activePage === item.id ? '#059669' : '#9ca3af', display: 'flex' }}>
                                        <NavIcon name={item.icon} size={13} />
                                    </span>
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    <div style={{ height: '1px', background: '#f3f4f6', margin: '10px 4px' }} />

                    <button className="nav-btn" onClick={() => setActivePage('feedback')}
                            style={{ width: '100%', background: activePage === 'feedback' ? '#f0fdf9' : 'transparent', border: 'none', color: activePage === 'feedback' ? '#059669' : '#4b5563', padding: '9px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: activePage === 'feedback' ? 600 : 400, borderRadius: '8px', textAlign: 'left', marginBottom: '1px' }}>
                        <span style={{ color: activePage === 'feedback' ? '#059669' : '#6b7280', display: 'flex' }}><NavIcon name="feedback" size={15} /></span>
                        <span>Course Feedback</span>
                    </button>
                </div>

                {/* Logout */}
                <div style={{ padding: '12px', borderTop: '1px solid #f3f4f6', flexShrink: 0 }}>
                    <button onClick={handleLogout}
                            style={{ width: '100%', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600, transition: 'all 0.18s ease', fontFamily: "'DM Sans', sans-serif" }}
                            onMouseEnter={(e: any) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.borderColor = '#fca5a5'; }}
                            onMouseLeave={(e: any) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.borderColor = '#fecaca'; }}>
                        <NavIcon name="logout" size={15} />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Topbar */}
                <div style={{ background: 'white', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', borderBottom: '1px solid #e5e7eb', flexShrink: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12.5px', color: '#9ca3af' }}>Portal</span>
                        <span style={{ color: '#d1d5db', fontSize: '14px' }}>/</span>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#111827', textTransform: 'capitalize' }}>
                            {navItems.find(n => n.id === activePage)?.label || serviceItems.find(s => s.id === activePage)?.label || activePage}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f0fdf9', border: '1px solid #d1fae5', padding: '5px 12px', borderRadius: '20px' }}>
                            <span style={{ width: '6px', height: '6px', background: '#059669', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                            <span style={{ fontSize: '11.5px', color: '#059669', fontWeight: 600 }}>Spring 2025</span>
                        </div>

                        {/* Notifications */}
                        <div style={{ position: 'relative' }}>
                            <button className="topbar-action" onClick={() => setNotificationsOpen(!notificationsOpen)}
                                    style={{ width: '36px', height: '36px', borderRadius: '9px', background: notificationsOpen ? '#f0fdf9' : 'white', border: `1px solid ${notificationsOpen ? '#6ee7b7' : '#e5e7eb'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.18s ease', position: 'relative' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                                <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#dc2626', color: 'white', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, border: '2px solid white' }}>
                                    {notifs.length}
                                </span>
                            </button>

                            {notificationsOpen && (
                                <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, background: 'white', borderRadius: '14px', boxShadow: '0 12px 40px rgba(0,0,0,0.12)', padding: '16px', width: '310px', border: '1px solid #e5e7eb', animation: 'fadeIn 0.2s ease', zIndex: 1000 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <span style={{ fontWeight: 700, fontSize: '13px', color: '#111827' }}>Notifications</span>
                                        <span style={{ background: '#fef2f2', color: '#dc2626', fontSize: '10px', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>{notifs.length} new</span>
                                    </div>
                                    {notifs.map(n => (
                                        <div key={n.id} className="notif-item" style={{ padding: '10px 12px', marginBottom: '6px', borderRadius: '10px', background: notifBg[n.type], border: `1px solid ${notifBorder[n.type]}`, cursor: 'pointer', transition: 'opacity 0.15s', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: notifColors[n.type], marginTop: '5px', flexShrink: 0 }} />
                                            <div>
                                                <div style={{ fontWeight: 600, color: '#111827', fontSize: '12px', marginBottom: '2px' }}>{n.title}</div>
                                                <div style={{ fontSize: '11.5px', color: '#6b7280' }}>{n.msg}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* User pill */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 12px 5px 5px', background: 'white', border: '1px solid #e5e7eb', borderRadius: '40px', cursor: 'pointer', transition: 'all 0.18s ease' } as any}
                             onMouseEnter={(e: any) => { e.currentTarget.style.borderColor = '#6ee7b7'; e.currentTarget.style.background = '#f0fdf9'; }}
                             onMouseLeave={(e: any) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = 'white'; }}>
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1.5px solid #6ee7b7', overflow: 'hidden', flexShrink: 0 }}>
                                <img
                                    src={currentUser?.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name || 'student'}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    alt="Profile"
                                />
                            </div>
                            <div style={{ lineHeight: 1.25 }}>
                                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#111827' }}>
                                    {currentUser?.name || 'Loading...'}
                                </div>
                                <div style={{ fontSize: '10.5px', color: '#059669', fontFamily: "'DM Mono', monospace" }}>
                                    {currentUser?.studentId || ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <div style={{ flex: 1, overflow: 'auto', padding: '24px', background: '#f9fafb', animation: 'fadeIn 0.3s ease' }}>
                    {renderPage()}
                </div>
            </div>
        </div>
    );
};

// ── Placeholder pages ──────────────────────────────────────────────────────────
const SchedulePage = ({ schedData }: any) => (
    <div style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #e5e7eb' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Class Schedule</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
            <tr style={{ background: '#f9fafb' }}>
                {['Day','Course','Code','Time','Room','Instructor'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 20px', fontSize: '10px', fontWeight: 700, color: '#9ca3af', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid #f3f4f6' }}>{h}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {schedData.map((s: any, i: number) => (
                <tr key={i} style={{ borderBottom: '1px solid #f9fafb' }}
                    onMouseEnter={(e: any) => e.currentTarget.style.background = '#f9fafb'}
                    onMouseLeave={(e: any) => e.currentTarget.style.background = 'white'}>
                    <td style={{ padding: '13px 20px', fontSize: '13px', color: '#111827', fontWeight: 500 }}>{s.day}</td>
                    <td style={{ padding: '13px 20px', fontSize: '13px', color: '#374151' }}>{s.name}</td>
                    <td style={{ padding: '13px 20px' }}><span style={{ background: '#f0fdf9', color: '#059669', padding: '3px 9px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, fontFamily: "'DM Mono',monospace", border: '1px solid #d1fae5' }}>{s.code}</span></td>
                    <td style={{ padding: '13px 20px', fontSize: '12px', color: '#6b7280', fontFamily: "'DM Mono',monospace" }}>{s.time}</td>
                    <td style={{ padding: '13px 20px', fontSize: '13px', color: '#6b7280' }}>{s.room}</td>
                    <td style={{ padding: '13px 20px', fontSize: '13px', color: '#6b7280' }}>{s.inst}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

const EventsPage = ({ events }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {events.map((e: any, i: number) => (
            <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', display: 'flex', gap: '16px', alignItems: 'flex-start', transition: 'box-shadow 0.2s ease' }}
                 onMouseEnter={(e: any) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}
                 onMouseLeave={(e: any) => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fff7ed', border: '1px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                    </svg>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#111827', marginBottom: '3px' }}>{e.title}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{e.desc}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '8px', fontFamily: "'DM Mono',monospace" }}>📅 {e.date}</div>
                </div>
                <span style={{ background: '#fef2f2', color: '#dc2626', fontSize: '10px', fontWeight: 700, padding: '3px 9px', borderRadius: '6px', flexShrink: 0, border: '1px solid #fecaca' }}>URGENT</span>
            </div>
        ))}
    </div>
);

const CounselingPage = () => (
    <div style={{ background: 'white', borderRadius: '14px', padding: '40px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>
        Counseling appointments coming soon...
    </div>
);

export default App;