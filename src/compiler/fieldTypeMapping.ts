export function mapFieldTypeToGhost(type: string): string {
  switch (type) {
    case 'image':
      return 'image';
    case 'color':
      return 'color';
    case 'boolean':
      return 'boolean';
    case 'select':
      return 'select';
    case 'number':
    case 'text':
    default:
      return 'text';
  }
}
