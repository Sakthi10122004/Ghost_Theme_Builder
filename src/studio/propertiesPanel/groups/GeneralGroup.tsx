import React from 'react';
import { Section, PropValue } from '../../../ast/types';
import { sectionFieldSchemas, defaultSchema } from '../sectionFieldSchemas';
import { TokenPickerField } from '../fields/TokenPickerField';
import { FieldLockToggle } from '../fields/FieldLockToggle';
import { useAstHistory } from '../../../state/astHistory';
import { useEditorStore } from '../../../state/editorStore';

interface Props {
  section: Section;
}

export const GeneralGroup: React.FC<Props> = ({ section }) => {
  const schema = sectionFieldSchemas[section.type] || defaultSchema;
  const updateSection = useAstHistory(state => state.updateSection);
  const selectedTemplateId = useEditorStore(state => state.selectedTemplateId);

  const handlePropChange = (key: string, value: PropValue) => {
    if (!selectedTemplateId) return;
    updateSection(selectedTemplateId, section.id, (draft) => {
      draft.props[key] = value;
    });
  };

  const handleLockToggle = (key: string) => {
    if (!selectedTemplateId) return;
    updateSection(selectedTemplateId, section.id, (draft) => {
      if (!draft.fieldLocks) draft.fieldLocks = {};
      // default is locked (false/absent), so toggle between true and false
      draft.fieldLocks[key] = !draft.fieldLocks[key];
    });
  };

  const handleToggleChange = (key: string, checked: boolean) => {
    if (!selectedTemplateId) return;
    updateSection(selectedTemplateId, section.id, (draft) => {
      draft.props[key] = { kind: 'static', value: checked };
    });
  };

  return (
    <div>
      {/* Standard Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {schema.fields.map(field => {
          const val = section.props[field.name];

          if (field.tokenEmbeddable) {
            const isUnlocked = section.fieldLocks?.[field.name] === true;
            return (
              <TokenPickerField 
                key={field.name}
                label={field.label}
                value={val}
                onChange={(v) => handlePropChange(field.name, v)}
                isUnlocked={isUnlocked}
                onToggleLock={() => handleLockToggle(field.name)}
              />
            );
          }
          
          if (field.type === 'text' || field.type === 'image') {
            const strVal = val?.kind === 'static' ? String(val.value) : '';
            const isUnlocked = section.fieldLocks?.[field.name] === true;
            return (
              <div key={field.name} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>
                    {field.label}
                  </label>
                  <FieldLockToggle isUnlocked={isUnlocked} onToggle={() => handleLockToggle(field.name)} />
                </div>
                <input 
                  type="text"
                  value={strVal}
                  onChange={(e) => handlePropChange(field.name, { kind: 'static', value: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                />
              </div>
            );
          }

          if (field.type === 'number') {
            const numVal = val?.kind === 'static' ? Number(val.value) : 0;
            const isUnlocked = section.fieldLocks?.[field.name] === true;
            return (
              <div key={field.name} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>
                    {field.label}
                  </label>
                  <FieldLockToggle isUnlocked={isUnlocked} onToggle={() => handleLockToggle(field.name)} />
                </div>
                <input 
                  type="number"
                  value={numVal}
                  onChange={(e) => handlePropChange(field.name, { kind: 'static', value: Number(e.target.value) })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                />
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Flat Toggles for sub-elements */}
      {schema.toggles.length > 0 && (
        <div style={{ marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '12px', textTransform: 'uppercase' }}>
            Elements
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {schema.toggles.map(toggle => {
              const propVal = section.props[toggle.name];
              const checked = propVal?.kind === 'static' ? Boolean(propVal.value) : false;
              const isUnlocked = section.fieldLocks?.[toggle.name] === true;
              
              return (
                <div key={toggle.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#0f172a', cursor: 'pointer' }}>
                    <input 
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => handleToggleChange(toggle.name, e.target.checked)}
                      style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                    {toggle.label}
                  </label>
                  <FieldLockToggle isUnlocked={isUnlocked} onToggle={() => handleLockToggle(toggle.name)} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
