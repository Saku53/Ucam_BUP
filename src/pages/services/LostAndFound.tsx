import React, { useState } from 'react';

const G = {
    bg:'#f9fafb',surface:'#ffffff',border:'#e5e7eb',shadow:'0 1px 4px rgba(0,0,0,0.06)',
    accent:'#059669',accentHover:'#047857',accentLight:'#f0fdf9',accentBorder:'#d1fae5',accentMid:'#6ee7b7',
    textPrimary:'#111827',textSecondary:'#374151',textMuted:'#6b7280',textPlaceholder:'#9ca3af',
    divider:'#f3f4f6',danger:'#dc2626',dangerBg:'#fef2f2',dangerBorder:'#fecaca',
    warning:'#d97706',warningBg:'#fffbeb',warningBorder:'#fde68a',
    info:'#2563eb',infoBg:'#eff6ff',infoBorder:'#bfdbfe',
};

const CATS = ['All','Electronics','Stationery','ID/Card','Clothing','Books','Other'];

const IC = {
    search: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    electronics: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    stationery: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>,
    idcard: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="9" cy="12" r="2"/><path d="M15 10h2M15 14h2M9 16c-1.5 0-4 .5-4 1.5V18h8v-.5c0-1-2.5-1.5-4-1.5z"/></svg>,
    clothing: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg>,
    books: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    other: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    mappin: <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    calendar: <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    phone: <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6.29 6.29l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    clipboardList: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>,
    searchLg: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    checkCircle: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    checkCircleLg: <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    searchEmpty: <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    plus: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    arrowLeft: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
    warning: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    check: <svg width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
    inbox: <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
};

const CAT_ICON: Record<string, JSX.Element> = {
    Electronics: IC.electronics,
    Stationery:  IC.stationery,
    'ID/Card':   IC.idcard,
    Clothing:    IC.clothing,
    Books:       IC.books,
    Other:       IC.other,
};

type Item = { id: number; type: 'lost'|'found'; title: string; cat: string; location: string; date: string; desc: string; contact: string; resolved: boolean; };

export default function LostFound() {
    const [tab, setTab]           = useState<'browse'|'report'>('browse');
    const [filter, setFilter]     = useState<'all'|'lost'|'found'>('all');
    const [cat, setCat]           = useState('All');
    const [search, setSearch]     = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm]         = useState({ type:'lost', title:'', cat:'Electronics', location:'', date:'', desc:'', contact:'' });
    const [items, setItems]       = useState<Item[]>([
        { id:1, type:'lost',  title:'Black HP Laptop',       cat:'Electronics', location:'Library 2nd Floor', date:'Apr 3', desc:'HP Pavilion 15, black color, sticker on lid. Left near study table.',       contact:'01712-000001', resolved:false },
        { id:2, type:'found', title:'Student ID Card',       cat:'ID/Card',     location:'Cafeteria',         date:'Apr 4', desc:'Found an ID card near the entrance. Name partially visible.',               contact:'01712-000002', resolved:false },
        { id:3, type:'lost',  title:'Blue Water Bottle',     cat:'Other',       location:'Classroom 302 AC',  date:'Apr 2', desc:'Blue metal bottle with BUP sticker.',                                       contact:'01712-000003', resolved:false },
        { id:4, type:'found', title:'Wireless Earbuds Case', cat:'Electronics', location:'Sports Ground',     date:'Apr 1', desc:'White case, no earbuds inside. Brand: JBL.',                                contact:'01712-000004', resolved:true  },
        { id:5, type:'lost',  title:'Calculus Textbook',     cat:'Books',       location:'Lab 104',           date:'Mar 31',desc:'Thomas Calculus 13th edition, name written inside cover.',                  contact:'01712-000005', resolved:false },
        { id:6, type:'found', title:'Black Backpack',        cat:'Other',       location:'Main Gate',         date:'Mar 30',desc:'Medium sized black backpack, contains notebooks.',                          contact:'01712-000006', resolved:false },
    ]);

    const filtered = items.filter(i => {
        if (filter === 'lost'  && i.type !== 'lost')  return false;
        if (filter === 'found' && i.type !== 'found') return false;
        if (cat !== 'All' && i.cat !== cat)           return false;
        if (search && !i.title.toLowerCase().includes(search.toLowerCase()) && !i.location.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setItems(prev => [{ ...form as any, id: Date.now(), resolved: false }, ...prev]);
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); setTab('browse'); setForm({ type:'lost', title:'', cat:'Electronics', location:'', date:'', desc:'', contact:'' }); }, 2500);
    };

    const inputStyle = { width:'100%', padding:'10px 13px', border:`1.5px solid ${G.border}`, borderRadius:'9px', fontSize:'13px', background:'#f9fafb', color:G.textPrimary, fontFamily:"'DM Sans',sans-serif", boxSizing:'border-box' as const, transition:'all 0.18s', outline:'none' };

    return (
        <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif", color:G.textPrimary, animation:'lf-fade 0.3s ease both' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        @keyframes lf-fade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .lf-inp:focus { border-color:${G.accentMid}!important; background:${G.accentLight}!important; }
        .lf-tab { transition:all 0.18s ease; cursor:pointer; border:none; font-family:'DM Sans',sans-serif; }
        .lf-card:hover { border-color:${G.accentMid}!important; box-shadow:0 4px 16px rgba(5,150,105,0.08)!important; }
        .lf-cat { transition:all 0.15s ease; cursor:pointer; border:none; font-family:'DM Sans',sans-serif; }
        .lf-cat:hover { background:${G.accentLight}!important; color:${G.accent}!important; border-color:${G.accentBorder}!important; }
        .lf-btn:hover { background:#047857!important; box-shadow:0 6px 20px rgba(5,150,105,0.45)!important; }
        .lf-contact:hover { background:${G.accentLight}!important; border-color:${G.accentBorder}!important; }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#d1fae5;border-radius:4px}
      `}</style>

            {/* Header */}
            <div style={{ marginBottom:'22px', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                <div>
                    <h1 style={{ fontSize:'20px', fontWeight:700, color:G.textPrimary, margin:0 }}>Lost & Found</h1>
                    <p style={{ fontSize:'13px', color:G.textMuted, marginTop:'4px' }}>Report missing items or help others find theirs</p>
                </div>
                <button className="lf-btn" onClick={() => setTab(tab === 'browse' ? 'report' : 'browse')}
                        style={{ background:G.accent, color:'white', border:'none', padding:'10px 18px', borderRadius:'10px', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", boxShadow:'0 4px 14px rgba(5,150,105,0.35)', transition:'all 0.18s', display:'flex', alignItems:'center', gap:'7px' }}>
                    {tab === 'browse' ? <>{IC.plus} Report Item</> : <>{IC.arrowLeft} Browse Items</>}
                </button>
            </div>

            {/* Stats */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px', marginBottom:'20px' }}>
                {[
                    { label:'Total Reports', value:items.length,                                        icon:IC.clipboardList, c:G.accent,  bg:G.accentLight, b:G.accentBorder  },
                    { label:'Lost Items',    value:items.filter(i=>i.type==='lost'&&!i.resolved).length, icon:IC.searchLg,      c:G.warning, bg:G.warningBg,   b:G.warningBorder },
                    { label:'Found Items',   value:items.filter(i=>i.type==='found'&&!i.resolved).length,icon:IC.checkCircle,   c:G.info,    bg:G.infoBg,      b:G.infoBorder    },
                ].map((s, i) => (
                    <div key={i} style={{ background:s.bg, border:`1px solid ${s.b}`, borderRadius:'12px', padding:'14px 18px' }}>
                        <div style={{ color:s.c, marginBottom:'8px', display:'flex' }}>{s.icon}</div>
                        <div style={{ fontSize:'22px', fontWeight:700, color:s.c, fontFamily:"'DM Mono',monospace" }}>{s.value}</div>
                        <div style={{ fontSize:'11px', color:G.textMuted, fontWeight:500, marginTop:'2px' }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {tab === 'browse' ? (
                <>
                    {/* Filter bar */}
                    <div style={{ display:'flex', gap:'12px', marginBottom:'16px', alignItems:'center', flexWrap:'wrap' }}>
                        <div style={{ display:'flex', gap:'4px', background:'#f3f4f6', borderRadius:'10px', padding:'4px' }}>
                            {(['all','lost','found'] as const).map(f => (
                                <button key={f} className="lf-tab" onClick={() => setFilter(f)}
                                        style={{ padding:'7px 16px', borderRadius:'8px', fontSize:'12.5px', fontWeight:filter===f?600:400, background:filter===f?G.surface:'transparent', color:filter===f?G.accent:G.textMuted, boxShadow:filter===f?G.shadow:'none', textTransform:'capitalize' }}>
                                    {f === 'all' ? 'All Items' : f === 'lost' ? 'Lost' : 'Found'}
                                </button>
                            ))}
                        </div>
                        <div style={{ position:'relative', flex:1, maxWidth:'280px' }}>
                            <span style={{ position:'absolute', left:'11px', top:'50%', transform:'translateY(-50%)', color:G.textPlaceholder, display:'flex' }}>{IC.search}</span>
                            <input className="lf-inp" type="text" placeholder="Search items or location..." value={search} onChange={e => setSearch(e.target.value)}
                                   style={{ ...inputStyle, paddingLeft:'32px' }}/>
                        </div>
                    </div>

                    {/* Category pills */}
                    <div style={{ display:'flex', gap:'6px', marginBottom:'18px', flexWrap:'wrap' }}>
                        {CATS.map(c => (
                            <button key={c} className="lf-cat" onClick={() => setCat(c)}
                                    style={{ background:cat===c?G.accentLight:G.surface, color:cat===c?G.accent:G.textMuted, border:`1px solid ${cat===c?G.accentBorder:G.border}`, padding:'5px 13px', borderRadius:'20px', fontSize:'12px', fontWeight:cat===c?600:400, display:'flex', alignItems:'center', gap:'5px' }}>
                                {c !== 'All' && CAT_ICON[c] && (
                                    <span style={{ display:'flex', color:cat===c?G.accent:G.textPlaceholder }}>{CAT_ICON[c]}</span>
                                )}
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Cards grid */}
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'12px' }}>
                        {filtered.map(item => (
                            <div key={item.id} className="lf-card"
                                 style={{ background:G.surface, border:`1px solid ${G.border}`, borderRadius:'14px', padding:'18px 20px', boxShadow:G.shadow, transition:'all 0.18s', opacity:item.resolved?0.6:1 }}>
                                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'10px' }}>
                                    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                                        <div style={{ width:'36px', height:'36px', borderRadius:'9px', background:item.type==='lost'?G.warningBg:G.accentLight, display:'flex', alignItems:'center', justifyContent:'center', color:item.type==='lost'?G.warning:G.accent, flexShrink:0 }}>
                                            {CAT_ICON[item.cat] || IC.other}
                                        </div>
                                        <div>
                                            <div style={{ fontSize:'13px', fontWeight:600, color:G.textPrimary }}>{item.title}</div>
                                            <div style={{ fontSize:'11px', color:G.textMuted, marginTop:'2px', display:'flex', alignItems:'center', gap:'4px', fontFamily:"'DM Mono',monospace" }}>
                                                <span style={{ display:'flex', color:G.textPlaceholder }}>{IC.mappin}</span>
                                                {item.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'4px', flexShrink:0, marginLeft:'8px' }}>
                    <span style={{ background:item.type==='lost'?G.warningBg:G.accentLight, color:item.type==='lost'?G.warning:G.accent, border:`1px solid ${item.type==='lost'?G.warningBorder:G.accentBorder}`, borderRadius:'6px', fontSize:'10px', fontWeight:700, padding:'2px 8px', textTransform:'uppercase' }}>
                      {item.type}
                    </span>
                                        {item.resolved && (
                                            <span style={{ background:G.accentLight, color:G.accent, border:`1px solid ${G.accentBorder}`, borderRadius:'6px', fontSize:'10px', fontWeight:700, padding:'2px 8px', display:'flex', alignItems:'center', gap:'3px' }}>
                        <span style={{ display:'flex' }}>{IC.check}</span>
                        Resolved
                      </span>
                                        )}
                                    </div>
                                </div>

                                <p style={{ fontSize:'12px', color:G.textSecondary, lineHeight:1.5, margin:'0 0 12px' }}>{item.desc}</p>

                                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:'11px', color:G.textMuted, display:'flex', alignItems:'center', gap:'4px', fontFamily:"'DM Mono',monospace" }}>
                    <span style={{ display:'flex', color:G.textPlaceholder }}>{IC.calendar}</span>
                      {item.date}
                  </span>
                                    <a href={`tel:${item.contact}`} className="lf-contact"
                                       style={{ background:G.surface, color:G.accent, border:`1px solid ${G.border}`, padding:'5px 12px', borderRadius:'8px', fontSize:'12px', fontWeight:500, textDecoration:'none', transition:'all 0.15s', display:'flex', alignItems:'center', gap:'5px' }}>
                                        <span style={{ display:'flex' }}>{IC.phone}</span>
                                        Contact
                                    </a>
                                </div>
                            </div>
                        ))}

                        {filtered.length === 0 && (
                            <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'48px', color:G.textMuted, background:G.surface, border:`1px solid ${G.border}`, borderRadius:'14px' }}>
                                <div style={{ color:G.textPlaceholder, display:'flex', justifyContent:'center', marginBottom:'12px' }}>{IC.searchEmpty}</div>
                                <div style={{ fontWeight:600, color:G.textSecondary }}>No items found</div>
                                <div style={{ fontSize:'13px', marginTop:'6px' }}>Try changing filters or search terms</div>
                            </div>
                        )}
                    </div>
                </>

            ) : submitted ? (
                <div style={{ background:G.accentLight, border:`1px solid ${G.accentBorder}`, borderRadius:'14px', padding:'48px', textAlign:'center' }}>
                    <div style={{ color:G.accent, display:'flex', justifyContent:'center', marginBottom:'14px' }}>{IC.checkCircleLg}</div>
                    <div style={{ fontSize:'18px', fontWeight:700, color:G.accent, marginBottom:'6px' }}>Report Submitted!</div>
                    <div style={{ fontSize:'13px', color:G.textMuted }}>Your report has been posted. Redirecting to browse...</div>
                </div>

            ) : (
                <div style={{ background:G.surface, border:`1px solid ${G.border}`, borderRadius:'14px', boxShadow:G.shadow, overflow:'hidden' }}>
                    <div style={{ padding:'18px 22px', borderBottom:`1px solid ${G.divider}` }}>
                        <div style={{ fontSize:'14px', fontWeight:700, color:G.textPrimary }}>Report a Lost or Found Item</div>
                        <div style={{ fontSize:'12px', color:G.textMuted, marginTop:'2px' }}>Fill in the details to post your report</div>
                    </div>
                    <form onSubmit={handleSubmit} style={{ padding:'22px' }}>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'14px' }}>
                            {[
                                { label:'Report Type', el:<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} style={inputStyle}><option value="lost">Lost Item</option><option value="found">Found Item</option></select> },
                                { label:'Category',    el:<select value={form.cat}  onChange={e=>setForm({...form,cat:e.target.value})}  style={inputStyle}>{CATS.filter(c=>c!=='All').map(c=><option key={c}>{c}</option>)}</select> },
                                { label:'Item Name',   el:<input className="lf-inp" type="text" required placeholder="e.g. Black HP Laptop"   value={form.title}    onChange={e=>setForm({...form,title:e.target.value})}    style={inputStyle}/> },
                                { label:'Location',    el:<input className="lf-inp" type="text" required placeholder="e.g. Library 2nd Floor" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} style={inputStyle}/> },
                                { label:'Date',        el:<input className="lf-inp" type="date" required                                      value={form.date}     onChange={e=>setForm({...form,date:e.target.value})}     style={inputStyle}/> },
                                { label:'Contact',     el:<input className="lf-inp" type="text" required placeholder="01XXXXXXXXX"            value={form.contact}  onChange={e=>setForm({...form,contact:e.target.value})}  style={inputStyle}/> },
                            ].map((f, i) => (
                                <div key={i}>
                                    <label style={{ fontSize:'11px', fontWeight:700, color:G.textPlaceholder, display:'block', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.8px' }}>{f.label}</label>
                                    {f.el}
                                </div>
                            ))}
                        </div>
                        <div style={{ marginBottom:'14px' }}>
                            <label style={{ fontSize:'11px', fontWeight:700, color:G.textPlaceholder, display:'block', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.8px' }}>Description</label>
                            <textarea className="lf-inp" required placeholder="Describe the item in detail..." value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} rows={3}
                                      style={{ ...inputStyle, resize:'vertical' }}/>
                        </div>
                        <div style={{ background:G.warningBg, border:`1px solid ${G.warningBorder}`, borderRadius:'9px', padding:'11px 14px', marginBottom:'18px', display:'flex', gap:'9px', alignItems:'flex-start' }}>
                            <span style={{ display:'flex', color:G.warning, flexShrink:0, marginTop:'1px' }}>{IC.warning}</span>
                            <div style={{ fontSize:'12px', color:G.warning, lineHeight:1.5 }}>Only submit genuine reports. False reports may result in disciplinary action.</div>
                        </div>
                        <button type="submit" className="lf-btn"
                                style={{ width:'100%', background:G.accent, color:'white', border:'none', padding:'13px', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", boxShadow:'0 4px 14px rgba(5,150,105,0.35)', transition:'all 0.18s' }}>
                            Submit Report
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}