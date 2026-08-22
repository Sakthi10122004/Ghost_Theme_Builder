import { z } from 'zod';
import type { GhostBinding } from './types';

// Define the valid fields for each source using TypeScript tuples.
export const VALID_BINDINGS = {
  post: ['title', 'excerpt', 'feature_image', 'published_at', 'url', 'authors', 'tags'] as const,
  site: ['title', 'description', 'logo', 'navigation'] as const,
  author: ['name', 'bio', 'profile_image'] as const,
  tag: ['name', 'description'] as const,
};

// --- TypeScript Narrowing ---
// Discriminated union types allowing TypeScript to enforce correct source/field pairings.
export type ValidPostBinding = { kind: 'binding'; source: 'post'; field: typeof VALID_BINDINGS.post[number] };
export type ValidSiteBinding = { kind: 'binding'; source: 'site'; field: typeof VALID_BINDINGS.site[number] };
export type ValidAuthorBinding = { kind: 'binding'; source: 'author'; field: typeof VALID_BINDINGS.author[number] };
export type ValidTagBinding = { kind: 'binding'; source: 'tag'; field: typeof VALID_BINDINGS.tag[number] };

export type StrictGhostBinding = 
  | ValidPostBinding 
  | ValidSiteBinding 
  | ValidAuthorBinding 
  | ValidTagBinding;

// --- Runtime Validation (Zod) ---
// We create specific literal unions for Zod schemas to ensure parity with TS types.

const postSchema = z.object({
  kind: z.literal('binding'),
  source: z.literal('post'),
  field: z.enum(['title', 'excerpt', 'feature_image', 'published_at', 'url', 'authors', 'tags'])
});

const siteSchema = z.object({
  kind: z.literal('binding'),
  source: z.literal('site'),
  field: z.enum(['title', 'description', 'logo', 'navigation'])
});

const authorSchema = z.object({
  kind: z.literal('binding'),
  source: z.literal('author'),
  field: z.enum(['name', 'bio', 'profile_image'])
});

const tagSchema = z.object({
  kind: z.literal('binding'),
  source: z.literal('tag'),
  field: z.enum(['name', 'description'])
});

export const ghostBindingSchema = z.discriminatedUnion('source', [
  postSchema,
  siteSchema,
  authorSchema,
  tagSchema,
]);

/**
 * Validates whether an unknown object is a strictly valid GhostBinding.
 * Rejects unregistered bindings at runtime.
 */
export function isValidBinding(binding: unknown): binding is StrictGhostBinding {
  const result = ghostBindingSchema.safeParse(binding);
  if (!result.success) {
    console.error("Invalid GhostBinding detected:", result.error.issues);
  }
  return result.success;
}

/**
 * The ONLY sanctioned way to create a GhostBinding.
 * Enforces correct Source/Field pairs via TypeScript overloaded signatures,
 * and ensures it passes runtime validation.
 */
export function createBinding(source: 'post', field: typeof VALID_BINDINGS.post[number]): StrictGhostBinding;
export function createBinding(source: 'site', field: typeof VALID_BINDINGS.site[number]): StrictGhostBinding;
export function createBinding(source: 'author', field: typeof VALID_BINDINGS.author[number]): StrictGhostBinding;
export function createBinding(source: 'tag', field: typeof VALID_BINDINGS.tag[number]): StrictGhostBinding;
export function createBinding(source: any, field: any): StrictGhostBinding {
  const binding = { kind: 'binding', source, field };
  
  if (!isValidBinding(binding)) {
    throw new Error(`Cannot create binding. Invalid combination: ${source}.${field}`);
  }
  
  return binding;
}
