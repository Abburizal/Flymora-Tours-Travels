# Quick Test: Upload Fix Verification

**Purpose:** Verify file upload is working after fix

---

## 🧪 **Test Steps**

### **1. Check PHP Limits**

```bash
php -i | grep -E "upload_max_filesize|post_max_size"
```

**Expected:**
```
upload_max_filesize => 10M => 10M
post_max_size => 12M => 12M
```

✅ If you see these values → PHP limits applied correctly

---

### **2. Access Admin Panel**

```
http://127.0.0.1:8000/admin
```

**Login credentials:**
- Email: your admin email
- Password: your password

---

### **3. Test Image Upload**

**Steps:**
1. Go to: **Travel Management** → **Tours**
2. Click **Edit** on any tour
3. Scroll to **"Tour Gallery"** field
4. Click upload area or drag an image file

**Test Files:**
- ✅ Try uploading a **2-3MB image** (should work fast)
- ✅ Try uploading a **4-5MB image** (should still work)
- ❌ Try uploading a **>5MB image** (should show validation error)

**Expected Results:**
- ⏱️ Upload completes within **5-10 seconds**
- ✅ **Preview appears** immediately after upload
- ✅ **Can delete** uploaded image
- ✅ No infinite loading
- ✅ Page remains responsive

---

### **4. Test PDF Upload**

**Steps:**
1. Same tour edit page
2. Scroll to **"Custom Itinerary PDF"** field
3. Upload a PDF file

**Test Files:**
- ✅ Try uploading a **5MB PDF** (should work)
- ✅ Try uploading a **9MB PDF** (should work)
- ❌ Try uploading a **>10MB PDF** (should show error)

**Expected Results:**
- Upload completes successfully
- Can preview PDF (eye icon)
- Can download PDF
- No loading issues

---

### **5. Verify Files Saved**

**After upload:**
1. Click **Update** button to save tour
2. Refresh page or navigate away and back
3. **Verify:** Uploaded images/PDFs still there

**Check Storage:**
```bash
ls -lah storage/app/public/
```

Should see numbered folders with uploaded files

---

### **6. Test Frontend Download**

**Steps:**
1. Go to frontend tour detail:
   ```
   http://127.0.0.1:8000/tours/1
   ```

2. Click **"Download Itinerary PDF"** button

**Expected:**
- If custom PDF uploaded → Downloads custom file
- If no custom PDF → Downloads auto-generated PDF
- Download starts immediately (no hang)

---

## ✅ **Success Criteria**

All of these should be **TRUE:**

- [ ] PHP limits show 10M/12M
- [ ] Image upload completes in < 10 seconds
- [ ] PDF upload completes successfully
- [ ] No infinite loading spinner
- [ ] Files visible after save
- [ ] Can preview/download files
- [ ] Frontend download button works
- [ ] No console errors (F12)

---

## ❌ **If Still Failing**

### **Check Browser Console**

**Open DevTools (F12):**
- Go to **Console** tab
- Look for errors (red text)
- Copy error message

### **Check Network Tab**

**In DevTools:**
- Go to **Network** tab
- Try upload again
- Look for failed requests (red)
- Click failed request → check Response

### **Check Laravel Logs**

```bash
tail -20 storage/logs/laravel.log
```

Look for upload errors or exceptions

### **Verify .htaccess Applied**

```bash
cat public/.htaccess | grep "upload_max_filesize"
```

Should show the 10M limit

---

## 📝 **Report Results**

If tests pass: ✅ **Upload fix successful!**

If tests fail, report:
1. Which step failed
2. Error messages (console/logs)
3. File size being tested
4. Screenshots of error

---

**Test Date:** _____________  
**Tested By:** _____________  
**Result:** ✅ PASS / ❌ FAIL  
**Notes:** _____________________________
