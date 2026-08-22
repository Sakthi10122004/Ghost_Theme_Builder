"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  LayoutTemplate, Folder, Settings, Image as ImageIcon, 
  LogOut, Plus, Search, Trash2, Edit2, LayoutDashboard,
  Box, Copy, Download, Eye
} from "lucide-react";

// Helper to generate a deterministic pastel color based on string
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return `hsl(${hash % 360}, 70%, 85%)`;
};

// Generates a stylized SVG wireframe for the project thumbnail
const ProjectThumbnail = ({ name }: { name: string }) => {
  const primaryColor = stringToColor(name);
  const secondaryColor = stringToColor(name + "alt");
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#f8fafc" }}>
      <svg width="100%" height="100%" viewBox="0 0 280 160" preserveAspectRatio="none">
        {/* Header */}
        <rect x="0" y="0" width="280" height="24" fill="white" />
        <rect x="12" y="8" width="40" height="8" rx="4" fill={primaryColor} />
        <rect x="220" y="8" width="48" height="8" rx="4" fill="#e2e8f0" />
        
        {/* Hero Area */}
        <rect x="0" y="24" width="280" height="64" fill={secondaryColor} />
        <rect x="60" y="44" width="160" height="12" rx="6" fill="rgba(0,0,0,0.1)" />
        <rect x="100" y="64" width="80" height="6" rx="3" fill="rgba(0,0,0,0.1)" />
        
        {/* Content Body */}
        <rect x="20" y="104" width="150" height="8" rx="4" fill="#e2e8f0" />
        <rect x="20" y="120" width="120" height="8" rx="4" fill="#e2e8f0" />
        <rect x="20" y="136" width="180" height="8" rx="4" fill="#e2e8f0" />
        
        {/* Sidebar/Image */}
        <rect x="220" y="104" width="40" height="40" rx="8" fill="#e2e8f0" />
      </svg>
    </div>
  );
};

interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: string;
  pageCount: number;
  updatedAt: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [creating, setCreating] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      fetchProjects();
    }
  }, [status, router, fetchProjects]);

  const createProject = async () => {
    if (!newProjectName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProjectName }),
      });
      if (res.ok) {
        const project = await res.json();
        setShowCreateModal(false);
        setNewProjectName("");
        router.push(`/editor/${project.id}`);
      }
    } finally {
      setCreating(false);
    }
  };

  const deleteProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (status === "loading" || loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "var(--color-bg-primary)" }}>
        <div style={{ textAlign: "center", color: "var(--color-text-secondary)" }}>
          <LayoutTemplate size={40} className="animate-pulse" style={{ margin: "0 auto 16px", color: "var(--color-primary)" }} />
          <p>Loading your workspace...</p>
        </div>
      </div>
    );
  }

  const SidebarItem = ({ icon: Icon, label, id }: { icon: any, label: string, id: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      style={{
        display: "flex", alignItems: "center", gap: 12, width: "100%",
        padding: "8px 12px", borderRadius: "var(--radius-md)", border: "none",
        background: activeTab === id ? "var(--color-primary-subtle)" : "transparent",
        color: activeTab === id ? "var(--color-primary)" : "var(--color-text-secondary)",
        fontWeight: activeTab === id ? 500 : 400,
        fontSize: 14, cursor: "pointer", textAlign: "left", transition: "all 0.15s"
      }}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40, padding: "0 4px" }}>
          <div style={{ width: 32, height: 32, background: "var(--color-primary)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
            <LayoutTemplate size={18} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "var(--color-text-primary)" }}>Ghost Builder</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" id="dashboard" />
          <SidebarItem icon={Folder} label="Projects" id="projects" />
          <SidebarItem icon={Box} label="Templates" id="templates" />
          <SidebarItem icon={ImageIcon} label="Assets" id="assets" />
          
          <div style={{ margin: "16px 0", height: 1, background: "var(--color-border)" }} />
          <SidebarItem icon={Settings} label="Settings" id="settings" />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 4px", marginTop: "auto" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--color-primary-subtle)", color: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 14 }}>
            {session?.user?.name?.charAt(0) || "U"}
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{session?.user?.name}</div>
            <div style={{ fontSize: 12, color: "var(--color-text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{session?.user?.email}</div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{ background: "none", border: "none", color: "var(--color-text-muted)", cursor: "pointer", padding: 4 }}
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <div style={{ padding: "40px 40px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 8 }}>Projects</h1>
            <p style={{ color: "var(--color-text-secondary)", fontSize: 15 }}>
              Manage your Ghost CMS theme projects
            </p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="input" 
                style={{ paddingLeft: 36, width: 240 }} 
              />
            </div>
            <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
              <Plus size={16} />
              New Theme
            </button>
          </div>
        </div>

        {/* Project Grid */}
        {projects.length === 0 ? (
          <div
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: "100px 24px", textAlign: "center", flex: 1
            }}
          >
            <div
              style={{
                width: 64, height: 64, borderRadius: "50%", background: "var(--color-primary-subtle)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)",
                marginBottom: 24,
              }}
            >
              <Folder size={32} />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: "var(--color-text-primary)" }}>No projects yet</h2>
            <p style={{ color: "var(--color-text-secondary)", marginBottom: 24, maxWidth: 360, lineHeight: 1.5 }}>
              Create your first Ghost CMS theme using our visual drag-and-drop builder.
            </p>
            <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
              <Plus size={16} />
              Create Project
            </button>
          </div>
        ) : (
          <div className="project-grid stagger-children">
            {projects.map((project) => (
              <div key={project.id} className="project-card" onClick={() => router.push(`/editor/${project.id}`)}>
                <div className="project-card-thumb">
                  <ProjectThumbnail name={project.name} />
                  <div
                    style={{
                      position: "absolute", top: 12, right: 12, padding: "4px 8px", borderRadius: "var(--radius-sm)",
                      background: project.status === "published" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
                      color: project.status === "published" ? "var(--color-success)" : "var(--color-warning)",
                      fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px",
                    }}
                  >
                    {project.status}
                  </div>
                </div>

                <div className="project-card-body">
                  <div className="project-card-title">{project.name}</div>
                  <div className="project-card-meta">
                    {project.pageCount} page{project.pageCount !== 1 ? "s" : ""} • Edited {timeAgo(project.updatedAt)}
                  </div>
                </div>

                <div className="project-card-actions">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={(e) => { e.stopPropagation(); router.push(`/editor/${project.id}`); }}
                    style={{ flex: 1, padding: "4px 8px" }}
                    title="Edit theme"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={(e) => { e.stopPropagation(); window.open(`/editor/${project.id}?preview=true`, '_blank'); }}
                    style={{ flex: 1, padding: "4px 8px" }}
                    title="Preview theme"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={(e) => { e.stopPropagation(); alert('Duplication coming soon'); }}
                    style={{ flex: 1, padding: "4px 8px" }}
                    title="Duplicate theme"
                  >
                    <Copy size={14} />
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={async (e) => {
                      e.stopPropagation();
                      const res = await fetch(`/api/projects/${project.id}/export`);
                      if (res.ok) {
                        const blob = await res.blob();
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${project.slug || "theme"}.zip`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }
                    }}
                    style={{ flex: 1, padding: "4px 8px" }}
                    title="Download ZIP"
                  >
                    <Download size={14} />
                  </button>
                  <div style={{ width: 1, height: 16, background: "var(--color-border)", margin: "0 4px" }} />
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={(e) => deleteProject(project.id, e)}
                    style={{ color: "var(--color-error)", padding: "4px 8px" }}
                    title="Delete project"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Create New Theme</h2>
            </div>

            <div className="modal-body">
              <div style={{ marginBottom: 24 }}>
                <label className="label" htmlFor="project-name">Theme Name</label>
                <input
                  id="project-name"
                  className="input"
                  placeholder="e.g. Minimal Blog, Portfolio"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && createProject()}
                  autoFocus
                />
              </div>

              <p className="label" style={{ marginBottom: 12 }}>Starting Point</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div
                  className="card"
                  style={{ cursor: "pointer", textAlign: "center", padding: 20, borderColor: "var(--color-primary)", boxShadow: "0 0 0 1px var(--color-primary)" }}
                  onClick={createProject}
                >
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--color-primary-subtle)", color: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <LayoutTemplate size={20} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, color: "var(--color-text-primary)" }}>From Scratch</div>
                  <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
                    Blank canvas with default Ghost pages
                  </div>
                </div>

                <div
                  className="card"
                  style={{ cursor: "not-allowed", textAlign: "center", padding: 20, opacity: 0.6 }}
                  title="Coming soon"
                >
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--color-bg-tertiary)", color: "var(--color-text-muted)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <Box size={20} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, color: "var(--color-text-primary)" }}>Use Template</div>
                  <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
                    Pre-built layouts (Coming soon)
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={createProject} disabled={creating || !newProjectName.trim()}>
                {creating ? "Creating..." : "Create Theme"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
