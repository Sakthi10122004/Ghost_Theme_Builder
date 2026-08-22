"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  LayoutTemplate, Folder, Settings, Image as ImageIcon, 
  LogOut, LayoutDashboard, Box
} from "lucide-react";

import { ProjectsDashboard } from "../../dashboard/ProjectsDashboard";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
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
    <div className="dashboard-layout" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside className="dashboard-sidebar" style={{ 
        width: '260px', 
        borderRight: '1px solid var(--color-border)', 
        backgroundColor: 'var(--color-bg-primary)',
        display: 'flex', 
        flexDirection: 'column', 
        padding: '24px 16px' 
      }}>
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
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{session?.user?.name || "User"}</div>
            <div style={{ fontSize: 12, color: "var(--color-text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{session?.user?.email || "user@example.com"}</div>
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

      {/* Main Content Area - Phase 1 Integration */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activeTab === "projects" ? (
          <ProjectsDashboard />
        ) : (
          <div style={{ padding: '40px', color: 'var(--color-text-secondary)' }}>
            <p>Select the Projects tab to view the Phase 1 Dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
}
