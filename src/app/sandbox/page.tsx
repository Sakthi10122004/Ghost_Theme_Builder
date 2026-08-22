"use client";

import React, { useState } from 'react';
import { useAstHistory } from '../../state/astHistory';
import { PreviewRenderer } from '../../preview/PreviewRenderer';
import { isValidBinding, createBinding } from '../../ast/bindingRegistry';
import { Section } from '../../ast/types';
import { defaultDesignTokens } from '../../designSystem/defaultTokens';

export default function SandboxPage() {
  const { present, past, future, addSection, undo, redo, removeSection } = useAstHistory();
  const [validationLogs, setValidationLogs] = useState<string[]>([]);

  const activeTemplate = present.templates[0];

  const handleAddSection = () => {
    const newSection: Section = {
      id: `sec-${Date.now()}`,
      type: 'text-block',
      name: 'Dynamic Text Block',
      props: {
        content: { kind: 'static', value: 'This is a new section added via Sandbox!' },
      },
      styles: {
        padding: '24px 64px',
        color: '#2563eb',
        fontWeight: 'bold',
      },
      responsiveStyles: {}
    };
    
    addSection(activeTemplate.id, newSection);
  };

  const handleRemoveLastSection = () => {
    if (activeTemplate.sections.length === 0) return;
    const lastSection = activeTemplate.sections[activeTemplate.sections.length - 1];
    removeSection(activeTemplate.id, lastSection.id);
  };

  const testBindingRegistry = () => {
    const logs: string[] = [];
    logs.push("--- Testing Binding Registry ---");
    
    // 1. Type level test (uncomment to see TS error)
    // const badBinding = createBinding('post', 'invalid_field');
    
    // 2. Runtime validation test (simulate parsed JSON from backend)
    try {
      const parsedData = { kind: 'binding', source: 'post', field: 'invalid_field' };
      if (!isValidBinding(parsedData)) {
        logs.push("✅ Validation correctly rejected: { source: 'post', field: 'invalid_field' }");
      } else {
        logs.push("❌ Validation failed to reject invalid binding.");
      }
    } catch (e: any) {
      logs.push(`Error: ${e.message}`);
    }

    try {
      const validData = { kind: 'binding', source: 'post', field: 'title' };
      if (isValidBinding(validData)) {
        logs.push("✅ Validation correctly accepted: { source: 'post', field: 'title' }");
      } else {
        logs.push("❌ Validation incorrectly rejected valid binding.");
      }
    } catch (e: any) {
      logs.push(`Error: ${e.message}`);
    }
    
    setValidationLogs(logs);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Sidebar Controls */}
      <div style={{ width: '350px', borderRight: '1px solid #ccc', padding: '24px', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Phase 0 Sandbox</h2>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={undo} 
            disabled={past.length === 0}
            style={{ padding: '8px 12px', cursor: past.length ? 'pointer' : 'not-allowed', opacity: past.length ? 1 : 0.5 }}
          >
            Undo
          </button>
          
          <button 
            onClick={redo} 
            disabled={future.length === 0}
            style={{ padding: '8px 12px', cursor: future.length ? 'pointer' : 'not-allowed', opacity: future.length ? 1 : 0.5 }}
          >
            Redo
          </button>
        </div>

        <hr style={{ width: '100%', borderColor: '#e5e7eb' }} />
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleAddSection} style={{ padding: '8px 12px', cursor: 'pointer' }}>
            Add Section
          </button>
          
          <button onClick={handleRemoveLastSection} style={{ padding: '8px 12px', cursor: 'pointer' }}>
            Remove Last Section
          </button>
        </div>
        
        <hr style={{ width: '100%', borderColor: '#e5e7eb' }} />
        
        <button onClick={testBindingRegistry} style={{ padding: '8px 12px', cursor: 'pointer', backgroundColor: '#e0e7ff', border: '1px solid #c7d2fe' }}>
          Test Registry Enforcement
        </button>
        
        {validationLogs.length > 0 && (
          <div style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '12px', borderRadius: '4px', fontSize: '12px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
            {validationLogs.join('\n')}
          </div>
        )}
        
      </div>
      
      {/* Main Preview Area */}
      <div style={{ flex: 1, backgroundColor: '#fff', overflowY: 'auto' }}>
        {activeTemplate ? (
          <PreviewRenderer template={activeTemplate} designTokens={defaultDesignTokens} />
        ) : (
          <div style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
            No Template Active
          </div>
        )}
      </div>

    </div>
  );
}
