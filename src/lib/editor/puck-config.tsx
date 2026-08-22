import type { Config } from "@puckeditor/core";
import React from "react";
import { Ghost } from "lucide-react";

// ===== COMPONENT RENDERERS =====

const SectionRender = ({ children, backgroundColor, paddingY, paddingX }: {
  children: React.ReactNode; backgroundColor?: string; paddingY?: string; paddingX?: string;
}) => (
  <section style={{ backgroundColor: backgroundColor || "transparent", padding: `${paddingY || "60px"} ${paddingX || "24px"}`, width: "100%" }}>
    {children}
  </section>
);

const ContainerRender = ({ children, maxWidth }: { children: React.ReactNode; maxWidth?: string }) => (
  <div style={{ maxWidth: maxWidth || "1200px", margin: "0 auto", width: "100%" }}>{children}</div>
);

const GridRender = ({ children, columns, gap }: { children: React.ReactNode; columns?: string; gap?: string }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns || "3"}, 1fr)`, gap: gap || "24px", width: "100%" }}>{children}</div>
);

const HeadingRender = ({ text, level, color, fontSize, fontWeight, textAlign }: {
  text?: string; level?: string; color?: string; fontSize?: string; fontWeight?: string; textAlign?: string;
}) => {
  const Tag = (level || "h2") as keyof React.JSX.IntrinsicElements;
  return <Tag style={{ color: color || "#1e293b", fontSize: fontSize || undefined, fontWeight: fontWeight || "700", textAlign: (textAlign as React.CSSProperties["textAlign"]) || "left", lineHeight: 1.2 }}>{text || "Heading"}</Tag>;
};

const ParagraphRender = ({ text, color, fontSize, textAlign, lineHeight }: {
  text?: string; color?: string; fontSize?: string; textAlign?: string; lineHeight?: string;
}) => (
  <p style={{ color: color || "#475569", fontSize: fontSize || "16px", textAlign: (textAlign as React.CSSProperties["textAlign"]) || "left", lineHeight: lineHeight || "1.7", maxWidth: "720px" }}>
    {text || "Paragraph text goes here."}
  </p>
);

const ImageRender = ({ src, alt, width, height, borderRadius, objectFit }: {
  src?: string; alt?: string; width?: string; height?: string; borderRadius?: string; objectFit?: string;
}) => (
  <img src={src || "https://placehold.co/800x400/e2e8f0/94a3b8?text=Image"} alt={alt || "Image"} style={{ width: width || "100%", height: height || "auto", borderRadius: borderRadius || "8px", objectFit: (objectFit as React.CSSProperties["objectFit"]) || "cover", display: "block" }} />
);

const ButtonRender = ({ text, url, variant, size, borderRadius }: {
  text?: string; url?: string; variant?: string; size?: string; borderRadius?: string;
}) => {
  const baseStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none", fontWeight: 600, cursor: "pointer", borderRadius: borderRadius || "8px", border: "none", transition: "all 0.2s" };
  const sizes: Record<string, React.CSSProperties> = { sm: { padding: "8px 16px", fontSize: "13px" }, md: { padding: "12px 24px", fontSize: "15px" }, lg: { padding: "16px 32px", fontSize: "17px" } };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: "#6366f1", color: "white" },
    secondary: { background: "#f1f5f9", color: "#334155" },
    outline: { background: "transparent", color: "#6366f1", border: "2px solid #6366f1" },
  };
  return <a href={url || "#"} style={{ ...baseStyle, ...sizes[size || "md"], ...variants[variant || "primary"] }}>{text || "Button"}</a>;
};

const NavigationRender = ({ links, color }: { links?: { label: string; url: string }[]; color?: string }) => (
  <nav style={{ display: "flex", gap: "24px" }}>
    {(links || [{label: "Home", url: "#"}, {label: "About", url: "#"}]).map((item, i) => (
      <a key={i} href={item.url} style={{ color: color || "#475569", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>{item.label}</a>
    ))}
  </nav>
);

const CardRender = ({ backgroundColor, borderRadius, padding, children }: {
  backgroundColor?: string; borderRadius?: string; padding?: string; children?: React.ReactNode;
}) => (
  <div style={{ backgroundColor: backgroundColor || "#ffffff", borderRadius: borderRadius || "12px", padding: padding || "24px", overflow: "hidden", border: "1px solid #e2e8f0", transition: "all 0.2s" }}>
    {children}
  </div>
);

const HeroRender = ({ backgroundImage, backgroundColor, minHeight, children }: {
  backgroundImage?: string; backgroundColor?: string; minHeight?: string; children?: React.ReactNode;
}) => (
  <section style={{ minHeight: minHeight || "500px", backgroundColor: backgroundColor || "#0f172a", backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined, backgroundSize: "cover", backgroundPosition: "center", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px", width: "100%" }}>
    <div style={{ maxWidth: "800px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px" }}>
      {children}
    </div>
  </section>
);

const HeaderRender = ({ backgroundColor, children }: {
  backgroundColor?: string; children?: React.ReactNode;
}) => (
  <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", backgroundColor: backgroundColor || "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
    {children}
  </header>
);

const FooterRender = ({ backgroundColor, children }: {
  backgroundColor?: string; children?: React.ReactNode;
}) => (
  <footer style={{ backgroundColor: backgroundColor || "#0f172a", padding: "48px 32px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px" }}>
    {children}
  </footer>
);

const PostListRender = ({ postsPerRow, showExcerpt, showImage }: {
  postsPerRow?: string; showExcerpt?: boolean; showImage?: boolean;
}) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${postsPerRow || "3"}, 1fr)`, gap: "24px" }}>
    {[1, 2, 3].map((i) => (
      <article key={i} style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
        {(showImage !== false) && <div style={{ height: "180px", background: `hsl(${i * 60 + 220}, 40%, 90%)` }} />}
        <div style={{ padding: "20px" }}>
          <div style={{ fontSize: "12px", color: "#6366f1", fontWeight: 600, marginBottom: "8px" }}>Category</div>
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", marginBottom: "8px" }}>Blog Post Title {i}</h3>
          {(showExcerpt !== false) && <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.5 }}>Preview of the blog post content goes here...</p>}
        </div>
      </article>
    ))}
  </div>
);

const DividerRender = ({ color, thickness, style: divStyle, margin }: {
  color?: string; thickness?: string; style?: string; margin?: string;
}) => (
  <hr style={{ border: "none", borderTop: `${thickness || "1px"} ${divStyle || "solid"} ${color || "#e2e8f0"}`, margin: `${margin || "32px"} 0` }} />
);

const SpacerRender = ({ height }: { height?: string }) => (
  <div style={{ height: height || "40px" }} />
);

// ===== GHOST DYNAMIC COMPONENT RENDERERS =====

const GhostBadge = ({ label }: { label: string }) => (
  <div style={{ position: "absolute", top: 0, left: "50%", transform: "translate(-50%, -100%)", background: "#f8fafc", color: "#64748b", fontSize: "10px", padding: "2px 8px", borderRadius: "4px 4px 0 0", display: "flex", alignItems: "center", gap: "4px", border: "1px solid #e2e8f0", borderBottom: "none", opacity: 0.9, whiteSpace: "nowrap", zIndex: 10 }}>
    <Ghost size={10} />
    {label}
  </div>
);

const GhostSiteTitleRender = ({ color, fontSize, fontWeight }: { color?: string; fontSize?: string; fontWeight?: string }) => (
  <div style={{ position: "relative", display: "inline-block", padding: "4px 8px" }}>
    <GhostBadge label="Site Title" />
    <h1 style={{ color: color || "#1e293b", fontSize: fontSize || "24px", fontWeight: fontWeight || "800", margin: 0, lineHeight: 1.2 }}>Your Site Title</h1>
  </div>
);

const GhostSiteDescriptionRender = ({ color, fontSize }: { color?: string; fontSize?: string }) => (
  <div style={{ position: "relative", display: "inline-block", padding: "4px 8px" }}>
    <GhostBadge label="Site Description" />
    <p style={{ color: color || "#64748b", fontSize: fontSize || "16px", margin: 0 }}>A brief description of what this site is about.</p>
  </div>
);

const GhostSiteLogoRender = ({ height }: { height?: string }) => (
  <div style={{ position: "relative", display: "inline-block", padding: "4px 8px" }}>
    <GhostBadge label="Site Logo" />
    <img src="https://placehold.co/120x40/f1f5f9/94a3b8?text=Logo" alt="Site Logo Placeholder" style={{ height: height || "40px", display: "block" }} />
  </div>
);

const GhostNavigationRender = ({ color, isSecondary }: { color?: string; isSecondary?: boolean }) => (
  <div style={{ position: "relative", display: "inline-block", padding: "4px 8px" }}>
    <GhostBadge label={isSecondary ? "Secondary Nav" : "Primary Nav"} />
    <nav style={{ display: "flex", gap: "24px" }}>
      {["Home", "About", "Contact", isSecondary ? "Terms" : null].filter(Boolean).map((item, i) => (
        <span key={i} style={{ color: color || "#475569", fontSize: "14px", fontWeight: 500 }}>{item}</span>
      ))}
    </nav>
  </div>
);

const GhostFeaturedPostsRender = ({ postsPerRow }: { postsPerRow?: string }) => (
  <div style={{ position: "relative", width: "100%", padding: "16px 0" }}>
    <GhostBadge label="Featured Posts Loop" />
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${postsPerRow || "3"}, 1fr)`, gap: "24px", padding: "16px", border: "1px dashed #cbd5e1", borderRadius: "8px", background: "#f8fafc" }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ height: "120px", background: "#e2e8f0", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "12px", fontWeight: 600 }}>Featured Post {i}</div>
      ))}
    </div>
  </div>
);

const GhostAuthorRender = () => (
  <div style={{ position: "relative", display: "inline-block", padding: "24px", border: "1px dashed #cbd5e1", borderRadius: "8px", background: "#f8fafc", textAlign: "center", margin: "16px 0" }}>
    <GhostBadge label="Author Info" />
    <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#cbd5e1", margin: "0 auto 16px" }} />
    <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 8px 0" }}>Author Name</h3>
    <p style={{ fontSize: "14px", color: "#64748b", margin: 0, maxWidth: "300px" }}>Author biography placeholder text goes here. This will be replaced by dynamic Ghost data.</p>
  </div>
);

const GhostTagsRender = () => (
  <div style={{ position: "relative", display: "inline-block", padding: "8px" }}>
    <GhostBadge label="Tags" />
    <div style={{ display: "flex", gap: "8px" }}>
      {["News", "Update", "Feature"].map(tag => (
        <span key={tag} style={{ padding: "4px 12px", background: "#e0e7ff", color: "#4f46e5", borderRadius: "100px", fontSize: "12px", fontWeight: 600 }}>{tag}</span>
      ))}
    </div>
  </div>
);

const GhostPaginationRender = () => (
  <div style={{ position: "relative", display: "flex", justifyContent: "center", padding: "32px 0" }}>
    <GhostBadge label="Pagination" />
    <div style={{ display: "flex", gap: "16px" }}>
      <button style={{ padding: "8px 16px", border: "1px solid #cbd5e1", background: "white", borderRadius: "4px", color: "#64748b", cursor: "not-allowed" }}>Newer Posts</button>
      <button style={{ padding: "8px 16px", border: "1px solid #cbd5e1", background: "white", borderRadius: "4px", color: "#1e293b", fontWeight: 500 }}>Older Posts &rarr;</button>
    </div>
  </div>
);

const GhostSubscribeRender = ({ buttonColor }: { buttonColor?: string }) => (
  <div style={{ position: "relative", display: "inline-block", padding: "24px", border: "1px dashed #cbd5e1", borderRadius: "8px", background: "#f8fafc", margin: "16px 0" }}>
    <GhostBadge label="Subscribe Form" />
    <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
      <input type="email" placeholder="jamie@example.com" disabled style={{ padding: "10px 16px", border: "1px solid #cbd5e1", borderRadius: "6px", width: "240px", background: "white" }} />
      <button disabled style={{ padding: "10px 20px", background: buttonColor || "#4f46e5", color: "white", border: "none", borderRadius: "6px", fontWeight: 600 }}>Subscribe</button>
    </div>
  </div>
);

export const puckConfig: Config = {
  root: {
    render: ({ children }: { children?: React.ReactNode }) => {
      const isEmpty = !children || (Array.isArray(children) && children.length === 0);
      return (
        <div style={{ minHeight: "100%", position: "relative" }}>
          {children}
          {/* This CSS is required since children is an opaque React node for Puck zones */}
          <style dangerouslySetInnerHTML={{__html: `
            .puck-dropzone-area:empty {
              min-height: 400px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2px dashed #cbd5e1 !important;
              border-radius: 12px;
              margin: 32px;
              background: #f8fafc;
              position: relative;
            }
            .puck-dropzone-area:empty::before {
              content: "Drag a component here to get started";
              color: #94a3b8;
              font-size: 16px;
              font-weight: 500;
              pointer-events: none;
            }
          `}} />
        </div>
      );
    }
  },
  categories: {
    layout: { title: "Layout", components: ["Section", "Container", "Grid", "Spacer", "Divider"] },
    content: { title: "Static Content", components: ["Heading", "Paragraph", "Image", "Button", "Card"] },
    sections: { title: "Sections", components: ["Hero", "Header", "Footer"] },
    ghost: { title: "Ghost Dynamic", components: ["GhostSiteTitle", "GhostSiteDescription", "GhostSiteLogo", "GhostNavigation", "GhostPostFeed", "GhostAuthor", "GhostTags", "GhostPagination", "GhostSubscribe", "GhostPostContent", "GhostPostTitle", "GhostPostDate", "GhostPostFeatureImage"] },
  },
  components: {
    // --- Layout & Static ---
    Section: {
      fields: {
        backgroundColor: { type: "text", label: "Background Color" },
        paddingY: { type: "select", label: "Vertical Padding", options: [{ label: "Small (40px)", value: "40px" }, { label: "Medium (60px)", value: "60px" }, { label: "Large (80px)", value: "80px" }, { label: "XL (120px)", value: "120px" }] },
        paddingX: { type: "text", label: "Horizontal Padding" },
      },
      defaultProps: { backgroundColor: "transparent", paddingY: "60px", paddingX: "24px" },
      render: ({ backgroundColor, paddingY, paddingX, puck: { renderDropZone } }) => (
        <SectionRender backgroundColor={backgroundColor} paddingY={paddingY} paddingX={paddingX}>
          {renderDropZone({ zone: "content" })}
        </SectionRender>
      ),
    },
    Container: {
      fields: { maxWidth: { type: "select", label: "Max Width", options: [{ label: "Small (800px)", value: "800px" }, { label: "Medium (1000px)", value: "1000px" }, { label: "Large (1200px)", value: "1200px" }, { label: "Full", value: "100%" }] } },
      defaultProps: { maxWidth: "1200px" },
      render: ({ maxWidth, puck: { renderDropZone } }) => (
        <ContainerRender maxWidth={maxWidth}>{renderDropZone({ zone: "content" })}</ContainerRender>
      ),
    },
    Grid: {
      fields: {
        columns: { type: "select", label: "Columns", options: [{ label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }] },
        gap: { type: "text", label: "Gap" },
      },
      defaultProps: { columns: "3", gap: "24px" },
      render: ({ columns, gap, puck: { renderDropZone } }) => (
        <GridRender columns={columns} gap={gap}>{renderDropZone({ zone: "content" })}</GridRender>
      ),
    },
    Heading: {
      fields: {
        text: { type: "text", label: "Text" },
        level: { type: "select", label: "Level", options: [{ label: "H1", value: "h1" }, { label: "H2", value: "h2" }, { label: "H3", value: "h3" }, { label: "H4", value: "h4" }] },
        color: { type: "text", label: "Color" },
        fontSize: { type: "text", label: "Font Size" },
        fontWeight: { type: "select", label: "Weight", options: [{ label: "Normal", value: "400" }, { label: "Medium", value: "500" }, { label: "Semi Bold", value: "600" }, { label: "Bold", value: "700" }, { label: "Extra Bold", value: "800" }] },
        textAlign: { type: "select", label: "Alignment", options: [{ label: "Left", value: "left" }, { label: "Center", value: "center" }, { label: "Right", value: "right" }] },
      },
      defaultProps: { text: "Heading", level: "h2", color: "#1e293b", fontWeight: "700", textAlign: "left" },
      render: ({ puck, editMode, id, ...props }) => <HeadingRender {...props} />,
    },
    Paragraph: {
      fields: {
        text: { type: "textarea", label: "Text" },
        color: { type: "text", label: "Color" },
        fontSize: { type: "text", label: "Font Size" },
        textAlign: { type: "select", label: "Alignment", options: [{ label: "Left", value: "left" }, { label: "Center", value: "center" }, { label: "Right", value: "right" }] },
        lineHeight: { type: "text", label: "Line Height" },
      },
      defaultProps: { text: "Paragraph text goes here. Edit this to add your content.", color: "#475569", fontSize: "16px", textAlign: "left", lineHeight: "1.7" },
      render: ({ puck, editMode, id, ...props }) => <ParagraphRender {...props} />,
    },
    Image: {
      fields: {
        src: { type: "text", label: "Image URL" },
        alt: { type: "text", label: "Alt Text" },
        width: { type: "text", label: "Width" },
        height: { type: "text", label: "Height" },
        borderRadius: { type: "text", label: "Border Radius" },
        objectFit: { type: "select", label: "Object Fit", options: [{ label: "Cover", value: "cover" }, { label: "Contain", value: "contain" }, { label: "Fill", value: "fill" }] },
      },
      defaultProps: { src: "", alt: "Image", width: "100%", height: "auto", borderRadius: "8px", objectFit: "cover" },
      render: ({ puck, editMode, id, ...props }) => <ImageRender {...props} />,
    },
    Button: {
      fields: {
        text: { type: "text", label: "Text" },
        url: { type: "text", label: "URL" },
        variant: { type: "select", label: "Variant", options: [{ label: "Primary", value: "primary" }, { label: "Secondary", value: "secondary" }, { label: "Outline", value: "outline" }] },
        size: { type: "select", label: "Size", options: [{ label: "Small", value: "sm" }, { label: "Medium", value: "md" }, { label: "Large", value: "lg" }] },
        borderRadius: { type: "text", label: "Border Radius" },
      },
      defaultProps: { text: "Button", url: "#", variant: "primary", size: "md", borderRadius: "8px" },
      render: ({ puck, editMode, id, ...props }) => <ButtonRender {...props} />,
    },
    Card: {
      fields: {
        backgroundColor: { type: "text", label: "Background Color" },
        borderRadius: { type: "text", label: "Border Radius" },
        padding: { type: "text", label: "Padding" },
      },
      defaultProps: { backgroundColor: "#ffffff", borderRadius: "12px", padding: "24px" },
      render: ({ backgroundColor, borderRadius, padding, puck: { renderDropZone } }) => (
        <CardRender backgroundColor={backgroundColor} borderRadius={borderRadius} padding={padding}>
          {renderDropZone({ zone: "card-content" })}
        </CardRender>
      ),
    },
    Hero: {
      fields: {
        backgroundImage: { type: "text", label: "Background Image URL" },
        backgroundColor: { type: "text", label: "Background Color" },
        minHeight: { type: "text", label: "Min Height" },
      },
      defaultProps: { backgroundColor: "#0f172a", minHeight: "500px" },
      render: ({ backgroundImage, backgroundColor, minHeight, puck: { renderDropZone } }) => (
        <HeroRender backgroundImage={backgroundImage} backgroundColor={backgroundColor} minHeight={minHeight}>
          {renderDropZone({ zone: "hero-content" })}
        </HeroRender>
      ),
    },
    Spacer: {
      fields: { height: { type: "text", label: "Height" } },
      defaultProps: { height: "40px" },
      render: ({ puck, editMode, id, ...props }) => <SpacerRender {...props} />,
    },
    Divider: {
      fields: {
        color: { type: "text", label: "Color" },
        thickness: { type: "text", label: "Thickness" },
        style: { type: "select", label: "Style", options: [{ label: "Solid", value: "solid" }, { label: "Dashed", value: "dashed" }, { label: "Dotted", value: "dotted" }] },
        margin: { type: "text", label: "Margin" },
      },
      defaultProps: { color: "#e2e8f0", thickness: "1px", style: "solid", margin: "32px" },
      render: ({ puck, editMode, id, ...props }) => <DividerRender {...props} />,
    },
    Header: {
      fields: {
        backgroundColor: { type: "text", label: "Background Color" },
      },
      defaultProps: { backgroundColor: "#ffffff" },
      render: ({ backgroundColor, puck: { renderDropZone } }) => (
        <HeaderRender backgroundColor={backgroundColor}>
          {renderDropZone({ zone: "header-left" })}
          {renderDropZone({ zone: "header-right" })}
        </HeaderRender>
      ),
    },
    Footer: {
      fields: {
        backgroundColor: { type: "text", label: "Background Color" },
      },
      defaultProps: { backgroundColor: "#0f172a" },
      render: ({ backgroundColor, puck: { renderDropZone } }) => (
        <FooterRender backgroundColor={backgroundColor}>
          {renderDropZone({ zone: "footer-content" })}
        </FooterRender>
      ),
    },
    
    // --- Ghost Dynamic ---
    GhostSiteTitle: {
      fields: {
        color: { type: "text", label: "Color" },
        fontSize: { type: "text", label: "Font Size" },
        fontWeight: { type: "select", label: "Weight", options: [{ label: "Normal", value: "400" }, { label: "Medium", value: "500" }, { label: "Semi Bold", value: "600" }, { label: "Bold", value: "700" }, { label: "Extra Bold", value: "800" }] },
      },
      defaultProps: { color: "#1e293b", fontSize: "24px", fontWeight: "800" },
      render: ({ puck, editMode, id, ...props }) => <GhostSiteTitleRender {...props} />,
    },
    GhostSiteDescription: {
      fields: {
        color: { type: "text", label: "Color" },
        fontSize: { type: "text", label: "Font Size" },
      },
      defaultProps: { color: "#64748b", fontSize: "16px" },
      render: ({ puck, editMode, id, ...props }) => <GhostSiteDescriptionRender {...props} />,
    },
    GhostSiteLogo: {
      fields: { height: { type: "text", label: "Max Height" } },
      defaultProps: { height: "40px" },
      render: ({ puck, editMode, id, ...props }) => <GhostSiteLogoRender {...props} />,
    },
    GhostNavigation: {
      fields: {
        color: { type: "text", label: "Link Color" },
        isSecondary: { type: "radio", label: "Navigation Type", options: [{ label: "Primary", value: false }, { label: "Secondary (Footer)", value: true }] },
      },
      defaultProps: { color: "#475569", isSecondary: false },
      render: ({ puck, editMode, id, ...props }) => <GhostNavigationRender {...props} />,
    },
    GhostPostFeed: {
      fields: {
        postsPerRow: { type: "select", label: "Posts Per Row", options: [{ label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }] },
        showExcerpt: { type: "radio", label: "Show Excerpt", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
        showImage: { type: "radio", label: "Show Image", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
        // Ghost Binding Fields
        limit: { type: "text", label: "Limit (Count)" },
        featuredOnly: { type: "radio", label: "Featured Only", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
        tags: { type: "text", label: "Filter by Tags (comma separated)" },
        excludeId: { type: "radio", label: "Exclude Current Post", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
      },
      defaultProps: { postsPerRow: "3", showExcerpt: true, showImage: true, limit: "6", featuredOnly: false, tags: "", excludeId: false },
      render: ({ puck, editMode, id, ...props }) => (
        <div style={{ position: "relative", padding: "16px 0" }}>
          <GhostBadge label="Ghost Post Feed" />
          <PostListRender {...props} />
        </div>
      ),
    },
    GhostAuthor: {
      fields: {},
      defaultProps: {},
      render: () => <GhostAuthorRender />,
    },
    GhostTags: {
      fields: {},
      defaultProps: {},
      render: () => <GhostTagsRender />,
    },
    GhostPagination: {
      fields: {},
      defaultProps: {},
      render: () => <GhostPaginationRender />,
    },
    GhostSubscribe: {
      fields: { buttonColor: { type: "text", label: "Button Color" } },
      defaultProps: { buttonColor: "#4f46e5" },
      render: ({ puck, editMode, id, ...props }) => <GhostSubscribeRender {...props} />,
    },
    GhostPostContent: {
      fields: {},
      defaultProps: {},
      render: () => (
        <div style={{ position: "relative", padding: "32px", border: "1px dashed #cbd5e1", background: "#f8fafc", minHeight: "200px" }}>
          <GhostBadge label="Post Content" />
          <p style={{ color: "#64748b" }}>This component will be replaced by the rich text content of the post when viewed on the live site.</p>
        </div>
      ),
    },
    GhostPostTitle: {
      fields: {
        color: { type: "text", label: "Color" },
        fontSize: { type: "text", label: "Font Size" },
        fontWeight: { type: "select", label: "Weight", options: [{ label: "Normal", value: "400" }, { label: "Medium", value: "500" }, { label: "Semi Bold", value: "600" }, { label: "Bold", value: "700" }, { label: "Extra Bold", value: "800" }] },
      },
      defaultProps: { color: "#1e293b", fontSize: "36px", fontWeight: "800" },
      render: ({ color, fontSize, fontWeight }) => (
        <div style={{ position: "relative", display: "inline-block", padding: "4px 8px" }}>
          <GhostBadge label="Post Title" />
          <h1 style={{ color: color || "#1e293b", fontSize: fontSize || "36px", fontWeight: fontWeight || "800", margin: 0, lineHeight: 1.2 }}>Blog Post Title</h1>
        </div>
      ),
    },
    GhostPostDate: {
      fields: {
        color: { type: "text", label: "Color" },
        fontSize: { type: "text", label: "Font Size" },
      },
      defaultProps: { color: "#64748b", fontSize: "14px" },
      render: ({ color, fontSize }) => (
        <div style={{ position: "relative", display: "inline-block", padding: "4px 8px" }}>
          <GhostBadge label="Post Date" />
          <span style={{ color: color || "#64748b", fontSize: fontSize || "14px" }}>August 22, 2026</span>
        </div>
      ),
    },
    GhostPostFeatureImage: {
      fields: {
        borderRadius: { type: "text", label: "Border Radius" },
      },
      defaultProps: { borderRadius: "8px" },
      render: ({ borderRadius }) => (
        <div style={{ position: "relative" }}>
          <GhostBadge label="Feature Image" />
          <img src="https://placehold.co/1200x600/e2e8f0/94a3b8?text=Feature+Image" alt="Feature Image" style={{ width: "100%", height: "auto", borderRadius: borderRadius || "8px", display: "block" }} />
        </div>
      ),
    }
  },
};
