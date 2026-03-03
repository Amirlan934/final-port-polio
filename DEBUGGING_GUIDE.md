# Case Study Image Upload - Debugging Guide

## Problem
Images uploaded to case studies are not persisting after page refresh.

## Comprehensive Logging Added

I've added detailed console logging throughout the entire data flow. Here's what to check:

### Step-by-Step Testing Instructions

1. **Open Browser Console** (F12 → Console tab)
2. **Clear Console** to start fresh
3. **Go to Admin Dashboard** → Case Studies tab
4. **Edit or Create a Case Study**

### Expected Console Log Flow

When you upload a hero image, you should see these logs in order:

```
1. 📤 When uploading file to Supabase:
   - "Upload хийж байна..." (uploading spinner)
   - ✅ "Зураг амжилттай upload хийгдлээ!" (success alert)

2. 💾 When clicking "Сонгох" (Select) button in image uploader:
   "💾 ImageUploader: Saving selected image URL: [FULL_URL]"

3. 🎯 When image URL is received in modal:
   "🎯 CaseStudyEditModal: Received image URL: [URL] for target: hero"
   "✅ CaseStudyEditModal: Setting heroImage to: [URL]"

4. 💾 When clicking "Save Case Study":
   "💾 CaseStudyEditModal: Saving formData: {…}"
   "🖼️ CaseStudyEditModal: heroImage in formData: [URL]"
   "📱 CaseStudyEditModal: mobileMockups in formData: [COUNT] [ARRAY]"

5. 🔄 In AdminDashboard save callback:
   "🔄 AdminDashboard: Saving case study..."
   "🖼️ Hero image in save: [URL]"
   "📱 Mobile mockups in save: [COUNT]"

6. 📝 In PortfolioContext:
   "📝 Updating case study: [ID] with data: {…}"
   "🖼️ Hero image being saved: [URL]"
   "📱 Mobile mockups being saved: [COUNT] images"
   "💾 Updated case studies array: [ARRAY]"

7. 📝 Backend sync (after ~100ms):
   "📝 Saving case studies: [COUNT] items"
   "🖼️ First case study heroImage: [URL]"
   "📱 First case study mobileMockups: [COUNT]"
   "✅ Case studies updated"
   "✅ Case studies synced to backend"

8. ⏳ Wait and refetch:
   "⏳ Waiting for auto-sync to complete..."
   "🔄 Refetching data from backend..."

9. 🔄 Refetch response:
   "🔄 Refetch response: {success: true, data: {…}}"
   "📦 Fetched case studies: [COUNT]"
   "🖼️ First case study heroImage: [URL]"
   "📱 First case study mobileMockups: [COUNT]"
   "📋 Full first case study: {…}"
   "✅ Case studies state updated with [COUNT] items"
   "✅ Data refetched successfully"

10. ✅ Success toast:
    "✅ Case study амжилттай засагдлаа!" or "✅ Case study амжилттай нэмэгдлээ!"
```

## Where to Look for Issues

### If image URL is empty in step 2:
- Check if upload actually completed (step 1)
- Check if Supabase bucket was created
- Check network tab for `/upload-image` endpoint

### If heroImage is missing in step 4:
- Issue is in the modal's state management
- Check if `handleImageSelect` was called (step 3)
- Check if `formData` state was updated

### If heroImage is missing in step 6:
- Issue is in AdminDashboard onSave callback
- Check the data being passed to `updateProfessionalCaseStudy`

### If heroImage is missing in step 7:
- Issue is in the backend sync
- Check if useEffect is triggering
- Check network tab for PUT `/portfolio/caseStudies`

### If heroImage is missing in step 9:
- Issue is with backend storage or retrieval
- Check if KV store is saving correctly
- Check backend logs in network tab

### If heroImage is missing after page refresh:
- Clear browser cache and try again
- Check localStorage: `portfolio_case_studies`
- Check if refetch is happening on page load

## Common Issues

### 1. Image URL is a Supabase URL but disappears after refresh
**Cause:** Backend sync completed but refetch is not working
**Solution:** Check refetch logs (step 9)

### 2. Image preview shows but heroImage is empty when saving
**Cause:** `previewUrl` state is not being passed correctly
**Solution:** Check step 2-3 logs

### 3. All logs show correct URL but still disappears
**Cause:** Multiple state updates overwriting each other
**Solution:** Check if multiple refetches are happening

## Manual Inspection

### Check LocalStorage:
```javascript
// In browser console
JSON.parse(localStorage.getItem('portfolio_case_studies'))
```

### Check Backend Directly:
Open Network tab → Filter "caseStudies" → Check PUT and GET requests

### Check Supabase Storage:
Images should be in bucket: `portfolio-images-098d0831`

## Next Steps

After following this guide:

1. **Share the console logs** with exact step where heroImage is lost
2. **Take screenshot** of the Network tab showing the request/response
3. **Check localStorage** value before and after refresh

This will help pinpoint exactly where in the chain the image URL is being lost.

## Expected Behavior

✅ Upload image → Get Supabase URL
✅ Save case study → URL in formData
✅ Sync to backend → URL in request body
✅ Backend stores → URL in KV store
✅ Refetch → URL in response
✅ Page refresh → URL still there

If any step fails, the logs will show where!
