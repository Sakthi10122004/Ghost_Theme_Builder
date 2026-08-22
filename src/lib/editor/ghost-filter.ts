import type { GhostBinding } from './store';

/**
 * Serializes a GhostBinding filter object into a raw Ghost Handlebars filter string.
 * Example inputs:
 * { tag: ["design", "coding"], featured: true } -> "tag:[design,coding]+featured:true"
 * { tag: ["news"], excludeId: true } -> "tag:news+id:-{{id}}"
 */
export function serializeGhostFilter(filter: GhostBinding['filter']): string {
  if (!filter) return '';

  const parts: string[] = [];

  // 1. Tags
  if (filter.tag && filter.tag.length > 0) {
    if (filter.tag.length === 1) {
      parts.push(`tag:${filter.tag[0]}`);
    } else {
      parts.push(`tag:[${filter.tag.join(',')}]`);
    }
  }

  // 2. Author
  if (filter.author) {
    parts.push(`author:${filter.author}`);
  }

  // 3. Featured flag
  if (filter.featured !== undefined) {
    parts.push(`featured:${filter.featured}`);
  }

  // 4. Exclude current ID (useful for "Related Posts" queries)
  if (filter.excludeId) {
    parts.push(`id:-{{id}}`);
  }

  // Combine with AND (+) operator
  return parts.join('+');
}
