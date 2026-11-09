# CODEBYT - Digital Innovation Agency

A modern, high-performance website for CODEBYT, a full-service technology powerhouse specializing in digital transformation, AI solutions, and innovative software development.

![CODEBYT](./public/logo.jpg)

## 🌟 Features

- **Modern UI/UX**: Built with a sleek, professional design featuring glass morphism effects and smooth animations
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Performance Optimized**: Fast loading times with optimized assets and code splitting
- **SEO Friendly**: Built with best SEO practices for better search engine visibility
- **Interactive Animations**: Smooth scroll animations powered by Framer Motion
- **Contact Form Integration**: Integrated with Formspree for seamless lead generation
- **Dark Mode Support**: Modern dark theme with careful attention to contrast and readability

## 🚀 Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first styling

### UI Components
- **shadcn/ui** - Beautifully designed components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### State Management & Forms
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Testing
- **Vitest** - Unit testing framework
- **Playwright** - E2E testing
- **Testing Library** - React testing utilities

## 📂 Project Structure

```
CODEBYT/
├── public/                 # Static assets
│   ├── harit.jpeg         # Team member images
│   ├── harshit.jpg
│   ├── mukesh img01.jpeg
│   ├── logo.jpg
│   └── ...
├── src/
│   ├── components/
│   │   ├── home/          # Homepage sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── ContactFormSection.tsx
│   │   │   └── ...
│   │   ├── ui/            # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── Layout.tsx
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Home page
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Client.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── lib/               # Utilities
│   │   └── utils.ts
│   ├── hooks/             # Custom hooks
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

## 🎯 Pages & Routes

- **Home (`/`)** - Hero section, services overview, testimonials, process, and contact form
- **About (`/about`)** - Company story, values, and leadership team with LinkedIn profiles
- **Services (`/services`)** - Detailed service offerings (Web Dev, Mobile Apps, AI, Cloud, etc.)
- **Portfolio (`/portfolio`)** - Showcase of completed projects
- **Clients (`/clients`)** - Client testimonials and success stories
- **Contact (`/contact`)** - Contact form and FAQ section

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CODEBYT
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:8080`

### Build

```bash
npm run build
# or
bun run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch
```

### Linting

```bash
npm run lint
```

## 🚀 Deployment

### Deploy to Netlify (Recommended)

Your project is **fully configured** for Netlify deployment with automated builds and SPA routing.

#### ⚡ Quick Deploy (Under 5 Minutes)

**Option 1: Netlify CLI**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to production
netlify deploy --prod
```

**Option 2: Git-based Deployment (Recommended for CI/CD)**
1. Push your code to a GitHub repository
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Netlify will auto-detect settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

#### 📋 Configuration

Netlify configuration is already set up in `netlify.toml`:
- ✅ Automatic SPA routing with redirects
- ✅ Build optimization
- ✅ Preview deployments for pull requests

#### 💰 Cost Estimate

**Netlify Free Tier:**
- ✅ FREE for personal projects
- ✅ Unlimited sites
- ✅ Includes SSL certificate
- ✅ Automatic deployments from Git
- ✅ Custom domains supported
- ✅ 100GB bandwidth/month
- ❌ Limited build minutes (100/month)

**Netlify Pro:** $19/month
- More build minutes
- Advanced collaboration features
- Higher bandwidth limits

#### ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Site loads without errors
- [ ] All pages accessible (/, /about, /services, /portfolio, /clients, /contact)
- [ ] Images load properly
- [ ] Contact form works
- [ ] Mobile responsive design works
- [ ] No console errors
- [ ] HTTPS enabled (green padlock)
- [ ] Lighthouse score > 90

#### 🔄 Alternative: Manual Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build and deploy
npm run build
netlify deploy --prod
```

#### 🆘 Troubleshooting

**Build fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**404 on page refresh:**
- This is normal for SPAs
- The `netlify.toml` file handles routing automatically
- Ensure `_redirects` rule is present

**Assets not loading:**
- Check that all asset paths are relative
- Verify build output in `dist/` folder

#### 🎯 Next Steps After Deployment

1. **Add Custom Domain** (Optional)
   - Go to Netlify → Site settings → Domain management
   - Add custom domain
   - SSL auto-provisioned

2. **Set Up Environment Variables**
   - Add API keys and secrets in Netlify dashboard
   - Go to Site settings → Build & deploy → Environment

3. **Enable Deploy Previews**
   - Connect GitHub for automatic preview deployments
   - Every pull request gets a unique preview URL

4. **Performance Tuning**
   - Enable Netlify CDN
   - Configure caching headers
   - Optimize images further

### Deploy to Other Platforms

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Manual Deployment
```bash
npm run build
# Deploy the contents of the 'dist' folder to your hosting provider
```

## 🎨 Design System

### Colors
The application uses a custom color palette defined in Tailwind configuration:
- Primary, Secondary, Accent colors
- Dark/Light mode support
- Gradient effects for headings

### Typography
- **Headings**: Space Grotesk font family
- **Body**: Inter font family

### Components
Reusable components built with Radix UI primitives and styled with Tailwind CSS:
- Buttons, Cards, Forms
- Dialogs, Modals, Sheets
- Navigation menus
- Toast notifications

## 📱 Key Features

### Leadership Team Section
- Displays team members with professional photos
- LinkedIn profile links for networking
- Hover effects and smooth animations

### Contact Integration
- Formspree integration for form submissions
- Real-time validation with Zod schemas
- Toast notifications for user feedback
- Multiple contact methods (email, phone, location)

### Responsive Navigation
- Mobile-friendly hamburger menu
- Smooth scroll navigation
- Active route highlighting

## 🔧 Configuration

### Vite Configuration
- Port: 8080
- Hot Module Replacement (HMR) enabled
- Path aliases configured (`@/` → `./src/`)

### Tailwind Configuration
- Custom container sizes
- Extended color palette
- Custom animations and keyframes
- Dark mode support

## 📊 Performance Metrics

- **Fast Loading**: Optimized bundle size with code splitting
- **Smooth Animations**: 60fps animations with Framer Motion
- **Accessible**: ARIA labels and keyboard navigation support
- **SEO Ready**: Semantic HTML and meta tags

## 👥 Team

- **Harit Garg** - Co-founder ([LinkedIn](https://www.linkedin.com/in/harit-garg1707/))
- **Mukesh Pal** - Co-founder & CTO ([LinkedIn](https://www.linkedin.com/in/mukprabhakar/))
- **Harshit** - Co-founder & CMO ([LinkedIn](https://www.linkedin.com/in/harshit-prajapati-9723b6311/))

## 📞 Contact Information

- **Email**: hello@codebyt.in
- **Phone**: +91 97184 17771 | +91 99250 97911
- **Location**: India
- **Website**: https://codebyt.in

## 📄 License

This project is proprietary and confidential. All rights reserved © 2026 CODEBYT.

---

**Made with ❤️ by Mukesh Pal**
