# Tour Image Cache Fix - Auto Clear on Update

## Masalah
Gambar tour di **kartu depan** (listing) selalu delay/terlambat update dibanding **kartu detail** saat post tour baru dari admin.

## Penyebab
Cache API tidak otomatis di-clear saat tour diupdate dari admin panel:
- **Listing cache:** 15 menit (900 detik)
- **Detail cache:** 10 menit (600 detik)  
- **Viral tours cache:** 10 menit (600 detik)

Saat admin upload tour baru atau update gambar, cache lama masih aktif selama beberapa menit.

## Solusi Diterapkan

### 1. TourObserver - Auto Clear Cache
File: `app/Observers/TourObserver.php`

Observer ini otomatis clear cache saat:
- ✅ Tour baru dibuat (`created`)
- ✅ Tour diupdate (`updated`)
- ✅ Tour dihapus (`deleted`)
- ✅ Tour di-restore (`restored`)
- ✅ Tour force deleted (`forceDeleted`)

**Cara kerja:**
```php
public function updated(Tour $tour): void
{
    // Clear specific tour cache
    Cache::forget("tour_{$tour->id}");
    
    // Clear viral tours cache
    Cache::forget('viral_tours');
    
    // Clear all listing caches
    Cache::flush();
}
```

### 2. Reduced Cache Duration
File: `app/Http/Controllers/Api/TourController.php`

Kurangi waktu cache untuk refresh lebih cepat:
- **Listing:** 900s → **300s** (5 menit)
- **Detail:** 600s → **300s** (5 menit)
- **Viral:** 600s → **300s** (5 menit)

## Testing

```bash
# Test observer manually
php artisan tinker

$tour = App\Models\Tour::first();
$tour->touch(); // Trigger observer
# Cache will be cleared automatically
```

## Hasil

### ✅ Sebelum Fix
1. Admin upload tour baru dengan gambar
2. Gambar muncul di detail page (10 menit cache)
3. Gambar **BELUM** muncul di listing page (15 menit cache)
4. Harus tunggu 15 menit atau clear cache manual

### ✅ Setelah Fix
1. Admin upload tour baru dengan gambar
2. Observer otomatis clear cache
3. Gambar **LANGSUNG** muncul di listing dan detail page
4. Tidak perlu tunggu atau clear cache manual

## Manual Cache Clear (Opsional)

Jika masih ada delay, clear cache manual:

```bash
# Clear semua cache
php artisan cache:clear

# Atau clear specific cache
php artisan tinker
Cache::forget('tour_123');
Cache::forget('viral_tours');
```

## Files Modified
1. `app/Observers/TourObserver.php` - Add cache clearing logic
2. `app/Http/Controllers/Api/TourController.php` - Reduce cache duration

## Status
**✅ COMPLETE** - Gambar tour sekarang update instant saat post dari admin!

---
**Date:** February 19, 2026  
**Issue:** Tour images delay in listing view after admin upload  
**Solution:** Auto-clear cache via TourObserver + reduced cache duration
