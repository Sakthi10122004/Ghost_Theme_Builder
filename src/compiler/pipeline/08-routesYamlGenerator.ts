export function routesYamlGenerator(): string {
  // Ghost minimal default routes.yaml
  return `routes:

collections:
  /:
    permalink: /{slug}/
    template: index

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
`;
}
