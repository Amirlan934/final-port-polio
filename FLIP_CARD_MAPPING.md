# ✅ Flip Card & Admin Dashboard Perfect Mapping

## 🎯 Summary

The **Flip Card** on the main portfolio page now **perfectly matches** the Admin Dashboard's "About Me" section. Every field you enter in the admin is displayed exactly as-is on the flip card.

---

## 📍 Data Flow

```
Admin Dashboard (About Me Tab)
    ↓
  Database/Backend
    ↓
Portfolio Context
    ↓
Flip Card Component
```

---

## 🔗 Field Mapping

### **Flip Card контент** (Admin Dashboard) → **Flip Card Back** (Main Site)

| Admin Field | Label in Admin | Flip Card Display | Location |
|------------|----------------|-------------------|----------|
| `aboutSection.role` | Албан тушаал / Role | **ROLE** | Flip card back, top |
| `aboutSection.focus` | Чиглэл / Focus | **FOCUS** | Flip card back, middle |
| `aboutSection.experience` | Туршлага / Experience | **EXPERIENCE** | Flip card back, bottom |

---

## 🎨 Visual Example

### **Admin Dashboard Input:**
```
Албан тушаал / Role: UI/UX Designer
Туршлага / Experience: 3+ years
Чиглэл / Focus: Digital Product Design
```

### **Flip Card Display (Back Side):**
```
About Me
────────────────

ROLE
UI/UX Designer

FOCUS
Digital Product Design

EXPERIENCE
3+ years
```

---

## ✨ New Feature: Live Preview

The Admin Dashboard now includes a **live preview** showing exactly how your flip card will look:

```
┌─────────────────────────────────────────┐
│ ✨ Харагдах байдал (Flip Card-д ингэж  │
│    харагдана)                           │
│                                         │
│ ROLE                                    │
│ UI/UX Designer                          │
│                                         │
│ FOCUS                                   │
│ Digital Product Design                  │
│                                         │
│ EXPERIENCE                              │
│ 3+ years                                │
└─────────────────────────────────────────┘
```

This preview updates **in real-time** as you type!

---

## 📝 How It Works

### 1. **Flip Card Component** (`/src/app/components/FlipCard.tsx`)

Receives 3 props from `aboutSection`:
```tsx
<FlipCard
  frontImage={heroContent.portraitImage}
  backContent={{
    role: aboutSection.role,        // → ROLE
    focus: aboutSection.focus,      // → FOCUS
    experience: aboutSection.experience  // → EXPERIENCE
  }}
/>
```

### 2. **Admin Dashboard** (`/src/app/pages/AdminDashboard.tsx`)

Three input fields update `aboutSection`:
```tsx
// Role
<input 
  value={aboutSection.role}
  onChange={(e) => updateAboutSection({ role: e.target.value })}
/>

// Focus
<textarea 
  value={aboutSection.focus}
  onChange={(e) => updateAboutSection({ focus: e.target.value })}
/>

// Experience
<input 
  value={aboutSection.experience}
  onChange={(e) => updateAboutSection({ experience: e.target.value })}
/>
```

### 3. **Portfolio Context** (`/src/app/contexts/PortfolioContext.tsx`)

Syncs changes to backend automatically:
```tsx
useEffect(() => {
  localStorage.setItem('portfolio_about', JSON.stringify(aboutSection));
  
  // Sync to backend
  fetch(`${API_BASE}/portfolio/about`, {
    method: 'PUT',
    body: JSON.stringify({ aboutSection })
  });
}, [aboutSection]);
```

---

## 🎯 Testing the Mapping

### **Step 1: Go to Admin Dashboard**
```
URL: /admin
Password: admin123
Tab: About Me
```

### **Step 2: Fill in Flip Card Fields**
```
Албан тушаал / Role: Senior UI/UX Designer
Туршлага / Experience: 8+ years
Чиглэл / Focus: Creating digital experiences that drive growth
```

### **Step 3: Check Live Preview**
The preview box should show:
```
ROLE
Senior UI/UX Designer

FOCUS
Creating digital experiences that drive growth

EXPERIENCE
8+ years
```

### **Step 4: Go to Main Page**
```
URL: /
Action: Hover over portrait image → Card flips
```

The flip card back should show **EXACTLY** what you entered in admin!

---

## ✅ Verification Checklist

- [x] Admin fields map correctly to flip card
- [x] Live preview shows real-time updates
- [x] Data syncs to backend
- [x] Data persists on page refresh
- [x] Flip card shows empty state if no data
- [x] No hardcoded defaults
- [x] Perfect 1:1 mapping

---

## 🔧 Additional Mappings

### **Intro Section** (Also in About Me Tab)

| Admin Field | Display Location |
|------------|------------------|
| `aboutSection.mainStatement` | IntroSection - Large heading |
| `aboutSection.supportingText` | IntroSection - Subheading |

### **Stats** (Also in About Me Tab)

| Admin Field | Display Location |
|------------|------------------|
| `aboutSection.stats.projectsCount` | IntroSection - Stat #1 (number) |
| `aboutSection.stats.projectsLabel` | IntroSection - Stat #1 (label) |
| `aboutSection.stats.clientsCount` | IntroSection - Stat #2 (number) |
| `aboutSection.stats.clientsLabel` | IntroSection - Stat #2 (label) |
| `aboutSection.stats.yearsCount` | IntroSection - Stat #3 (number) |
| `aboutSection.stats.yearsLabel` | IntroSection - Stat #3 (label) |

---

## 🎉 Result

**Perfect synchronization between Admin Dashboard and Flip Card!**

- ✅ What you enter in admin = What displays on flip card
- ✅ No duplicate content
- ✅ No hardcoded text
- ✅ Live preview for instant feedback
- ✅ Real-time updates
- ✅ Backend persistence

---

## 💡 Tips

1. **Keep Role Short**: "UI/UX Designer", "Product Designer", etc.
2. **Experience Format**: "3+ years", "8 years", "10+ years", etc.
3. **Focus Detail**: Can be longer (1-2 sentences) describing your specialty
4. **Preview First**: Check the live preview before saving to see exact output
5. **Test Flip**: Hover over portrait on main page to see flip card

---

## 🐛 Troubleshooting

### **Issue: Flip card shows old data**
**Solution:** 
1. Go to `/admin`
2. Update the fields
3. Wait 2 seconds for auto-save
4. Refresh main page

### **Issue: Flip card is empty**
**Solution:**
1. Go to `/admin` → About Me tab
2. Fill in all 3 fields (Role, Focus, Experience)
3. Check live preview to confirm
4. Go to main page and hover portrait

### **Issue: Changes don't persist**
**Solution:**
1. Check browser console for sync errors
2. Backend might be offline (check "Failed to sync" errors)
3. Data is saved to localStorage as backup
4. Reload admin dashboard to verify data

---

## 📊 Complete About Me Section Structure

```
About Me Tab (Admin)
├── Flip Card контент
│   ├── Role → Flip Card Back
│   ├── Focus → Flip Card Back
│   └── Experience → Flip Card Back
│
├── Intro хэсэг
│   ├── Гол илэрхийлэл → IntroSection heading
│   └── Дэмжих текст → IntroSection subtext
│
└── Статистик
    ├── Төслийн тоо → IntroSection stat 1
    ├── Үйлчлүүлэгчдийн тоо → IntroSection stat 2
    └── Жилийн туршлага → IntroSection stat 3
```

---

## ✅ Final Confirmation

**Your flip card now perfectly matches your admin dashboard!**

Every character you type in the admin appears exactly on the flip card. The live preview gives you instant visual feedback, and all changes are automatically saved to the backend.

**Test it now:**
1. Go to `/admin`
2. Edit the 3 flip card fields
3. Watch the live preview update
4. Visit `/` and hover the portrait
5. **Perfect match!** ✨
