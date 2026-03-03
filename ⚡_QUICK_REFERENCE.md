# ⚡ QUICK REFERENCE CARD

## 🚀 START APP
```bash
npm run dev
```
**URL:** `http://localhost:5173`

---

## 🔐 ADMIN ACCESS
**URL:** `http://localhost:5173/admin`  
**Password:** `admin123`

---

## 📁 KEY FILES

| File | Purpose |
|------|---------|
| `/src/app/App.tsx` | Main application & routing |
| `/src/app/contexts/PortfolioContext.tsx` | State management |
| `/src/app/pages/PortfolioHome.tsx` | Homepage |
| `/src/app/pages/AdminDashboard.tsx` | Admin CMS |
| `/supabase/functions/server/index.tsx` | Backend API |
| `/utils/supabase/info.tsx` | Supabase credentials |

---

## 🛠️ NPM COMMANDS

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run type-check` | Check TypeScript |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code |

---

## 🌐 ROUTES

| Route | Description |
|-------|-------------|
| `/` | Portfolio home |
| `/admin` | Admin dashboard |
| `/case-study/:id` | Case study detail |
| `/all-projects` | All projects grid |

---

## 🎨 KEY TECHNOLOGIES

- **React** 18.3.1
- **TypeScript** 5.9.3
- **Tailwind CSS** 4.1.12
- **Vite** 6.3.5
- **React Router** 7.13.0
- **Motion** 12.23.24 (Framer Motion)
- **Supabase** 2.97.0
- **Lucide React** (Icons)

---

## 🖼️ IMAGE UPLOAD

**Max Size:** 5MB  
**Formats:** PNG, JPG, WEBP, GIF  
**Storage:** Supabase Storage  
**Bucket:** `portfolio-images-098d0831`

---

## 📊 ADMIN FEATURES

- ✅ Edit Hero section
- ✅ Manage Services
- ✅ Create Case Studies
- ✅ Upload Images
- ✅ Manage Testimonials
- ✅ View Contact Forms
- ✅ Upload CV/Resume
- ✅ Edit About Section

---

## 🎯 QUICK FIXES

**Port busy:**
```bash
npm run dev -- --port 3000
```

**Clear cache:**
```bash
rm -rf node_modules .vite
npm install
```

**Type errors:**
```bash
npm run type-check
```

---

## ✅ STATUS

**Errors:** 0  
**Build:** Ready  
**Backend:** Connected  
**Status:** 100% Operational

---

## 🚀 START NOW!

```bash
npm run dev
```

Open: `http://localhost:5173`

**YOU'RE READY TO BUILD! 🎉**
