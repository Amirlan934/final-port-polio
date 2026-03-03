# 🎨 Professional UI/UX Designer Portfolio

A premium, dark-themed portfolio website built with React, TypeScript, Tailwind CSS, and Motion (Framer Motion). Features a cinematic, immersive experience with parallax scrolling, scroll-triggered animations, and a full admin CMS powered by Supabase.

![Portfolio Status](https://img.shields.io/badge/Status-Ready%20For%20Development-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.12-38bdf8)

---

## ✨ Features

### 🎯 Frontend
- **Hero Section** - Animated entrance with portrait flip card effect
- **Intro Section** - Personal statement with animated statistics
- **Services** - Interactive service cards with hover effects
- **Featured Projects** - Showcase of professional case studies
- **Testimonials** - Client feedback carousel
- **Contact** - Integrated contact form with backend
- **Responsive Design** - Mobile-first, works on all devices
- **Smooth Animations** - Motion-powered transitions
- **Dark Theme** - Premium purple accent (#A78BFA)

### 🔐 Admin Dashboard
- Password-protected admin panel (`/admin`)
- Edit all homepage content dynamically
- Manage services (CRUD operations)
- Create and edit case studies
- Upload images to Supabase Storage
- View contact form submissions
- Toggle featured projects
- Real-time content updates

### 🗄️ Backend Integration
- Supabase database (KV store for flexible data)
- Supabase Storage for image uploads
- Image compression for optimized performance
- RESTful API endpoints
- Contact form submission handling
- Persistent data across page refreshes

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or pnpm
- VS Code (recommended)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   ```
   http://localhost:5173
   ```

4. **Access admin dashboard**
   ```
   URL: http://localhost:5173/admin
   Password: admin123
   ```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 5173 |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run type-check` | Check TypeScript types without emitting |
| `npm run lint` | Run ESLint on all TypeScript files |
| `npm run format` | Format code with Prettier |

---

## 🎨 Tech Stack

### Core
- **React 18.3.1** - UI library with hooks
- **TypeScript 5.9.3** - Type safety and IntelliSense
- **Vite 6.3.5** - Fast build tool with HMR
- **React Router 7.13.0** - Client-side routing

### Styling
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Motion 12.23.24** - Production-ready animation library (Framer Motion)
- **Tailwind Merge** - Merge Tailwind classes efficiently

### UI Components
- **Radix UI** - Accessible, unstyled component primitives
- **Material UI 7.3.5** - Additional React components
- **Lucide React** - Beautiful SVG icons

### Backend
- **Supabase 2.97.0** - Backend as a service
  - PostgreSQL database
  - Real-time subscriptions
  - Storage for file uploads
  - Authentication ready
- **Hono** - Lightweight web framework for Edge Functions
- **Browser Image Compression** - Client-side image optimization

### Development Tools
- **ESLint 10.0.2** - Linting with TypeScript support
- **Prettier 3.8.1** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

---

## 📁 Project Structure

```
/
├── .vscode/                      # VS Code configuration
│   ├── settings.json             # Editor settings
│   └── extensions.json           # Recommended extensions
├── src/
│   ├── app/
│   │   ├── App.tsx               # Main app with routing
│   │   ├── components/           # React components
│   │   │   ├── ui/               # Reusable UI (Radix)
│   │   │   ├── figma/            # Figma integration
│   │   │   ├── PortfolioHero.tsx
│   │   │   ├── PortfolioServices.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── PortfolioContact.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   └── ...
│   │   ├── contexts/
│   │   │   └── PortfolioContext.tsx  # Global state
│   │   ├── pages/
│   │   │   ├── PortfolioHome.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── CaseStudyDetail.tsx
│   │   │   └── AllProjectsPage.tsx
│   │   └── utils/
│   │       └── motion.ts         # Animation utilities
│   ├── styles/
│   │   ├── index.css             # Main stylesheet
│   │   ├── theme.css             # CSS variables
│   │   ├── tailwind.css          # Tailwind imports
│   │   └── fonts.css             # Font imports
│   └── index.tsx                 # Entry point
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx         # API routes (Hono)
│           └── kv_store.tsx      # Database utilities
├── utils/
│   └── supabase/
│       └── info.tsx              # Supabase configuration
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── vite.config.ts                # Vite configuration
├── eslint.config.js              # ESLint configuration
├── .prettierrc                   # Prettier configuration
└── README.md                     # This file
```

---

## 🛠️ VS Code Setup

### Recommended Extensions
The project includes `.vscode/extensions.json` with recommended extensions:
- **ESLint** - Real-time linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind class suggestions
- **ES7+ React/Redux/React-Native snippets** - React code snippets
- **Auto Rename Tag** - Rename paired HTML/JSX tags
- **Path Intellisense** - Autocomplete file paths

### Features Enabled
- ✅ Format on save
- ✅ ESLint auto-fix on save
- ✅ Organize imports on save
- ✅ TypeScript IntelliSense
- ✅ React Hooks validation
- ✅ Tailwind class completion

---

## 🎯 Routes

| Route | Description |
|-------|-------------|
| `/` | Portfolio homepage |
| `/case-study/:id` | Case study detail page |
| `/all-projects` | All projects gallery |
| `/admin` | Admin dashboard (password protected) |

---

## 🔐 Admin Dashboard

### Access
- **URL**: `http://localhost:5173/admin`
- **Password**: `admin123`

### Features
1. **Hero Content Management**
   - Edit greeting, title, subtitle
   - Update descriptions and CTAs
   - Upload portrait image
   - Edit About Me flip card

2. **Services Management**
   - Add new services
   - Edit existing services
   - Delete services
   - Upload service images
   - Reorder services

3. **Case Studies**
   - Create new case studies
   - Edit project details
   - Upload hero images
   - Upload multiple mobile mockups
   - Set featured status
   - Rich project descriptions

4. **Contact Inquiries**
   - View all form submissions
   - Filter by status
   - Mark as read/replied
   - Delete inquiries
   - Export data (coming soon)

---

## 🎨 Customization

### Theme Colors
Edit `/src/styles/theme.css` to customize colors:
```css
:root {
  --color-primary: #A78BFA;     /* Purple accent */
  --color-background: #000000;  /* Black background */
  /* Add your custom colors */
}
```

### Tailwind Configuration
Using Tailwind CSS v4 (no config file needed). Custom styles in `theme.css`.

### Motion Animations
Animation utilities in `/src/app/utils/motion.ts`:
- Custom easing curves
- Stagger children animations
- Parallax effects

---

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

All components adapt gracefully to different screen sizes.

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel/Netlify
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables (if needed)

---

## 🧪 Testing

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Format Check
```bash
npm run format
```

---

## 📚 Documentation

- **VS_CODE_READY.md** - Complete VS Code setup guide
- **🇲🇳_МОНГОЛ_ЗААВАР.md** - Setup guide in Mongolian
- **✅_ALL_FIXED_CHECKLIST.md** - Comprehensive checklist
- **🎯_PROJECT_COMPLETE.md** - Detailed project summary
- **⚡_QUICK_START.txt** - Quick reference card

---

## 🛠️ Troubleshooting

### TypeScript Errors
```bash
npm run type-check
```

### ESLint Issues
```bash
npm run lint --fix
```

### Clean Install
```bash
rm -rf node_modules
npm install
```

### VS Code Not Detecting TypeScript
1. Open Command Palette (Cmd/Ctrl + Shift + P)
2. Type: "TypeScript: Select TypeScript Version"
3. Select: "Use Workspace Version"

---

## 📈 Performance

- **Fast Development**: Vite HMR updates in milliseconds
- **Optimized Builds**: Automatic code splitting
- **Image Optimization**: Browser-side compression before upload
- **Lazy Loading**: Routes are code-split automatically
- **CSS Optimization**: Tailwind purges unused styles

---

## 🤝 Contributing

This is a portfolio template project. Feel free to:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

## 📄 License

This project is open source and available for personal and commercial use.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **Vercel** - For Vite and other open-source tools
- **Tailwind Labs** - For Tailwind CSS
- **Radix UI** - For accessible components
- **Supabase** - For backend infrastructure
- **Motion Team** - For the animation library

---

## 📞 Support

If you encounter any issues:
1. Check the documentation files
2. Run `npm run type-check` for TypeScript errors
3. Run `npm run lint` for code issues
4. Check browser DevTools console

---

## ✨ Status

- ✅ All TypeScript errors fixed
- ✅ All dependencies installed
- ✅ ESLint configured
- ✅ Prettier configured
- ✅ VS Code optimized
- ✅ Backend integrated
- ✅ Admin dashboard functional
- ✅ Ready for development

---

**Built with ❤️ and lots of ☕**

**Ready to create something amazing? Start coding!** 🚀

---

## 📝 Version History

- **v0.0.1** - Initial release
  - Complete portfolio website
  - Admin CMS
  - Supabase integration
  - Full TypeScript support
  - VS Code ready
# final-port-polio
