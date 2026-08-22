import React from 'react';
import { FilterRule } from '../../../ast/types';
import { Trash2, Plus } from 'lucide-react';

interface Props {
  filterMode: 'visual' | 'manual';
  onFilterModeChange: (mode: 'visual' | 'manual') => void;
  rules: FilterRule[];
  onRulesChange: (rules: FilterRule[]) => void;
  manualString: string;
  onManualStringChange: (str: string) => void;
}

const VALID_FIELDS = ['tag', 'author', 'visibility', 'featured', 'published_at'];
const VALID_OPERATORS = ['is', 'is-not', 'contains', 'starts-with'];

export const FilterRuleBuilder: React.FC<Props> = ({
  filterMode, onFilterModeChange,
  rules, onRulesChange,
  manualString, onManualStringChange
}) => {

  const addRule = () => {
    const combinator = rules.length > 0 ? rules[0].combinator : 'all';
    onRulesChange([...rules, { field: 'tag', operator: 'is', value: '', combinator }]);
  };

  const updateRule = (index: number, updates: Partial<FilterRule>) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], ...updates };
    onRulesChange(newRules);
  };

  const updateCombinator = (combinator: 'all' | 'any') => {
    onRulesChange(rules.map(r => ({ ...r, combinator })));
  };

  const removeRule = (index: number) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    onRulesChange(newRules);
  };

  return (
    <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => onFilterModeChange('visual')}
          style={{
            flex: 1, padding: '6px', fontSize: '0.8125rem', fontWeight: 600,
            borderRadius: '6px', border: 'none', cursor: 'pointer',
            backgroundColor: filterMode === 'visual' ? '#0f172a' : '#e2e8f0',
            color: filterMode === 'visual' ? '#ffffff' : '#64748b'
          }}
        >
          Visual Builder
        </button>
        <button
          onClick={() => onFilterModeChange('manual')}
          style={{
            flex: 1, padding: '6px', fontSize: '0.8125rem', fontWeight: 600,
            borderRadius: '6px', border: 'none', cursor: 'pointer',
            backgroundColor: filterMode === 'manual' ? '#0f172a' : '#e2e8f0',
            color: filterMode === 'manual' ? '#ffffff' : '#64748b'
          }}
        >
          Manual String
        </button>
      </div>

      {filterMode === 'visual' ? (
        <div>
          {rules.length > 1 && (
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem' }}>
              <span style={{ color: '#475569' }}>Match</span>
              <select 
                value={rules[0].combinator}
                onChange={(e) => updateCombinator(e.target.value as 'all' | 'any')}
                style={{ padding: '4px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              >
                <option value="all">ALL</option>
                <option value="any">ANY</option>
              </select>
              <span style={{ color: '#475569' }}>of the following rules:</span>
            </div>
          )}

          {rules.length === 0 ? (
            <div style={{ fontSize: '0.8125rem', color: '#94a3b8', marginBottom: '12px', textAlign: 'center' }}>
              No rules defined. All records will match.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              {rules.map((rule, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <select 
                    value={rule.field} onChange={(e) => updateRule(idx, { field: e.target.value as any })}
                    style={{ flex: 2, padding: '6px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  >
                    {VALID_FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  
                  <select 
                    value={rule.operator} onChange={(e) => updateRule(idx, { operator: e.target.value as any })}
                    style={{ flex: 2, padding: '6px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  >
                    {VALID_OPERATORS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  
                  <input 
                    type="text" value={rule.value} onChange={(e) => updateRule(idx, { value: e.target.value })}
                    placeholder="Value..."
                    style={{ flex: 3, padding: '6px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  />
                  
                  <button onClick={() => removeRule(idx)} style={{ padding: '6px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button 
            onClick={addRule}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#0284c7', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0 }}
          >
            <Plus size={14} /> Add Rule
          </button>
        </div>
      ) : (
        <div>
          <textarea 
            value={manualString}
            onChange={(e) => onManualStringChange(e.target.value)}
            placeholder="e.g., tags:[photo, video] + featured:true"
            style={{ width: '100%', minHeight: '80px', padding: '8px', fontSize: '0.8125rem', fontFamily: 'monospace', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            Use Ghost's NQL syntax for advanced filtering.
          </div>
        </div>
      )}
    </div>
  );
};
