# Development Setup Guide

This document provides detailed information about the development setup and configuration for the DJ Moore Personal Portfolio.

## Environment Setup

### Node.js Requirements

- **Minimum**: Node.js 18.0.0
- **Recommended**: Node.js 20.x LTS
- **Package Manager**: npm 9+ (comes with Node.js 18+)

### OpenSSL Legacy Provider

The project uses `NODE_OPTIONS=--openssl-legacy-provider` in the development script for compatibility:

```bash
# This is already configured in package.json scripts
npm run dev  # Includes the flag automatically
```

**Why this is needed**: Some Node.js versions (especially v18) require the legacy OpenSSL provider for certain cryptographic operations used by Nuxt and its dependencies.

**Alternatives**:
1. Upgrade to Node.js 20+ (recommended)
2. Use the provided script with the flag
3. Set the flag manually: `NODE_OPTIONS=--openssl-legacy-provider npm run dev`

## Configuration Files

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# For local development
NUXT_APP_BASE_URL=/

# For GitHub Pages deployment
NUXT_APP_BASE_URL=/context-window-exceeded/
```

### Nuxt Configuration

Key settings in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  ssr: true,
  devtools: { enabled: false },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    buildAssetsDir: 'assets'
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/', '/blog']  // Only root and blog index
    }
  }
})
```

### Content Configuration

The `content.config.ts` configures Nuxt Content:

```typescript
export default defineContentConfig({
  experimental: {
    nativeSqlite: true
  },
  collections: {
    content: defineCollection({ type: 'page', source: '**' }),
    blog: defineCollection({ type: 'page', source: 'blog/**/*.md' })
  }
})
```

## Development Workflow

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Visit**: http://localhost:3000

4. **Hot reload**: Content changes in `content/` will auto-reload

### Content Management

- **Pages**: Add `.md` files to `content/` directory
- **Blog posts**: Add `.md` files to `content/blog/` with front matter
- **Images**: Place in `public/blog-images/[post-name]/`

### Building for Production

```bash
# Build static site
npm run generate

# Preview production build
npm run preview

# Build for server deployment
npm run build
```

## Deployment

### GitHub Pages (Current Setup)

- **Branch**: `8003830a`
- **Base URL**: `/context-window-exceeded/`
- **Build Command**: `nuxt build --preset github-pages`
- **Output**: `.output/public`

### Manual Deployment

1. Set `NUXT_APP_BASE_URL=/` in environment
2. Run `npm run generate`
3. Deploy `.output/public` directory

## Troubleshooting

### Common Issues

1. **OpenSSL Errors**:
   - Use Node.js 20+ or the legacy provider flag
   - Solution: `npm run dev` (includes flag)

2. **Build Fails on GitHub Pages**:
   - Check branch name (should be `8003830a`)
   - Verify `NUXT_APP_BASE_URL` is set in GitHub Pages settings

3. **Content Not Loading**:
   - Ensure proper front matter in Markdown files
   - Check file paths in `content.config.ts`

4. **Images Not Displaying**:
   - Place images in `public/` directory
   - Use absolute paths from root: `/images/filename.jpg`

### Development Tips

- Use the Nuxt DevTools by enabling in `nuxt.config.ts` if needed
- Content changes hot-reload automatically
- Static assets in `public/` are served as-is
- TypeScript errors will show in development console

## Project Structure

```
context-window-exceeded/
├── app/                    # Vue components and pages
│   ├── components/         # Reusable Vue components
│   ├── layouts/           # Layout components
│   └── pages/             # Page components
├── content/               # Markdown content
│   ├── blog/             # Blog posts
│   └── *.md              # Static pages
├── public/               # Static assets
├── .github/workflows/    # CI/CD configuration
├── .windsurf/           # IDE configuration
└── Configuration files:
    ├── nuxt.config.ts   # Nuxt settings
    ├── content.config.ts # Content module settings
    ├── package.json     # Dependencies and scripts
    └── tsconfig.json    # TypeScript configuration
```

## Performance Considerations

- Static site generation for optimal performance
- Lazy loading for images
- Minimal CSS with custom properties
- Prerendered routes configured in `nuxt.config.ts`

## Security Notes

- No server-side processing in production (static site)
- Environment variables are build-time only
- No sensitive data should be committed to repository
- Use `.env.example` for template environment variables
