"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { projectsRepository, ProjectRecord } from '../../../dashboard/projectsRepository';
import { useAstHistory } from '../../../state/astHistory';
import { StudioShell } from '../../../studio/StudioShell';

export default function EditorPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;
  
  const setProject = useAstHistory(state => state.setProject);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated" && projectId) {
      // Load project from local stub repository
      const record = projectsRepository.get(projectId);
      
      if (!record) {
        setError(`Project "${projectId}" not found.`);
        return;
      }

      // Initialize the global AST history with this project
      setProject(record.ast);
      setIsLoaded(true);
    }
  }, [status, router, projectId, setProject]);

  if (status === "loading" || (!isLoaded && !error)) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f1f5f9' }}>
        <p style={{ color: '#64748b' }}>Loading Studio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f1f5f9' }}>
        <h2 style={{ color: '#ef4444', marginBottom: '16px' }}>Error</h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>{error}</p>
        <button 
          onClick={() => router.push('/dashboard')}
          style={{ padding: '8px 16px', backgroundColor: '#4f46e5', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Fully hand off to the Phase 2 Studio Shell
  return <StudioShell />;
}
