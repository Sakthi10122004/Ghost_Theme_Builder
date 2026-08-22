import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAstHistory } from '../../state/astHistory';
import { astValidator } from '../../compiler/pipeline/01-astValidator';
import { ValidationIssue } from '../../compiler/validation/sharedTypes';

interface Props {
  onClick: () => void;
}

export const ContinuousIssuesIndicator: React.FC<Props> = ({ onClick }) => {
  const present = useAstHistory(state => state.present);
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  
  // Debounce validation on AST change
  useEffect(() => {
    if (!present) return;
    
    const timer = setTimeout(() => {
      const result = astValidator(present);
      setIssues(result);
    }, 500); // 500ms debounce
    
    return () => clearTimeout(timer);
  }, [present]);

  const errorCount = issues.filter(i => i.severity === 'error').length;
  const warningCount = issues.filter(i => i.severity === 'warning').length;

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0',
        backgroundColor: 'white', cursor: 'pointer',
        fontSize: '0.875rem', fontWeight: 500, color: '#475569',
        transition: 'all 0.2s'
      }}
      title="View Export Validation Issues"
    >
      {errorCount > 0 ? (
        <>
          <AlertCircle size={16} color="#ef4444" />
          <span style={{ color: '#ef4444' }}>{errorCount} {errorCount === 1 ? 'Error' : 'Errors'}</span>
        </>
      ) : warningCount > 0 ? (
        <>
          <AlertCircle size={16} color="#f59e0b" />
          <span style={{ color: '#f59e0b' }}>{warningCount} {warningCount === 1 ? 'Warning' : 'Warnings'}</span>
        </>
      ) : (
        <>
          <CheckCircle2 size={16} color="#10b981" />
          <span>Ready for Export</span>
        </>
      )}
    </button>
  );
};
