import { useEditorStore } from "@/lib/editor/store";
import { Lock, Unlock } from "lucide-react";

export function DesignSystemPanel() {
  const { project, updateDesignSystem, toggleDesignTokenEditable } = useEditorStore();
  const ds = project?.designSystem;

  if (!ds) return null;

  const handleColorChange = (key: keyof typeof ds.colors, value: string) => {
    updateDesignSystem({ ...ds, colors: { ...ds.colors, [key]: value } });
  };

  const renderColorInput = (key: keyof typeof ds.colors, label: string) => {
    const tokenPath = `colors.${key}`;
    const isEditable = ds.editableTokens?.includes(tokenPath);
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="color"
            value={ds.colors[key]}
            onChange={(e) => handleColorChange(key, e.target.value)}
            style={{ width: 24, height: 24, padding: 0, border: 'none', borderRadius: 4, cursor: 'pointer' }}
          />
          <span style={{ fontSize: 13, color: "var(--color-text-primary)" }}>{label}</span>
        </div>
        <button
          onClick={() => toggleDesignTokenEditable(tokenPath)}
          title={isEditable ? "Editable in Ghost Admin after publish" : "Fixed at export"}
          style={{ 
            background: 'none', border: 'none', cursor: 'pointer', 
            color: isEditable ? "var(--color-primary)" : "var(--color-text-muted)",
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 4, borderRadius: 4, backgroundClip: "padding-box",
            backgroundColor: isEditable ? "var(--color-primary-subtle)" : "transparent"
          }}
        >
          {isEditable ? <Unlock size={14} /> : <Lock size={14} />}
        </button>
      </div>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--color-text-muted)", marginBottom: 16 }}>
          Colors
        </h3>
        {renderColorInput('primary', 'Primary')}
        {renderColorInput('secondary', 'Secondary')}
        {renderColorInput('accent', 'Accent')}
        {renderColorInput('background', 'Background')}
        {renderColorInput('surface', 'Surface')}
        {renderColorInput('text', 'Text Primary')}
        {renderColorInput('textMuted', 'Text Muted')}
        {renderColorInput('border', 'Border')}
      </div>
      
      <div>
        <h3 style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--color-text-muted)", marginBottom: 16 }}>
          Typography
        </h3>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>Heading Font</label>
          <input 
            type="text" 
            value={ds.typography.headingFont}
            onChange={(e) => updateDesignSystem({ ...ds, typography: { ...ds.typography, headingFont: e.target.value } })}
            style={{ width: "100%", padding: "6px 8px", fontSize: 13, borderRadius: 4, border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>Body Font</label>
          <input 
            type="text" 
            value={ds.typography.bodyFont}
            onChange={(e) => updateDesignSystem({ ...ds, typography: { ...ds.typography, bodyFont: e.target.value } })}
            style={{ width: "100%", padding: "6px 8px", fontSize: 13, borderRadius: 4, border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
          />
        </div>
      </div>
    </div>
  );
}
