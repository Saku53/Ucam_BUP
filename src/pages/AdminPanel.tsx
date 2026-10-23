import React, { useState, useEffect } from 'react';
import api from '../api/client';

const Svg = ({ size = 16, color = 'currentColor', children }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
    </svg>
);

export default function AdminPanel() {
    const [activeTab,     setActiveTab]     = useState<'users'|'complaints'|'lostfound'|'appointments'>('users');
    const [users,         setUsers]         = useState<any[]>([]);
    const [complaints,    setComplaints]    = useState<any[]>([]);
    const [lostItems,     setLostItems]     = useState<any[]>([]);
    const [appointments,  setAppointments]  = useState<any[]>([]);
    const [loading,       setLoading]       = useState(false);
    const [showAddUser,   setShowAddUser]   = useState(false);
    const [showEditUser,  setShowEditUser]  = useState(false);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [toast,         setToast]         = useState('');

    const [newUser, setNewUser] = useState({
        studentId: '', name: '', email: '', password: '',
        department: 'CSE', program: 'B.Sc. in CSE',
        year: '1st Year', semester: '1st Semester',
        cgpa: '', bloodGroup: '', phone: '',
    });

    const [editUser, setEditUser] = useState({
        name: '', email: '', department: 'CSE',
        year: '1st Year', semester: '1st Semester',
        cgpa: '', bloodGroup: '', phone: '',
    });

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [u, c, l, a] = await Promise.all([
                api.get('/admin/users'),
                api.get('/admin/complaints'),
                api.get('/admin/lost-found'),
                api.get('/admin/appointments'),
            ]);
            setUsers(       Array.isArray(u.data.users)         ? u.data.users         : []);
            setComplaints(  Array.isArray(c.data.complaints)    ? c.data.complaints    : []);
            setLostItems(   Array.isArray(l.data.items)         ? l.data.items         : []);
            setAppointments(Array.isArray(a.data.appointments)  ? a.data.appointments  : []);
        } catch (e) {
            console.error(e);
            showToast('Failed to load data — check backend');
        }
        setLoading(false);
    };

    useEffect(() => { fetchAll(); }, []);

    // ── USERS ──────────────────────────────────────────────────────────────────

    const addUser = async () => {
        if (!newUser.studentId || !newUser.name || !newUser.email || !newUser.password) {
            showToast('Please fill required fields'); return;
        }
        try {
            await api.post('/admin/users', newUser);
            showToast('Student added successfully');
            setShowAddUser(false);
            setNewUser({ studentId:'', name:'', email:'', password:'', department:'CSE', program:'B.Sc. in CSE', year:'1st Year', semester:'1st Semester', cgpa:'', bloodGroup:'', phone:'' });
            fetchAll();
        } catch (err: any) {
            showToast(err?.response?.data?.message || err?.response?.data?.error || 'Failed to add student');
        }
    };

    const openEditUser = (user: any) => {
        setEditingUserId(user._id);
        setEditUser({
            name:       user.name       || '',
            email:      user.email      || '',
            department: user.department || 'CSE',
            year:       user.year       || '1st Year',
            semester:   user.semester   || '1st Semester',
            cgpa:       user.cgpa       || '',
            bloodGroup: user.bloodGroup || '',
            phone:      user.phone      || '',
        });
        setShowEditUser(true);
        setShowAddUser(false);
    };

    const saveEditUser = async () => {
        if (!editingUserId) return;
        try {
            await api.put(`/admin/users/${editingUserId}`, editUser);
            showToast('Student updated successfully');
            setShowEditUser(false);
            setEditingUserId(null);
            fetchAll();
        } catch (err: any) {
            showToast(err?.response?.data?.message || err?.response?.data?.error || 'Failed to update student');
        }
    };

    const deleteUser = async (id: string) => {
        if (!window.confirm('Delete this student?')) return;
        try {
            await api.delete(`/admin/users/${id}`);
            showToast('Student deleted');
            fetchAll();
        } catch {
            showToast('Failed to delete student');
        }
    };

    // ── COMPLAINTS ─────────────────────────────────────────────────────────────

    const updateComplaintStatus = async (id: string, status: string) => {
        try {
            await api.patch(`/admin/complaints/${id}`, { status });
            showToast('Status updated');
            fetchAll();
        } catch {
            showToast('Failed to update status');
        }
    };

    const deleteComplaint = async (id: string) => {
        try {
            await api.delete(`/admin/complaints/${id}`);
            showToast('Complaint deleted');
            fetchAll();
        } catch {
            showToast('Failed to delete complaint');
        }
    };

    // ── LOST & FOUND ───────────────────────────────────────────────────────────

    const deleteLostItem = async (id: string) => {
        try {
            await api.delete(`/admin/lost-found/${id}`);
            showToast('Item deleted');
            fetchAll();
        } catch {
            showToast('Failed to delete item');
        }
    };

    // ── APPOINTMENTS ───────────────────────────────────────────────────────────

    const deleteAppointment = async (id: string) => {
        try {
            await api.delete(`/admin/appointments/${id}`);
            showToast('Appointment deleted');
            fetchAll();
        } catch {
            showToast('Failed to delete appointment');
        }
    };

    // ── HELPERS ────────────────────────────────────────────────────────────────

    const statusColor: Record<string, { bg: string; c: string }> = {
        'pending':   { bg: '#fff7ed', c: '#f97316' },
        'in-review': { bg: '#dbeafe', c: '#1d4ed8' },
        'resolved':  { bg: '#f0fdf4', c: '#0F7B6C' },
        'confirmed': { bg: '#f0fdf4', c: '#0F7B6C' },
        'cancelled': { bg: '#fee2e2', c: '#ef4444' },
    };

    const tabs = [
        { id: 'users',        label: 'Students',    count: users.length },
        { id: 'complaints',   label: 'Complaints',  count: complaints.length },
        { id: 'lostfound',    label: 'Lost & Found',count: lostItems.length },
        { id: 'appointments', label: 'Counseling',  count: appointments.length },
    ];

    const inputCss: React.CSSProperties = {
        width: '100%', padding: '9px 12px',
        border: '1px solid #e2e8f0', borderRadius: '8px',
        fontSize: '13px', fontFamily: "'DM Sans',sans-serif",
        boxSizing: 'border-box', outline: 'none',
    };

    const labelCss: React.CSSProperties = {
        fontSize: '10px', fontWeight: 700, color: '#94a3b8',
        display: 'block', marginBottom: '4px',
        textTransform: 'uppercase', letterSpacing: '0.8px',
    };

    const deptOptions   = ['CSE','EEE','BBA','Social Science','Security Studies','Nursing'];
    const yearOptions   = ['1st Year','2nd Year','3rd Year','4th Year'];
    const semOptions    = ['1st Semester','2nd Semester','3rd Semester','4th Semester','5th Semester','6th Semester','7th Semester','8th Semester'];

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: "'DM Sans',sans-serif" }}>
            <style>{`
                @keyframes adm-fade { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
                .adm-tr:hover td { background: #f8fafc !important; }
                .adm-btn:hover { opacity: 0.85; }
            `}</style>

            {/* ── Toast ── */}
            {toast && (
                <div style={{ position:'fixed', top:'20px', right:'20px', background:'#0F7B6C', color:'white', padding:'12px 20px', borderRadius:'10px', fontSize:'13px', fontWeight:600, zIndex:9999, boxShadow:'0 8px 24px rgba(15,123,108,0.3)', animation:'adm-fade 0.3s ease' }}>
                    {toast}
                </div>
            )}

            {/* ── Header ── */}
            <div style={{ marginBottom:'24px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                    <h1 style={{ fontSize:'22px', fontWeight:700, color:'#0f172a', margin:0 }}>Admin Panel</h1>
                    <p style={{ fontSize:'13px', color:'#94a3b8', marginTop:'4px', margin:0 }}>Manage all UCAM data — connected to MongoDB</p>
                </div>
                <div style={{ display:'flex', gap:'10px' }}>
                    <button onClick={fetchAll} style={{ background:'#f1f5f9', border:'1px solid #e2e8f0', color:'#64748b', padding:'8px 16px', borderRadius:'8px', fontSize:'12px', fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' }}>
                        <Svg size={13}><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></Svg>
                        Refresh
                    </button>
                    <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:'8px', padding:'8px 14px', fontSize:'12px', fontWeight:600, color:'#0F7B6C', display:'flex', alignItems:'center', gap:'6px' }}>
                        <span style={{ width:'7px', height:'7px', background:'#10b981', borderRadius:'50%', display:'inline-block', boxShadow:'0 0 6px #10b981' }}/>
                        MongoDB Live
                    </div>
                </div>
            </div>

            {/* ── Stats ── */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'20px' }}>
                {tabs.map(t => (
                    <div key={t.id} style={{ background:'white', borderRadius:'12px', border:'1px solid #e2e8f0', padding:'16px', textAlign:'center', boxShadow:'0 2px 6px rgba(0,0,0,0.04)' }}>
                        <div style={{ fontSize:'28px', fontWeight:700, color:'#1B2B4B', fontFamily:"'DM Mono',monospace" }}>{t.count}</div>
                        <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'2px' }}>{t.label}</div>
                    </div>
                ))}
            </div>

            {/* ── Tabs ── */}
            <div style={{ display:'flex', gap:'4px', background:'#f1f5f9', borderRadius:'12px', padding:'4px', marginBottom:'20px' }}>
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id as any)}
                            style={{ flex:1, padding:'10px', borderRadius:'9px', border:'none', fontSize:'13px', fontWeight:600, background: activeTab===t.id ? 'white':'transparent', color: activeTab===t.id ? '#0F7B6C':'#64748b', boxShadow: activeTab===t.id ? '0 2px 8px rgba(0,0,0,0.08)':'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'all 0.18s' }}>
                        {t.label}{' '}
                        <span style={{ background: activeTab===t.id ? '#f0fdf4':'#e2e8f0', color: activeTab===t.id ? '#0F7B6C':'#94a3b8', borderRadius:'20px', padding:'1px 7px', fontSize:'11px', marginLeft:'4px' }}>{t.count}</span>
                    </button>
                ))}
            </div>

            {loading && (
                <div style={{ textAlign:'center', padding:'60px', color:'#94a3b8', fontSize:'14px' }}>
                    Loading from MongoDB...
                </div>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                STUDENTS TAB
            ══════════════════════════════════════════════════════════════════ */}
            {activeTab === 'users' && !loading && (
                <div style={{ animation:'adm-fade 0.3s ease' }}>

                    {/* Action buttons */}
                    <div style={{ display:'flex', justifyContent:'flex-end', gap:'8px', marginBottom:'12px' }}>
                        <button onClick={() => { setShowAddUser(!showAddUser); setShowEditUser(false); }}
                                style={{ background:'#0F7B6C', color:'white', border:'none', padding:'10px 18px', borderRadius:'9px', fontSize:'13px', fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' }}>
                            <Svg size={14} color="white"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>
                            Add Student
                        </button>
                    </div>

                    {/* ── Add Form ── */}
                    {showAddUser && (
                        <div style={{ background:'white', border:'1px solid #e2e8f0', borderRadius:'14px', padding:'22px', marginBottom:'16px', boxShadow:'0 4px 16px rgba(0,0,0,0.06)', animation:'adm-fade 0.3s ease' }}>
                            <div style={{ fontSize:'14px', fontWeight:700, color:'#0f172a', marginBottom:'16px' }}>Add New Student</div>
                            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'12px', marginBottom:'16px' }}>
                                {[
                                    { label:'Student ID *', key:'studentId', placeholder:'23549009054' },
                                    { label:'Full Name *',  key:'name',      placeholder:'Md. Student Name' },
                                    { label:'Email *',      key:'email',     placeholder:'student@bup.edu.bd' },
                                    { label:'Password *',   key:'password',  placeholder:'••••••••' },
                                    { label:'Phone',        key:'phone',     placeholder:'+880 17XX-XXXXXX' },
                                    { label:'Blood Group',  key:'bloodGroup',placeholder:'A+' },
                                    { label:'CGPA',         key:'cgpa',      placeholder:'3.50' },
                                ].map(f => (
                                    <div key={f.key}>
                                        <label style={labelCss}>{f.label}</label>
                                        <input type={f.key === 'password' ? 'password' : 'text'}
                                               placeholder={f.placeholder}
                                               value={(newUser as any)[f.key]}
                                               onChange={e => setNewUser({ ...newUser, [f.key]: e.target.value })}
                                               style={inputCss} />
                                    </div>
                                ))}
                                <div>
                                    <label style={labelCss}>Department</label>
                                    <select value={newUser.department} onChange={e => setNewUser({ ...newUser, department: e.target.value })} style={inputCss}>
                                        {deptOptions.map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={labelCss}>Year</label>
                                    <select value={newUser.year} onChange={e => setNewUser({ ...newUser, year: e.target.value })} style={inputCss}>
                                        {yearOptions.map(y => <option key={y}>{y}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={labelCss}>Semester</label>
                                    <select value={newUser.semester} onChange={e => setNewUser({ ...newUser, semester: e.target.value })} style={inputCss}>
                                        {semOptions.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div style={{ display:'flex', gap:'10px' }}>
                                <button onClick={addUser} style={{ background:'#0F7B6C', color:'white', border:'none', padding:'10px 20px', borderRadius:'8px', fontSize:'13px', fontWeight:600, cursor:'pointer' }}>
                                    Save Student
                                </button>
                                <button onClick={() => setShowAddUser(false)} style={{ background:'#f1f5f9', color:'#64748b', border:'1px solid #e2e8f0', padding:'10px 20px', borderRadius:'8px', fontSize:'13px', fontWeight:600, cursor:'pointer' }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── Edit Form ── */}
                    {showEditUser && (
                        <div style={{ background:'white', border:'1px solid #bfdbfe', borderRadius:'14px', padding:'22px', marginBottom:'16px', boxShadow:'0 4px 16px rgba(0,0,0,0.06)', animation:'adm-fade 0.3s ease' }}>
                            <div style={{ fontSize:'14px', fontWeight:700, color:'#0f172a', marginBottom:'16px' }}>Edit Student</div>
                            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'12px', marginBottom:'16px' }}>
                                {[
                                    { label:'Full Name',   key:'name',       placeholder:'Md. Student Name' },
                                    { label:'Email',       key:'email',      placeholder:'student@bup.edu.bd' },
                                    { label:'Phone',       key:'phone',      placeholder:'+880 17XX-XXXXXX' },
                                    { label:'Blood Group', key:'bloodGroup', placeholder:'A+' },
                                    { label:'CGPA',        key:'cgpa',       placeholder:'3.50' },
                                ].map(f => (
                                    <div key={f.key}>
                                        <label style={labelCss}>{f.label}</label>
                                        <input type="text"
                                               placeholder={f.placeholder}
                                               value={(editUser as any)[f.key]}
                                               onChange={e => setEditUser({ ...editUser, [f.key]: e.target.value })}
                                               style={inputCss} />
                                    </div>
                                ))}
                                <div>
                                    <label style={labelCss}>Department</label>
                                    <select value={editUser.department} onChange={e => setEditUser({ ...editUser, department: e.target.value })} style={inputCss}>
                                        {deptOptions.map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={labelCss}>Year</label>
                                    <select value={editUser.year} onChange={e => setEditUser({ ...editUser, year: e.target.value })} style={inputCss}>
                                        {yearOptions.map(y => <option key={y}>{y}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={labelCss}>Semester</label>
                                    <select value={editUser.semester} onChange={e => setEditUser({ ...editUser, semester: e.target.value })} style={inputCss}>
                                        {semOptions.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div style={{ display:'flex', gap:'10px' }}>
                                <button onClick={saveEditUser} style={{ background:'#1d4ed8', color:'white', border:'none', padding:'10px 20px', borderRadius:'8px', fontSize:'13px', fontWeight:600, cursor:'pointer' }}>
                                    Save Changes
                                </button>
                                <button onClick={() => { setShowEditUser(false); setEditingUserId(null); }} style={{ background:'#f1f5f9', color:'#64748b', border:'1px solid #e2e8f0', padding:'10px 20px', borderRadius:'8px', fontSize:'13px', fontWeight:600, cursor:'pointer' }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── Users Table ── */}
                    <div style={{ background:'white', borderRadius:'14px', border:'1px solid #e2e8f0', overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
                        <table style={{ width:'100%', borderCollapse:'collapse' }}>
                            <thead>
                            <tr style={{ background:'#f8fafc' }}>
                                {['Student ID','Name','Dept','Year','Semester','CGPA','Email','Actions'].map(h => (
                                    <th key={h} style={{ textAlign:'left', padding:'10px 14px', fontSize:'10px', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.8px', borderBottom:'1px solid #e2e8f0' }}>{h}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {users.length === 0 && (
                                <tr><td colSpan={8} style={{ padding:'50px', textAlign:'center', color:'#94a3b8', fontSize:'13px' }}>No students found. Add one above.</td></tr>
                            )}
                            {users.map((u, i) => (
                                <tr key={u._id} className="adm-tr" style={{ borderBottom: i < users.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                                    <td style={{ padding:'12px 14px', fontSize:'12px', fontFamily:"'DM Mono',monospace", color:'#0F7B6C', fontWeight:600 }}>{u.studentId}</td>
                                    <td style={{ padding:'12px 14px', fontSize:'13px', fontWeight:600, color:'#0f172a' }}>{u.name}</td>
                                    <td style={{ padding:'12px 14px', fontSize:'12px', color:'#64748b' }}>{u.department}</td>
                                    <td style={{ padding:'12px 14px', fontSize:'12px', color:'#64748b' }}>{u.year}</td>
                                    <td style={{ padding:'12px 14px', fontSize:'12px', color:'#64748b' }}>{u.semester}</td>
                                    <td style={{ padding:'12px 14px', fontSize:'13px', fontWeight:700, color:'#1B2B4B', fontFamily:"'DM Mono',monospace" }}>{u.cgpa || '—'}</td>
                                    <td style={{ padding:'12px 14px', fontSize:'12px', color:'#64748b' }}>{u.email}</td>
                                    <td style={{ padding:'12px 14px', display:'flex', gap:'6px' }}>
                                        <button className="adm-btn" onClick={() => openEditUser(u)}
                                                style={{ background:'#dbeafe', color:'#1d4ed8', border:'1px solid #bfdbfe', padding:'5px 12px', borderRadius:'7px', fontSize:'11px', fontWeight:600, cursor:'pointer' }}>
                                            Edit
                                        </button>
                                        <button className="adm-btn" onClick={() => deleteUser(u._id)}
                                                style={{ background:'#fee2e2', color:'#ef4444', border:'1px solid #fecaca', padding:'5px 12px', borderRadius:'7px', fontSize:'11px', fontWeight:600, cursor:'pointer' }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                COMPLAINTS TAB
            ══════════════════════════════════════════════════════════════════ */}
            {activeTab === 'complaints' && !loading && (
                <div style={{ background:'white', borderRadius:'14px', border:'1px solid #e2e8f0', overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', animation:'adm-fade 0.3s ease' }}>
                    <table style={{ width:'100%', borderCollapse:'collapse' }}>
                        <thead>
                        <tr style={{ background:'#f8fafc' }}>
                            {['Ref ID','Student','Category','Subject','Type','Status','Action'].map(h => (
                                <th key={h} style={{ textAlign:'left', padding:'10px 14px', fontSize:'10px', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.8px', borderBottom:'1px solid #e2e8f0' }}>{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {complaints.length === 0 && (
                            <tr><td colSpan={7} style={{ padding:'50px', textAlign:'center', color:'#94a3b8', fontSize:'13px' }}>No complaints yet.</td></tr>
                        )}
                        {complaints.map((c, i) => {
                            const sc = statusColor[c.status] || { bg:'#f1f5f9', c:'#64748b' };
                            return (
                                <tr key={c._id} className="adm-tr" style={{ borderBottom: i < complaints.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                                    <td style={{ padding:'12px 14px', fontSize:'11px', fontFamily:"'DM Mono',monospace", color:'#0F7B6C', fontWeight:600 }}>{c.referenceCode}</td>
                                    <td style={{ padding:'12px 14px', fontSize:'12px', color:'#64748b', fontFamily:"'DM Mono',monospace" }}>{c.studentId || '—'}</td>
                                    <td style={{ padding:'12px 14px', fontSize:'12px', color:'#64748b' }}>{c.category}</td>
                                    <td style={{ padding:'12px 14px', fontSize:'13px', fontWeight:500, color:'#0f172a', maxWidth:'180px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.subject}</td>
                                    <td style={{ padding:'12px 14px' }}>
                                            <span style={{ background: c.anonymous ? '#fee2e2':'#dbeafe', color: c.anonymous ? '#ef4444':'#1d4ed8', padding:'3px 9px', borderRadius:'6px', fontSize:'10px', fontWeight:700 }}>
                                                {c.anonymous ? 'Anonymous' : 'Named'}
                                            </span>
                                    </td>
                                    <td style={{ padding:'12px 14px' }}>
                                        <select value={c.status} onChange={e => updateComplaintStatus(c._id, e.target.value)}
                                                style={{ background: sc.bg, color: sc.c, border:`1px solid ${sc.bg}`, padding:'4px 8px', borderRadius:'6px', fontSize:'11px', fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", outline:'none' }}>
                                            <option value="pending">Pending</option>
                                            <option value="in-review">In Review</option>
                                            <option value="resolved">Resolved</option>
                                        </select>
                                    </td>
                                    <td style={{ padding:'12px 14px' }}>
                                        <button className="adm-btn" onClick={() => deleteComplaint(c._id)}
                                                style={{ background:'#fee2e2', color:'#ef4444', border:'1px solid #fecaca', padding:'5px 12px', borderRadius:'7px', fontSize:'11px', fontWeight:600, cursor:'pointer' }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                LOST & FOUND TAB
            ══════════════════════════════════════════════════════════════════ */}
            {activeTab === 'lostfound' && !loading && (
                <div style={{ background:'white', borderRadius:'14px', border:'1px solid #e2e8f0', overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', animation:'adm-fade 0.3s ease' }}>
                    <table style={{ width:'100%', borderCollapse:'collapse' }}>
                        <thead>
                        <tr style={{ background:'#f8fafc' }}>
                            {['Item','Status','Location','Contact','Date','Action'].map(h => (
                                <th key={h} style={{ textAlign:'left', padding:'10px 14px', fontSize:'10px', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.8px', borderBottom:'1px solid #e2e8f0' }}>{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {lostItems.length === 0 && (
                            <tr><td colSpan={6} style={{ padding:'50px', textAlign:'center', color:'#94a3b8', fontSize:'13px' }}>No lost & found items yet.</td></tr>
                        )}
                        {lostItems.map((item, i) => (
                            <tr key={item._id} className="adm-tr" style={{ borderBottom: i < lostItems.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                                <td style={{ padding:'12px 14px' }}>
                                    <div style={{ fontSize:'13px', fontWeight:600, color:'#0f172a' }}>{item.itemName}</div>
                                    <div style={{ fontSize:'11px', color:'#94a3b8', marginTop:'2px' }}>{item.description}</div>
                                </td>
                                <td style={{ padding:'12px 14px' }}>
                                        <span style={{ background: item.status === 'lost' ? '#fee2e2':'#f0fdf4', color: item.status === 'lost' ? '#ef4444':'#0F7B6C', padding:'3px 9px', borderRadius:'6px', fontSize:'11px', fontWeight:700, textTransform:'capitalize' }}>
                                            {item.status}
                                        </span>
                                </td>
                                <td style={{ padding:'12px 14px', fontSize:'12px', color:'#64748b' }}>{item.location}</td>
                                <td style={{ padding:'12px 14px', fontSize:'12px', color:'#64748b', fontFamily:"'DM Mono',monospace" }}>{item.contactPhone}</td>
                                <td style={{ padding:'12px 14px', fontSize:'12px', color:'#94a3b8' }}>{item.date ? new Date(item.date).toLocaleDateString() : '—'}</td>
                                <td style={{ padding:'12px 14px' }}>
                                    <button className="adm-btn" onClick={() => deleteLostItem(item._id)}
                                            style={{ background:'#fee2e2', color:'#ef4444', border:'1px solid #fecaca', padding:'5px 12px', borderRadius:'7px', fontSize:'11px', fontWeight:600, cursor:'pointer' }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                APPOINTMENTS TAB
            ══════════════════════════════════════════════════════════════════ */}
            {activeTab === 'appointments' && !loading && (
                <div style={{ background:'white', borderRadius:'14px', border:'1px solid #e2e8f0', overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', animation:'adm-fade 0.3s ease' }}>
                    <table style={{ width:'100%', borderCollapse:'collapse' }}>
                        <thead>
                        <tr style={{ background:'#f8fafc' }}>
                            {['Student ID','Session Type','Date','Time','Notes','Status','Action'].map(h => (
                                <th key={h} style={{ textAlign:'left', padding:'10px 14px', fontSize:'10px', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.8px', borderBottom:'1px solid #e2e8f0' }}>{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {appointments.length === 0 && (
                            <tr><td colSpan={7} style={{ padding:'50px', textAlign:'center', color:'#94a3b8', fontSize:'13px' }}>No appointments yet.</td></tr>
                        )}
                        {appointments.map((a, i) => {
                            const sc = statusColor[a.status] || { bg:'#f1f5f9', c:'#64748b' };
                            return (
                                <tr key={a._id} className="adm-tr" style={{ borderBottom: i < appointments.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                                    <td style={{ padding:'12px 14px', fontSize:'12px', fontFamily:"'DM Mono',monospace", color:'#0F7B6C' }}>{a.studentId}</td>
                                    <td style={{ padding:'12px 14px', fontSize:'13px', fontWeight:500, color:'#0f172a' }}>{a.sessionType}</td>
                                    <td style={{ padding:'12px 14px', fontSize:'12px', color:'#64748b' }}>{a.date ? new Date(a.date).toLocaleDateString() : '—'}</td>
                                    <td style={{ padding:'12px 14px', fontSize:'12px', color:'#64748b', fontFamily:"'DM Mono',monospace" }}>{a.time}</td>
                                    <td style={{ padding:'12px 14px', fontSize:'12px', color:'#94a3b8', maxWidth:'150px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{a.notes || '—'}</td>
                                    <td style={{ padding:'12px 14px' }}>
                                            <span style={{ background: sc.bg, color: sc.c, padding:'3px 9px', borderRadius:'6px', fontSize:'11px', fontWeight:700, textTransform:'capitalize' }}>
                                                {a.status}
                                            </span>
                                    </td>
                                    <td style={{ padding:'12px 14px' }}>
                                        <button className="adm-btn" onClick={() => deleteAppointment(a._id)}
                                                style={{ background:'#fee2e2', color:'#ef4444', border:'1px solid #fecaca', padding:'5px 12px', borderRadius:'7px', fontSize:'11px', fontWeight:600, cursor:'pointer' }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}