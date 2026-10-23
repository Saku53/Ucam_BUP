import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        const ok = login(studentId, password);
        if (ok) {
            navigate("/");
        } else {
            setError("Invalid Student ID or password.");
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'DM Sans', sans-serif",
                overflow: "hidden",
            }}
        >
            {/* Background Image */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "url(https://bup.edu.bd/public/upload/slider/20260210_1770710774750.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />

            {/* Dark overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(135deg, rgba(27,43,75,0.88) 0%, rgba(15,123,108,0.72) 100%)",
                }}
            />

            {/* Decorative SVG circles */}
            <svg
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="10%" cy="20%" r="180" fill="rgba(255,255,255,0.03)" />
                <circle cx="90%" cy="10%" r="240" fill="rgba(255,255,255,0.03)" />
                <circle cx="80%" cy="80%" r="200" fill="rgba(15,123,108,0.08)" />
                <circle cx="5%" cy="85%" r="150" fill="rgba(27,43,75,0.15)" />
                <circle cx="50%" cy="50%" r="400" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </svg>

            {/* Main Layout: Left branding + Right card */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    display: "grid",
                    gridTemplateColumns: "1fr 420px",
                    gap: "48px",
                    width: "100%",
                    maxWidth: "960px",
                    padding: "40px 24px",
                    alignItems: "center",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.55s ease, transform 0.55s ease",
                }}
            >
                {/* Left — Branding */}
                <div style={{ color: "white" }}>
                    {/* Logo + Name */}
                    <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "32px" }}>
                        <img
                            src="https://afd.gov.bd/sites/default/files/inline-images/BUP%20Logo_0.png"
                            alt="BUP Logo"
                            style={{ width: "72px", height: "72px", objectFit: "contain", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}
                        />
                        <div>
                            <div
                                style={{
                                    fontSize: "22px",
                                    fontWeight: 700,
                                    letterSpacing: "-0.3px",
                                    lineHeight: 1.2,
                                    fontFamily: "'DM Sans', sans-serif",
                                }}
                            >
                                Bangladesh University
                            </div>
                            <div
                                style={{
                                    fontSize: "22px",
                                    fontWeight: 700,
                                    letterSpacing: "-0.3px",
                                    lineHeight: 1.2,
                                    fontFamily: "'DM Sans', sans-serif",
                                }}
                            >
                                of Professionals
                            </div>
                            <div
                                style={{
                                    fontSize: "13px",
                                    color: "rgba(255,255,255,0.6)",
                                    marginTop: "4px",
                                    fontStyle: "italic",
                                    fontFamily: "'DM Sans', sans-serif",
                                }}
                            >
                                Excellence Through Knowledge
                            </div>
                        </div>
                    </div>

                    {/* Portal name */}
                    <div
                        style={{
                            display: "inline-block",
                            background: "rgba(15,123,108,0.35)",
                            border: "1px solid rgba(15,123,108,0.5)",
                            borderRadius: "8px",
                            padding: "6px 14px",
                            fontSize: "12px",
                            fontWeight: 600,
                            letterSpacing: "1.5px",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.85)",
                            marginBottom: "20px",
                        }}
                    >
                        UCAM Student Portal
                    </div>

                    <h1
                        style={{
                            fontSize: "38px",
                            fontWeight: 700,
                            lineHeight: 1.2,
                            letterSpacing: "-0.5px",
                            margin: "0 0 16px 0",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        Your Campus,
                        <br />
                        <span style={{ color: "#4dd9c8" }}>All in One Place.</span>
                    </h1>

                    <p
                        style={{
                            fontSize: "15px",
                            lineHeight: 1.7,
                            color: "rgba(255,255,255,0.65)",
                            maxWidth: "380px",
                            margin: "0 0 32px 0",
                        }}
                    >
                        Access your classes, schedule, library, complaints, counseling,
                        transport, scholarships and more — from a single unified portal
                        built for BUP students.
                    </p>

                    {/* Feature pills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {[
                            "📚 LMS & Courses",
                            "🗓 Class Schedule",
                            "🏆 Scholarships",
                            "🚌 Transport",
                            "📬 Complaints",
                            "🔍 Lost & Found",
                        ].map((f) => (
                            <div
                                key={f}
                                style={{
                                    background: "rgba(255,255,255,0.08)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    borderRadius: "100px",
                                    padding: "6px 14px",
                                    fontSize: "13px",
                                    color: "rgba(255,255,255,0.8)",
                                    backdropFilter: "blur(6px)",
                                }}
                            >
                                {f}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — Login Card */}
                <div
                    ref={cardRef}
                    style={{
                        background: "white",
                        borderRadius: "20px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1)",
                        padding: "40px 36px",
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(24px)",
                        transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
                    }}
                >
                    {/* Card Header */}
                    <div style={{ textAlign: "center", marginBottom: "28px" }}>
                        <img
                            src="https://afd.gov.bd/sites/default/files/inline-images/BUP%20Logo_0.png"
                            alt="BUP"
                            style={{ width: "52px", height: "52px", objectFit: "contain", marginBottom: "12px" }}
                        />
                        <h2
                            style={{
                                fontSize: "20px",
                                fontWeight: 700,
                                color: "#1B2B4B",
                                margin: "0 0 4px 0",
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                        >
                            Sign in to UCAM
                        </h2>
                        <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                            Use your BUP student credentials
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {/* Student ID */}
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    color: "#1B2B4B",
                                    marginBottom: "6px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.8px",
                                }}
                            >
                                Student ID
                            </label>
                            <input
                                type="text"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                placeholder="e.g. 23549009053"
                                required
                                style={{
                                    width: "100%",
                                    padding: "11px 14px",
                                    border: "1.5px solid #e2e8f0",
                                    borderRadius: "10px",
                                    fontSize: "14px",
                                    fontFamily: "'DM Mono', monospace",
                                    color: "#0f172a",
                                    outline: "none",
                                    boxSizing: "border-box",
                                    transition: "border-color 0.2s",
                                    background: "#f8fafc",
                                }}
                                onFocus={(e) => (e.target.style.borderColor = "#0F7B6C")}
                                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    color: "#1B2B4B",
                                    marginBottom: "6px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.8px",
                                }}
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                style={{
                                    width: "100%",
                                    padding: "11px 14px",
                                    border: "1.5px solid #e2e8f0",
                                    borderRadius: "10px",
                                    fontSize: "14px",
                                    fontFamily: "'DM Sans', sans-serif",
                                    color: "#0f172a",
                                    outline: "none",
                                    boxSizing: "border-box",
                                    transition: "border-color 0.2s",
                                    background: "#f8fafc",
                                }}
                                onFocus={(e) => (e.target.style.borderColor = "#0F7B6C")}
                                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div
                                style={{
                                    background: "#fef2f2",
                                    border: "1px solid #fecaca",
                                    borderRadius: "8px",
                                    padding: "10px 14px",
                                    fontSize: "13px",
                                    color: "#dc2626",
                                }}
                            >
                                {error}
                            </div>
                        )}

                        {/* Forgot password */}
                        <div style={{ textAlign: "right", marginTop: "-8px" }}>
                            <a
                                href="#"
                                style={{
                                    fontSize: "12px",
                                    color: "#0F7B6C",
                                    textDecoration: "none",
                                    fontWeight: 500,
                                }}
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: "100%",
                                padding: "12px",
                                background: loading ? "#94a3b8" : "#0F7B6C",
                                color: "white",
                                border: "none",
                                borderRadius: "10px",
                                fontSize: "15px",
                                fontWeight: 600,
                                fontFamily: "'DM Sans', sans-serif",
                                cursor: loading ? "not-allowed" : "pointer",
                                transition: "background 0.2s, transform 0.1s",
                                letterSpacing: "0.2px",
                            }}
                            onMouseEnter={(e) => { if (!loading) (e.currentTarget.style.background = "#0d6b5e"); }}
                            onMouseLeave={(e) => { if (!loading) (e.currentTarget.style.background = "#0F7B6C"); }}
                            onMouseDown={(e) => { if (!loading) (e.currentTarget.style.transform = "scale(0.98)"); }}
                            onMouseUp={(e) => { (e.currentTarget.style.transform = "scale(1)"); }}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "11px",
                            color: "#94a3b8",
                            marginTop: "28px",
                            marginBottom: 0,
                        }}
                    >
                        Mirpur Cantonment, Dhaka-1216, Bangladesh
                        <br />
                        © 2026 Bangladesh University of Professionals
                    </p>
                </div>
            </div>

            {/* Responsive styles */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

                @media (max-width: 768px) {
                  .login-grid {
                    grid-template-columns: 1fr !important;
                  }
                  .login-branding {
                    display: none !important;
                  }
                }
            `}</style>
        </div>
    );
}