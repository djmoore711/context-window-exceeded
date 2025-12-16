# DJ Moore - Personal Portfolio

A modern, minimalist portfolio website built with Nuxt 4 and deployed on GitHub Pages. Features a monochrome design with responsive layout and optimized performance.

## ✨ Features

- **Modern Tech Stack**: Built with Nuxt 4, Vue 3, and TypeScript
- **Static Site Generation**: Optimized for GitHub Pages deployment
- **Content Management**: Powered by Nuxt Content for easy content updates
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **GitHub Integration**: Showcases selected GitHub repositories
- **Accessibility**: WCAG compliant with semantic HTML and ARIA labels
- **Performance**: Lazy loading, optimized images, and minimal CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/djmoore711/context-window-exceeded.git
cd context-window-exceeded

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:3000`

## 📝 Content Management

Content is managed through Markdown files in the `content/` directory:

- `content/index.md` - Homepage content
- `content/about.md` - About page content
- Add new pages by creating `.md` files in the content directory

## 🛠 Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run generate   # Generate static site
npm run preview    # Preview production build
```

### Project Structure

```
context-window-exceeded/
├── app/
│   ├── components/         # Vue components
│   │   └── GithubRepoShowcase.vue
│   ├── pages/             # Vue pages
│   │   ├── index.vue      # Homepage
│   │   └── [...slug].vue  # Dynamic content pages
│   └── app.vue           # Root component
├── content/               # Markdown content
│   ├── index.md
│   └── about.md
├── public/               # Static assets
│   ├── assets/
│   └── .nojekyll
├── .github/workflows/    # GitHub Actions
│   └── deploy.yml
├── nuxt.config.ts       # Nuxt configuration
└── package.json         # Dependencies
```

## 🚀 Deployment

### GitHub Pages (Automatic)

This project is configured for automatic deployment to GitHub Pages:

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Site will be available at `https://djmoore711.github.io/context-window-exceeded/`

### Manual Deployment

```bash
# Generate static site
npm run generate

# Deploy the .output/public directory to your hosting provider
```

### Deployment Configuration

The site is configured for GitHub Pages deployment with:

- `baseURL: '/context-window-exceeded/'` in `nuxt.config.ts`
- GitHub Actions workflow in `.github/workflows/deploy.yml`
- Static generation with `nuxt generate --preset github-pages`

## 🎨 Customization

### Updating Personal Information

Edit `app/pages/index.vue` to update:
- Personal details and bio
- Skills and capabilities
- Work experience/case studies
- Contact information

### Updating GitHub Repositories

Edit `app/components/GithubRepoShowcase.vue` to showcase different repositories:
- Update the `repos` array with your projects
- Modify the tech stack tags
- Adjust repository descriptions

### Styling

The site uses custom CSS with CSS custom properties. Main styles are in:
- `app/pages/index.vue` - Homepage styles
- `app/components/GithubRepoShowcase.vue` - Component styles

Theme colors are defined in CSS variables:
```css
:root {
  --bg: #0b0b0c;      /* Background */
  --fg: #f4f4f4;      /* Foreground/text */
  --muted: #b9b9b9;   /* Muted text */
  --border: rgba(255,255,255,.14); /* Borders */
}
```

## 🔧 Technical Details

### Build Process

- Uses Nuxt 4 with static site generation
- TypeScript for type safety
- Vue 3 Composition API
- CSS-in-Vue with scoped styles
- No external CSS frameworks

### Performance Optimizations

- Lazy loading for images
- Minimal JavaScript bundle
- Optimized CSS with custom properties
- Static asset optimization
- Semantic HTML for SEO

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 📄 License

© 2025 DJ Moore. All rights reserved.

## 📧 Contact

- Email: myself@darrellmoore.me
- LinkedIn: https://www.linkedin.com/in/mooredarrell/
- GitHub: https://github.com/djmoore711
