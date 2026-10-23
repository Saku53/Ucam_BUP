import React, { useState } from 'react';

const G = {
    bg:'#f9fafb',surface:'#ffffff',border:'#e5e7eb',shadow:'0 1px 4px rgba(0,0,0,0.06)',
    accent:'#059669',accentHover:'#047857',accentLight:'#f0fdf9',accentBorder:'#d1fae5',accentMid:'#6ee7b7',
    textPrimary:'#111827',textSecondary:'#374151',textMuted:'#6b7280',textPlaceholder:'#9ca3af',
    divider:'#f3f4f6',danger:'#dc2626',dangerBg:'#fef2f2',dangerBorder:'#fecaca',
    warning:'#d97706',warningBg:'#fffbeb',warningBorder:'#fde68a',
    info:'#2563eb',infoBg:'#eff6ff',infoBorder:'#bfdbfe',
};

const STATUS_MAP: Record<string,{bg:string,c:string,border:string,label:string}> = {
    pending:   { bg:G.warningBg,   c:G.warning, border:G.warningBorder, label:'Pending'   },
    reviewing: { bg:G.infoBg,      c:G.info,    border:G.infoBorder,    label:'Reviewing' },
    resolved:  { bg:G.accentLight, c:G.accent,  border:G.accentBorder,  label:'Resolved'  },
    rejected:  { bg:G.dangerBg,    c:G.danger,  border:G.dangerBorder,  label:'Rejected'  },
};

const CATS = ['Academic','Facility','Staff Conduct','Administrative','Harassment','Other'];

const IC = {
    plus: (
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
    ),
    arrowLeft: (
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
    ),
    warning: (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
    ),
    checkCircleLg: (
        <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
    ),
    inbox: (
        <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
            <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
        </svg>
    ),
    clock: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
    ),
    calendar: (
        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
    ),
    tag: (
        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
    ),
    statsTotal: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
            <rect x="8" y="2" width="8" height="4" rx="1"/>
            <line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>
        </svg>
    ),
    statsPending: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
    ),
    statsReviewing: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
    ),
    statsResolved: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
    ),
    chevronRight: (
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6"/>
        </svg>
    ),
};

export default function ComplaintBox() {
    const [tab, setTab]             = useState<'my'|'new'>('my');
    const [submitted, setSubmitted] = useState(false);
    const [selected, setSelected]   = useState<any>(null);
    const [form, setForm]           = useState({ cat:'Academic', subject:'', desc:'', anonymous:false });
    const [complaints, setComplaints] = useState([
        { id:'CMP-2025-041', cat:'Academic',       subject:'Unfair grading in CSE-403 midterm',  date:'Apr 2, 2025',  status:'reviewing', desc:'I believe my midterm paper was graded unfairly. My answer for question 3 was correct but received 0 marks. I would like a re-evaluation.',  response:'Your complaint has been forwarded to the relevant faculty. Please expect a response within 5 working days.' },
        { id:'CMP-2025-038', cat:'Facility',       subject:'AC not working in Classroom 302',    date:'Mar 28, 2025', status:'resolved',   desc:'The air conditioning unit in classroom 302 AC has been non-functional for 3 weeks.',                                                         response:'The AC unit has been repaired. Thank you for reporting.' },
        { id:'CMP-2025-031', cat:'Administrative', subject:'Delay in result publication',         date:'Mar 15, 2025', status:'pending',    desc:'The CSE-401 midterm results were supposed to be published 2 weeks ago.',                                                                    response:'' },
    ]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newComp = {
            id: `CMP-2025-0${50 + complaints.length}`,
            cat: form.cat, subject: form.subject,
            date: new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }),
            status: 'pending', desc: form.desc, response: '',
        };
        setComplaints(prev => [newComp, ...prev]);
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); setTab('my'); setForm({ cat:'Academic', subject:'', desc:'', anonymous:false }); }, 2500);
    };

    const inputStyle = { width:'100%', padding:'10px 13px', border:`1.5px solid ${G.border}`, borderRadius:'9px', fontSize:'13px', background:'#f9fafb', color:G.textPrimary, fontFamily:"'DM Sans',sans-serif", boxSizing:'border-box' as const, transition:'all 0.18s', outline:'none' };

    return (
        <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif", color:G.textPrimary, animation:'cb-fade 0.3s ease both' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        @keyframes cb-fade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .cb-inp:focus { border-color:${G.accentMid}!important; background:${G.accentLight}!important; }
        .cb-tab { transition:all 0.18s ease; cursor:pointer; border:none; font-family:'DM Sans',sans-serif; }
        .cb-card:hover { border-color:${G.accentMid}!important; box-shadow:0 4px 16px rgba(5,150,105,0.08)!important; }
        .cb-btn:hover { background:#047857!important; box-shadow:0 6px 20px rgba(5,150,105,0.45)!important; }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#d1fae5;border-radius:4px}
      `}</style>

            {/* Header */}
            <div style={{ marginBottom:'22px', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                <div>
                    <h1 style={{ fontSize:'20px', fontWeight:700, color:G.textPrimary, margin:0 }}>Complaint Box</h1>
                    <p style={{ fontSize:'13px', color:G.textMuted, marginTop:'4px' }}>Submit and track your complaints confidentially</p>
                </div>
                <button className="cb-btn" onClick={() => setTab(tab === 'my' ? 'new' : 'my')}
                        style={{ background:G.accent, color:'white', border:'none', padding:'10px 20px', borderRadius:'10px', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", boxShadow:'0 4px 14px rgba(5,150,105,0.35)', transition:'all 0.18s', display:'flex', alignItems:'center', gap:'7px' }}>
                    {tab === 'my' ? <>{IC.plus} New Complaint</> : <>{IC.arrowLeft} My Complaints</>}
                </button>
            </div>

            {/* Stats */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'20px' }}>
                {[
                    { label:'Total Filed', value:complaints.length,                                           icon:IC.statsTotal,     bg:G.surface,      c:G.textPrimary, b:G.border         },
                    { label:'Pending',     value:complaints.filter(c=>c.status==='pending').length,            icon:IC.statsPending,   bg:G.warningBg,    c:G.warning,     b:G.warningBorder  },
                    { label:'Reviewing',   value:complaints.filter(c=>c.status==='reviewing').length,          icon:IC.statsReviewing, bg:G.infoBg,       c:G.info,        b:G.infoBorder     },
                    { label:'Resolved',    value:complaints.filter(c=>c.status==='resolved').length,           icon:IC.statsResolved,  bg:G.accentLight,  c:G.accent,      b:G.accentBorder   },
                ].map((s, i) => (
                    <div key={i} style={{ background:s.bg, border:`1px solid ${s.b}`, borderRadius:'12px', padding:'14px 16px' }}>
                        <div style={{ color:s.c, marginBottom:'8px', display:'flex' }}>{s.icon}</div>
                        <div style={{ fontSize:'22px', fontWeight:700, color:s.c, fontFamily:"'DM Mono',monospace" }}>{s.value}</div>
                        <div style={{ fontSize:'11px', color:G.textMuted, fontWeight:500, marginTop:'2px' }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* MY COMPLAINTS LIST */}
            {tab === 'my' && !selected && (
                <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                    {complaints.map(c => {
                        const sm = STATUS_MAP[c.status];
                        return (
                            <div key={c.id} className="cb-card" onClick={() => setSelected(c)}
                                 style={{ background:G.surface, border:`1px solid ${G.border}`, borderRadius:'14px', padding:'18px 22px', boxShadow:G.shadow, cursor:'pointer', transition:'all 0.18s' }}>
                                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                                    <div style={{ flex:1 }}>
                                        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px', flexWrap:'wrap' }}>
                                            <span style={{ background:G.bg, border:`1px solid ${G.border}`, color:G.textMuted, padding:'2px 9px', borderRadius:'6px', fontSize:'10px', fontWeight:700, fontFamily:"'DM Mono',monospace" }}>{c.id}</span>
                                            <span style={{ background:sm.bg, color:sm.c, border:`1px solid ${sm.border}`, borderRadius:'6px', fontSize:'10px', fontWeight:700, padding:'2px 8px' }}>{sm.label}</span>
                                            <span style={{ background:'#f3f4f6', color:G.textMuted, borderRadius:'6px', fontSize:'10px', fontWeight:600, padding:'2px 8px' }}>{c.cat}</span>
                                        </div>
                                        <div style={{ fontSize:'14px', fontWeight:600, color:G.textPrimary, marginBottom:'4px' }}>{c.subject}</div>
                                        <div style={{ fontSize:'12px', color:G.textMuted, lineHeight:1.4, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as any, overflow:'hidden' }}>{c.desc}</div>
                                    </div>
                                    <div style={{ textAlign:'right', flexShrink:0, marginLeft:'16px', display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'6px' }}>
                                        <div style={{ fontSize:'11px', color:G.textMuted, fontFamily:"'DM Mono',monospace" }}>{c.date}</div>
                                        {c.response && (
                                            <div style={{ fontSize:'10px', color:G.accent, background:G.accentLight, border:`1px solid ${G.accentBorder}`, borderRadius:'5px', padding:'2px 7px' }}>
                                                Response received
                                            </div>
                                        )}
                                        <span style={{ color:G.textPlaceholder, display:'flex' }}>{IC.chevronRight}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {complaints.length === 0 && (
                        <div style={{ textAlign:'center', padding:'48px', color:G.textMuted, background:G.surface, border:`1px solid ${G.border}`, borderRadius:'14px' }}>
                            <div style={{ color:G.textPlaceholder, display:'flex', justifyContent:'center', marginBottom:'12px' }}>{IC.inbox}</div>
                            <div style={{ fontWeight:600, color:G.textSecondary }}>No complaints filed yet</div>
                            <div style={{ fontSize:'13px', marginTop:'6px' }}>Use the button above to file your first complaint</div>
                        </div>
                    )}
                </div>
            )}

            {/* COMPLAINT DETAIL */}
            {tab === 'my' && selected && (
                <div style={{ background:G.surface, border:`1px solid ${G.border}`, borderRadius:'14px', boxShadow:G.shadow, overflow:'hidden', animation:'cb-fade 0.25s ease' }}>
                    <div style={{ padding:'18px 22px', borderBottom:`1px solid ${G.divider}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <div>
                            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px' }}>
                                <span style={{ background:G.bg, border:`1px solid ${G.border}`, color:G.textMuted, padding:'2px 9px', borderRadius:'6px', fontSize:'10px', fontWeight:700, fontFamily:"'DM Mono',monospace" }}>{selected.id}</span>
                                <span style={{ background:STATUS_MAP[selected.status].bg, color:STATUS_MAP[selected.status].c, border:`1px solid ${STATUS_MAP[selected.status].border}`, borderRadius:'6px', fontSize:'10px', fontWeight:700, padding:'2px 8px' }}>{STATUS_MAP[selected.status].label}</span>
                            </div>
                            <div style={{ fontSize:'15px', fontWeight:700, color:G.textPrimary }}>{selected.subject}</div>
                        </div>
                        <button onClick={() => setSelected(null)}
                                style={{ background:G.bg, border:`1px solid ${G.border}`, color:G.textMuted, padding:'6px 14px', borderRadius:'8px', fontSize:'12px', fontWeight:500, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", display:'flex', alignItems:'center', gap:'6px' }}>
                            {IC.arrowLeft} Back
                        </button>
                    </div>

                    <div style={{ padding:'22px' }}>
                        <div style={{ marginBottom:'18px' }}>
                            <div style={{ fontSize:'11px', fontWeight:700, color:G.textPlaceholder, textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:'8px' }}>Your Complaint</div>
                            <div style={{ background:'#f9fafb', border:`1px solid ${G.border}`, borderRadius:'10px', padding:'14px 16px', fontSize:'13px', color:G.textSecondary, lineHeight:1.6 }}>{selected.desc}</div>
                        </div>

                        <div style={{ display:'flex', gap:'16px', fontSize:'12px', color:G.textMuted, marginBottom:'18px', flexWrap:'wrap' }}>
              <span style={{ display:'flex', alignItems:'center', gap:'5px', fontFamily:"'DM Mono',monospace" }}>
                <span style={{ display:'flex', color:G.textPlaceholder }}>{IC.calendar}</span>
                Filed: {selected.date}
              </span>
                            <span style={{ display:'flex', alignItems:'center', gap:'5px', fontFamily:"'DM Mono',monospace" }}>
                <span style={{ display:'flex', color:G.textPlaceholder }}>{IC.tag}</span>
                                {selected.cat}
              </span>
                        </div>

                        {selected.response ? (
                            <div>
                                <div style={{ fontSize:'11px', fontWeight:700, color:G.textPlaceholder, textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:'8px' }}>Official Response</div>
                                <div style={{ background:G.accentLight, border:`1px solid ${G.accentBorder}`, borderRadius:'10px', padding:'14px 16px' }}>
                                    <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
                                        <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:G.accent, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', color:'white', fontWeight:700, flexShrink:0 }}>A</div>
                                        <span style={{ fontSize:'12px', fontWeight:600, color:G.accent }}>Administration</span>
                                    </div>
                                    <div style={{ fontSize:'13px', color:G.textSecondary, lineHeight:1.6 }}>{selected.response}</div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ background:'#f9fafb', border:`1px solid ${G.border}`, borderRadius:'10px', padding:'16px', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', color:G.textMuted }}>
                                <span style={{ display:'flex', color:G.textPlaceholder }}>{IC.clock}</span>
                                <span style={{ fontSize:'13px' }}>Awaiting response from administration</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* NEW COMPLAINT FORM */}
            {tab === 'new' && (submitted ? (
                <div style={{ background:G.accentLight, border:`1px solid ${G.accentBorder}`, borderRadius:'14px', padding:'48px', textAlign:'center' }}>
                    <div style={{ color:G.accent, display:'flex', justifyContent:'center', marginBottom:'14px' }}>{IC.checkCircleLg}</div>
                    <div style={{ fontSize:'18px', fontWeight:700, color:G.accent, marginBottom:'6px' }}>Complaint Submitted!</div>
                    <div style={{ fontSize:'13px', color:G.textMuted }}>Your complaint has been filed. You can track its status in My Complaints.</div>
                </div>
            ) : (
                <div style={{ background:G.surface, border:`1px solid ${G.border}`, borderRadius:'14px', boxShadow:G.shadow, overflow:'hidden' }}>
                    <div style={{ padding:'18px 22px', borderBottom:`1px solid ${G.divider}` }}>
                        <div style={{ fontSize:'14px', fontWeight:700, color:G.textPrimary }}>File a New Complaint</div>
                        <div style={{ fontSize:'12px', color:G.textMuted, marginTop:'2px' }}>All complaints are handled confidentially</div>
                    </div>
                    <form onSubmit={handleSubmit} style={{ padding:'22px' }}>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'14px' }}>
                            <div>
                                <label style={{ fontSize:'11px', fontWeight:700, color:G.textPlaceholder, display:'block', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.8px' }}>Category</label>
                                <select value={form.cat} onChange={e => setForm({...form, cat:e.target.value})} style={inputStyle}>
                                    {CATS.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize:'11px', fontWeight:700, color:G.textPlaceholder, display:'block', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.8px' }}>Subject</label>
                                <input className="cb-inp" type="text" required placeholder="Brief subject line" value={form.subject} onChange={e => setForm({...form, subject:e.target.value})} style={inputStyle}/>
                            </div>
                        </div>

                        <div style={{ marginBottom:'14px' }}>
                            <label style={{ fontSize:'11px', fontWeight:700, color:G.textPlaceholder, display:'block', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.8px' }}>Detailed Description</label>
                            <textarea className="cb-inp" required placeholder="Describe the issue in detail. Include dates, names, and any relevant information..." value={form.desc} onChange={e => setForm({...form, desc:e.target.value})} rows={5}
                                      style={{ ...inputStyle, resize:'vertical' }}/>
                        </div>

                        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px', padding:'12px 14px', background:'#f9fafb', border:`1px solid ${G.border}`, borderRadius:'9px' }}>
                            <input type="checkbox" id="anon" checked={form.anonymous} onChange={e => setForm({...form, anonymous:e.target.checked})} style={{ width:'16px', height:'16px', accentColor:G.accent }}/>
                            <label htmlFor="anon" style={{ fontSize:'13px', color:G.textSecondary, cursor:'pointer' }}>
                                Submit anonymously <span style={{ fontSize:'12px', color:G.textMuted }}>(your name will not be shown to staff)</span>
                            </label>
                        </div>

                        <div style={{ background:G.warningBg, border:`1px solid ${G.warningBorder}`, borderRadius:'9px', padding:'12px 14px', marginBottom:'18px', display:'flex', gap:'10px', alignItems:'flex-start' }}>
                            <span style={{ display:'flex', color:G.warning, flexShrink:0, marginTop:'1px' }}>{IC.warning}</span>
                            <div style={{ fontSize:'12px', color:G.warning, lineHeight:1.5 }}>False or malicious complaints may result in disciplinary action. Please ensure all information is accurate.</div>
                        </div>

                        <button type="submit" className="cb-btn"
                                style={{ width:'100%', background:G.accent, color:'white', border:'none', padding:'13px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", boxShadow:'0 4px 14px rgba(5,150,105,0.35)', transition:'all 0.18s' }}>
                            Submit Complaint
                        </button>
                    </form>
                </div>
            ))}
        </div>
    );
}