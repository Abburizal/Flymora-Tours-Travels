<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use App\Models\Tour;
use App\Models\Wishlist;
use Illuminate\Support\Facades\Auth;

echo "=== Testing Wishlist Functionality ===\n\n";

// Get test user and tour
$user = User::first();
$tour = Tour::find(2);

if (!$user) {
    echo "❌ No user found. Please seed the database.\n";
    exit(1);
}

if (!$tour) {
    echo "❌ Tour ID 2 not found. Please check database.\n";
    exit(1);
}

echo "✓ User: {$user->name} (ID: {$user->id})\n";
echo "✓ Tour: {$tour->name} (ID: {$tour->id})\n\n";

// Clear existing wishlists for this user/tour combo
Wishlist::where('user_id', $user->id)->where('tour_id', $tour->id)->delete();
echo "✓ Cleared existing wishlist entries\n\n";

// Test 1: Check initial wishlist status
echo "Test 1: Check initial wishlist status\n";
$inWishlist = $user->hasInWishlist($tour->id);
echo "Result: " . ($inWishlist ? "In wishlist" : "Not in wishlist") . "\n";
echo $inWishlist ? "❌ FAIL: Should not be in wishlist\n\n" : "✓ PASS\n\n";

// Test 2: Add to wishlist
echo "Test 2: Add tour to wishlist\n";
try {
    $wishlist = Wishlist::create([
        'user_id' => $user->id,
        'tour_id' => $tour->id
    ]);
    echo "✓ PASS: Created wishlist ID {$wishlist->id}\n\n";
} catch (Exception $e) {
    echo "❌ FAIL: {$e->getMessage()}\n\n";
    exit(1);
}

// Test 3: Verify it's now in wishlist
echo "Test 3: Verify tour is in wishlist\n";
$inWishlist = $user->hasInWishlist($tour->id);
echo "Result: " . ($inWishlist ? "In wishlist" : "Not in wishlist") . "\n";
echo $inWishlist ? "✓ PASS\n\n" : "❌ FAIL: Should be in wishlist\n\n";

// Test 4: Count wishlists
echo "Test 4: Count user's wishlists\n";
$count = $user->wishlists()->count();
echo "Count: {$count}\n";
echo $count > 0 ? "✓ PASS\n\n" : "❌ FAIL: Should have wishlists\n\n";

// Test 5: Remove from wishlist
echo "Test 5: Remove tour from wishlist\n";
$deleted = Wishlist::where('user_id', $user->id)
    ->where('tour_id', $tour->id)
    ->delete();
echo $deleted > 0 ? "✓ PASS: Deleted {$deleted} record(s)\n\n" : "❌ FAIL: Nothing deleted\n\n";

// Test 6: Verify it's removed
echo "Test 6: Verify tour is removed from wishlist\n";
$inWishlist = $user->hasInWishlist($tour->id);
echo "Result: " . ($inWishlist ? "In wishlist" : "Not in wishlist") . "\n";
echo !$inWishlist ? "✓ PASS\n\n" : "❌ FAIL: Should not be in wishlist\n\n";

echo "=== All Tests Completed ===\n";
