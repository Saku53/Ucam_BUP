import React, { useState } from 'react';
import api from '../../api/client'; // adjust path to your axios client

interface ProfileProps {
    user?: any;
    onUserUpdate?: (user: any) => void;
}

export default function Profile({ user, onUserUpdate }: ProfileProps) {
    const [profileImage, setProfileImage] = useState(
        user?.profileImage || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sakib'
    );
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<'info'|'academic'|'security'>('info');
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        name:          user?.name          || '',
        studentId:     user?.studentId     || '',
        email:         user?.email         || '',
        phone:         user?.phone         || '',
        dept:          user?.department    || '',
        year:          user?.year          ? `${user.year}${user.year===1?'st':user.year===2?'nd':user.year===3?'rd':'th'} Year` : '',
        semester:      user?.semester      ? `${user.semester}th Semester` : '',
        blood:         user?.bloodGroup    || '',
        address:       user?.address       || '',
        guardian:      user?.guardian      || '',
        guardianPhone: user?.guardianPhone || '',
    });

    const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
    const [pwError, setPwError] = useState('');
    const [pwSaved, setPwSaved] = useState(false);

    const handleImageUpload = async (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (ev: any) => {
            const base64 = ev.target.result;
            setProfileImage(base64);
            try {
                const { data } = await api.patch('/auth/profile', { profileImage: base64 });
                onUserUpdate?.(data.user);
            } catch { /* silently fail image upload */ }
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        setSaving(true);
        setError('');
        try {
            const { data } = await api.patch('/auth/profile', {
                phone:         form.phone,
                bloodGroup:    form.blood,
                address:       form.address,
                guardian:      form.guardian,
                guardianPhone: form.guardianPhone,
                profileImage,
            });
            onUserUpdate?.(data.user);   // ← push updated user back to App state
            setIsEditing(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Failed to save. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordChange = async (e: any) => {
        e.preventDefault();
        setPwError('');
        if (pwForm.next !== pwForm.confirm) { setPwError('Passwords do not match.'); return; }
        if (pwForm.next.length < 8)         { setPwError('Password must be at least 8 characters.'); return; }
        try {
            await api.patch('/auth/password', { currentPassword: pwForm.current, newPassword: pwForm.next });
            setPwSaved(true);
            setPwForm({ current: '', next: '', confirm: '' });
            setTimeout(() => setPwSaved(false), 3000);
        } catch (err: any) {
            setPwError(err?.response?.data?.message || 'Failed to update password.');
        }
    };

    const academicData = [
        { label: 'Program',           value: 'B.Sc. in CSE' },
        { label: 'Faculty',           value: 'Faculty of Science & Technology' },
        { label: 'Batch',             value: '2021' },
        { label: 'Current CGPA',      value: `${user?.cgpa?.toFixed(2) ?? '—'} / 4.00` },
        { label: 'Credits Completed', value: '108 cr' },
        { label: 'Semester Status',   value: 'Regular' },
        { label: 'Advisor',           value: 'Dr. A.K.M. Rezaul Hossain' },
        { label: 'Hall',              value: 'Not Allocated' },
    ];

    // ── SVG helpers ───────────────────────────────────────────────────────────
    const Svg = ({ size = 16, children, color = 'currentColor' }: { size?: number; children: React.ReactNode; color?: string }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{children}</svg>
    );

    const CheckCircleIcon = () => <Svg size={16} color="#059669"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Svg>;
    const EditIcon        = () => <Svg size={14}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></Svg>;
    const SaveIcon        = () => <Svg size={14}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></Svg>;
    const CameraIcon      = () => <Svg size={13} color="white"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></Svg>;
    const LockIcon        = () => <Svg size={14}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Svg>;
    const AlertIcon       = () => <Svg size={14} color="#c2410c"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Svg>;
    const SpinIcon        = () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 0.7s linear infinite' }}>
            <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
            <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
        </svg>
    );

    const inputStyle = (editable: boolean): React.CSSProperties => ({
        width: '100%', padding: '10px 14px',
        border: `1.5px solid ${editable ? '#e5e7eb' : '#f3f4f6'}`,
        borderRadius: '9px', fontSize: '13px',
        background: editable ? 'white' : '#f9fafb',
        color: editable ? '#111827' : '#6b7280',
        fontFamily: "'DM Sans', sans-serif",
        transition: 'all 0.2s', boxSizing: 'border-box', outline: 'none',
    });

    // Fields that are editable vs read-only
    const fields = [
        { label: 'Full Name',       key: 'name',          editable: false },
        { label: 'Student ID',      key: 'studentId',     editable: false },
        { label: 'Email Address',   key: 'email',         editable: false },
        { label: 'Phone Number',    key: 'phone',         editable: true  },
        { label: 'Department',      key: 'dept',          editable: false },
        { label: 'Blood Group',     key: 'blood',         editable: true  },
        { label: 'Address',         key: 'address',       editable: true  },
        { label: 'Guardian Name',   key: 'guardian',      editable: true  },
        { label: 'Guardian Phone',  key: 'guardianPhone', editable: true  },
    ];

    const displayFirst = user?.name?.split(' ')[1] ?? user?.name?.split(' ')[0] ?? 'Student';

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`
                @keyframes pf-fade { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
                @keyframes spin { to { transform: rotate(360deg); } }
                .pf-tab { transition: all 0.2s ease; cursor: pointer; }
                .pf-inp:focus { border-color: #6ee7b7 !important; background: #f0fdf9 !important; outline: none; }
            `}</style>

            {/* Header */}
            <div style={{ marginBottom: '22px', animation: 'pf-fade 0.4s ease both' }}>
                <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: 0 }}>My Profile</h1>
                <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>Manage your personal and academic information</p>
            </div>

            {/* Toast */}
            {saved && (
                <div style={{ background: '#f0fdf9', border: '1px solid #d1fae5', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', animation: 'pf-fade 0.3s ease', color: '#059669', fontSize: '13px', fontWeight: 600 }}>
                    <CheckCircleIcon /> Profile updated successfully!
                </div>
            )}
            {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontSize: '13px', fontWeight: 500 }}>
                    <AlertIcon /> {error}
                </div>
            )}

            {/* Hero Card */}
            <div style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1B2B4B 50%, #0f2d28 100%)', borderRadius: '18px', padding: '26px', marginBottom: '18px', position: 'relative', overflow: 'hidden', boxShadow: '0 12px 40px rgba(5,150,105,0.18)', animation: 'pf-fade 0.4s 0.05s ease both' }}>
                <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(5,150,105,0.1)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '22px', position: 'relative', zIndex: 1 }}>
                    {/* Avatar */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div style={{ width: '86px', height: '86px', borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(110,231,183,0.5)', boxShadow: '0 0 16px rgba(5,150,105,0.3)' }}>
                            <img src={profileImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Profile" />
                        </div>
                        <label style={{ position: 'absolute', bottom: '-5px', right: '-5px', width: '26px', height: '26px', background: '#059669', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid #1B2B4B' }}>
                            <CameraIcon />
                            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                        </label>
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '21px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{user?.name || 'Student'}</div>
                        <div style={{ fontSize: '12px', color: '#6ee7b7', fontFamily: "'DM Mono', monospace", marginBottom: '10px' }}>{user?.studentId || ''}</div>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {[user?.department, form.year && form.semester ? `${form.year} · ${form.semester}` : '', 'Regular Student'].filter(Boolean).map((tag, i) => (
                                <span key={i} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 500 }}>{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* CGPA */}
                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                        <div style={{ fontSize: '30px', fontWeight: 700, color: '#6ee7b7', fontFamily: "'DM Mono', monospace" }}>{user?.cgpa?.toFixed(2) ?? '—'}</div>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>CGPA</div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', background: '#f3f4f6', borderRadius: '12px', padding: '4px', marginBottom: '18px', animation: 'pf-fade 0.4s 0.1s ease both' }}>
                {([['info','Personal Info'],['academic','Academic'],['security','Security']] as const).map(([id, label]) => (
                    <button key={id} className="pf-tab" onClick={() => setActiveTab(id)}
                            style={{ flex: 1, padding: '10px', borderRadius: '9px', border: 'none', fontSize: '13px', fontWeight: 600, background: activeTab === id ? 'white' : 'transparent', color: activeTab === id ? '#059669' : '#6b7280', boxShadow: activeTab === id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none', fontFamily: "'DM Sans', sans-serif" }}>
                        {label}
                    </button>
                ))}
            </div>

            {/* PERSONAL INFO TAB */}
            {activeTab === 'info' && (
                <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden', animation: 'pf-fade 0.3s ease both' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Personal Information</div>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            disabled={saving}
                            style={{ background: isEditing ? '#059669' : '#f0fdf9', border: `1px solid ${isEditing ? '#059669' : '#d1fae5'}`, color: isEditing ? 'white' : '#059669', padding: '7px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', gap: '6px', opacity: saving ? 0.7 : 1 }}
                        >
                            {saving ? <SpinIcon /> : isEditing ? <SaveIcon /> : <EditIcon />}
                            {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
                        </button>
                    </div>
                    <div style={{ padding: '22px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        {fields.map((f) => {
                            const canEdit = isEditing && f.editable;
                            return (
                                <div key={f.key}>
                                    <label style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                                        {f.label}{!f.editable && <span style={{ fontSize: '9px', color: '#d1d5db', marginLeft: '4px' }}>read-only</span>}
                                    </label>
                                    <input
                                        className="pf-inp"
                                        type="text"
                                        value={(form as any)[f.key]}
                                        disabled={!canEdit}
                                        onChange={e => canEdit && setForm({ ...form, [f.key]: e.target.value })}
                                        style={inputStyle(canEdit)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    {isEditing && (
                        <div style={{ padding: '0 20px 20px', display: 'flex', gap: '10px' }}>
                            <button onClick={handleSave} disabled={saving}
                                    style={{ flex: 1, background: '#059669', color: 'white', border: 'none', padding: '11px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', opacity: saving ? 0.7 : 1 }}>
                                {saving ? <SpinIcon /> : <SaveIcon />}
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button onClick={() => { setIsEditing(false); setError(''); }}
                                    style={{ background: 'white', color: '#6b7280', border: '1px solid #e5e7eb', padding: '11px 20px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ACADEMIC TAB */}
            {activeTab === 'academic' && (
                <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden', animation: 'pf-fade 0.3s ease both' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Academic Information</div>
                    </div>
                    <div style={{ padding: '18px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {academicData.map((row, i) => (
                            <div key={i} style={{ background: '#f9fafb', borderRadius: '10px', padding: '13px 15px', border: '1px solid #f3f4f6' }}>
                                <div style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>{row.label}</div>
                                <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#111827', fontFamily: row.label.includes('CGPA') || row.label.includes('Credits') ? "'DM Mono', monospace" : 'inherit' }}>{row.value}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ margin: '0 20px 20px', background: '#f9fafb', borderRadius: '12px', padding: '14px 16px', border: '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>CGPA Progress</span>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#059669', fontFamily: "'DM Mono', monospace" }}>{user?.cgpa?.toFixed(2) ?? '—'} / 4.00</span>
                        </div>
                        <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${((user?.cgpa ?? 0) / 4) * 100}%`, height: '100%', background: '#059669', borderRadius: '4px', transition: 'width 0.8s ease' }} />
                        </div>
                        <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '5px' }}>{(((user?.cgpa ?? 0) / 4) * 100).toFixed(1)}% of maximum CGPA achieved</div>
                    </div>
                </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
                <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden', animation: 'pf-fade 0.3s ease both' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Security Settings</div>
                    </div>
                    <form onSubmit={handlePasswordChange} style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {[
                            { label: 'Current Password', key: 'current' },
                            { label: 'New Password',     key: 'next'    },
                            { label: 'Confirm New Password', key: 'confirm' },
                        ].map((f, i) => (
                            <div key={i}>
                                <label style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{f.label}</label>
                                <input className="pf-inp" type="password" placeholder="••••••••"
                                       value={(pwForm as any)[f.key]}
                                       onChange={e => setPwForm({ ...pwForm, [f.key]: e.target.value })}
                                       style={inputStyle(true)} />
                            </div>
                        ))}
                        {pwError && (
                            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', fontSize: '12.5px', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '7px' }}>
                                <AlertIcon /> {pwError}
                            </div>
                        )}
                        {pwSaved && (
                            <div style={{ background: '#f0fdf9', border: '1px solid #d1fae5', borderRadius: '8px', padding: '10px 14px', fontSize: '12.5px', color: '#059669', display: 'flex', alignItems: 'center', gap: '7px' }}>
                                <CheckCircleIcon /> Password updated successfully!
                            </div>
                        )}
                        <button type="submit" style={{ background: '#059669', color: 'white', border: 'none', padding: '12px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}>
                            <LockIcon /> Update Password
                        </button>
                        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '9px', padding: '12px 14px', fontSize: '12px', color: '#d97706', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <AlertIcon /> Password must be at least 8 characters with uppercase, number, and symbol.
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}