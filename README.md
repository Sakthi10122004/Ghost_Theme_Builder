# Ghost Theme Builder

A visual, drag-and-drop theme builder for Ghost CMS. Create production-ready, fully dynamic Ghost themes without writing any code.

## Features

- **Visual Drag & Drop Editor**: Powered by Puck, allowing you to visually construct pages with ease.
- **Dynamic Ghost Bindings**: Dedicated Ghost components (Site Title, Navigation, Post Feed, Author, Pagination) that map directly to Ghost's Handlebars helpers.
- **Production Theme Export**: Exports standard Ghost theme files (`.hbs`, `routes.yaml`, `package.json`, `index.css`) bundled in a standard `.zip` file ready for direct upload to your Ghost instance.
- **Advanced Design System**: Manage global variables, colors, typography, and custom settings (which map to `config.custom` in Ghost Admin).
- **Responsive Previews**: Switch seamlessly between Desktop, Tablet, and Mobile viewports.
- **Component Ecosystem**: Includes layout primitives (Sections, Grids) and standard UI elements (Cards, Buttons, Headings).

## Tech Stack

- **Framework**: Next.js (App Router)
- **Editor Engine**: `@puckeditor/core`
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS & Vanilla CSS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or compatible SQL database)

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone <repo-url>
   cd ghost-theme-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/ghost_theme_builder"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Initialize the database schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Architecture Highlights

### The Compiler Pipeline
The theme builder does not just spit out static HTML. It compiles your visual component tree into dynamic Ghost Handlebars templates (`.hbs`). 
1. **Design Tokens**: Generates `index.css` and maps your design system settings to standard Ghost Custom Settings.
2. **Handlebars Serialization**: Traverses the Puck component tree and converts React components into standard Handlebars helpers (e.g. `GhostPostFeed` compiles to `{{#foreach posts}}...{{/foreach}}`).
3. **Routing**: Analyzes page metadata (like `isCollection`) to dynamically output Ghost's `routes.yaml`.

### UI/UX Design
The interface is built to be a professional-grade design workspace:
- **Layers Panel**: Tree-view of the component structure with visual badges indicating Ghost data bindings.
- **Tabbed Properties Panel**: Contextually groups component configurations into Content, Style, Layout, and Ghost Binding tabs.
- **Default Workflows**: New pages are intelligently seeded with default structural elements (Header, Hero, Footer) instead of blank canvases.

## Contributing

Contributions are welcome. Please ensure that all components maintain strict separation between structural layout props and Ghost dynamic bindings.

## License

MIT
