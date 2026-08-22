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
    <div style={{ marginBottom: 'var(--space-16)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--text-sm-lh)', fontWeight: 500, color: 'var(--ink)' }}>
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
            padding: 'var(--space-8) var(--space-12)',
            paddingRight: '36px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--line)',
            backgroundColor: 'var(--surface)',
            color: 'var(--ink)',
            fontSize: 'var(--text-base)',
            lineHeight: 'var(--text-base-lh)',
            fontFamily: displayValue.includes('{') ? 'var(--font-mono, monospace)' : 'inherit',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'absolute',
            right: '4px',
            padding: 'var(--space-4)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-sm)'
          }}
          title="Insert Ghost Token"
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
        >
          <Braces size={16} />
        </button>

        {isOpen && (
          <div ref={popoverRef} style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: 'var(--space-4)',
            width: '240px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-modal)',
            zIndex: 100,
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            <div style={{ padding: 'var(--space-12)', fontSize: 'var(--text-xs)', lineHeight: 'var(--text-xs-lh)', fontWeight: 600, color: 'var(--muted)', borderBottom: '1px solid var(--line)' }}>
              INSERT DATA BINDING
            </div>
            {Object.entries(VALID_BINDINGS).map(([source, fields]) => (
              <div key={source} style={{ padding: 'var(--space-8) 0' }}>
                <div style={{ padding: '0 var(--space-12)', fontSize: 'var(--text-xs)', lineHeight: 'var(--text-xs-lh)', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 'var(--space-4)' }}>
                  {source}
                </div>
                {fields.map(field => (
                  <button
                    key={field}
                    onClick={() => handleInsertToken(source, field)}
                    className="font-mono"
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: 'var(--space-4) var(--space-16)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      fontSize: 'var(--text-sm)',
                      lineHeight: 'var(--text-sm-lh)',
                      color: 'var(--ink)',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--paper)';
                      e.currentTarget.style.color = 'var(--accent)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--ink)';
                    }}
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
