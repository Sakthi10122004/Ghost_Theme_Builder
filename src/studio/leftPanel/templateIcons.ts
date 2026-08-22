import { 
  Home, 
  FileText, 
  Tags, 
  User, 
  Layout, 
  AlertTriangle,
  Code
} from 'lucide-react';

export const templateIcons: Record<string, React.ElementType> = {
  'index': Home,
  'post': FileText,
  'page': Layout,
  'tag': Tags,
  'author': User,
  'error': AlertTriangle,
  'custom': Code,
  'default': Layout // Fallback
};
