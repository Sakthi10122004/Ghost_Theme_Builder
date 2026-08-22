// Simple in-memory cache to avoid regenerating thumbnails constantly.
// In a real app, this might be backed by IndexedDB for persistence across reloads,
// since base64 data URLs can easily exceed localStorage quotas.
const memoryCache = new Map<string, string>();

/**
 * ThumbnailCache manages the storage and retrieval of generated thumbnails.
 */
export const ThumbnailCache = {
  /**
   * Generates a cache key based on project ID and last updated timestamp.
   * This ensures immediate invalidation when the project changes.
   */
  generateKey(projectId: string, updatedAt: string): string {
    return `${projectId}_${updatedAt}`;
  },

  get(key: string): string | null {
    return memoryCache.get(key) || null;
  },

  set(key: string, dataUrl: string): void {
    memoryCache.set(key, dataUrl);
  },

  // Helper to eagerly clear old thumbnails for a project to save memory
  cleanupOldVersions(projectId: string, currentUpdatedAt: string): void {
    const currentKey = this.generateKey(projectId, currentUpdatedAt);
    for (const key of memoryCache.keys()) {
      if (key.startsWith(`${projectId}_`) && key !== currentKey) {
        memoryCache.delete(key);
      }
    }
  }
};
