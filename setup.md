# 🚀 Setup Instructions for VS Code

## Step 1: Open in VS Code

```bash
# Navigate to project directory
cd /path/to/your/project

# Open in VS Code
code .
```

## Step 2: Install Recommended Extensions

VS Code will prompt you to install recommended extensions. Click **Install All**.

Or install manually:
1. Press `Cmd/Ctrl + Shift + X`
2. Search and install:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript and JavaScript Language Features

## Step 3: Install Dependencies

Open integrated terminal in VS Code:
- Mac: `` Ctrl + ` ``
- Windows: `` Ctrl + ` ``

Then run:

```bash
pnpm install
```

Wait for installation to complete (may take 1-2 minutes).

## Step 4: Start Development Server

In the same terminal, run:

```bash
pnpm run dev
```

You should see:

```
VITE v6.3.5  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## Step 5: Open in Browser

Click on `http://localhost:5173/` or press `Cmd/Ctrl + Click`

## Step 6: Verify Everything Works

### Test Main Site
- Navigate to `http://localhost:5173/`
- You should see the portfolio homepage
- Scroll to see animations

### Test Admin Panel
1. Navigate to `http://localhost:5173/admin`
2. Enter password: `admin123`
3. Click "Нэвтрэх" (Login)
4. You should see the admin dashboard

### Test Image Upload
1. In admin, click "Case Studies" tab
2. Click "Case Study нэмэх" (Add Case Study)
3. Click "Upload Hero Image"
4. Upload an image
5. Fill in required fields
6. Click "Save Case Study"
7. Refresh page (F5)
8. ✅ Image should persist!

## Step 7: Open Browser Console

Press `F12` to open DevTools and check console for logs:
- Should see colorful emoji logs (💾, 🖼️, 📱, etc.)
- No red errors

## ✅ Success Checklist

- [ ] VS Code opened
- [ ] Extensions installed
- [ ] Dependencies installed (`pnpm install`)
- [ ] Dev server running (`pnpm run dev`)
- [ ] Site opens in browser
- [ ] No TypeScript errors in VS Code
- [ ] No console errors in browser
- [ ] Admin panel accessible
- [ ] Image upload works
- [ ] Images persist after refresh

## 🎉 You're Ready!

Start developing! The project is fully configured and ready.

## 💡 Pro Tips

### Auto-Save
Enable auto-save in VS Code:
- File → Auto Save

### Format on Save
Already configured! Your code will auto-format when you save.

### Terminal Shortcuts
- Open terminal: `` Ctrl + ` ``
- New terminal: `` Ctrl + Shift + ` ``
- Split terminal: `Cmd/Ctrl + \`

### TypeScript Intellisense
Hover over any component or function to see type information.

### Quick Navigation
- Open file: `Cmd/Ctrl + P`
- Go to symbol: `Cmd/Ctrl + Shift + O`
- Find in files: `Cmd/Ctrl + Shift + F`

## 🐛 Common Issues

### Issue: "pnpm: command not found"

**Solution:**
```bash
npm install -g pnpm
```

### Issue: Port 5173 already in use

**Solution:**
```bash
# Kill process on port 5173
# Mac/Linux:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F
```

### Issue: TypeScript errors in VS Code

**Solution:**
1. Press `Cmd/Ctrl + Shift + P`
2. Type "TypeScript: Restart TS Server"
3. Press Enter

### Issue: Module not found errors

**Solution:**
```bash
# Clean install
rm -rf node_modules
pnpm install
```

## 📚 Next Steps

- Read `README.md` for project overview
- Check `START_HERE.md` for detailed documentation
- See `TESTING_CHECKLIST.md` to verify all features

Happy coding! 🚀
