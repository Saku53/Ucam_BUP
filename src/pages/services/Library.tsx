import React, { useState } from 'react';

interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    status: 'Available' | 'Borrowed' | 'Reserved';
    borrowDate?: string;
    dueDate?: string;
    fine?: number;
}

const books: Book[] = [
    {
        id: '1',
        title: 'Introduction to Algorithms',
        author: 'Cormen, Leiserson & Rivest',
        isbn: '978-0262033848',
        status: 'Borrowed',
        borrowDate: '2025-02-15',
        dueDate: '2025-03-15',
        fine: 0,
    },
    {
        id: '2',
        title: 'Data Structures and Algorithms',
        author: 'Mark Allen Weiss',
        isbn: '978-0132576277',
        status: 'Available',
    },
    {
        id: '3',
        title: 'The C Programming Language',
        author: 'Kernighan & Ritchie',
        isbn: '978-0131103627',
        status: 'Borrowed',
        borrowDate: '2025-02-01',
        dueDate: '2025-02-28',
        fine: 500,
    },
    {
        id: '4',
        title: 'Computer Networks',
        author: 'Andrew S. Tanenbaum',
        isbn: '978-0132126953',
        status: 'Available',
    },
    {
        id: '5',
        title: 'Database System Concepts',
        author: 'Silberschatz, Korth & Sudarshan',
        isbn: '978-0073523323',
        status: 'Reserved',
    },
];

const Svg = ({ size = 16, color = 'currentColor', children }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        {children}
    </svg>
);

const BookOpenIcon = () => <Svg size={18}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></Svg>;
const CheckCircleIcon = () => <Svg size={18} color="#059669"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Svg>;
const AlertCircleIcon = () => <Svg size={18} color="#d97706"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Svg>;
const ClockIcon = () => <Svg size={18} color="#2563eb"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Svg>;
const SearchIcon = () => <Svg size={16}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></Svg>;
const XIcon = () => <Svg size={16}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Svg>;

function StatusBadge({ status }: { status: string }) {
    const config = {
        'Available': { bg: '#f0fdf9', text: '#059669', icon: <CheckCircleIcon /> },
        'Borrowed': { bg: '#eff6ff', text: '#2563eb', icon: <ClockIcon /> },
        'Reserved': { bg: '#fef3c7', text: '#d97706', icon: <AlertCircleIcon /> },
    };
    const c = config[status as keyof typeof config];
    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: c.bg, color: c.text, padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', border: `1px solid ${c.bg}` }}>
            {c.icon}
            {status}
        </div>
    );
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function Library() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedBook, setSelectedBook] = useState<string | null>(null);

    const filtered = books.filter(b => {
        const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || b.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const borrowedBooks = books.filter(b => b.status === 'Borrowed');
    const totalFine = borrowedBooks.reduce((sum, b) => sum + (b.fine || 0), 0);

    const selectedBookData = books.find(b => b.id === selectedBook);

    return (
        <div style={{ animation: 'fadeIn 0.4s ease', fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}`}</style>

            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 6px 0' }}>Library Catalog</h1>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Search and manage your book borrowing</p>
            </div>

            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                {[
                    { label: 'Books Borrowed', value: borrowedBooks.length, color: '#2563eb' },
                    { label: 'Outstanding Fine', value: `৳ ${totalFine}`, color: totalFine > 0 ? '#dc2626' : '#059669' },
                ].map((s, i) => (
                    <div key={i} style={{
                        background: '#ffffff',
                        borderRadius: '14px',
                        border: '1px solid #e5e7eb',
                        padding: '14px',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    }}>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                            {s.label}
                        </div>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: s.color, fontFamily: "'DM Mono', monospace" }}>
                            {s.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Search & Filter */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Search by book title or author..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            paddingLeft: '32px',
                            paddingRight: '12px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            border: '1.5px solid #e5e7eb',
                            borderRadius: '9px',
                            fontSize: '13px',
                            fontFamily: "'DM Sans', sans-serif",
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            boxSizing: 'border-box',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = '#6ee7b7'}
                        onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
                    />
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                    {['All', 'Available', 'Borrowed', 'Reserved'].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            style={{
                                background: filterStatus === s ? '#f0fdf9' : '#ffffff',
                                border: `1px solid ${filterStatus === s ? '#d1fae5' : '#e5e7eb'}`,
                                color: filterStatus === s ? '#059669' : '#6b7280',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.18s ease',
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                            onMouseEnter={e => {
                                if (filterStatus !== s) {
                                    (e.currentTarget as HTMLButtonElement).style.background = '#f9fafb';
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#d1d5db';
                                }
                            }}
                            onMouseLeave={e => {
                                if (filterStatus !== s) {
                                    (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#e5e7eb';
                                }
                            }}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: selectedBook ? '1fr 320px' : '1fr', gap: '16px' }}>
                {/* Books Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                    {filtered.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '13px' }}>
                            No books found matching your search.
                        </div>
                    ) : (
                        filtered.map(book => (
                            <div
                                key={book.id}
                                onClick={() => setSelectedBook(book.id)}
                                style={{
                                    background: '#ffffff',
                                    borderRadius: '14px',
                                    border: selectedBook === book.id ? '2px solid #059669' : '1px solid #e5e7eb',
                                    padding: '14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: selectedBook === book.id ? '0 4px 16px rgba(5,150,105,0.2)' : '0 1px 4px rgba(0,0,0,0.06)',
                                }}
                                onMouseEnter={e => {
                                    if (selectedBook !== book.id) {
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                                        (e.currentTarget as HTMLDivElement).style.borderColor = '#d1fae5';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (selectedBook !== book.id) {
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
                                        (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb';
                                    }
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                    <div style={{ background: '#f0fdf9', borderRadius: '10px', padding: '12px', color: '#059669' }}>
                                        <BookOpenIcon />
                                    </div>
                                </div>

                                <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0', textAlign: 'center', lineHeight: 1.4 }}>
                                    {book.title}
                                </h3>
                                <p style={{ fontSize: '10px', color: '#6b7280', margin: '0 0 8px 0', textAlign: 'center' }}>
                                    {book.author}
                                </p>

                                <div style={{ fontSize: '9px', color: '#9ca3af', background: '#f9fafb', borderRadius: '6px', padding: '4px 8px', marginBottom: '8px', textAlign: 'center', fontFamily: "'DM Mono', monospace" }}>
                                    ISBN: {book.isbn}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <StatusBadge status={book.status} />
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Detail Panel */}
                {selectedBookData && (
                    <div style={{
                        background: '#ffffff',
                        borderRadius: '14px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                        height: 'fit-content',
                        position: 'sticky',
                        top: '16px',
                        animation: 'fadeIn 0.3s ease',
                    }}>
                        <div style={{ padding: '14px 16px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: 0 }}>Book Details</h3>
                            <button
                                onClick={() => setSelectedBook(null)}
                                style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer', padding: '4px' }}
                            >
                                <XIcon />
                            </button>
                        </div>

                        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                                <div style={{ background: '#f0fdf9', borderRadius: '10px', padding: '16px', color: '#059669' }}>
                                    <BookOpenIcon />
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                    Title
                                </div>
                                <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827', lineHeight: 1.4 }}>
                                    {selectedBookData.title}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                    Author
                                </div>
                                <div style={{ fontSize: '12px', color: '#374151' }}>
                                    {selectedBookData.author}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                    ISBN
                                </div>
                                <div style={{ fontSize: '11px', color: '#374151', fontFamily: "'DM Mono', monospace" }}>
                                    {selectedBookData.isbn}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                                    Status
                                </div>
                                <StatusBadge status={selectedBookData.status} />
                            </div>

                            {selectedBookData.status === 'Borrowed' && (
                                <>
                                    <div style={{ height: '1px', background: '#f3f4f6' }} />
                                    <div>
                                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                            Borrowed Date
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#374151' }}>
                                            {formatDate(selectedBookData.borrowDate!)}
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                            Due Date
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#374151' }}>
                                            {formatDate(selectedBookData.dueDate!)}
                                        </div>
                                    </div>

                                    {selectedBookData.fine! > 0 && (
                                        <div style={{
                                            background: '#fef2f2',
                                            border: '1px solid #fecaca',
                                            borderRadius: '8px',
                                            padding: '8px 10px',
                                        }}>
                                            <div style={{ fontSize: '10px', fontWeight: '700', color: '#dc2626', marginBottom: '2px' }}>
                                                Outstanding Fine
                                            </div>
                                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#dc2626', fontFamily: "'DM Mono', monospace" }}>
                                                ৳ {selectedBookData.fine}
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        style={{
                                            background: '#059669',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px',
                                            borderRadius: '9px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            width: '100%',
                                            marginTop: '4px',
                                            transition: 'all 0.2s',
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}
                                        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#047857'}
                                        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#059669'}
                                    >
                                        Renew Book
                                    </button>
                                </>
                            )}

                            {selectedBookData.status === 'Available' && (
                                <button
                                    style={{
                                        background: '#059669',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px',
                                        borderRadius: '9px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        width: '100%',
                                        transition: 'all 0.2s',
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}
                                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#047857'}
                                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#059669'}
                                >
                                    Borrow Book
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}