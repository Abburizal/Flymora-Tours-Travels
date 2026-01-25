# Custom Itinerary PDF Upload - Admin Feature

**Feature Added:** January 26, 2026  
**Status:** ✅ COMPLETE

---

## 📋 **Overview**

Added powerful admin panel feature that allows administrators to **upload custom PDF itinerary files** for any tour. When a custom PDF is uploaded, it replaces the auto-generated itinerary. If no custom PDF exists, the system automatically generates one.

---

## 🎯 **Feature Goals**

1. ✅ Allow admin to upload custom professionally-designed PDFs
2. ✅ Override auto-generated itinerary when custom PDF exists
3. ✅ Provide visual indicator in admin panel
4. ✅ Seamless fallback to auto-generation
5. ✅ No changes required on frontend
6. ✅ Easy to update/delete custom PDFs

---

## 🛠️ **Implementation**

### **1. Tour Model Update**

**File:** `app/Models/Tour.php`

Added new media collection for itinerary PDFs:

```php
public function registerMediaCollections(): void
{
    $this->addMediaCollection('images')
        ->useDisk('public');
    
    // New itinerary collection
    $this->addMediaCollection('itinerary')
        ->useDisk('public')
        ->singleFile() // Only one PDF per tour
        ->acceptsMimeTypes(['application/pdf']);
}
```

**Features:**
- **Single file:** Uploading new PDF replaces old one automatically
- **PDF only:** Restricted to `application/pdf` mime type
- **Public disk:** Stored in `storage/app/public/`
- **Spatie Media Library:** Leverages existing media system

---

### **2. Admin Panel (Filament) - Upload Field**

**File:** `app/Filament/Resources/TourResource.php`

Added upload field in tour form:

```php
SpatieMediaLibraryFileUpload::make('custom_itinerary')
    ->label('Custom Itinerary PDF (Optional)')
    ->collection('itinerary')
    ->acceptedFileTypes(['application/pdf'])
    ->maxSize(10240) // 10MB
    ->downloadable()
    ->openable()
    ->helperText('Upload a custom PDF itinerary. If not uploaded, system will auto-generate one. Max 10MB.')
    ->columnSpanFull(),
```

**Features:**
- **Optional field:** Tours work without custom PDF
- **10MB limit:** Reasonable size for detailed PDFs
- **Downloadable:** Admin can preview PDF before saving
- **Openable:** Opens PDF in new tab for review
- **Helper text:** Clear instructions for admin
- **Full width:** Prominent placement in form

**Field Position:** After "Tour Gallery" and before "Max Participants"

---

### **3. Admin Panel - Table Indicator**

Added visual column to show custom PDF status:

```php
Tables\Columns\IconColumn::make('has_custom_itinerary')
    ->label('Custom PDF')
    ->getStateUsing(fn ($record) => $record->hasMedia('itinerary'))
    ->boolean()
    ->trueIcon('heroicon-o-document-check')
    ->falseIcon('heroicon-o-document')
    ->trueColor('success')
    ->falseColor('gray')
    ->tooltip(fn ($record) => $record->hasMedia('itinerary') 
        ? 'Custom PDF uploaded' 
        : 'Auto-generated PDF')
    ->toggleable(),
```

**Visual Indicators:**
- ✅ **Green check icon:** Custom PDF uploaded
- 📄 **Gray document icon:** Auto-generated PDF will be used
- **Tooltip:** Hover to see status

**Table Position:** After "Available Seats" column

---

### **4. Backend Logic - Smart Download**

**File:** `app/Http/Controllers/Api/ItineraryController.php`

Updated download controller with intelligent fallback:

```php
public function download($id)
{
    $tour = Tour::with('category')->findOrFail($id);
    
    // Check if custom itinerary PDF exists
    $customItinerary = $tour->getFirstMedia('itinerary');
    
    if ($customItinerary) {
        // Download custom PDF
        return response()->download(
            $customItinerary->getPath(),
            $customItinerary->file_name,
            ['Content-Type' => 'application/pdf']
        );
    }
    
    // Fallback: Generate default itinerary
    return $this->generateDefaultItinerary($tour);
}
```

**Logic Flow:**
1. Load tour from database
2. Check if custom PDF exists in 'itinerary' collection
3. **If custom PDF exists:**
   - Get file path from Spatie Media Library
   - Serve file with original filename
   - Set proper Content-Type header
4. **If no custom PDF:**
   - Call `generateDefaultItinerary()` method
   - Generate PDF from Blade template
   - Download auto-generated PDF

**Benefits:**
- Seamless transition between custom and auto-generated
- Original filename preserved
- No changes needed on frontend
- Users don't notice difference in download behavior

---

## 📱 **Admin Panel Workflow**

### **Upload Custom PDF**

**Step 1:** Go to Admin Panel
```
http://127.0.0.1:8000/admin/tours
```

**Step 2:** Create or Edit Tour

**Step 3:** Scroll to "Custom Itinerary PDF" field

**Step 4:** Upload PDF
- Click upload area
- Select PDF file (max 10MB)
- PDF preview appears
- Can download to verify content

**Step 5:** Save Tour
- Click "Create" or "Update"
- Custom PDF is now active

### **Preview Custom PDF**

**In Admin Panel:**
- Click eye icon on uploaded PDF
- Opens in new browser tab
- Verify content before saving

### **Replace Custom PDF**

**Option 1 - Upload New:**
- Edit tour
- Upload new PDF in same field
- Old PDF automatically deleted
- New PDF becomes active

**Option 2 - Delete & Revert:**
- Edit tour
- Click X button on uploaded PDF
- Custom PDF deleted
- System reverts to auto-generation
- Save tour

### **Table View**

**Tours List:**
```
Name           | Destination | Price    | Custom PDF
---------------|-------------|----------|-----------
Bali Adventure | Bali        | Rp 5,000 | ✅ (green)
Tokyo Tour     | Tokyo       | Rp 8,000 | 📄 (gray)
```

**Tooltip on Hover:**
- Green check: "Custom PDF uploaded"
- Gray doc: "Auto-generated PDF"

---

## 🎨 **User Experience**

### **For End Users (No Change!)**

**Download Behavior:**
1. Click "Download Itinerary PDF" button
2. System checks for custom PDF
3. Downloads either custom or auto-generated
4. **User doesn't know which one** (seamless!)

**Filename:**
- Custom PDF: Uses original filename from upload
- Auto-generated: `tour-name-itinerary.pdf`

### **For Admins**

**Clear Workflow:**
1. See which tours have custom PDFs (table column)
2. Upload/replace/delete PDFs easily
3. Preview before saving
4. Instant activation after save

**No Complexity:**
- Optional field (not required)
- Tours work fine without custom PDF
- Can switch back and forth anytime

---

## 📊 **Storage & File Management**

### **File Storage**

**Location:** `storage/app/public/{tour-id}/`

**Example:**
```
storage/app/public/
├── 1/
│   ├── bali-tour-itinerary.pdf    (custom)
│   └── image1.jpg
├── 2/
│   └── tokyo-itinerary-custom.pdf  (custom)
```

### **Database**

**Table:** `media`

**Columns:**
- `id` - Media ID
- `model_type` - "App\Models\Tour"
- `model_id` - Tour ID
- `collection_name` - "itinerary"
- `file_name` - Original filename
- `mime_type` - "application/pdf"
- `size` - File size in bytes
- `disk` - "public"

### **File Limits**

- **Max size:** 10MB per PDF
- **Files per tour:** 1 (single file collection)
- **Mime type:** `application/pdf` only
- **Auto-cleanup:** Old PDF deleted on replace

---

## 🔍 **Use Cases**

### **1. Professional Design**
**Scenario:** Company has branded PDF template  
**Solution:** Upload professionally designed PDF with company branding

### **2. Multilingual Itineraries**
**Scenario:** Need itinerary in multiple languages  
**Solution:** Upload PDFs for different languages (requires multiple tours for now)

### **3. Detailed Activities**
**Scenario:** Tour has complex day-by-day schedule  
**Solution:** Upload detailed PDF with specific timings, meeting points, activities

### **4. Special Instructions**
**Scenario:** Tour requires specific equipment/clothing  
**Solution:** Upload PDF with detailed packing list and instructions

### **5. Partnership Logos**
**Scenario:** Tour partnered with sponsors  
**Solution:** Upload PDF with sponsor logos and info

### **6. Photo-Rich Itineraries**
**Scenario:** Want to show destination photos  
**Solution:** Upload PDF with high-quality images embedded

### **7. Quick Updates**
**Scenario:** Itinerary details changed  
**Solution:** Upload updated PDF without code deployment

---

## 🧪 **Testing Checklist**

### **Admin Panel Tests**

- [x] **Upload PDF:** File uploads successfully
- [x] **Preview PDF:** Eye icon opens PDF in new tab
- [x] **Download PDF:** Can download uploaded PDF
- [x] **Save Tour:** Custom PDF persists after save
- [x] **Replace PDF:** Upload new PDF replaces old one
- [x] **Delete PDF:** X button deletes custom PDF
- [x] **Table Icon:** Green check shows for tours with custom PDF
- [x] **Table Icon:** Gray doc shows for tours without custom PDF
- [x] **Tooltip:** Hover shows correct status message
- [x] **Validation:** Only PDFs accepted
- [x] **Size Limit:** 10MB limit enforced

### **Frontend Tests**

- [x] **Download Custom:** Custom PDF downloads when exists
- [x] **Download Auto:** Auto-generated PDF when no custom
- [x] **Filename:** Original filename preserved for custom PDF
- [x] **No Errors:** No console errors
- [x] **Same Button:** Download button unchanged
- [x] **Seamless UX:** Users can't tell difference

### **Backend Tests**

- [x] **API Endpoint:** `/api/tours/{id}/itinerary/download` works
- [x] **Custom Priority:** Custom PDF served first
- [x] **Auto Fallback:** Auto-generates when no custom
- [x] **File Path:** Correct file path retrieved
- [x] **Content Type:** PDF mime type set correctly
- [x] **404 Handling:** Invalid tour ID returns 404

---

## 🔐 **Security**

### **Upload Validation**

1. **File Type:** Only `application/pdf` accepted
2. **File Size:** Max 10MB enforced
3. **Single File:** Automatic replacement prevents storage bloat
4. **Admin Only:** Upload restricted to authenticated admin users

### **Download Security**

1. **Public Access:** Download API is public (intentional)
2. **File Path:** Uses Spatie's secure path resolution
3. **No Directory Traversal:** Media Library prevents path attacks
4. **Proper Headers:** Content-Type set correctly

### **Storage Security**

1. **Public Disk:** Files accessible via `/storage/` URL
2. **No Sensitive Data:** Itineraries are public information
3. **Laravel Storage:** Uses Laravel's secure storage system

---

## 📝 **Future Enhancements**

### **Potential Features**

1. **Version History**
   - Keep old PDF versions
   - Revert to previous version
   - Track who uploaded when

2. **Multilingual Support**
   - Multiple PDFs per tour (one per language)
   - Language selector on frontend
   - Auto-detect user language

3. **PDF Generator UI**
   - Visual PDF editor in admin panel
   - Drag-and-drop sections
   - Template library

4. **Bulk Operations**
   - Upload PDFs for multiple tours at once
   - Apply same PDF to multiple tours
   - Batch delete custom PDFs

5. **Email Integration**
   - Send custom PDF in booking confirmation
   - Auto-attach to email notifications

6. **Analytics**
   - Track download counts
   - Compare custom vs auto-generated popularity
   - A/B testing metrics

7. **Approval Workflow**
   - Admin uploads → Manager approves
   - Multi-step review process
   - Audit trail

---

## 📂 **Files Changed**

### **Modified (3 files)**

1. **`app/Models/Tour.php`**
   - Added 'itinerary' media collection
   - Configured single file with PDF restriction

2. **`app/Http/Controllers/Api/ItineraryController.php`**
   - Added custom PDF check logic
   - Extracted `generateDefaultItinerary()` method
   - Smart download routing

3. **`app/Filament/Resources/TourResource.php`**
   - Added upload field in form
   - Added status column in table
   - Icon indicator with tooltip

### **No New Files**
- Leverages existing Spatie Media Library
- Uses existing routes and frontend

---

## 🎓 **Usage Guide**

### **For Administrators**

**To Upload Custom PDF:**
1. Log in to admin panel
2. Go to Travel Management → Tours
3. Click "New Tour" or edit existing
4. Scroll to "Custom Itinerary PDF" field
5. Click to upload or drag PDF file
6. Verify PDF in preview
7. Click "Create" or "Update"
8. ✅ Custom PDF is now active!

**To Replace PDF:**
1. Edit tour
2. Upload new PDF in same field
3. Old PDF auto-deleted
4. Save

**To Remove Custom PDF:**
1. Edit tour
2. Click X on uploaded PDF
3. Save
4. System reverts to auto-generation

**To Check Status:**
- View tours table
- Look at "Custom PDF" column
- ✅ Green = Custom uploaded
- 📄 Gray = Auto-generated

### **For Developers**

**Check if Tour Has Custom PDF:**
```php
$tour = Tour::find(1);
$hasCustom = $tour->hasMedia('itinerary');
```

**Get Custom PDF:**
```php
$customPdf = $tour->getFirstMedia('itinerary');
if ($customPdf) {
    $url = $customPdf->getUrl();
    $path = $customPdf->getPath();
}
```

**Delete Custom PDF:**
```php
$tour->clearMediaCollection('itinerary');
```

---

## ✅ **Success Metrics**

- ✅ **Zero breaking changes** to existing functionality
- ✅ **Seamless UX** for end users
- ✅ **Simple workflow** for admins
- ✅ **Flexible system** (optional custom PDFs)
- ✅ **Production ready** immediately

---

## 🎉 **Completion Summary**

The Custom Itinerary Upload feature is **COMPLETE** and **PRODUCTION-READY**. 

**Key Achievements:**
- Admin can upload custom PDF itineraries
- Smart fallback to auto-generated PDFs
- Visual indicators in admin panel
- No changes to frontend or user experience
- Optional feature (doesn't break existing tours)
- Instant activation after upload
- Easy to update or revert

**Workflow:**
```
Admin uploads custom PDF → Saved to media library → 
User clicks download → System checks for custom → 
Downloads custom if exists, else auto-generates
```

---

**Implementation Date:** January 26, 2026  
**Status:** ✅ **COMPLETE & DEPLOYED**  
**Impact:** Zero breaking changes, enhanced flexibility
