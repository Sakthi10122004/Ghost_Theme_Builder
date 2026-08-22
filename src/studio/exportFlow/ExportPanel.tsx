import React from 'react';
import { X } from 'lucide-react';
import { useAstHistory } from '../../state/astHistory';
import { astValidator } from '../../compiler/pipeline/01-astValidator';
import { ValidationIssue } from '../../compiler/validation/sharedTypes';
import { useEditorStore } from '../../state/editorStore';

interface Props {
  onClose: () => void;
}

export const ExportPanel: React.FC<Props> = ({ onClose }) => {
  const present = useAstHistory(state => state.present);
  const setSelection = useEditorStore(state => state.setSelection);
  const [layer1Issues, setLayer1Issues] = React.useState<ValidationIssue[]>([]);
  const [layer23Issues, setLayer23Issues] = React.useState<ValidationIssue[]>([]);
  const [isCompiling, setIsCompiling] = React.useState(false);
  const [downloadUrl, setDownloadUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Run Layer 1 immediately
    const l1 = astValidator(present);
    setLayer1Issues(l1);

    if (l1.some(i => i.severity === 'error')) {
      return; // Do not run remote compile if Layer 1 fails
    }

    // Run backend compile (Layers 2 & 3)
    let isMounted = true;
    const runCompile = async () => {
      setIsCompiling(true);
      try {
        const res = await fetch('/api/projects/compile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(present)
        });
        const data = await res.json();
        if (isMounted) {
          if (data.issues) {
            setLayer23Issues(data.issues);
          }
          if (data.downloadUrl) {
            setDownloadUrl(data.downloadUrl);
          }
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setLayer23Issues([{
            id: 'compile-failed',
            layer: 2,
            severity: 'error',
            checkName: 'Compiler Error',
            message: err instanceof Error ? err.message : 'Unknown compiler error'
          }]);
        }
      } finally {
        if (isMounted) setIsCompiling(false);
      }
    };
    runCompile();
    
    return () => { isMounted = false; };
  }, [present]);

  const allIssues = [...layer1Issues, ...layer23Issues];
  const hasErrors = allIssues.some(i => i.severity === 'error');

  const handleIssueClick = (issue: ValidationIssue) => {
    if (issue.location?.sectionId) {
      setSelection(issue.location.templateId || null, issue.location.sectionId);
      onClose(); // Close panel so user can edit the section
    }
  };

  return (
    <div style={{
      position: 'fixed', top: '64px', right: '16px',
      width: '400px', backgroundColor: 'white',
      borderRadius: '8px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
      border: '1px solid #e2e8f0', zIndex: 100,
      display: 'flex', flexDirection: 'column',
      maxHeight: 'calc(100vh - 80px)'
    }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>Export Validation</h2>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
          <X size={20} />
        </button>
      </div>
      
      <div style={{ padding: '16px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <LayerSection layer={1} title="Layer 1: Builder Checks" issues={layer1Issues} onClick={handleIssueClick} isLoading={false} />
        <LayerSection layer={2} title="Layer 2: Compiler Checks" issues={layer23Issues.filter(i => i.layer === 2)} onClick={handleIssueClick} isLoading={isCompiling} />
        <LayerSection layer={3} title="Layer 3: GScan Checks" issues={layer23Issues.filter(i => i.layer === 3)} onClick={handleIssueClick} isLoading={isCompiling} />
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
        <button
          disabled={hasErrors || isCompiling || !downloadUrl}
          onClick={() => {
            if (downloadUrl) window.location.href = downloadUrl;
          }}
          style={{
            width: '100%', padding: '10px', borderRadius: '6px',
            backgroundColor: hasErrors || isCompiling ? '#94a3b8' : '#4f46e5',
            color: 'white', border: 'none', fontWeight: 600, cursor: hasErrors || isCompiling ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {isCompiling ? 'Compiling...' : hasErrors ? 'Fix errors to download' : 'Download Theme ZIP'}
        </button>
      </div>
    </div>
  );
};

const LayerSection = ({ layer, title, issues, onClick, isLoading }: { layer: number, title: string, issues: ValidationIssue[], onClick: (i: ValidationIssue) => void, isLoading: boolean }) => {
  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');
  
  let statusIcon = '⏳';
  if (!isLoading) {
    statusIcon = errors.length > 0 ? '❌' : '✅';
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '1.2rem' }}>{statusIcon}</span>
        <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>{title}</h3>
      </div>
      
      {!isLoading && issues.length === 0 && (
        <div style={{ fontSize: '0.8125rem', color: '#64748b', marginLeft: '32px' }}>Passed smoothly.</div>
      )}

      {issues.map((issue, idx) => (
        <div 
          key={issue.id + idx} 
          onClick={() => onClick(issue)}
          style={{
            marginLeft: '32px', marginBottom: '8px', padding: '10px',
            borderRadius: '6px', backgroundColor: issue.severity === 'error' ? '#fef2f2' : '#fffbeb',
            border: `1px solid ${issue.severity === 'error' ? '#fecaca' : '#fde68a'}`,
            cursor: issue.location ? 'pointer' : 'default',
            transition: 'all 0.2s'
          }}
        >
          <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: issue.severity === 'error' ? '#991b1b' : '#92400e', marginBottom: '4px' }}>
            {issue.checkName}
          </div>
          <div style={{ fontSize: '0.75rem', color: issue.severity === 'error' ? '#b91c1c' : '#b45309' }}>
            {issue.message}
          </div>
          {issue.location && (
            <div style={{ fontSize: '0.6875rem', color: '#64748b', marginTop: '6px', textDecoration: 'underline' }}>
              Click to fix
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
