import React, { useState, useRef, useEffect } from 'react';
import { Braces } from 'lucide-react';
import { VALID_BINDINGS, createBinding } from '../../../ast/bindingRegistry';
import { RichValue, StaticValue, PropValue } from '../../../ast/types';
import { FieldLockToggle } from './FieldLockToggle';
import { NavConventionTooltip } from '../../navigationHelp/NavConventionTooltip';

interface Props {
  value: PropValue;
  onChange: (val: PropValue) => void;
  label: string;
  isUnlocked?: boolean;
  onToggleLock?: () => void;
}

export const TokenPickerField: React.FC<Props> = ({ value, onChange, label, isUnlocked, onToggleLock }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Convert current value to string representation for the input
  const displayValue = React.useMemo(() => {
    if (!value) return '';
    if (value.kind === 'static') return String(value.value);
    if (value.kind === 'binding') return `{${value.source}.${value.field}}`;
    if (value.kind === 'rich') {
      return value.parts.map(p => p.kind === 'text' ? p.value : `{${p.binding.source}.${p.binding.field}}`).join('');
    }
    return '';
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If user types, we keep it simple: we replace the whole value with a StaticValue or a single-part RichValue
    // However, if the current value is Rich, and they type, we'd have to parse {} or just fall back to plain text.
    // The prompt says: "no code path that allows typing raw {{handlebars}} syntax or an arbitrary token string into this field"
    // To strictly enforce this, we don't parse typed {}. They MUST use the picker. 
    // We treat typed text purely as a literal string.
    onChange({ kind: 'static', value: e.target.value });
  };

  const handleInsertToken = (source: string, field: string) => {
    const binding = createBinding(source as any, field as any);
    
    let newParts: RichValue['parts'] = [];
    
    if (!value || value.kind === 'static') {
      if (value && value.kind === 'static' && value.value) {
        newParts = [
          { kind: 'text', value: String(value.value) + ' ' },
          { kind: 'binding', binding }
        ];
      } else {
        newParts = [{ kind: 'binding', binding }];
      }
    } else if (value.kind === 'binding') {
      newParts = [
        { kind: 'binding', binding: value },
        { kind: 'text', value: ' ' },
        { kind: 'binding', binding }
      ];
    } else if (value.kind === 'rich') {
      newParts = [...value.parts, { kind: 'text', value: ' ' }, { kind: 'binding', binding }];
    }

    onChange({ kind: 'rich', parts: newParts });
    setIsOpen(false);
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>
            {label}
          </label>
          {displayValue.includes('site.navigation') && <NavConventionTooltip />}
        </div>
        {onToggleLock && <FieldLockToggle isUnlocked={!!isUnlocked} onToggle={onToggleLock} />}
      </div>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={displayValue}
          onChange={handleTextChange}
          style={{
            flex: 1,
            padding: '8px 12px',
            paddingRight: '36px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '0.875rem',
            outline: 'none',
          }}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'absolute',
            right: '4px',
            padding: '4px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px'
          }}
          title="Insert Ghost Token"
        >
          <Braces size={16} />
        </button>

        {isOpen && (
          <div ref={popoverRef} style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '4px',
            width: '240px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: 100,
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            <div style={{ padding: '12px', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', borderBottom: '1px solid #e2e8f0' }}>
              INSERT DATA BINDING
            </div>
            {Object.entries(VALID_BINDINGS).map(([source, fields]) => (
              <div key={source} style={{ padding: '8px 0' }}>
                <div style={{ padding: '0 12px', fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {source}
                </div>
                {fields.map(field => (
                  <button
                    key={field}
                    onClick={() => handleInsertToken(source, field)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '6px 16px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      fontSize: '0.875rem',
                      color: '#0f172a',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {field}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
