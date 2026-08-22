"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { Puck, usePuck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { puckConfig } from "@/lib/editor/puck-config";
import { useEditorStore } from "@/lib/editor/store";
import { 
  ChevronLeft, Monitor, Tablet, Smartphone, Download, 
  Component, FileText, Plus, X, Settings, Layers, Lock, Unlock,
  Layout, Box, Grid3X3, SeparatorHorizontal, Minus, Type, AlignLeft, 
  ImageIcon, MousePointerClick, PanelTop, Crown, PanelTopDashed, PanelBottomDashed,
  Menu, List, User, Tags, MoreHorizontal, Mail, Calendar, Ghost, Zap
} from "lucide-react";
import { DesignSystemPanel } from "@/components/editor/design-system-panel";

const componentIconMap: Record<string, React.ElementType> = {
  Section: Layout,
  Container: Box,
  Grid: Grid3X3,
  Spacer: SeparatorHorizontal,
  Divider: Minus,
  Heading: Type,
  Paragraph: AlignLeft,
  Image: ImageIcon,
  Button: MousePointerClick,
  Card: PanelTop,
  Hero: Crown,
  Header: PanelTopDashed,
  Footer: PanelBottomDashed,
  GhostSiteTitle: Type,
  GhostSiteDescription: AlignLeft,
  GhostSiteLogo: ImageIcon,
  GhostNavigation: Menu,
  GhostPostFeed: List,
  GhostAuthor: User,
  GhostTags: Tags,
  GhostPagination: MoreHorizontal,
  GhostSubscribe: Mail,
  GhostPostContent: AlignLeft,
  GhostPostTitle: Type,
  GhostPostDate: Calendar,
  GhostPostFeatureImage: ImageIcon,
};

// Extracted Custom Properties Panel
function CustomPropertiesPanel() {
  const { appState } = usePuck();
  const selectedItem = appState.ui.itemSelector;
  const [propTab, setPropTab] = useState("content"); // content | style | layout | ghost

  if (!selectedItem) {
    return (
      <div style={{ padding: 32, textAlign: "center", color: "var(--color-text-muted)" }}>
        <MousePointerClick size={32} style={{ margin: "0 auto 16px", opacity: 0.5 }} />
        <p>Select a component on the canvas to view its properties.</p>
      </div>
    );
  }

  // A very rough categorization logic based on field names
  const getTabForField = (fieldName: string) => {
    if (["limit", "tags", "featuredOnly", "excludeId"].includes(fieldName)) return "ghost";
    if (["backgroundColor", "color", "borderRadius", "buttonColor", "style"].includes(fieldName)) return "style";
    if (["paddingY", "paddingX", "padding", "margin", "minHeight", "height", "width", "maxWidth", "postsPerRow", "columns", "gap"].includes(fieldName)) return "layout";
    return "content";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", borderBottom: "1px solid var(--color-border)", padding: "0 8px", background: "var(--color-bg-tertiary)" }}>
        {(["content", "style", "layout", "ghost"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setPropTab(tab)}
            style={{
              padding: "10px 8px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5,
              background: "transparent", cursor: "pointer", border: "none",
              color: propTab === tab ? "var(--color-primary)" : "var(--color-text-muted)",
              borderBottom: propTab === tab ? "2px solid var(--color-primary)" : "2px solid transparent",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* We use CSS to hide fields that don't belong to the active tab */}
        <div className={`custom-puck-fields show-tab-${propTab}`}>
          <Puck.Fields />
        </div>
      </div>
    </div>
  );
}

export default function EditorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  const {
    project, currentPageId, isSaving, lastSaved, previewDevice,
    setProject, setCurrentPage, updatePageContent, setSaving,
    addPage, removePage, leftPanelTab, setLeftPanelTab,
  } = useEditorStore();

  const [loading, setLoading] = useState(true);
  const [showAddPage, setShowAddPage] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const saveTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const fetchProject = useCallback(async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      if (!res.ok) { router.push("/dashboard"); return; }
      const data = await res.json();
      setProject(data);
    } finally {
      setLoading(false);
    }
  }, [projectId, router, setProject]);

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/login"); return; }
    if (status === "authenticated") fetchProject();
  }, [status, router, fetchProject]);

  const savePageContent = useCallback(async (pageId: string, content: Record<string, unknown>) => {
    setSaving(true);
    try {
      await fetch(`/api/projects/${projectId}/pages/${pageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
    } finally {
      setSaving(false);
    }
  }, [projectId, setSaving]);

  const handlePuckChange = useCallback((data: Record<string, unknown>) => {
    if (!currentPageId) return;
    updatePageContent(currentPageId, data);
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => savePageContent(currentPageId, data), 2000);
  }, [currentPageId, updatePageContent, savePageContent]);

  const handleCreatePage = async () => {
    if (!newPageName.trim()) return;
    const res = await fetch(`/api/projects/${projectId}/pages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newPageName, type: "page" }),
    });
    if (res.ok) {
      const page = await res.json();
      addPage(page);
      setCurrentPage(page.id);
      setShowAddPage(false);
      setNewPageName("");
    }
  };

  const handleDeletePage = async (pageId: string) => {
    if (!confirm("Delete this page?")) return;
    await fetch(`/api/projects/${projectId}/pages/${pageId}`, { method: "DELETE" });
    removePage(pageId);
  };

  const [showExportModal, setShowExportModal] = useState(false);

  const handleExport = async () => {
    setShowExportModal(true);
  };

  const performExport = async () => {
    const res = await fetch(`/api/projects/${projectId}/export`);
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${project?.slug || "theme"}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      setShowExportModal(false);
    } else {
      const err = await res.json();
      alert(`Export failed: ${err.error || "Unknown error"}`);
    }
  };

  const currentPage = project?.pages.find((p) => p.id === currentPageId);
  const deviceWidths = { desktop: "100%", tablet: "768px", mobile: "375px" };

  if (loading || !project) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "var(--color-bg-primary)" }}>
        <div style={{ textAlign: "center", color: "var(--color-text-secondary)" }}>
          <Settings size={40} className="animate-spin" style={{ margin: "0 auto 16px", color: "var(--color-primary)" }} />
          <p>Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentPage ? (
        <Puck
          key={currentPageId}
          config={puckConfig}
          data={currentPage.content as Parameters<typeof Puck>[0]["data"]}
          onChange={handlePuckChange}
          onPublish={async (data) => {
            if (currentPageId) await savePageContent(currentPageId, data as Record<string, unknown>);
          }}
          overrides={{
            drawerItem: ({ name, children }) => {
              const Icon = componentIconMap[name] || Component;
              const isGhost = name.startsWith("Ghost");
              return (
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  padding: '16px 8px', gap: '8px', background: isGhost ? 'var(--color-primary-subtle)' : 'var(--color-bg-primary)',
                  border: isGhost ? '1px solid var(--color-primary)' : '1px solid var(--color-border)', borderRadius: '8px',
                  cursor: 'grab', transition: 'all 0.15s'
                }}>
                  <Icon size={24} style={{ color: isGhost ? 'var(--color-primary)' : 'var(--color-text-secondary)' }} />
                  <span style={{ fontSize: 11, fontWeight: 500, color: isGhost ? 'var(--color-primary)' : 'var(--color-text-primary)', textAlign: 'center' }}>
                    {name.replace("Ghost", "")}
                  </span>
                </div>
              );
            }
          }}
        >
          <div className="editor-layout">
            {/* Top Toolbar */}
            <div className="editor-toolbar">
              <button 
                className="btn btn-ghost btn-icon" 
                onClick={() => router.push("/dashboard")}
                title="Back to Dashboard"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div style={{ width: 1, height: 24, background: "var(--color-border)" }} />
              
              <span style={{ fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)" }}>
                {project.name}
              </span>
              
              <div style={{ flex: 1 }} />

              {/* Device Preview */}
              <div style={{ display: "flex", gap: 4, background: "var(--color-bg-tertiary)", borderRadius: "var(--radius-sm)", padding: 2 }}>
                {(["desktop", "tablet", "mobile"] as const).map((device) => {
                  const Icon = device === "desktop" ? Monitor : device === "tablet" ? Tablet : Smartphone;
                  return (
                    <button 
                      key={device} 
                      className="btn btn-ghost btn-sm" 
                      onClick={() => useEditorStore.getState().setPreviewDevice(device)}
                      style={{ 
                        background: previewDevice === device ? "var(--color-bg-elevated)" : "transparent", 
                        padding: "4px 8px", 
                        color: previewDevice === device ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                        boxShadow: previewDevice === device ? "var(--shadow-sm)" : "none"
                      }}
                      title={`Preview on ${device}`}
                    >
                      <Icon size={16} />
                    </button>
                  );
                })}
              </div>

              <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                  {isSaving ? "Saving..." : lastSaved ? `Saved ${Math.round((Date.now() - lastSaved.getTime()) / 1000)}s ago` : ""}
                </span>

                <button className="btn btn-primary btn-sm" onClick={handleExport}>
                  <Download size={14} />
                  Export Theme
                </button>
              </div>
            </div>

            {/* Left Sidebar */}
            <aside className="editor-sidebar">
              <div style={{ display: "flex", borderBottom: "1px solid var(--color-border)", flexShrink: 0 }}>
                {(["components", "layers", "pages"] as const).map((tab) => (
                  <button 
                    key={tab} 
                    onClick={() => setLeftPanelTab(tab as typeof leftPanelTab)}
                    style={{ 
                      flex: 1, padding: "12px 4px", fontSize: 11, fontWeight: 500, 
                      background: leftPanelTab === tab ? "transparent" : "var(--color-bg-tertiary)", 
                      color: leftPanelTab === tab ? "var(--color-primary)" : "var(--color-text-secondary)", 
                      border: "none", cursor: "pointer", 
                      borderBottom: leftPanelTab === tab ? "2px solid var(--color-primary)" : "2px solid transparent",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                      transition: "all 0.15s"
                    }}
                  >
                    {tab === "components" ? <Component size={14} /> : tab === "layers" ? <Layers size={14} /> : <FileText size={14} />}
                    <span style={{ display: "none" }} className="md:inline">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                  </button>
                ))}
              </div>

              <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                {leftPanelTab === "components" && (
                  <div style={{ flex: 1, overflow: "auto" }}>
                    <Puck.Components />
                  </div>
                )}

                {leftPanelTab === "layers" && (
                  <div style={{ flex: 1, overflow: "auto" }}>
                    <Puck.Outline />
                  </div>
                )}

                {leftPanelTab === "pages" && (
                  <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--color-text-muted)" }}>Pages</span>
                      <button 
                        className="btn btn-ghost btn-icon" 
                        onClick={() => setShowAddPage(true)} 
                        style={{ width: 24, height: 24, padding: 0 }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {project.pages.map((page) => (
                        <div key={page.id} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          <div 
                            onClick={() => setCurrentPage(page.id)}
                            style={{ 
                              display: "flex", justifyContent: "space-between", alignItems: "center", 
                              padding: "8px 12px", borderRadius: "var(--radius-md)", cursor: "pointer",
                              background: currentPageId === page.id ? "var(--color-primary-subtle)" : "transparent", 
                              color: currentPageId === page.id ? "var(--color-primary)" : "var(--color-text-secondary)",
                              transition: "all 0.15s"
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <FileText size={14} style={{ opacity: 0.7 }} />
                              <div>
                                <div style={{ fontSize: 13, fontWeight: currentPageId === page.id ? 500 : 400 }}>{page.name}</div>
                                {page.isHomepage && <div style={{ fontSize: 10, color: "var(--color-text-muted)", marginTop: 2 }}>Home</div>}
                                {page.isCollection && <div style={{ fontSize: 10, color: "var(--color-primary)", marginTop: 2 }}>Collection</div>}
                              </div>
                            </div>
                            {!page.isHomepage && project.pages.length > 1 && (
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleDeletePage(page.id); }}
                                style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", opacity: 0.5, padding: 4 }}
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>
                          {currentPageId === page.id && !page.isHomepage && (
                            <div style={{ padding: "8px 12px", background: "var(--color-bg-tertiary)", borderRadius: "var(--radius-sm)", marginTop: 4, marginLeft: 16 }}>
                              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, cursor: "pointer" }}>
                                <input 
                                  type="checkbox" 
                                  checked={page.isCollection || false} 
                                  onChange={async (e) => {
                                    await fetch(`/api/projects/${projectId}/pages/${page.id}`, {
                                      method: 'PUT',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ isCollection: e.target.checked })
                                    });
                                    fetchProject();
                                  }} 
                                />
                                Is Collection (Routes.yaml)
                              </label>
                              {page.isCollection && (
                                <input 
                                  type="text" 
                                  placeholder="Filter (e.g. tag:blog)" 
                                  value={page.collectionFilter || ""}
                                  onChange={async (e) => {
                                    // Normally we would debounce this
                                    await fetch(`/api/projects/${projectId}/pages/${page.id}`, {
                                      method: 'PUT',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ collectionFilter: e.target.value })
                                    });
                                    fetchProject();
                                  }}
                                  style={{ marginTop: 8, width: "100%", padding: "4px 8px", fontSize: 12, borderRadius: 4, border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }} 
                                />
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {showAddPage && (
                      <div className="animate-fade-in" style={{ marginTop: 12, padding: 12, background: "var(--color-bg-tertiary)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
                        <input 
                          className="input" 
                          placeholder="Page name" 
                          value={newPageName} 
                          onChange={(e) => setNewPageName(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleCreatePage()} 
                          autoFocus 
                          style={{ fontSize: 13, padding: "8px 12px", marginBottom: 8 }} 
                        />
                        <div style={{ display: "flex", gap: 8 }}>
                          <button className="btn btn-primary btn-sm" onClick={handleCreatePage} style={{ flex: 1, fontSize: 12 }}>Add</button>
                          <button className="btn btn-secondary btn-sm" onClick={() => setShowAddPage(false)} style={{ fontSize: 12 }}>Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Avatar Footer */}
              <div style={{ flexShrink: 0, padding: 16, borderTop: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--color-primary-subtle)", color: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 14 }}>
                  {session?.user?.name?.charAt(0) || "U"}
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{session?.user?.name || "User"}</div>
                </div>
                <Settings size={16} style={{ color: "var(--color-text-muted)", cursor: "pointer" }} />
              </div>
            </aside>

            {/* Main Canvas */}
            <main className="editor-canvas" style={{ position: "relative" }}>
              <div style={{ width: deviceWidths[previewDevice], maxWidth: "100%", margin: "0 auto", height: "100%", background: "var(--color-bg-secondary)", boxShadow: previewDevice !== "desktop" ? "var(--shadow-lg)" : "none", transition: "width 0.3s ease" }}>
                <Puck.Preview />
              </div>
            </main>

            {/* Right Properties Panel */}
            <aside className="editor-properties" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", borderBottom: "1px solid var(--color-border)", flexShrink: 0 }}>
                {(["properties", "design"] as const).map((tab) => (
                  <button 
                    key={tab} 
                    onClick={() => useEditorStore.getState().setRightPanelTab(tab)}
                    style={{ 
                      flex: 1, padding: "12px 8px", fontSize: 12, fontWeight: 500, 
                      background: useEditorStore.getState().rightPanelTab === tab ? "transparent" : "var(--color-bg-tertiary)", 
                      color: useEditorStore.getState().rightPanelTab === tab ? "var(--color-primary)" : "var(--color-text-secondary)", 
                      border: "none", cursor: "pointer", 
                      borderBottom: useEditorStore.getState().rightPanelTab === tab ? "2px solid var(--color-primary)" : "2px solid transparent",
                      transition: "all 0.15s"
                    }}
                  >
                    {tab === "properties" ? "Properties" : "Design"}
                  </button>
                ))}
              </div>
              <div style={{ flex: 1, overflow: "auto" }}>
                {useEditorStore.getState().rightPanelTab === "properties" ? (
                  <CustomPropertiesPanel />
                ) : (
                  <DesignSystemPanel />
                )}
              </div>
            </aside>
          </div>
        </Puck>
      ) : (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
          No page selected
        </div>
      )}

      {showExportModal && project && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div className="animate-fade-in" style={{ background: "var(--color-bg-primary)", padding: 32, borderRadius: "var(--radius-lg)", maxWidth: 500, width: "100%", boxShadow: "var(--shadow-xl)" }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: "var(--color-text-primary)" }}>Export Theme</h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: 24, fontSize: 14 }}>
              Your theme will be compiled into a valid Ghost CMS theme ZIP file.
            </p>
            
            <div style={{ background: "var(--color-bg-tertiary)", padding: 16, borderRadius: "var(--radius-md)", marginBottom: 24 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Dynamic Settings Summary</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                <li style={{ fontSize: 14, display: "flex", justifyContent: "space-between" }}>
                  <span>Custom Settings (Editable in Admin):</span>
                  <span style={{ fontWeight: 600 }}>{project.customSettings?.length || 0}</span>
                </li>
                <li style={{ fontSize: 14, display: "flex", justifyContent: "space-between" }}>
                  <span>Custom Collections (routes.yaml):</span>
                  <span style={{ fontWeight: 600 }}>{project.pages.filter(p => p.isCollection).length}</span>
                </li>
                <li style={{ fontSize: 14, display: "flex", justifyContent: "space-between" }}>
                  <span>Total Pages Generated:</span>
                  <span style={{ fontWeight: 600 }}>{project.pages.length}</span>
                </li>
              </ul>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button className="btn btn-secondary" onClick={() => setShowExportModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={performExport}>
                <Download size={16} />
                Download ZIP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Puck Overrides to match our theme */}
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --puck-color-bg: var(--color-bg-secondary) !important;
          --puck-color-bg-hover: var(--color-bg-tertiary) !important;
          --puck-color-border: var(--color-border) !important;
          --puck-color-grey-01: var(--color-bg-primary) !important;
          --puck-color-grey-02: var(--color-bg-tertiary) !important;
          --puck-color-grey-03: var(--color-border) !important;
          --puck-color-grey-04: var(--color-border-hover) !important;
          --puck-color-grey-05: var(--color-text-muted) !important;
          --puck-color-grey-06: var(--color-text-secondary) !important;
          --puck-color-grey-07: var(--color-text-secondary) !important;
          --puck-color-grey-08: var(--color-text-primary) !important;
          --puck-color-grey-09: var(--color-text-primary) !important;
          --puck-color-primary: var(--color-primary) !important;
          --puck-color-primary-hover: var(--color-primary-hover) !important;
        }
        /* Make Puck's canvas area transparent so our device wrapper works */
        .puck-canvas { background: transparent !important; }
        
        /* Grid Layout for Component Drawer */
        [class*="_Drawer_"] > div:not([class*="_DrawerItem_"]) {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          padding: 12px;
        }
        /* Fix the Category headers which are also children */
        [class*="_Drawer_"] > div:not([class*="_DrawerItem_"]) > button {
          grid-column: 1 / -1;
          margin-top: 8px;
        }

        /* Ghost Dynamic Badge in Layers */
        .puck-ghost-outline-badge {
          background: #e0e7ff;
          color: #4f46e5;
          padding: 2px 6px;
          border-radius: 100px;
          font-size: 10px;
          display: flex;
          align-items: center;
          gap: 2px;
          margin-left: 8px;
        }

        /* Tabs logic for custom fields panel */
        .custom-puck-fields > div > div > div > div {
          display: none !important;
        }
        /* Show all by default if we haven't mapped them yet */
        .custom-puck-fields.show-tab-content > div > div > div > div,
        .custom-puck-fields.show-tab-style > div > div > div > div,
        .custom-puck-fields.show-tab-layout > div > div > div > div,
        .custom-puck-fields.show-tab-ghost > div > div > div > div {
          display: block !important;
        }
      `}} />
    </>
  );
}
