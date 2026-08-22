import Link from "next/link";
import { LayoutTemplate, ArrowRight, Wand2, Box, Layers, Play } from "lucide-react";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", background: "var(--color-bg-primary)" }}>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 40px",
          position: "relative",
          zIndex: 10,
          background: "var(--color-bg-secondary)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "var(--color-primary)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <LayoutTemplate size={18} />
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text-primary)" }}>
            Ghost Theme Builder
          </span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/login" className="btn btn-ghost">
            Sign In
          </Link>
          <Link href="/register" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px 120px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="animate-fade-in"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            background: "var(--color-primary-subtle)",
            border: "1px solid rgba(79,70,229,0.2)",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 500,
            color: "var(--color-primary-hover)",
            marginBottom: 32,
          }}
        >
          <Wand2 size={14} />
          Visual Ghost CMS Theme Builder
        </div>

        <h1
          className="animate-fade-in"
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 800,
            marginBottom: 24,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Design Ghost Themes Visually
        </h1>

        <p
          className="animate-fade-in"
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--color-text-secondary)",
            maxWidth: 600,
            lineHeight: 1.6,
            marginBottom: 48,
          }}
        >
          Drag and drop components, customize every detail, and export valid Ghost CMS themes. 
          No coding required. Upload directly to Ghost and activate.
        </p>

        <div className="animate-fade-in" style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/register" className="btn btn-primary btn-lg">
            Start Building Free
            <ArrowRight size={18} />
          </Link>
          <Link href="/login" className="btn btn-secondary btn-lg">
            <Play size={18} />
            View Demo
          </Link>
        </div>

        {/* Feature Cards */}
        <div
          className="stagger-children"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            maxWidth: 900,
            marginTop: 80,
            width: "100%",
          }}
        >
          {[
            {
              icon: <Layers size={20} />,
              title: "Visual Drag & Drop",
              desc: "Build pages with an intuitive drag-and-drop editor. No code needed.",
            },
            {
              icon: <LayoutTemplate size={20} />,
              title: "Ghost CMS Ready",
              desc: "Export valid Ghost themes with proper Handlebars templates and structure.",
            },
            {
              icon: <Box size={20} />,
              title: "Component Library",
              desc: "Choose from dozens of pre-built components: heroes, cards, forms, and more.",
            },
          ].map((f, i) => (
            <div key={i} className="card" style={{ textAlign: "left" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-primary-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  color: "var(--color-primary)",
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--color-text-primary)" }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Workflow */}
        <div style={{ marginTop: 80, maxWidth: 700, width: "100%" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 40, color: "var(--color-text-primary)" }}>How It Works</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, background: "var(--color-bg-secondary)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", overflow: "hidden" }}>
            {[
              { step: "1", title: "Design Visually", desc: "Use our drag-and-drop editor to build pages" },
              { step: "2", title: "Customize Everything", desc: "Colors, fonts, spacing, layouts — all editable" },
              { step: "3", title: "Preview & Export", desc: "Preview responsively and generate your Ghost theme" },
              { step: "4", title: "Upload to Ghost", desc: "Download the ZIP and upload directly to Ghost CMS" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  padding: "24px 32px",
                  borderBottom: i < 3 ? "1px solid var(--color-border)" : "none",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "var(--color-primary-subtle)",
                    color: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {s.step}
                </div>
                <div style={{ textAlign: "left", marginTop: 4 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: "var(--color-text-primary)" }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
