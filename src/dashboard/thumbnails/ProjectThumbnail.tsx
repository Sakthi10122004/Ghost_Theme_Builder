import React, { useEffect, useState, useRef } from 'react';
import { toJpeg } from 'html-to-image';
import { ProjectRecord } from '../projectsRepository';
import { PreviewRenderer } from '../../preview/PreviewRenderer';
import { ThumbnailCache } from './ThumbnailCache';

interface Props {
  project: ProjectRecord;
}

/**
 * Client-side thumbnail generation strategy.
 * 
 * It mounts a visually hidden, scaled PreviewRenderer, captures its DOM node
 * via html-to-image, caches the result using ThumbnailCache, and then displays
 * the resulting image.
 */
export const ProjectThumbnail: React.FC<Props> = ({ project }) => {
  const cacheKey = ThumbnailCache.generateKey(project.id, project.updatedAt);
  const [dataUrl, setDataUrl] = useState<string | null>(ThumbnailCache.get(cacheKey));
  const [isGenerating, setIsGenerating] = useState(!dataUrl);
  const hiddenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If we already have the cache for this version, do nothing
    if (ThumbnailCache.get(cacheKey)) {
      setIsGenerating(false);
      return;
    }

    setIsGenerating(true);
    let mounted = true;

    // Small delay to ensure React has painted the hidden DOM node
    const timeoutId = setTimeout(async () => {
      if (hiddenRef.current && mounted) {
        try {
          // Rasterize the DOM node to a JPEG data URL
          const url = await toJpeg(hiddenRef.current, { 
            quality: 0.8,
            width: 800,
            height: 600,
            style: { transform: 'scale(1)', transformOrigin: 'top left' }
          });
          
          if (mounted) {
            ThumbnailCache.set(cacheKey, url);
            ThumbnailCache.cleanupOldVersions(project.id, project.updatedAt);
            setDataUrl(url);
            setIsGenerating(false);
          }
        } catch (err) {
          console.error("Failed to generate thumbnail:", err);
          if (mounted) setIsGenerating(false);
        }
      }
    }, 100);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [project, cacheKey]);

  // Find the homepage template to render (or fallback to the first one)
  const homeTemplate = project.ast.templates.find(t => t.type === 'index') || project.ast.templates[0];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#f3f4f6', overflow: 'hidden' }}>
      
      {/* 1. The Displayed Thumbnail Image */}
      {dataUrl ? (
        <img 
          src={dataUrl} 
          alt={`Thumbnail for ${project.name}`} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
          {isGenerating ? 'Rendering...' : 'No Preview'}
        </div>
      )}

      {/* 2. The Hidden DOM Node used for generating the screenshot */}
      {!dataUrl && homeTemplate && (
        <div 
          style={{ 
            position: 'absolute', 
            top: '-10000px', 
            left: '-10000px', 
            width: '800px', 
            height: '600px',
            backgroundColor: '#ffffff'
          }}
        >
          <div ref={hiddenRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <PreviewRenderer template={homeTemplate} />
          </div>
        </div>
      )}
      
    </div>
  );
};
