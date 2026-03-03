# ✅ Testing Checklist for Case Study Image Upload Fix

## Pre-Flight Check

- [ ] Node.js 18+ installed
- [ ] pnpm installed
- [ ] VS Code opened in project root
- [ ] Browser has DevTools ready (F12)

## Installation

- [ ] Run `pnpm install`
- [ ] No errors during installation
- [ ] All dependencies installed successfully

## Start Development Server

- [ ] Run `pnpm run dev`
- [ ] Server starts without errors
- [ ] Can access `http://localhost:5173`
- [ ] Page loads successfully

## Admin Login

- [ ] Navigate to `http://localhost:5173/admin`
- [ ] Enter password: `admin123`
- [ ] Click "Нэвтрэх" (Login)
- [ ] Redirects to admin dashboard
- [ ] See tabs: Content, Case Studies, Settings

## Browser Console Setup

- [ ] Open DevTools (F12)
- [ ] Switch to Console tab
- [ ] Clear console (trash icon)
- [ ] Keep console open during testing

## Create New Case Study

- [ ] Click "Case Studies" tab
- [ ] Click "Case Study нэмэх" button
- [ ] Modal opens successfully
- [ ] Form displays correctly

## Upload Hero Image

### Upload Process
- [ ] Click "Upload Hero Image" button
- [ ] Image uploader modal opens
- [ ] See two tabs: "Upload" and "Unsplash"
- [ ] Select "Upload" tab
- [ ] Click upload area or drag image
- [ ] Choose image file (JPG, PNG, WEBP, or GIF)
- [ ] File is under 5MB
- [ ] See "Upload хийж байна..." (uploading) spinner
- [ ] See ✅ success alert
- [ ] Image preview appears
- [ ] Click "Сонгох" (Select) button
- [ ] Modal closes
- [ ] Hero image shows in form

### Console Logs (Upload)
- [ ] See: `💾 ImageUploader: Saving selected image URL: https://...`
- [ ] See: `🎯 CaseStudyEditModal: Received image URL: https://...`
- [ ] See: `✅ CaseStudyEditModal: Setting heroImage to: https://...`
- [ ] URL is complete Supabase Storage URL

## Fill Required Fields

- [ ] Project Title: Enter a title
- [ ] Your Role: Enter your role
- [ ] Timeline: Enter timeline (e.g., "3 Months")
- [ ] Platform: Enter platform (e.g., "Web & Mobile")
- [ ] Description: Enter description

## Optional: Add Skills

- [ ] Click "Skills & Deliverables" section
- [ ] Click "Add Skill" button
- [ ] Enter skill name
- [ ] Add 2-3 skills

## Optional: Add Mobile Mockups

- [ ] Click "Mobile Mockups" section
- [ ] Click "Upload UI Screens" button
- [ ] Upload 1-3 mobile screenshots
- [ ] See previews appear

## Save Case Study

- [ ] Click "Save Case Study" button
- [ ] Modal closes

### Console Logs (Save)
- [ ] See: `💾 CaseStudyEditModal: Saving formData: {...}`
- [ ] See: `🖼️ CaseStudyEditModal: heroImage in formData: https://...`
- [ ] See: `🔄 AdminDashboard: Saving case study...`
- [ ] See: `🖼️ Hero image in save: https://...`
- [ ] See: `📝 Updating case study: [ID] with data: {...}`
- [ ] See: `🖼️ Hero image being saved: https://...`
- [ ] See: `📝 Saving case studies: 1 items`
- [ ] See: `✅ Case studies synced to backend`
- [ ] See: `⏳ Waiting for auto-sync to complete...`
- [ ] See: `🔄 Refetching data from backend...`
- [ ] See: `📦 Fetched case studies: 1`
- [ ] See: `🖼️ First case study heroImage: https://...`
- [ ] See: `✅ Case studies state updated with 1 items`

### Visual Confirmation
- [ ] See success toast: "✅ Case study амжилттай нэмэгдлээ!"
- [ ] Case study appears in list
- [ ] Hero image visible in card
- [ ] Project title displays
- [ ] All data visible

## Test Persistence (CRITICAL!)

### Before Refresh
- [ ] Hero image visible in case study card
- [ ] Note the image URL from console
- [ ] Take screenshot if needed

### Page Refresh
- [ ] Press F5 or click browser refresh
- [ ] Wait for page to reload
- [ ] Admin login persists (stays logged in)
- [ ] Navigate back to Case Studies tab

### Console Logs (After Refresh)
- [ ] See: `🔄 Refetch response: {success: true, data: {...}}`
- [ ] See: `📦 Fetched case studies: 1`
- [ ] See: `🖼️ First case study heroImage: https://...`
- [ ] URL matches the original URL

### Visual Confirmation (After Refresh)
- [ ] ✅ Hero image STILL visible in card
- [ ] ✅ Project title still there
- [ ] ✅ All data still there
- [ ] ✅ Mobile mockups still there (if added)

## Edit Existing Case Study

- [ ] Click "Edit" button on case study
- [ ] Modal opens with existing data
- [ ] Hero image displays in preview
- [ ] Change project title
- [ ] Click "Save Case Study"
- [ ] See success toast
- [ ] Changes reflected in list
- [ ] Refresh page (F5)
- [ ] ✅ Changes persist after refresh

## Delete Case Study (Optional)

- [ ] Click "Delete" button
- [ ] Confirm deletion
- [ ] Case study removed from list
- [ ] Refresh page
- [ ] Case study stays deleted

## LocalStorage Check

- [ ] Open DevTools → Application tab
- [ ] Navigate to Storage → Local Storage
- [ ] Find: `portfolio_case_studies`
- [ ] Click to view value
- [ ] ✅ Should see array with case study data
- [ ] ✅ Should see heroImage URL in the data

## Network Tab Check

- [ ] Open DevTools → Network tab
- [ ] Filter: "caseStudies"
- [ ] Find PUT request to `/portfolio/caseStudies`
- [ ] Click to view request
- [ ] Check Payload tab
- [ ] ✅ Should see heroImage URL in request body
- [ ] Find GET request to `/portfolio`
- [ ] Click to view response
- [ ] Check Response tab
- [ ] ✅ Should see heroImage URL in response data

## Final Verification

- [ ] ✅ Can upload images
- [ ] ✅ Images display in preview
- [ ] ✅ Can save case study
- [ ] ✅ Success notification appears
- [ ] ✅ Case study appears in list with image
- [ ] ✅ Page refresh preserves images
- [ ] ✅ Can edit and save again
- [ ] ✅ Edits persist after refresh
- [ ] ✅ Console shows complete log trail
- [ ] ✅ No errors in console

## Common Issues to Check For

### Image Not Uploading
- [ ] Check file size (must be < 5MB)
- [ ] Check file type (JPG, PNG, WEBP, GIF only)
- [ ] Check network tab for upload errors
- [ ] Check console for error messages

### Image Disappears After Refresh
- [ ] Check console logs - where does URL become empty?
- [ ] Check Network tab - is GET request returning data?
- [ ] Check LocalStorage - is data there?
- [ ] Clear browser cache and try again

### Save Button Not Working
- [ ] Check console for errors
- [ ] Verify all required fields filled
- [ ] Check Network tab for failed requests

## Success Criteria

✅ **PASS**: Image uploads → saves → persists after refresh
❌ **FAIL**: Image disappears after refresh

If FAIL:
1. Check console logs at exact step where URL is lost
2. Share console logs
3. Check DEBUGGING_GUIDE.md

## Bonus Tests

### Multiple Images
- [ ] Create case study with 3+ mobile mockups
- [ ] Save
- [ ] Refresh
- [ ] ✅ All mockups persist

### Multiple Case Studies
- [ ] Create 3 different case studies
- [ ] Each with different hero image
- [ ] Save all
- [ ] Refresh
- [ ] ✅ All images persist

### Featured Settings
- [ ] Open "Featured Project Display" section
- [ ] Toggle "Display on homepage"
- [ ] Add tags
- [ ] Save
- [ ] Refresh
- [ ] ✅ Settings persist

## 🎉 Test Complete!

If all checkboxes are ✅, the fix is working perfectly!

If any checkbox is ❌, refer to:
- `DEBUGGING_GUIDE.md` for detailed troubleshooting
- `VSCODE_SETUP_GUIDE.md` for setup help
- Console logs for error messages
